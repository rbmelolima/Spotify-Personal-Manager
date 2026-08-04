# Autenticação Spotify

## 1. Fluxo

Utilizar OAuth 2.0 Authorization Code Flow.

Etapas:

1. usuário seleciona autenticação na CLI;
2. aplicação inicia servidor local;
3. aplicação abre a URL de autorização no navegador;
4. usuário autoriza o aplicativo;
5. Spotify redireciona para o callback local;
6. backend troca o código por tokens;
7. tokens são salvos localmente;
8. CLI informa sucesso.

## 2. Callback

```text
http://127.0.0.1:3000/auth/spotify/callback
```

## 3. Scopes

```text
playlist-read-private
playlist-read-collaborative
playlist-modify-public
playlist-modify-private
```

## 4. Variáveis de ambiente

```env
PORT=3000
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/auth/spotify/callback
SPOTIFY_SCOPES=playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private
TOKEN_STORAGE_PATH=./src/storage/tokens/spotify-token.json
EXPORT_DIRECTORY=./exports
```

## 5. Persistência

Estrutura sugerida:

```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "expiresAt": "2026-08-04T12:00:00.000Z",
  "scope": []
}
```

## 6. Renovação

Antes de cada chamada:

1. verificar `expiresAt`;
2. renovar quando faltarem menos de 60 segundos;
3. persistir o novo access token;
4. preservar o refresh token anterior quando não houver um novo.

## 7. Regras mínimas

- utilizar parâmetro `state`;
- manter `.env` e tokens no `.gitignore`;
- não registrar tokens em logs;
- restringir o servidor a `127.0.0.1`;
- permitir apagar credenciais locais pela CLI.
