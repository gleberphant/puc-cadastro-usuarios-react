import { useState } from "react";
import { ListarUsuarios } from "../servicos/usuarios.js";

export function ListaDeUsuarios() {
  const [listaUsuarios, setListaUsuarios] = useState(ListarUsuarios());

  return (
    <>
      <div>
        <div style={{ color: "black" }}>
          <table>
            <tbody>
              {listaUsuarios.map((u) => (
                <tr key={u.login}>
                  <td> Nome :{u.nome}</td>
                  <td> Sobrenome :{u.sobrenome}</td>
                  <td> Login :{u.login}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
