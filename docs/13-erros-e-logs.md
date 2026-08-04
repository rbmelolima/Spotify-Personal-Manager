# Erros e logs

## 1. Estrutura de erro

```json
{
  "code": "PLAYLIST_NOT_FOUND",
  "message": "A playlist informada não foi encontrada.",
  "details": null
}
```

## 2. Erros previstos

- `SPOTIFY_NOT_AUTHENTICATED`;
- `SPOTIFY_TOKEN_EXPIRED`;
- `INVALID_PLAYLIST_ID`;
- `PLAYLIST_NOT_FOUND`;
- `PLAYLIST_FORBIDDEN`;
- `INVALID_SPOTIFY_URI`;
- `INVALID_IMPORT_FILE`;
- `SPOTIFY_RATE_LIMIT`;
- `EXPORT_FAILED`;
- `PARTIAL_OPERATION_FAILURE`.

## 3. Falhas parciais

O sistema deverá informar:

- quantidade solicitada;
- quantidade processada;
- quantidade que falhou;
- lote que falhou;
- causa conhecida;
- possibilidade de repetir os itens restantes.

## 4. Logs

Exemplos:

```text
INFO Spotify authentication completed
INFO Fetching playlists page offset=0
INFO Playlist export completed total=84
INFO Adding playlist items batch=1 size=100
WARN Spotify rate limit reached retryAfter=4
ERROR Failed to refresh Spotify token
```

## 5. Dados proibidos em logs

- access token;
- refresh token;
- client secret;
- authorization code;
- conteúdo integral do `.env`.

## 6. Saída para o usuário

Mensagens devem ser claras e acionáveis.

Evitar apenas:

```text
Erro 400
```

Preferir:

```text
A URI informada não representa uma música do Spotify:
spotify:album:...
```
