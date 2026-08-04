# Arquitetura

## 1. Stack

- Node.js 22 ou superior;
- TypeScript;
- Fastify para callback OAuth e contratos HTTP locais;
- `@inquirer/prompts` para CLI;
- `open` para abrir o navegador;
- Zod para validação;
- `fetch` nativo ou Axios;
- Pino para logs;
- Vitest para testes;
- ESLint e Prettier.

## 2. Arquitetura em camadas

```text
CLI
  ↓
Application Services
  ↓
Spotify Client
  ↓
Spotify Web API
```

O módulo de exportação também acessa o sistema de arquivos:

```text
Export Service
  ↓
JSON Formatter
  ↓
File System
```

## 3. Estrutura de pastas

```text
src/
├── cli/
│   ├── menu.ts
│   ├── prompts.ts
│   └── commands/
├── config/
│   ├── env.ts
│   └── spotify.ts
├── modules/
│   ├── auth/
│   ├── playlists/
│   ├── exports/
│   └── imports/
├── shared/
│   ├── errors/
│   ├── spotify/
│   └── utils/
├── storage/
│   └── tokens/
├── app.ts
└── server.ts

exports/
├── playlists/
└── playlist-items/

imports/
├── add/
└── remove/
```

## 4. Responsabilidades

### CLI

- apresentar menus;
- coletar entradas;
- exibir prévias;
- solicitar confirmação;
- apresentar resultados.

### Auth Service

- gerar URL de autorização;
- trocar código por token;
- armazenar tokens;
- renovar access token.

### Playlist Service

- listar playlists;
- consultar itens;
- criar playlist;
- adicionar músicas;
- remover músicas.

### Export Service

- montar objetos de exportação;
- gerar nomes de arquivos;
- escrever JSON.

### Import Service

- ler arquivos JSON;
- validar schemas;
- normalizar URIs;
- identificar duplicidades e entradas inválidas.

### Spotify Client

- incluir token nas requisições;
- renovar token quando necessário;
- tratar paginação;
- tratar rate limit;
- mapear erros da API.
