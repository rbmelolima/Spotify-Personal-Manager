# Adição de músicas em massa

## 1. Objetivo

Adicionar uma ou várias músicas a uma playlist em uma única operação do usuário.

## 2. Fontes de entrada

- arquivo JSON;
- múltiplas URLs ou URIs informadas manualmente;
- argumentos repetidos na linha de comando.

## 3. Fluxo

1. selecionar a playlist;
2. selecionar a origem das músicas;
3. ler e validar entradas;
4. normalizar URLs para URIs;
5. identificar inválidas e duplicadas;
6. exibir prévia;
7. solicitar confirmação;
8. dividir em lotes;
9. enviar ao Spotify;
10. exibir resultado.

## 4. Prévia

```text
Playlist: Academia
Músicas encontradas: 120
URIs válidas: 118
URIs inválidas: 2
Duplicadas na entrada: 4
```

## 5. Duplicidades

A CLI deverá permitir:

- manter repetições;
- adicionar apenas uma ocorrência de cada URI.

Padrão recomendado: remover duplicidades da entrada atual.

Não é obrigatório consultar se a música já existe na playlist.

## 6. Lotes

As URIs deverão ser processadas em lotes aceitos pela API.

A ordem da entrada deverá ser preservada.

## 7. Falha parcial

```text
Músicas solicitadas: 235
Músicas adicionadas: 200
Músicas não adicionadas: 35
Falha no lote: 3
```

## 8. Serviço

```ts
interface AddPlaylistItemsInput {
  playlistId: string;
  uris: string[];
  removeInputDuplicates: boolean;
}
```

## 9. Critérios de aceite

- uma ou centenas de músicas aceitas;
- URLs e URIs suportadas;
- JSON suportado;
- entradas inválidas não anulam as válidas;
- ordem preservada;
- lotes processados;
- nenhuma música existente removida;
- resultado detalhado exibido.
