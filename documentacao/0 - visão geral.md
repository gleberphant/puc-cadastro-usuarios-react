# Visão geral

## Objetivo

O projeto é uma aplicação de cadastro e consulta de usuários desenvolvida para a atividade somativa do curso de Análise e Desenvolvimento de Sistemas da PUCPR. O frontend foi desenvolvido com React e Vite, utiliza Firebase Authentication para autenticação por e-mail e senha e Cloud Firestore para persistência dos dados.

Além da execução no navegador, o frontend compilado é incorporado a uma aplicação desktop Wails, desenvolvida em Go.

## Tecnologias

- React 19 e React DOM.
- React Router DOM 7, usando `HashRouter`.
- Vite 7 para desenvolvimento e build do frontend.
- Firebase SDK 12, com Authentication e Firestore.
- Go e Wails v2 para o empacotamento desktop.

## Organização

O código web está em `app-react/`. As páginas ficam em `app-react/src/paginas/`, os componentes reutilizáveis em `componentes/`, o contexto de autenticação em `contextos/`, os serviços em `servicos/` e a configuração do Firebase em `repositorios/`.

Os documentos desta pasta detalham, respectivamente, a funcionalidade, os controles de segurança, o backend e a infraestrutura do projeto.

## Estado da implementação

O sistema possui login, cadastro, consulta de usuários, menu de perfil, logout e página Sobre. O cadastro cria a conta no Authentication e grava um documento na coleção `usuarios`, usando o UID do Authentication como ID do documento.

Há duas diferenças em relação ao enunciado original: a interface chama o e-mail de “Login” e o UID não é gravado como campo dentro do documento, embora esteja presente no ID do documento. Essas decisões devem ser consideradas ao avaliar ou evoluir o sistema.
