# Testes e critérios de aceite

## 1. Testes unitários

- sanitização de nomes de arquivos;
- normalização de URL para URI;
- validação de URI;
- leitura e parse de JSON;
- schemas Zod;
- remoção de duplicidades;
- divisão em lotes;
- formatação de exportação;
- expiração de token;
- mapeamento de itens indisponíveis;
- preservação de posição.

## 2. Testes de integração

- callback OAuth;
- troca de código por token;
- refresh token;
- listagem paginada de playlists;
- listagem paginada de músicas;
- criação de playlist;
- adição em vários lotes;
- remoção em vários lotes;
- rate limit HTTP 429;
- falha parcial.

## 3. Cenários manuais

- playlist pública;
- playlist privada;
- playlist colaborativa;
- playlist vazia;
- mais de 50 playlists;
- playlist com mais de 50 músicas;
- atualização com mais de 100 músicas;
- música local;
- item removido do Spotify;
- JSON inválido;
- URI inválida;
- música repetida;
- música ausente na remoção;
- token expirado.

## 4. Aceite geral

- CLI executa os fluxos principais;
- exportações são JSON válidos;
- paginação é integral;
- adição não remove itens;
- remoção não adiciona itens;
- não existe substituição completa;
- confirmação antecede remoção;
- falhas parciais são informadas;
- tokens não são versionados nem exibidos.
