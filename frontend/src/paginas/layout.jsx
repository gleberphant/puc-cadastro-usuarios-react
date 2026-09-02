import "../estilos/Layout.css";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

import PUCBRASAO from "../assets/images/pucpr-brasao-redondo.png";
import { useContextoAutenticacao } from "../contextos/ProvedorAutenticacao";
import { CardUsuarioLogado } from "../componentes/CardUsuarioLogado";

export default function Layout() {
  const { FazerLogout, usuarioLogado } = useContextoAutenticacao();
  const [verCardPerfil, setVerCardPerfil] = useState(false);

  return (
    <>
      <header>
        <nav className="navbar">
          <ul className="navbar-links">
            <li>
              <img height="50" src={PUCBRASAO} />
            </li>
            <li>
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/cadastro">CADASTRO</NavLink>
            </li>
            <li>
              <NavLink to="/sobre">SOBRE</NavLink>
            </li>
            <li>
              <button type="button" onClick={FazerLogout}>
                SAIR
              </button>
            </li>
          </ul>

          <div className="perfil-menu">
            <button
              type="button"
              className={verCardPerfil ? "ativo" : ""}
              onClick={() => setVerCardPerfil(!verCardPerfil)}
            >
              Perfil
            </button>

            {verCardPerfil ? (
              <CardUsuarioLogado usuarioLogado={usuarioLogado} />
            ) : (
              <></>
            )}
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Aplicação Wails - Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
