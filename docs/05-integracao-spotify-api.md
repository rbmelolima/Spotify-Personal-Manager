# Integração com Spotify Web API

## 1. Base URL

```text
https://api.spotify.com/v1
```

## 2. Autorização

```http
Authorization: Bearer ACCESS_TOKEN
```

## 3. Operações utilizadas

- consultar perfil atual;
- listar playlists do usuário;
- consultar uma playlist;
- listar itens de uma playlist;
- criar playlist;
- atualizar metadados da playlist;
- adicionar itens;
- remover itens.

## 4. Paginação

O sistema deverá seguir a propriedade `next` até que seja `null`.

```ts
interface SpotifyPage<T> {
  items: T[];
  next: string | null;
  total: number;
  limit: number;
  offset: number;
}
```

Helper sugerido:

```ts
async function fetchAllPages<T>(initialUrl: string): Promise<T[]>;
```

## 5. Lotes

As operações de inclusão e remoção deverão ser divididas em lotes compatíveis com o limite da API.

Helper sugerido:

```ts
function chunk<T>(items: T[], size: number): T[][];
```

## 6. Rate limit

Ao receber HTTP 429:

1. ler `Retry-After`;
2. aguardar o período informado;
3. repetir a chamada;
4. limitar tentativas;
5. informar falha quando o limite for excedido.

```env
SPOTIFY_MAX_RETRIES=3
```

## 7. Falhas parciais

Em operações com vários lotes:

- registrar lotes concluídos;
- interromper ou continuar conforme o tipo de erro;
- retornar quantos itens foram processados;
- listar itens restantes ou lote que falhou.
