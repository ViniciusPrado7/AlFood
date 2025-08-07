import { AppBar, Box, Button, Container, Link, Paper, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import IRestaurante from '../../../interfaces/IRestaurante'
import http from '../../../http'
import { Link as RouterLink } from 'react-router-dom'

const FormularioRestaurante = () => {

  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  }, [parametros])

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => {
          alert("Restaurante atualizado com sucesso")
        })
    } else {
      http.post('restaurantes/', {
        nome: nomeRestaurante
      })
        .then(() => {
          alert("restaurante cadatrado")
        })
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
        <Typography component="h1" variant='h6'>Formulário de Restaurantes</Typography>
        <Box component="form" sx={{ width: '50%' }} onSubmit={aoSubmeterForm}>
          <TextField
            value={nomeRestaurante}
            onChange={evento => setNomeRestaurante(evento.target.value)}
            id="standard-basic"
            label="Nome do Restaurante"
            variant="standard"
            required
            fullWidth
          />
          <Button sx={{ marginTop: 1 }} type='submit' variant="outlined" fullWidth>Salvar</Button>
        </Box>
      </Box>

    </>

  )
}

export default FormularioRestaurante