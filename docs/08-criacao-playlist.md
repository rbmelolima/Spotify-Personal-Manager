# Criação de playlist

## 1. Objetivo

Permitir criar uma playlist pública ou privada na conta autenticada.

## 2. Fluxo da CLI

```text
Nome da playlist: Rock Anos 2000
Descrição: Rock internacional dos anos 2000
Visibilidade:
1. Privada
2. Pública
```

A CLI poderá oferecer a inclusão de músicas logo após a criação, reutilizando o fluxo de adição em massa.

## 3. Entrada

```ts
interface CreatePlaylistInput {
  name: string;
  description?: string;
  public?: boolean;
  collaborative?: boolean;
}
```

## 4. Regras

- nome obrigatório;
- nome não pode conter apenas espaços;
- descrição opcional;
- playlist privada por padrão;
- colaborativa somente quando privada;
- playlist pode ser criada vazia;
- inclusão posterior usa a operação de adição em massa.

## 5. Resultado

```text
Playlist criada com sucesso.
Nome: Rock Anos 2000
Visibilidade: Privada
URL: https://open.spotify.com/playlist/...
```

## 6. Critérios de aceite

- playlist criada na conta correta;
- nome e descrição persistidos;
- visibilidade respeitada;
- URL apresentada;
- falha posterior ao adicionar músicas não desfaz a criação.
