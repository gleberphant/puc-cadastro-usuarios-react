import { GetUsuarioAutenticado } from "../servicos/autenticacao";
export function CardUsuarioLogado() {
  const [usuarioAutenticado] = useState(GetUsuarioAutenticado());
  const dataFormatada = usuarioAutenticado?.data_nascimento
    ? new Date(usuarioAutenticado.data_nascimento).toLocaleDateString("pt-BR")
    : "";
  return (
    <>
      <div className="home-panel">
        <h2>USUARIO LOGADO</h2>

        <table className="home-table">
          <tbody>
            <tr>
              <td className="home-label">Nome:</td>
              <td className="home-value">{usuarioAutenticado?.nome ?? ""}</td>
            </tr>
            <tr>
              <td className="home-label">Sobrenome:</td>
              <td className="home-value">
                {usuarioAutenticado?.sobrenome ?? ""}
              </td>
            </tr>
            <tr>
              <td className="home-label">Data de Nascimento:</td>
              <td className="home-value">{dataFormatada}</td>
            </tr>
            <tr>
              <td className="home-label">Login:</td>
              <td className="home-value">{usuarioAutenticado?.login ?? ""}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
