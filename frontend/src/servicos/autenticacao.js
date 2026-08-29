import { ChecarSenha, ChecarUsuario, SelecionarUsuarioPorLogin } from "./usuarios";

let USUARIO_AUTENTICADO = {};

export function FazerLogin(login, senha) {
  // verifica se o usuario existe
  if (!ChecarUsuario(login)) {
    return "usuario não identificado";
  }

  // simula criptografia da senha
  const senhaCriptografada = criptograrSenha(senha);

  // checar se a senha é correta
  if (!ChecarSenha(login, senhaCriptografada)) {
    return "senha inválida";
  }


  localStorage.setItem("token", "token");

  const usuarioLogado= SelecionarUsuarioPorLogin(login)
  console.log(usuarioLogado)
  setUsuarioAutenticado(usuarioLogado);

  return null;
}

export function FazerLogout() {
  localStorage.removeItem("token");
  window.location.reload();
}

export function ChecarAutenticacao() {
  if (localStorage.getItem("token") == null) return false;
  else return true

}

export function GetUsuarioAutenticado(){
  return USUARIO_AUTENTICADO
}

// metodos privados

function setUsuarioAutenticado(valor) {
  USUARIO_AUTENTICADO = valor;
}

function criptograrSenha(senha) {
  return senha;
}
