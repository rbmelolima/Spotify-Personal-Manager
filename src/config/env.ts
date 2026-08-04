import 'dotenv/config';
import { resolve } from 'node:path';
import { z } from 'zod';

const schema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  SPOTIFY_CLIENT_ID: z.string().min(1, 'SPOTIFY_CLIENT_ID é obrigatório.'),
  SPOTIFY_CLIENT_SECRET: z.string().min(1, 'SPOTIFY_CLIENT_SECRET é obrigatório.'),
  SPOTIFY_REDIRECT_URI: z.url().default('http://127.0.0.1:3000/auth/spotify/callback'),
  SPOTIFY_SCOPES: z.string().default('playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private'),
  TOKEN_STORAGE_PATH: z.string().default('./storage/tokens/spotify-token.json'),
  EXPORT_DIRECTORY: z.string().default('./exports'),
  SPOTIFY_MAX_RETRIES: z.coerce.number().int().min(0).default(3),
});

export type Config = ReturnType<typeof loadConfig>;
export function loadConfig() {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) throw new Error(`Configuração inválida: ${parsed.error.issues.map((x) => x.message).join(' ')}`);
  return { ...parsed.data, TOKEN_STORAGE_PATH: resolve(parsed.data.TOKEN_STORAGE_PATH), EXPORT_DIRECTORY: resolve(parsed.data.EXPORT_DIRECTORY), scopes: parsed.data.SPOTIFY_SCOPES.split(/\s+/).filter(Boolean) };
}
