import { useState } from "react";
import { ListarUsuarios } from "../servicos/usuarios.js";
import { db } from "../repositorios/firebase.js";
import { collection, getDocs } from "firebase/firestore"
export function ListaDeUsuarios() {
  const [listaUsuarios, setListaUsuarios] = useState([]);

  const getLista = async () => {
    const lista = []
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    querySnapshot.forEach((doc) => {
      lista.push(doc)
      console.log(`${doc.id} => ${doc.data()}`);
    });
    return lista
  };

  setListaUsuarios(getLista());

  return (
    <>
      <div>
        <div style={{ color: "black" }}>
          <button onClick={getLista}>click</button>
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
