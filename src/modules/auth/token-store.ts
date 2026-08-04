import { mkdir, readFile, rm, writeFile, chmod } from 'node:fs/promises';
import { dirname } from 'node:path';
import { z } from 'zod';
import type { SpotifyToken } from './types.js';

const tokenSchema = z.object({ accessToken: z.string(), refreshToken: z.string(), expiresAt: z.string().datetime(), scope: z.array(z.string()) });
export class TokenStore {
  constructor(private readonly path: string) {}
  async read(): Promise<SpotifyToken | null> { try { return tokenSchema.parse(JSON.parse(await readFile(this.path, 'utf8'))); } catch (e: any) { if (e?.code === 'ENOENT') return null; throw e; } }
  async write(token: SpotifyToken): Promise<void> { await mkdir(dirname(this.path), { recursive: true }); await writeFile(this.path, `${JSON.stringify(token, null, 2)}\n`, 'utf8'); await chmod(this.path, 0o600).catch(() => undefined); }
  async clear(): Promise<void> { await rm(this.path, { force: true }); }
}
