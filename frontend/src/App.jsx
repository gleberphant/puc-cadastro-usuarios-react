import "./estilos/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChecarAutenticacao } from "./servicos/autenticacao";
import { useEffect, useState } from "react";
import Layout from "./paginas/_layout";
import PageLogin from "./paginas/login";
import PageHome from "./paginas/home";
import PageCadastro from "./paginas/cadastro";
import PageSobre from "./paginas/sobre";

//roteador da aplicação
function App() {
  const [autenticado, setAutenticado] = useState(ChecarAutenticacao());

  useEffect(() => {
    setAutenticado(ChecarAutenticacao());
  }, []);
  

  if (!autenticado)
    return (
      <>
        <PageLogin setLogado={setAutenticado} />
      </>
    );
  else
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<PageHome />} />
              <Route path="/cadastro" element={<PageCadastro />} />
              <Route path="/sobre" element={<PageSobre />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
}

export default App;
