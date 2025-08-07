import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurante/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurante/FormularioRestaurante';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';
import AdministracaoPratos from './paginas/Administracao/Pratos/AdministracaoPratos';
import FormularioPratos from './paginas/Administracao/Pratos/FormularioPratos';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path='/admin/' element={<PaginaBaseAdmin />}>
          <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
          <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
          <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
          <Route path="pratos" element={<AdministracaoPratos />} />
          <Route path="pratos/novo" element={<FormularioPratos />} />
      </Route>
    
    </Routes>
  );
}

export default App;
