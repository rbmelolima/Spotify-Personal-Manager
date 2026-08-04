# Exportação de playlists em JSON

## Comando

```bash
npm run spotify -- export:playlists
```

## Formato enxuto

O arquivo contém apenas os dados necessários para identificar cada playlist e conferir sua quantidade de músicas:

```json
[
  {
    "id": "playlist-id",
    "name": "Academia",
    "totalItems": 145
  }
]
```

Ele é UTF-8, indentado com dois espaços e inclui todas as páginas de playlists retornadas pelo Spotify.
