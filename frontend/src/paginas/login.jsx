//estilos
import "../estilos/LoginPage.css";
import pucprSimbolo from "../assets/images/pucpr-simbolo2.png";

//dependencias
import { useNavigate } from "react-router-dom";
import { useContextoAutenticacao } from "../contextos/ProvedorAutenticacao";

//componentes
export default function PageLogin() {
  const navegarPara = useNavigate();
  const { FazerLogin } = useContextoAutenticacao();

  const enviarFormulario = async (e) => {
    e.preventDefault();

    const formulario = new FormData(e.target);
    const login = formulario.get("login");
    const senha = formulario.get("senha");

    const err = await FazerLogin(login, senha);

    if (err != null) {
      alert(`Erro: ${err}`);
      return null;
    }

    navegarPara("/");
  };

  return (
    <div className="login-page">
      <div className="login-panel">
        <img width="80px" src={pucprSimbolo} />
        <h2>Login</h2>

        <form className="login-form" onSubmit={enviarFormulario}>
          <div className="login-field">
            <label htmlFor="login">Login</label>
            <input id="login" name="login" type="text" />
          </div>

          <div className="login-field">
            <label htmlFor="senha">Senha</label>
            <input id="senha" name="senha" type="password" />
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
