import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../repositorios/firebase.js";
let USUARIO_MOCK = [
  {
    id: 0,
    nome: "admin",
    sobrenome: "sobrenome",
    data_nascimento: new Date("1986-09-02"),
    login: "admin",
    senha: "admin",
  },
  {
    id: 1,
    nome: "nome1",
    sobrenome: "sobrenome",
    data_nascimento: new Date(),
    login: "nome1@nome1.com",
    senha: "nome1",
  },
  {
    id: 2,
    nome: "nome2",
    sobrenome: "sobrenome",
    data_nascimento: new Date(),
    login: "nome2@nome2.com",
    senha: "nome2",
  },
  {
    id: 3,
    nome: "nome3",
    sobrenome: "sobrenome",
    data_nascimento: new Date(),
    login: "nome3@nome4.com",
    senha: "nome3",
  },
];

export async function ListarUsuarios() {
  const resultado = await getDocs(collection(db, "usuarios"));

  // timeout para simular delay do servidor
  const sleep = await new Promise((resolve) => setTimeout(resolve, 500));

  const lista = resultado.docs.map((doc) => {
    const usuario = { id: doc.id, ...doc.data() };
    console.log("Usuario recebido: ", usuario);
    return usuario;
  });

  console.log("Recebendo lista de usuarios: ", lista);

  return lista;
}

export async function AdicionarUsuario({
  login,
  senha,
  nome,
  sobrenome,
  data_nascimento,
}) {
  const novoUsuario = {
    nome: nome,
    sobrenome: sobrenome,
    login: login,
    senha: senha,
    data_nascimento: data_nascimento,
  };
  try {
    const docRef = await addDoc(collection(db, "usuarios"), novoUsuario);
    console.log(`Documento salvo : ${docRef.id}`);
  } catch (error) {
    console.log(`Falha na escrita do error: ${error}`);
  }

  USUARIO_MOCK.push(novoUsuario);
}

export function SelecionarUsuarioPorLogin(login) {
  for (const usuario of USUARIO_MOCK) {
    if (usuario.login === login) return usuario;
  }
}

export function SelecionarUsuarioPorId(id) {
  for (const usuario of USUARIO_MOCK) {
    if (usuario.id === id) return usuario;
  }
}

export function ChecarUsuario(login) {
  for (const usuario of USUARIO_MOCK) {
    if (usuario.login === login) return true;
  }
  return false;
}

export function ChecarSenha(login, senha) {
  const usuario = SelecionarUsuarioPorLogin(login);

  if (usuario.senha == senha) return true;
  else return false;
}
