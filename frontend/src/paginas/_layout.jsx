import { NavLink, Outlet } from "react-router-dom";
import { FazerLogout } from "../servicos/autenticacao";
import "../estilos/Layout.css";
import PUCBRASAO from "../assets/images/pucpr-brasao-redondo.png"

export default function Layout() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <img height="50" src={PUCBRASAO}/>
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
              <a onClick={ FazerLogout }>SAIR</a>
            </li>
          </ul>
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
