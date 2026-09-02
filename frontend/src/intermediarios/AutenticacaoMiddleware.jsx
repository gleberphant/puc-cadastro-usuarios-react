// midleware de autenticacao
import { Navigate, Outlet } from "react-router-dom";
import { useContextoAutenticacao } from "../contextos/ProvedorAutenticacao";

export function AutenticacaoMiddleware() {
  const { loading, ChecarAutenticacao } = useContextoAutenticacao();

  if (loading) {
    return <>Verificando autenticação</>;
  } 

  if (!ChecarAutenticacao) {
    console.log("usuario não autenticado");
    return <Navigate to="/login" replace />;
  }


  return <Outlet />;


}
