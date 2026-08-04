# Visão geral e escopo

## 1. Objetivo

Criar uma aplicação pessoal em Node.js e TypeScript para consultar e gerenciar playlists de uma única conta Spotify.

## 2. Funcionalidades

O sistema deverá permitir:

1. autenticar o usuário no Spotify;
2. exportar todas as playlists em JSON;
3. exportar todas as músicas de uma playlist em JSON;
4. criar uma playlist;
5. adicionar várias músicas a uma playlist;
6. remover várias músicas de uma playlist.

## 3. Definição de atualização

No projeto, atualizar uma playlist significa exclusivamente:

- adicionar músicas;
- remover músicas.

Não fazem parte do MVP:

- substituir todas as músicas;
- trocar diretamente uma música por outra;
- limpar uma playlist inteira;
- reordenar músicas;
- sincronizar automaticamente duas playlists.

## 4. Interface

A interação principal será feita por CLI.

Um servidor HTTP local será usado somente para:

- iniciar o fluxo OAuth;
- receber o callback do Spotify.

## 5. Exportações

Todas as exportações deverão utilizar JSON UTF-8.

Tipos:

- arquivo com todas as playlists;
- arquivo com todas as músicas de uma playlist.

## 6. Fora do escopo

- download de áudio;
- reprodução de músicas;
- frontend web;
- aplicativo mobile;
- gerenciamento de múltiplos usuários;
- banco de dados;
- upload de capa;
- publicação comercial.

## 7. Definição de pronto do MVP

O MVP estará concluído quando:

- a autenticação OAuth funcionar;
- o token for renovado automaticamente;
- todas as playlists puderem ser exportadas;
- todas as músicas de uma playlist puderem ser exportadas;
- uma playlist puder ser criada;
- músicas puderem ser adicionadas em massa;
- músicas puderem ser removidas em massa;
- arquivos JSON de entrada forem validados;
- paginação e lotes forem tratados;
- erros principais forem exibidos claramente.
