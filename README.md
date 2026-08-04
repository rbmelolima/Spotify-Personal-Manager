# Spotify Playlist Manager CLI

CLI pessoal para autenticar no Spotify, exportar playlists em JSON, criar playlists e adicionar/remover faixas em massa.

## Configuração

1. Use Node.js 22 ou superior e instale as dependências com `npm install`.
2. Copie `.env.example` para `.env` e informe as credenciais do seu aplicativo Spotify.
3. Cadastre `http://127.0.0.1:3000/auth/spotify/callback` como Redirect URI no Spotify Developer Dashboard.
4. Execute `npm run dev -- auth:login` e conclua a autorização no navegador.

## Comandos

```bash
npm run spotify -- auth:status
npm run spotify -- export:playlists
npm run spotify -- export:playlist-items --playlist-id PLAYLIST_ID
npm run spotify -- playlist:create --name "Minha playlist" --yes
npm run spotify -- playlist:add --playlist-id PLAYLIST_ID --file imports/add.json --yes
npm run spotify -- playlist:remove --playlist-id PLAYLIST_ID spotify:track:TRACK_ID --yes
```

Sem subcomando, `npm run dev` abre o menu interativo. Operações de alteração exigem confirmação; fora de um terminal interativo, inclua `--yes`.

Arquivos de importação aceitam `tracks` como URIs/URLs ou objetos `{ "uri": "spotify:track:..." }`. Tokens e exportações são mantidos localmente e ignorados pelo Git.
