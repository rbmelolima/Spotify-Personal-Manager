import { confirm, input, select } from '@inquirer/prompts';
import open from 'open';
import type { AuthService } from '../modules/auth/auth-service.js';
import type { TokenStore } from '../modules/auth/token-store.js';
import type { ExportService } from '../modules/exports/export-service.js';
import { importTracks } from '../modules/imports/import-service.js';
import type { PlaylistService } from '../modules/playlists/playlist-service.js';
import { normalizeTrackUri } from '../shared/utils/spotify-uri.js';
import { startCallbackServer } from '../server.js';

type Deps = { auth: AuthService; tokens: TokenStore; playlists: PlaylistService; exports: ExportService; port: number };
const args = process.argv.slice(2);
const flag = (name: string) => { const i = args.indexOf(name); return i < 0 ? undefined : args[i + 1]; };
const yes = () => args.includes('--yes');
async function allowed(message: string): Promise<boolean> { if (yes()) return true; if (!process.stdin.isTTY) throw new Error('Esta operação requer --yes em execução não interativa.'); return confirm({ message }); }
export async function runCli(deps: Deps): Promise<void> { const command = args[0]; if (!command) return menu(deps); if (command === 'auth:login') return login(deps); if (command === 'auth:status') { console.log((await deps.tokens.read()) ? 'Autenticado.' : 'Não autenticado.'); return; } if (command === 'auth:logout') { if (await allowed('Apagar credenciais locais?')) await deps.tokens.clear(); return; } if (command === 'export:playlists') { console.log(await deps.exports.playlistsToJson()); return; } if (command === 'export:playlist-items') { console.log(await deps.exports.playlistItemsToJson(required('--playlist-id'))); return; } if (command === 'playlist:create') { const name = flag('--name') ?? await input({ message: 'Nome da playlist:' }); if (await allowed(`Criar a playlist "${name}"?`)) console.log(await deps.playlists.create({ name, description: flag('--description'), public: args.includes('--public') })); return; } if (command === 'playlist:add' || command === 'playlist:remove') return mutate(deps, command === 'playlist:add' ? 'add' : 'remove'); throw new Error(`Comando desconhecido: ${command}`); }
function required(name: string): string { const value = flag(name); if (!value) throw new Error(`${name} é obrigatório.`); return value; }
async function mutate(deps: Deps, operation: 'add' | 'remove'): Promise<void> { const file = flag('--file'); const values = args.filter((a) => a.startsWith('spotify:track:') || a.startsWith('http')); const imported = file ? await importTracks(file) : { validUris: values.map(normalizeTrackUri), invalid: [], duplicates: 0 }; const playlistId = flag('--playlist-id') ?? (file ? imported.playlistId : undefined); if (!playlistId || !imported.validUris.length) throw new Error('Informe --playlist-id e ao menos uma música válida.'); console.log(`URIs válidas: ${imported.validUris.length}; inválidas: ${imported.invalid.length}; duplicadas: ${imported.duplicates}`); if (await allowed(`${operation === 'remove' ? 'Remover' : 'Adicionar'} ${imported.validUris.length} músicas?`)) console.log(operation === 'add' ? await deps.playlists.add({ playlistId, uris: imported.validUris, removeInputDuplicates: !args.includes('--keep-duplicates') }) : await deps.playlists.remove({ playlistId, uris: imported.validUris, removeAllOccurrences: true })); }
async function login(deps: Deps): Promise<void> { const state = deps.auth.state(); const server = await startCallbackServer(deps.port, deps.auth, state); await open(deps.auth.authorizationUrl(state)); try { await server.waitForCallback; console.log('Autenticação concluída.'); } finally { await server.close(); } }
async function menu(deps: Deps): Promise<void> {
  const action = await select({ message: 'Spotify Playlist Manager', choices: [
    { name: 'Autenticar no Spotify', value: 'login' }, { name: 'Listar playlists', value: 'list' },
    { name: 'Exportar todas as playlists', value: 'playlists' }, { name: 'Exportar músicas de uma playlist', value: 'items' },
    { name: 'Criar playlist', value: 'create' }, { name: 'Atualizar playlist', value: 'update' }, { name: 'Sair', value: 'exit' },
  ] });
  if (action === 'login') return login(deps);
  if (action === 'playlists') { console.log(await deps.exports.playlistsToJson()); return; }
  if (action === 'list') { console.table((await deps.playlists.listPlaylists()).map((p) => ({ name: p.name, id: p.id, items: p.totalItems }))); return; }
  if (action === 'items') { const playlist = await choosePlaylist(deps); if (playlist) console.log(await deps.exports.playlistItemsToJson(playlist)); return; }
  if (action === 'create') { const name = await input({ message: 'Nome da playlist:' }); const description = await input({ message: 'Descrição (opcional):' }); if (await confirm({ message: `Criar "${name}"?` })) console.log(await deps.playlists.create({ name, description })); return; }
  if (action === 'update') { const playlistId = await choosePlaylist(deps); if (!playlistId) return; const operation = await select({ message: 'Operação:', choices: [{ name: 'Adicionar músicas', value: 'add' }, { name: 'Remover músicas', value: 'remove' }] }); const values = (await input({ message: 'URIs ou URLs, separadas por vírgula:' })).split(',').map((x) => x.trim()).filter(Boolean); const valid = values.map(normalizeTrackUri); if (await confirm({ message: `${operation === 'add' ? 'Adicionar' : 'Remover'} ${valid.length} músicas?` })) console.log(operation === 'add' ? await deps.playlists.add({ playlistId, uris: valid, removeInputDuplicates: true }) : await deps.playlists.remove({ playlistId, uris: valid, removeAllOccurrences: true })); }
}
async function choosePlaylist(deps: Deps): Promise<string | undefined> { const term = (await input({ message: 'Buscar playlist por nome (vazio lista todas):' })).trim().toLocaleLowerCase(); const choices = (await deps.playlists.listPlaylists()).filter((p) => p.name.toLocaleLowerCase().includes(term)).slice(0, 50).map((p) => ({ name: `${p.name} (${p.totalItems} músicas)`, value: p.id })); if (!choices.length) { console.log('Nenhuma playlist encontrada.'); return undefined; } return select({ message: 'Selecione uma playlist:', choices }); }
