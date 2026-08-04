# Remoção de músicas em massa

## 1. Objetivo

Remover uma ou várias músicas de uma playlist em uma única operação do usuário.

## 2. Formas de seleção

- arquivo JSON;
- URLs ou URIs;
- seleção interativa das músicas existentes.

## 3. Seleção interativa

A CLI deverá suportar:

- pesquisa por música;
- pesquisa por artista;
- seleção múltipla;
- paginação;
- limpar seleção;
- selecionar resultados visíveis.

## 4. Confirmação

A remoção sempre exige confirmação explícita.

```text
Playlist: Academia
Músicas selecionadas: 25
Deseja continuar? (s/n)
```

## 5. Ocorrências duplicadas

Quando a mesma URI aparecer várias vezes, a CLI deverá permitir:

- remover todas as ocorrências;
- escolher ocorrências específicas;
- cancelar a remoção daquela música.

Padrão do MVP: remover todas as ocorrências da URI selecionada.

## 6. Música não encontrada

A ausência de uma URI não deverá cancelar as demais remoções.

O resultado deve informar:

```text
Músicas solicitadas: 25
Músicas removidas: 24
Músicas não encontradas: 1
```

## 7. Lotes e snapshot

- dividir itens em lotes aceitos pela API;
- utilizar o snapshot mais recente quando aplicável;
- atualizar o snapshot entre lotes quando necessário.

## 8. Serviço

```ts
interface RemovePlaylistItemsInput {
  playlistId: string;
  uris: string[];
  removeAllOccurrences: boolean;
  snapshotId?: string;
}
```

## 9. Critérios de aceite

- uma ou várias músicas removidas;
- JSON, URLs e URIs suportados;
- seleção interativa disponível;
- confirmação obrigatória;
- duplicidades tratadas explicitamente;
- itens ausentes não interrompem a operação;
- nenhuma música é adicionada.
