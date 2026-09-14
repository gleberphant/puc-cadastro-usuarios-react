# Funcionalidades

## Rotas e navegação

As rotas são declaradas em `app-react/src/App.jsx`, em arquivo separado dos componentes de página. O roteamento usa `HashRouter`, adequado ao hosting estático e ao frontend incorporado pelo Wails.

| Caminho     | Acesso  | Função                                   |
| ----------- | ------- | ---------------------------------------- |
| `/login`    | Público | Autenticação do usuário                  |
| `/`         | Privado | Página principal com a lista de usuários |
| `/cadastro` | Privado | Cadastro de novo usuário                 |
| `/sobre`    | Privado | Informações sobre o projeto              |

As páginas privadas são envolvidas por `AutenticacaoMiddleware` e, em seguida, por `Layout`. O layout fornece a barra de navegação, o menu de perfil, o logout e o rodapé.

## Cadastro

O formulário de cadastro apresenta cinco campos:

- Login, utilizado como e-mail no Firebase Authentication.
- Senha.
- Nome.
- Sobrenome.
- Data de nascimento.

Ao enviar o formulário, `AdicionarUsuario` chama `createUserWithEmailAndPassword`. Depois da criação, o documento é gravado na coleção `usuarios` com ID igual ao UID retornado pelo Firebase. Em caso de sucesso, o formulário é limpo e uma mensagem é exibida; em caso de falha, a aplicação informa o erro por `alert`.

O documento salvo contém `nome`, `sobrenome`, `login`, `senha` e `data_nascimento`. O UID fica disponível como ID do documento, mas não como atributo interno.

## Login e logout

Na página de login, o usuário informa login/e-mail e senha. O contexto `ProvedorAutenticacao` executa `signInWithEmailAndPassword`. Credenciais inválidas são convertidas para a mensagem `Credenciais Inválidas` e apresentadas em um `alert`.

Quando o Firebase confirma o usuário, o contexto busca o documento correspondente pelo UID. A página de login observa `usuarioLogado` e redireciona para `/` após a autenticação. O botão `SAIR` chama `signOut`, removendo a sessão do Firebase.

## Página principal

`PageHome` renderiza `ListaDeUsuarios`, que consulta a coleção `usuarios` e apresenta login, nome, sobrenome e data de nascimento em uma tabela. O menu Perfil apresenta os dados do usuário autenticado.

## Estados e limitações atuais

- Enquanto o Firebase recupera a sessão, o middleware exibe `Verificando autenticação`.
- Os formulários não possuem validação visual detalhada nem atributos `required`.
- A aplicação usa `alert` para sucesso e erro, em vez de mensagens persistentes na página.
- A página principal lista todos os usuários; isso deve ser restringido caso a aplicação seja usada com dados reais.
