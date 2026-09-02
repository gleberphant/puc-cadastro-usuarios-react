import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../repositorios/firebase";
import { SelecionarUsuarioPorId } from "../servicos/usuarios";

const ContextoAutenticacao = createContext(null);

// componente para prover o contexto para os componentes filhos
export function ProvedorAutenticacao({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [loading, setLoading] = useState(true);

  // quando o provider é criado ele cria um listener do estado do usuario
  useEffect(() => {
    //adicionar o listener para onauthstatechange e retorna a função de limpeza para quando componente desmontar
    const callbackLimpezaListener = onAuthStateChanged(
      auth,
      async (usuarioFirebase) => {
        console.log("onAuthStateChanged Firebase executado:", usuarioFirebase?true:false);

        try {
          if (!usuarioFirebase) {
            setUsuarioLogado(null);
            return;
          }

          console.log("Buscando dados do usuário:", usuarioFirebase.uid);

          const usuario = await SelecionarUsuarioPorId(usuarioFirebase.uid);

          if (!usuario) {
            setUsuarioLogado(null);
            return;
          }

          

          await setUsuarioLogado({
            uid: usuarioFirebase.uid,
            login: usuario.login,
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
          });

          console.log("Usuário no State:", usuarioLogado);

        } catch (erro) {
          console.error("Erro ao recuperar autenticação:", erro);
          setUsuarioLogado(null);
        } finally {
          setLoading(false);
          console.log("Finalizando loading", loading);
          
        }
      },
    );

    //a função retornada pelo efeito é a função de limpeza, executada pelo React quando o efeito precisa ser encerrado.
    return () => {
      console.log("Removendo listener");
      callbackLimpezaListener();
    };
  }, []);

  const FazerLogin = async (email, senha) => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      console.log("signInWithEmailAndPassword: ", email);
      return null;
    } catch (erro) {
      console.error("signInWithEmailAndPassword:", erro);
      throw new Error("erro na autenticação");
    }
  };

  const FazerLogout = async () => {
    try {
      await signOut(auth);
    } catch (erro) {
      console.error("Erro ao sair:", erro);
      throw erro;
    }
  };

  const ChecarAutenticacao = usuarioLogado ? true : false;

  return (
    <ContextoAutenticacao.Provider
      value={{
        usuarioLogado,
        loading,
        FazerLogin,
        FazerLogout,
        ChecarAutenticacao,
      }}
    >
      {children}
    </ContextoAutenticacao.Provider>
  );
}

// funcao para exportar o contexto
export function useContextoAutenticacao() {
  const contexto = useContext(ContextoAutenticacao);

  if (!contexto) {
    throw new Error(
      "ContextoAutenticacao deve ser usado dentro do seu Provider",
    );
  }
  return contexto;
}
