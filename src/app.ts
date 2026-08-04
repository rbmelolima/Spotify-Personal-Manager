import pino from 'pino';
import { loadConfig } from './config/env.js';
import { AuthService } from './modules/auth/auth-service.js';
import { TokenStore } from './modules/auth/token-store.js';
import { ExportService } from './modules/exports/export-service.js';
import { PlaylistService } from './modules/playlists/playlist-service.js';
import { runCli } from './cli/run.js';
import { asAppError } from './shared/errors/app-error.js';
import { SpotifyClient } from './shared/spotify/client.js';

const logger = pino({ level: process.env.LOG_LEVEL ?? 'info', redact: ['accessToken', 'refreshToken', 'SPOTIFY_CLIENT_SECRET', 'authorization'] });
async function main() { const config = loadConfig(); const tokens = new TokenStore(config.TOKEN_STORAGE_PATH); const auth = new AuthService(config, tokens); const client = new SpotifyClient(auth, config.SPOTIFY_MAX_RETRIES); const playlists = new PlaylistService(client); await runCli({ auth, tokens, playlists, exports: new ExportService(playlists, config.EXPORT_DIRECTORY), port: config.PORT }); }
main().catch((error) => { const appError = asAppError(error); logger.error({ code: appError.code, details: appError.details }, appError.message); process.exitCode = 1; });
