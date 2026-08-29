import { useState } from "react";
import "../estilos/HomePage.css";
import { GetUsuarioAutenticado } from "../servicos/autenticacao";

export default function PageHome() {
  const [usuarioLogado] = useState(() => GetUsuarioAutenticado());

  const dataFormatada = usuarioLogado?.data_nascimento
    ? new Date(usuarioLogado.data_nascimento).toLocaleDateString("pt-BR")
    : "";

  return (
    <div className="home-page">
      <div className="home-panel">
        <h2>USUARIO LOGADO</h2>

        <table className="home-table">
          <tbody>
            <tr>
              <td className="home-label">Nome:</td>
              <td className="home-value">{usuarioLogado?.nome ?? ""}</td>
            </tr>
            <tr>
              <td className="home-label">Sobrenome:</td>
              <td className="home-value">{usuarioLogado?.sobrenome ?? ""}</td>
            </tr>
            <tr>
              <td className="home-label">Data de Nascimento:</td>
              <td className="home-value">{dataFormatada}</td>
            </tr>
            <tr>
              <td className="home-label">Login:</td>
              <td className="home-value">{usuarioLogado?.login ?? ""}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
