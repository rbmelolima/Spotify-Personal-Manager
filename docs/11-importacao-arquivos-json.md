# Importação de arquivos JSON

## 1. Objetivo

Usar arquivos JSON como entrada para adicionar ou remover músicas em massa.

## 2. Formato completo

```json
{
  "operation": "add",
  "playlistId": "playlist-id",
  "tracks": [
    {
      "uri": "spotify:track:track-id-1"
    },
    {
      "uri": "spotify:track:track-id-2"
    }
  ]
}
```

Para remoção:

```json
{
  "operation": "remove",
  "playlistId": "playlist-id",
  "tracks": [
    {
      "uri": "spotify:track:track-id-1"
    }
  ]
}
```

## 3. Formato simplificado

```json
{
  "tracks": [
    "spotify:track:track-id-1",
    "spotify:track:track-id-2"
  ]
}
```

Quando operação ou playlist não estiverem no arquivo, a CLI deverá solicitá-las.

## 4. Validação

1. verificar existência do arquivo;
2. ler como UTF-8;
3. executar `JSON.parse`;
4. validar estrutura com Zod;
5. normalizar objetos e strings;
6. validar URIs;
7. identificar duplicidades;
8. exibir prévia;
9. solicitar confirmação.

## 5. URLs

O importador também poderá aceitar URLs de faixa e convertê-las para URI.

Exemplo:

```text
https://open.spotify.com/track/TRACK_ID
```

Resultado:

```text
spotify:track:TRACK_ID
```

## 6. Erros

Exemplo:

```text
Não foi possível importar o arquivo.
Arquivo: ./imports/add/academia.json
Motivo: JSON inválido na linha 12, coluna 4.
```

## 7. Restrições

- aceitar somente faixas no MVP;
- não aceitar álbuns, artistas ou playlists como músicas;
- não executar nenhuma alteração antes da confirmação;
- não usar o arquivo completo de exportação como comando automático sem validação e seleção explícita da operação.
