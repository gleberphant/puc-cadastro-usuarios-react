# Backend e persistência

## Serviços utilizados

O projeto não possui uma API HTTP própria. O frontend acessa diretamente os serviços do Firebase:

- **Firebase Authentication:** criação de contas e login por e-mail/senha.
- **Cloud Firestore:** armazenamento e consulta dos dados cadastrais.

A aplicação Go/Wails fornece o shell desktop e incorpora os arquivos estáticos do frontend; ela não implementa as operações de usuários.

## Inicialização do Firebase

`app-react/src/repositorios/firebase.js` inicializa o projeto Firebase uma única vez com `getApps()`/`initializeApp()`. Em seguida, cria:

- `db`, instância do Firestore;
- `auth`, instância do Authentication com persistência local no navegador.

O projeto configurado é `pucpr-as2-web`, na região do Firestore `southamerica-east1`.

## Modelo de dados

Os documentos são armazenados na coleção `usuarios`. O ID do documento é o UID retornado pelo Firebase Authentication.

| Campo             | Origem     | Tipo esperado                                     |
| ----------------- | ---------- | ------------------------------------------------- |
| `login`           | Formulário | string, usada como e-mail                         |
| `senha`           | Formulário | string, atualmente persistida e deve ser removida |
| `nome`            | Formulário | string                                            |
| `sobrenome`       | Formulário | string                                            |
| `data_nascimento` | Formulário | string no formato do input `date`                 |

O UID está no caminho `usuarios/{uid}` e não em um campo `uid` do documento.

## Operações implementadas

`servicos/usuarios.js` concentra o acesso ao Firestore:

- `AdicionarUsuario`: cria a conta no Authentication e grava o documento em `usuarios/{uid}`.
- `ListarUsuarios`: lê todos os documentos da coleção `usuarios`.
- `SelecionarUsuarioPorId`: busca um documento pelo UID.
- `SelecionarUsuarioPorLogin`: consulta por igualdade no campo `login`.
- `ChecarUsuario` e `ChecarSenha`: funções auxiliares legadas; o login atual é validado pelo Firebase Authentication.

O contexto de autenticação usa `SelecionarUsuarioPorId` depois da mudança de estado do Firebase para complementar os dados da sessão com nome e sobrenome.

## Configuração do Firestore

As regras ficam em `firestore.rules` e os índices em `firestore.indexes.json`. O arquivo `firebase.json` aponta o banco padrão, a região e esses arquivos. A regra atual é temporária e permissiva; consulte o documento de segurança antes de realizar um deploy público.

## Fluxo de cadastro

```text
Formulário React
  -> createUserWithEmailAndPassword
  -> UID do Authentication
  -> setDoc("usuarios/{UID}")
  -> consulta posterior pelo UID
```
