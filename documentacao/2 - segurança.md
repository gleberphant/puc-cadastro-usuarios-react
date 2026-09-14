# Segurança

## Autenticação

O Firebase Authentication é inicializado em `app-react/src/repositorios/firebase.js` com `browserLocalPersistence`. Assim, a sessão pode permanecer ativa entre recarregamentos do navegador.

`ProvedorAutenticacao` registra `onAuthStateChanged` e mantém no contexto apenas os dados necessários à interface. `AutenticacaoMiddleware` impede o acesso às rotas privadas quando não existe usuário autenticado e redireciona para `/login`.

## Autorização do Firestore

O documento de cada usuário usa o UID como ID, o que permite uma futura regra baseada em `request.auth.uid`. Porém, a regra atualmente configurada em `firestore.rules` permite leitura e escrita para qualquer pessoa até **29/09/2026**:

```text
allow read, write: if request.time < timestamp.date(2026, 9, 29);
```

Essa configuração é adequada apenas para desenvolvimento inicial. Antes do vencimento, todas as operações deixarão de funcionar; antes de qualquer uso público, a regra deve ser substituída por uma política restritiva.

Exemplo de política mínima para permitir que cada usuário leia e altere apenas o próprio documento:

```text
match /usuarios/{uid} {
  allow read, write: if request.auth != null
                    && request.auth.uid == uid;
}
```

Como a página principal lista todos os usuários, esse comportamento precisará de uma regra específica e de uma decisão explícita sobre quais dados podem ser públicos.

## Dados sensíveis e riscos

- A senha é enviada ao Firebase Authentication, que deve ser o responsável pela autenticação.
- O objeto enviado ao Firestore também contém o campo `senha`. Isso expõe uma credencial sensível e deve ser corrigido: a senha nunca deve ser persistida no Firestore.
- As chaves de configuração do Firebase no frontend identificam o projeto, mas não substituem as regras de segurança. A proteção deve ser feita por Authentication, regras do Firestore e configuração dos domínios autorizados.
- O tratamento de erros registra detalhes no console. Em produção, deve-se evitar registrar credenciais, tokens ou informações pessoais.
- A configuração de `public/index.html` ainda contém referências de inicialização do Firebase Hosting com `useEmulator=true`; esse arquivo não é o entrypoint usado pelo build do Vite, mas deve ser revisado se for utilizado no deploy.

## Recomendações antes da produção

1. Remover `senha` do documento salvo.
2. Publicar regras do Firestore baseadas no UID autenticado.
3. Adicionar validação de formato, tamanho e obrigatoriedade dos campos.
4. Substituir `alert` e logs de desenvolvimento por tratamento controlado de erros.
5. Confirmar os domínios autorizados no Firebase Authentication e habilitar HTTPS no hosting.
