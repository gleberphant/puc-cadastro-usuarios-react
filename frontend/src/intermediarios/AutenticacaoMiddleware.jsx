// midleware de autenticacao
import { Navigate, Outlet } from "react-router-dom";
import { useContextoAutenticacao } from "../contextos/ProvedorAutenticacao";

export function AutenticacaoMiddleware() {
  const { loading, usuarioLogado } = useContextoAutenticacao();

  if (loading) {
    return <>Verificando autenticação</>;
  } 

  if (!usuarioLogado ) {
    console.log("usuario não autenticado");
    return <Navigate to="/login" replace />;
  }


  return <Outlet />;


}
