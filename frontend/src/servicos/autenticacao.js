import {
  ChecarSenha,
  ChecarUsuario,
  SelecionarUsuarioPorLogin,
} from "./usuarios";

let USUARIO_AUTENTICADO = {};

export async function FazerLogin(login, senha) {
  if (!(await ChecarUsuario(login))) {
    return "usuario não identificado";
  }

  const senhaCriptografada = criptograrSenha(senha);

  if (!(await ChecarSenha(login, senhaCriptografada))) {
    return "senha inválida";
  }

  localStorage.setItem("token", "token");
  USUARIO_AUTENTICADO = await SelecionarUsuarioPorLogin(login);
  return null;
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
