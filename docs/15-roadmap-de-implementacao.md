# Roadmap de implementação

## Fase 1 — Base do projeto

- inicializar Node.js e TypeScript;
- configurar lint e testes;
- validar variáveis de ambiente;
- criar CLI inicial;
- criar endpoint de saúde local.

## Fase 2 — Autenticação

- criar aplicativo no Spotify;
- configurar redirect URI;
- implementar Authorization Code Flow;
- persistir tokens;
- implementar renovação automática;
- exibir status de autenticação.

## Fase 3 — Consultas

- consultar usuário atual;
- listar playlists;
- selecionar playlist pela CLI;
- listar músicas;
- implementar paginação genérica.

## Fase 4 — Exportações

- definir modelos de exportação;
- exportar playlists em JSON;
- exportar músicas em JSON;
- tratar itens locais e indisponíveis;
- sanitizar nomes;
- salvar arquivos por categoria.

## Fase 5 — Criação

- criar playlist vazia;
- validar nome, descrição e visibilidade;
- apresentar URL criada;
- integrar com fluxo opcional de adição.

## Fase 6 — Importação JSON

- ler arquivo;
- validar schema;
- normalizar URIs;
- identificar inválidas;
- tratar duplicidades;
- apresentar prévia.

## Fase 7 — Atualização em massa

- adicionar músicas em lotes;
- remover músicas em lotes;
- tratar snapshots;
- implementar confirmação;
- tratar falhas parciais.

## Fase 8 — Qualidade

- padronizar erros;
- implementar rate limit e retry;
- adicionar logs;
- cobrir testes unitários e integração;
- documentar instalação e comandos.
