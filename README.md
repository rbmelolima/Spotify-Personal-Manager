# Spotify Playlist Manager CLI

Uma ferramenta pessoal de linha de comando para consultar e gerenciar as playlists de uma única conta Spotify. Ela usa a Spotify Web API para exportar dados em JSON, criar playlists e adicionar ou remover faixas em massa — sem baixar ou reproduzir áudio.

## Funcionalidades

- Autenticação OAuth 2.0 no Spotify pelo navegador, com callback local seguro.
- Armazenamento local de tokens e renovação automática antes da expiração.
- Listagem de playlists acessíveis pela conta autenticada.
- Exportação de todas as playlists para JSON.
- Exportação dos itens de uma playlist para JSON, preservando a posição e registrando itens indisponíveis, faixas locais e episódios.
- Criação de playlists públicas ou privadas.
- Adição em massa de faixas por arquivo JSON, URL ou URI Spotify.
- Remoção em massa de faixas, com confirmação obrigatória.
- Paginação, processamento em lotes, retry para rate limit e relatório de falhas parciais.

## Requisitos

- Node.js 22 ou superior.
- Uma conta Spotify.
- Um aplicativo criado no [Spotify Developer Dashboard](https://developer.spotify.com/dashboard), com Client ID e Client Secret.

## Instalação e configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Copie o arquivo de exemplo de ambiente:

   ```bash
   cp .env.example .env
   ```

   No Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

3. No Spotify Developer Dashboard, cadastre a seguinte Redirect URI:

   ```text
   http://127.0.0.1:3000/auth/spotify/callback
   ```

4. Preencha `SPOTIFY_CLIENT_ID` e `SPOTIFY_CLIENT_SECRET` no `.env`.

5. Autentique a conta:

   ```bash
   npm run spotify -- auth:login
   ```

   O navegador será aberto para autorizar o aplicativo. Ao concluir, o token será salvo localmente no caminho configurado por `TOKEN_STORAGE_PATH`.

## Uso interativo

Execute sem subcomandos para abrir o menu:

```bash
npm run dev
```

O menu permite autenticar, listar e exportar playlists, exportar faixas, criar playlists e atualizar playlists por adição ou remoção de músicas.

## Comandos diretos

```bash
# Consultar a autenticação local
npm run spotify -- auth:status

# Apagar os tokens locais
npm run spotify -- auth:logout

# Exportar todas as playlists
npm run spotify -- export:playlists

# Exportar os itens de uma playlist
npm run spotify -- export:playlist-items --playlist-id PLAYLIST_ID

# Criar uma playlist privada
npm run spotify -- playlist:create --name "Rock Anos 2000" --description "Favoritas" --yes

# Criar uma playlist pública
npm run spotify -- playlist:create --name "Playlist pública" --public --yes

# Adicionar faixas de um arquivo JSON
npm run spotify -- playlist:add --playlist-id PLAYLIST_ID --file imports/add/academia.json --yes

# Adicionar URIs ou URLs diretamente
npm run spotify -- playlist:add --playlist-id PLAYLIST_ID spotify:track:TRACK_ID https://open.spotify.com/track/OUTRO_ID --yes

# Remover faixas
npm run spotify -- playlist:remove --playlist-id PLAYLIST_ID spotify:track:TRACK_ID --yes
```

As operações que modificam playlists pedem confirmação no terminal. Em scripts ou ambientes não interativos, use `--yes`; sem essa opção, a operação é interrompida por segurança.

## Arquivos de importação

O campo `tracks` aceita URIs, URLs de faixas ou objetos com `uri`.

```json
{
  "operation": "add",
  "playlistId": "PLAYLIST_ID",
  "tracks": [
    "spotify:track:TRACK_ID_1",
    { "uri": "https://open.spotify.com/track/TRACK_ID_2" }
  ]
}
```

`operation` e `playlistId` são opcionais no arquivo quando forem informados no comando ou escolhidos pela CLI. Álbuns, artistas e playlists não são aceitos como entrada de faixas.

## Saídas e segurança

- Exportações ficam em `exports/playlists` e `exports/playlist-items` por padrão.
- Os JSONs são UTF-8, indentados e incluem data, versão do schema e metadados disponíveis.
- Tokens, exports, imports e logs são ignorados pelo Git.
- Access token, refresh token, Client Secret e código OAuth nunca devem ser compartilhados ou versionados.

## Desenvolvimento

```bash
npm run build
npm test
npm run lint
npm run format:check
```

Os testes automatizados usam mocks e não exigem credenciais reais. Antes de usar em playlists importantes, valide o fluxo com uma conta e playlists de teste.
