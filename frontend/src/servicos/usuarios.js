let USUARIO_MOCK = [
   {
    id: 0,
    nome: "admin",
    sobrenome:"sobrenome",
    data_nascimento:new Date("1986-09-02"),
    login: "admin",
    senha: "admin",
  },
  {
    id: 1,
    nome: "nome1",
    sobrenome:"sobrenome",
    data_nascimento:new Date(),
    login: "nome1@nome1.com",
    senha: "nome1",
  },
  {
    id: 2,
    nome: "nome2",
    sobrenome:"sobrenome",
    data_nascimento:new Date(),
    login: "nome2@nome2.com",
    senha: "nome2",
  },
  {
    id: 3,
    nome: "nome3",
    sobrenome:"sobrenome",
    data_nascimento:new Date(),
    login: "nome3@nome4.com",
    senha: "nome3",
  },
];


export function ListarUsuarios() {


  
  return USUARIO_MOCK;
}


export function AdicionarUsuario({ nome, login, senha }) {
  const proximoID = USUARIO_MOCK.findLast().id + 1;

  USUARIO_MOCK.push({
    id: proximoID,
    nome: nome,
    login: login,
    senha: senha,
  });
}

export function SelecionarUsuarioPorLogin(login) {
  for (const usuario of USUARIO_MOCK) {
    if (usuario.login === login) return usuario;
  }
}

export function SelecionarUsuarioPorId(id) {
  for (const usuario of USUARIO_MOCK) {
    if (usuario.id === id) return usuario;
  }
}

export function ChecarUsuario(login) {
  for (const usuario of USUARIO_MOCK) {
    if (usuario.login === login) return true;
  }
  return false;
}

export function ChecarSenha(login, senha) {
  const usuario = SelecionarUsuarioPorLogin(login);

  if (usuario.senha == senha) return true;
  else return false;
}
