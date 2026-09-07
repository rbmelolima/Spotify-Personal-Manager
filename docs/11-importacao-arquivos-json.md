# Alterar playlists via JSON

Use um arquivo JSON para adicionar ou remover músicas sem procurar a playlist pelo nome. A alteração sempre usa o `playlistId` diretamente.

## 1. Descobrir o ID da playlist

Exporte a lista de playlists:

```bash
npm run spotify -- export:playlists
```

No arquivo gerado em `exports/playlists`, localize a playlist pelo `name` e copie o valor de `id`.

## 2. Criar o arquivo de alteração

Copie o modelo [`templates/playlist-automation.json`](templates/playlist-automation.json) para um local de sua escolha e preencha-o. Os campos obrigatórios são:

- `operation`: `add` para adicionar ou `remove` para remover;
- `playlistId`: ID copiado no passo anterior;
- `tracks`: lista de URIs, URLs ou objetos com `uri`.

Exemplo para adicionar músicas:

```json
{
  "operation": "add",
  "playlistId": "37i9dQZF1DXcBWIGoYBM5M",
  "tracks": [
    {
      "uri": "spotify:track:4uLU6hMCjMI75M1A2tKUQC"
    },
    {
      "uri": "https://open.spotify.com/track/7ouMYWpwJ422jRcDASZB7P"
    }
  ]
}
```

Para remover, mantenha o mesmo formato e troque somente `"operation": "remove"`.

## 3. Executar a alteração

Execute o arquivo com confirmação no terminal:

```bash
npm run spotify -- playlist:apply --file caminho/playlist-automation.json
```

Para automações e scripts não interativos, acrescente `--yes`:

```bash
npm run spotify -- playlist:apply --file caminho/playlist-automation.json --yes
```

A CLI mostra o ID de destino e a quantidade de URIs válidas antes de modificar a playlist. Arquivos com `operation` ou `playlistId` ausentes são recusados.

## 4. Reutilizar faixas de um export

O export de músicas contém `playlistName` e objetos com `name`, `artist` e `uri`. Para reutilizar essas faixas, crie um arquivo de automação com o `playlistId` de destino, uma `operation` e copie os objetos de `tracks` para ele. Apenas o campo `uri` de cada objeto é usado na alteração.

## Restrições

- Apenas URIs ou URLs de faixas são aceitas.
- Álbuns, artistas e playlists não são aceitos como entrada.
- URIs repetidas são removidas antes da adição ou remoção.
- A remoção remove todas as ocorrências da URI informada na playlist.
