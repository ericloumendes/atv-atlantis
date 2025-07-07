import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/TitularesPage";
import AcomodacoesPage from "../pages/AcomodacoesPage";
import HospedagemPage from "../pages/HospedagemPage";
import DependentesPage from "../pages/dependentesPage";

function AppRouter() {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dependentes/:id" element={<DependentesPage />} />
        <Route path="/acomodacoes" element={<AcomodacoesPage />} />
        <Route path="/hospedagem" element={<HospedagemPage />} />
      </Routes>
    </BrowserRouter>
    )
}

export default AppRouter