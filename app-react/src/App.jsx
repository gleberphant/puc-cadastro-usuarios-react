//css
import "./estilos/App.css";

//dependencias
import { HashRouter, Route, Routes } from "react-router-dom";
import { AutenticacaoMiddleware } from "./intermediarios/AutenticacaoMiddleware";
import { ProvedorAutenticacao} from "./contextos/ProvedorAutenticacao"
//paginas das rotas
import Layout from "./paginas/layout";
import PageLogin from "./paginas/login";
import PageHome from "./paginas/home";
import PageCadastro from "./paginas/cadastro";
import PageSobre from "./paginas/sobre";


//roteador da aplicação
function App() {
  return (
    <ProvedorAutenticacao>
      <HashRouter>
        <Routes>
          {/** rotas publica */}
          <Route path="/login" element={<PageLogin />}></Route>

          {/** rotas privadas */}
          <Route element={<AutenticacaoMiddleware />}>
            <Route element={<Layout />}>
              <Route index element={<PageHome />} />
              <Route path="/cadastro" element={<PageCadastro />} />
              <Route path="/sobre" element={<PageSobre />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </ProvedorAutenticacao>
  );
}

export default App;
