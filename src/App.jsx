import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import NuevoPresupuesto from './pages/NuevoPresupuesto';
import Historico from './pages/Historico';
import Seguimiento from './pages/Seguimiento';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<NuevoPresupuesto />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/seguimiento" element={<Seguimiento />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
