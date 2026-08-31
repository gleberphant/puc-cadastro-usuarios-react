import { useEffect, useState } from "react";
import { ListarUsuarios } from "../servicos/usuarios.js";
export function ListaDeUsuarios() {
  const [loading, setLoading] = useState(false)
  const [listaUsuarios, setListaUsuarios] = useState([]);

  const carregarUsuarios = async () => {
    setLoading(true)
    const lista = await ListarUsuarios();
    setListaUsuarios(lista);
    setLoading(false)
  };


  useEffect(() => { carregarUsuarios()}  , []);

  return loading? <h2>Carregando</h2> :(
    <>
      <h2>lista de usuarios</h2>
      <table>
        <thead>
          <tr>
            <td>Login</td>
            <td>Nome</td>
            <td>Sobrenome</td>
            <td>Data de Nascimento</td>
          </tr>
        </thead>
        <tbody>
          {listaUsuarios.map((u) => (
            <tr key={u.id}>
              <td> {u.login}</td>
              <td> {u.nome}</td>
              <td> {u.sobrenome}</td>
              <td> {u.data_nascimento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) 
}
