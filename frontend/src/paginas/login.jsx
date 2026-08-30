import "../estilos/LoginPage.css";
import pucprSimbolo from "../assets/images/pucpr-simbolo2.png";
import { FazerLogin } from "../servicos/autenticacao";

// import { useNavigate } from "react-router-dom";
export default function PageLogin({ callbackSetAutenticado }) {
  //  const navegarPara = useNavigate()

  const enviarFormulario = (e) => {
    e.preventDefault();

    const formulario = new FormData(e.target);
    const login = formulario.get("login");
    const senha = formulario.get("senha");

    const resultado = FazerLogin(login, senha);
    console.log(`Login:${login} Senha ${senha} `);

    if (resultado != null) {
      alert(`Erro: ${resultado}`);
    }

    callbackSetAutenticado(true);
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
