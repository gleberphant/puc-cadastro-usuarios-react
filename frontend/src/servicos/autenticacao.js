import {
  ChecarSenha,
  ChecarUsuario,
  SelecionarUsuarioPorLogin,
} from "./usuarios";

import { auth } from "../repositorios/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

let USUARIO_AUTENTICADO = {};
// faz login, se não conseguir retorna um erro explicando a falha
export async function FazerLogin(login, senha) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, login, senha);
    const user = userCredential.user;
    console.log("Usuário logado:", user.uid);

    localStorage.setItem("token", user.uid);
    USUARIO_AUTENTICADO = await SelecionarUsuarioPorLogin(login);
    return null;
  } catch (error) {
    console.error("Erro no login:", error.code, error.message);
    return error.message;
  }
}

export function FazerLogout() {
  localStorage.removeItem("token");
  window.location.reload();
}

export function ChecarAutenticacao() {
  if (localStorage.getItem("token") == null) return false;
  else return true;
}

export function GetUsuarioAutenticado() {
  return USUARIO_AUTENTICADO;
}

// metodos privados
function criptograrSenha(senha) {
  return senha;
}
