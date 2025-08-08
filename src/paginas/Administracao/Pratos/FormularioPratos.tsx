import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import http from '../../../http'
import ITag from '../../../interfaces/ITag'
import IRestaurante from '../../../interfaces/IRestaurante'
import { useParams } from 'react-router-dom'

const FormularioPratos = () => {

    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [restaurante, setRestaurante] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)

    const [tags, setTags] = useState<ITag[]>([])
    const [tag, setTag] = useState('')
    
    const parametros = useParams()

    useEffect(() => {
        http.get<{ tags: ITag[] }>("tags/")
            .then(resposta => setTags(resposta.data.tags))

        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))

        if (parametros.id) {
            http.get<any>(`pratos/${parametros.id}/`)
                .then(resposta => {
                    setNomePrato(resposta.data.nome)
                    setDescricao(resposta.data.descricao)
                    setTag(resposta.data.tag)
                    setRestaurante(resposta.data.restaurante.toString())
                })
        }
    }, [parametros])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }
    }

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const formData = new FormData()
        formData.append('nome', nomePrato)
        formData.append('descricao', descricao)
        formData.append('tag', tag)
        formData.append('restaurante', restaurante)
        if (imagem) {
            formData.append('imagem', imagem)
        }

        if (parametros.id) {
            http.request({
                url: `pratos/${parametros.id}/`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
                .then(() => alert('Prato atualizado com sucesso!'))
                .catch(erro => console.log(erro))
        } else {
            http.request({
                url: 'pratos/',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
                .then(() => {
                    setRestaurante('')
                    setNomePrato('')
                    setTag('')
                    setDescricao('')
                    setImagem(null)
                    alert('Prato cadastrado com sucesso.')
                })
                .catch(erro => console.log(erro))
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant='h6'>
                {parametros.id ? "Editar Prato" : "Formulário de Pratos"}
            </Typography>
            <Box component="form" sx={{ width: '50%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    value={nomePrato}
                    onChange={evento => setNomePrato(evento.target.value)}
                    label="Nome do Prato"
                    variant="standard"
                    required
                    fullWidth
                    margin="dense"
                />
                <TextField
                    value={descricao}
                    onChange={evento => setDescricao(evento.target.value)}
                    label="Descrição do Prato"
                    variant="standard"
                    required
                    fullWidth
                    margin="dense"
                />
                <FormControl margin='dense' fullWidth>
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId='select-tag' value={tag} onChange={evento => setTag(evento.target.value)} >
                        {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                            {tag.value}
                        </MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl margin='dense' fullWidth>
                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                    <Select labelId='select-restaurante' value={restaurante} onChange={evento => setRestaurante(evento.target.value)} >
                        {restaurantes.map(rest => <MenuItem key={rest.id} value={rest.id}>
                            {rest.nome}
                        </MenuItem>)}
                    </Select>
                </FormControl>
                <input type='file' onChange={selecionarArquivo} />
                <Button sx={{ marginTop: 1 }} type='submit' variant="outlined" fullWidth>
                    Salvar
                </Button>
            </Box>
        </Box>
    )
}

export default FormularioPratos
