import {
  query,
  collection,
  getDocs,
  doc,
  getDoc,
  where,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../repositorios/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";


export async function ListarUsuarios() {
  const lista = [];

  try {
    const resultado = await getDocs(collection(db, "usuarios"));
    // timeout para simular delay do servidor
    //const sleep = await new Promise((resolve) => setTimeout(resolve, 500));

    for (const doc of resultado.docs) {
      const usuario = { id: doc.id, ...doc.data() };
      lista.push(usuario);
    }
    console.log("lista : ", lista);
  } catch (e) {
    console.log("error:", e);
    return null;
  }

  return lista;
}

export async function AdicionarUsuario(novoUsuario) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      novoUsuario.login,
      novoUsuario.senha,
    );
    console.log("Usuario criado no firebase auth: ", userCredential.user.uid);

    const docRef = doc(db, "usuarios", userCredential.user.uid);

    await setDoc(docRef, novoUsuario);

    console.log(`Documento salvo : ${docRef.id}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    return error;
  }

  try {
  } catch (error) {
    console.log(`Error: ${error}`);
    return "erro ao adicionar usuario";
  }

  return null;
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
