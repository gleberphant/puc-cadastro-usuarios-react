// Página 1 (Cadastro): Deverá possuir 5 inputs:
// e-mail, senha, nome, sobrenome e data de nascimento.
// Deverá possuir também, um botão ao final para cadastro deste usuário.
//  Deverá criar um usuário no Firebase Authentication utilizando o provedor E-mail/senha
// e o restante dos dados, gravar no Firestore, trazendo inclusive,
//  o UID do usuário para os atributos no Firestore.

import "../estilos/CadastroPage.css";

export default function PageCadastro() {
  const enviarFormulario = (e) => {
    e.preventDefault();

    formulario = new FormData(e.currentTarget);
  };

  return (
    <>
      <div className="cadastro-page">
        <div className="cadastro-panel">
          
          <h2>PAGINA DE CADASTRO DE NOVO USUARIO</h2>

          <form className="cadastro-form" onSubmit={enviarFormulario}>
            <div className="cadastro-field">
              <label htmlFor="login">Login</label>
              <input id="login" name="login" type="text" />
            </div>

            <div className="cadastro-field">
              <label htmlFor="senha">Senha</label>
              <input id="senha" name="senha" type="password" />
            </div>

            <div className="cadastro-field">
              <label htmlFor="nome">Nome</label>
              <input id="nome" name="nome" type="text" />
            </div>

            <div className="cadastro-field">
              <label htmlFor="sobrenome">Sobrenome</label>
              <input id="sobrenome" name="sobrenome" type="text" />
            </div>

            <div className="cadastro-field">
              <label htmlFor="senha">Data Nascimento</label>
              <input id="data_nascimento" name="data_nascimento" type="date" />
            </div>

            <button type="submit" className="cadastro-button">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
