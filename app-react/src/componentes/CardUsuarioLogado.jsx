import { useState } from "react";
import "../estilos/CardUsuarioLogado.css";

export function CardUsuarioLogado({ usuarioLogado }) {
  return (
    <div className="perfil-container">
      <div className="card-usuario-logado">
        <h2>USUÁRIO </h2>

        <table>
          <tbody>
            <tr>
              <td>Nome:</td>
              <td>{usuarioLogado?.nome ?? ""}</td>
            </tr>
            <tr>
              <td>Sobrenome:</td>
              <td>{usuarioLogado?.sobrenome ?? ""}</td>
            </tr>
            <tr>
              <td>Login:</td>
              <td>{usuarioLogado?.login ?? ""}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
