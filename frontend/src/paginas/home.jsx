import "../estilos/HomePage.css";
import { ListaDeUsuarios } from "../componentes/ListaDeUsuarios";

export default function PageHome() {

  return (
    <div className="home-page">
      <div className="home-panel">
        <ListaDeUsuarios />
      </div>
     
    </div>
  );
}
