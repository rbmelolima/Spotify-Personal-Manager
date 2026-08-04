# Exportação de músicas de uma playlist em JSON

## Comando

```bash
npm run spotify -- export:playlist-items --playlist-id PLAYLIST_ID
```

## Formato enxuto

O arquivo inclui somente o nome da playlist e, para cada música, nome, artista e URI. Episódios, itens indisponíveis e itens sem URI são omitidos.

```json
{
  "playlistName": "Academia",
  "tracks": [
    {
      "name": "Numb",
      "artist": "Linkin Park",
      "uri": "spotify:track:track-id-1"
    }
  ]
}
```
