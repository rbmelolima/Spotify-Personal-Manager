# Spotify Playlist Manager — Especificações

## Visão geral

Aplicação pessoal em Node.js e TypeScript, com interface principal via CLI, integrada à Spotify Web API.

O sistema permite:

- autenticar uma conta Spotify;
- exportar playlists em JSON;
- exportar músicas de uma playlist em JSON;
- criar playlists;
- atualizar playlists adicionando músicas em massa;
- atualizar playlists removendo músicas em massa.

## Regras centrais

- A aplicação é destinada a um único usuário.
- A interface principal é uma CLI interativa.
- Um servidor HTTP local existe somente para receber o callback OAuth.
- Exportações usam exclusivamente `.json`.
- Atualizar playlist significa apenas adicionar ou remover músicas.
- Não existe substituição completa de conteúdo.
- Não existe troca direta de uma música por outra.
- Não existe reordenação no MVP.
- Não existe download de áudio.

## Arquivos

| Arquivo | Responsabilidade |
|---|---|
| `01-visao-geral-e-escopo.md` | Produto, objetivos, escopo e definição do MVP |
| `02-arquitetura.md` | Arquitetura, stack e estrutura de pastas |
| `03-interface-cli.md` | Experiência e fluxos da CLI |
| `04-autenticacao-spotify.md` | OAuth, tokens, scopes e callback local |
| `05-integracao-spotify-api.md` | Cliente HTTP, paginação, lotes e rate limit |
| `06-exportacao-playlists-json.md` | Exportação de todas as playlists |
| `07-exportacao-musicas-json.md` | Exportação das músicas de uma playlist |
| `08-criacao-playlist.md` | Criação de playlists |
| `09-adicao-musicas-em-massa.md` | Inclusão em massa de músicas |
| `10-remocao-musicas-em-massa.md` | Remoção em massa de músicas |
| `11-importacao-arquivos-json.md` | Estrutura e validação dos arquivos de entrada |
| `12-modelos-e-schemas.md` | Interfaces TypeScript e schemas Zod |
| `13-erros-e-logs.md` | Tratamento de erros e observabilidade |
| `14-testes-e-criterios-de-aceite.md` | Estratégia de testes e critérios finais |
| `15-roadmap-de-implementacao.md` | Ordem recomendada de desenvolvimento |

## Execução esperada

```bash
npm install
npm run dev
```

Comandos diretos também poderão ser suportados:

```bash
npm run spotify -- export:playlists
npm run spotify -- export:playlist-items --playlist-id PLAYLIST_ID
npm run spotify -- playlist:add --playlist-id PLAYLIST_ID --file arquivo.json
npm run spotify -- playlist:remove --playlist-id PLAYLIST_ID --file arquivo.json
```
