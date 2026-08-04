# Exportação de músicas de uma playlist em JSON

## 1. Objetivo

Exportar os metadados de todas as músicas de uma playlist, sem áudio.

## 2. Comando

```bash
npm run spotify -- export:playlist-items --playlist-id PLAYLIST_ID
```

## 3. Nome do arquivo

```text
{nome-da-playlist}-YYYY-MM-DD-HHmmss.json
```

## 4. Estrutura

```json
{
  "schemaVersion": "1.0",
  "exportType": "playlist-items",
  "exportedAt": "2026-08-04T10:55:00.000Z",
  "playlist": {
    "id": "playlist-id",
    "uri": "spotify:playlist:playlist-id",
    "name": "Academia",
    "description": "Músicas para academia",
    "public": false,
    "collaborative": false,
    "snapshotId": "snapshot-id",
    "spotifyUrl": "https://open.spotify.com/playlist/playlist-id"
  },
  "summary": {
    "totalItems": 1,
    "exportedTracks": 1,
    "ignoredEpisodes": 0,
    "unavailableItems": 0,
    "localTracks": 0
  },
  "items": [
    {
      "position": 0,
      "addedAt": "2025-12-10T14:30:00Z",
      "addedBy": {
        "id": "spotify-user-id",
        "displayName": null
      },
      "track": {
        "id": "track-id",
        "uri": "spotify:track:track-id",
        "name": "Numb",
        "artists": [
          {
            "id": "artist-id",
            "name": "Linkin Park",
            "uri": "spotify:artist:artist-id",
            "spotifyUrl": "https://open.spotify.com/artist/artist-id"
          }
        ],
        "album": {
          "id": "album-id",
          "name": "Meteora",
          "uri": "spotify:album:album-id",
          "releaseDate": "2003-03-24",
          "spotifyUrl": "https://open.spotify.com/album/album-id"
        },
        "durationMs": 185586,
        "explicit": false,
        "isLocal": false,
        "isPlayable": true,
        "spotifyUrl": "https://open.spotify.com/track/track-id"
      }
    }
  ]
}
```

## 5. Casos especiais

### Item indisponível

Preservar a posição e usar `track: null`.

### Arquivo local

Usar `id`, `uri` e URLs como `null` quando não existirem.

### Podcast

Ignorar episódios no MVP e contabilizá-los em `ignoredEpisodes`.

## 6. Regras

- preservar posição original;
- processar todas as páginas;
- incluir artistas, álbum, duração e URI;
- não interromper por item indisponível;
- escrever JSON UTF-8 com indentação de dois espaços.

## 7. Critérios de aceite

- não contém áudio;
- exporta todas as músicas;
- JSON válido;
- posições preservadas;
- metadados completos quando disponíveis;
- casos especiais contabilizados.
