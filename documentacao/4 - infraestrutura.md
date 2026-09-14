# Infraestrutura e operação

## Estrutura de execução

O repositório possui dois alvos:

1. **Web:** o Vite gera os arquivos em `app-react/dist`.
2. **Desktop:** o Wails incorpora `app-react/dist` no binário Go por meio de `//go:embed all:app-react/dist` em `main.go`.

O `firebase.json` configura o Firebase Hosting para publicar `app-react/dist`. O rewrite direciona as requisições para `index.html`; o uso de `HashRouter` mantém as rotas funcionando em hospedagem estática.

## Pré-requisitos

- Node.js e npm compatíveis com as versões declaradas no ambiente do projeto.
- Go instalado para o alvo desktop.
- Wails CLI v2 para desenvolvimento e empacotamento desktop.
- Firebase CLI autenticado para publicar no Firebase Hosting e atualizar regras.

## Desenvolvimento do frontend

```bash
cd app-react
npm install
npm run dev
```

O Vite inicia o servidor de desenvolvimento e oferece atualização rápida dos arquivos React.

## Build web

```bash
cd app-react
npm run build
```

O resultado é criado em `app-react/dist`. Uma prévia local do build pode ser executada com:

```bash
npm run preview
```

## Desenvolvimento e build Wails

Na raiz do repositório:

```bash
wails dev
wails build
```

O `wails.json` automatiza `npm install`, `npm run build` e o servidor Vite durante o ciclo de desenvolvimento. O binário final é gerado no diretório `build/`.

## Deploy no Firebase Hosting

Depois de gerar o build web e conferir o projeto Firebase selecionado:

```bash
firebase login
firebase use pucpr-as2-web
firebase deploy --only hosting
```

Para publicar também as regras e os índices do Firestore:

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

O repositório contém a configuração de hosting, mas não há neste código um registro verificável de URL pública ou de um deploy concluído. A URL deve ser registrada após a publicação e validação do ambiente.

## Entrega

Para gerar um ZIP sem dependências instaladas, exclua `node_modules`, arquivos de log e artefatos que não façam parte da entrega. O `package.json` permanece no arquivo para que as dependências possam ser recriadas com `npm install`.
