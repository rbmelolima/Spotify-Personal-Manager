# Exportação de playlists em JSON

## 1. Objetivo

Exportar todas as playlists acessíveis ao usuário em um único arquivo JSON.

## 2. Comando

```bash
npm run spotify -- export:playlists
```

## 3. Nome do arquivo

```text
spotify-playlists-YYYY-MM-DD-HHmmss.json
```

## 4. Estrutura

```json
{
  "schemaVersion": "1.0",
  "exportType": "playlists",
  "exportedAt": "2026-08-04T10:53:00.000Z",
  "user": {
    "id": "spotify-user-id",
    "displayName": "Roger",
    "spotifyUrl": "https://open.spotify.com/user/spotify-user-id"
  },
  "total": 1,
  "playlists": [
    {
      "id": "playlist-id",
      "uri": "spotify:playlist:playlist-id",
      "name": "Academia",
      "description": "Músicas para academia",
      "public": false,
      "collaborative": false,
      "owner": {
        "id": "spotify-user-id",
        "displayName": "Roger"
      },
      "totalItems": 145,
      "snapshotId": "snapshot-id",
      "spotifyUrl": "https://open.spotify.com/playlist/playlist-id"
    }
  ]
}
```

## 5. Regras

- processar todas as páginas;
- preservar a ordem recebida;
- incluir playlists privadas e colaborativas quando autorizadas;
- usar string vazia para descrição inexistente;
- usar `null` para valores realmente ausentes;
- usar UTF-8;
- formatar com dois espaços;
- garantir compatibilidade com `JSON.parse`.

## 6. Resultado na CLI

```text
Playlists encontradas: 28
Arquivo criado:
./exports/playlists/spotify-playlists-2026-08-04-075300.json
```

## 7. Critérios de aceite

- extensão `.json`;
- JSON válido;
- todas as playlists exportadas;
- dados do usuário incluídos;
- `schemaVersion` presente;
- data da exportação presente;
- paginação integral.
