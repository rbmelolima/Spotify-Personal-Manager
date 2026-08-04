# Interface CLI

## 1. Menu principal

```text
Spotify Playlist Manager

1. Autenticar no Spotify
2. Listar playlists
3. Exportar todas as playlists para JSON
4. Exportar músicas de uma playlist para JSON
5. Criar playlist
6. Atualizar playlist
0. Sair
```

## 2. Atualizar playlist

```text
Selecione a operação:

1. Adicionar músicas
2. Remover músicas
0. Voltar
```

## 3. Seleção de playlist

A CLI deverá carregar todas as playlists modificáveis pelo usuário.

```text
Selecione uma playlist:

1. Academia
2. Rock Nacional
3. Trabalho
4. Viagem
```

Para listas grandes, permitir:

- pesquisa por nome;
- paginação;
- cancelamento.

## 4. Feedback de processamento

Exemplo:

```text
Carregando playlists...
Playlists encontradas: 42
```

Exemplo de operação em lotes:

```text
Processando lote 1 de 3...
Processando lote 2 de 3...
Processando lote 3 de 3...
```

## 5. Confirmações

Toda operação destrutiva deverá exigir confirmação.

```text
Serão removidas 25 músicas da playlist "Academia".
Deseja continuar? (s/n)
```

A adição também deve apresentar prévia antes da execução.

## 6. Comandos diretos

```bash
npm run spotify -- export:playlists
npm run spotify -- export:playlist-items --playlist-id ID
npm run spotify -- playlist:create
npm run spotify -- playlist:add --playlist-id ID --file arquivo.json
npm run spotify -- playlist:remove --playlist-id ID --file arquivo.json
```

## 7. Regras de UX

- não ocultar falhas parciais;
- apresentar quantidades antes e depois da operação;
- permitir cancelamento antes de qualquer alteração;
- não solicitar IDs quando uma seleção por nome for possível;
- mostrar caminho absoluto ou relativo do arquivo gerado;
- não exibir tokens ou secrets.
