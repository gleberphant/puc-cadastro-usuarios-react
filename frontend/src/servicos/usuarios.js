import {
  query,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  where,
} from "firebase/firestore";
import { db } from "../repositorios/firebase.js";
import {USUARIO_MOCK} from "../repositorios/mock.js"

export async function ListarUsuarios() {
  const lista = [];

  try {
    const resultado = await getDocs(collection(db, "usuarios"));
    // timeout para simular delay do servidor
    const sleep = await new Promise((resolve) => setTimeout(resolve, 500));

    for (const doc of resultado.docs) {
      const usuario = { id: doc.id, ...doc.data() };
      console.log("Usuario recebido: ", usuario);
      lista.push(usuario);
    }
    console.log("Recebendo lista de usuarios: ", lista);
  } catch (e) {
    console.log("error:", e);
    return null;
  }

  return lista;
}

export async function AdicionarUsuario(novoUsuario) {
  try {
    const docRef = await addDoc(collection(db, "usuarios"), novoUsuario);
    console.log(`Documento salvo : ${docRef.id}`);
  } catch (error) {
    console.log(`Falha na escrita do error: ${error}`);
  }

  USUARIO_MOCK.push(novoUsuario);
}

export async function SelecionarUsuarioPorLogin(login) {
  try {
    const q = query(collection(db, "usuarios"), where("login", "==", login));
    const resultado = await getDocs(q);

    for (const documento of resultado.docs) {
      const usuario = await { id: documento.id, ...documento.data() };
      console.log("usuario:", usuario);
      if (usuario.login == login) return usuario;
    }

    return null;
  } catch (error) {
    console.log("error:", error);
    return null;
  }
}

export async function SelecionarUsuarioPorId(id) {
  const usuarioRef = doc(db, "usuarios", id);
  const res = await getDoc(usuarioRef);

  if (!res.exists()) return null;

  return { id: res.id, ...res.data() };
}

export async function ChecarUsuario(login) {
  const usuario = await SelecionarUsuarioPorLogin(login);

  if (usuario == null || usuario.senha != login) return false;

  return true;
}

export async function ChecarSenha(login, senha) {
  const usuario = await SelecionarUsuarioPorLogin(login);

  if (usuario == null || usuario.senha != senha) return false;

  return true;
}
