import { randomBytes } from 'node:crypto';
import { AppError } from '../../shared/errors/app-error.js';
import type { Config } from '../../config/env.js';
import { TokenStore } from './token-store.js';
import type { SpotifyToken } from './types.js';

type TokenResponse = { access_token: string; refresh_token?: string; expires_in: number; scope?: string };
export class AuthService {
  constructor(private readonly config: Config, private readonly store: TokenStore, private readonly request: typeof fetch = fetch) {}
  authorizationUrl(state: string): string { const u = new URL('https://accounts.spotify.com/authorize'); u.search = new URLSearchParams({ response_type: 'code', client_id: this.config.SPOTIFY_CLIENT_ID, redirect_uri: this.config.SPOTIFY_REDIRECT_URI, scope: this.config.scopes.join(' '), state }).toString(); return u.toString(); }
  state(): string { return randomBytes(24).toString('hex'); }
  async exchangeCode(code: string): Promise<SpotifyToken> { return this.requestToken(new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: this.config.SPOTIFY_REDIRECT_URI })); }
  async accessToken(): Promise<string> { const token = await this.store.read(); if (!token) throw new AppError('SPOTIFY_NOT_AUTHENTICATED', 'Autentique-se no Spotify antes de continuar.', null, 401); if (Date.parse(token.expiresAt) - Date.now() < 60_000) return (await this.refresh(token)).accessToken; return token.accessToken; }
  async refresh(previous: SpotifyToken): Promise<SpotifyToken> { return this.requestToken(new URLSearchParams({ grant_type: 'refresh_token', refresh_token: previous.refreshToken }), previous); }
  private async requestToken(body: URLSearchParams, previous?: SpotifyToken): Promise<SpotifyToken> { const credentials = Buffer.from(`${this.config.SPOTIFY_CLIENT_ID}:${this.config.SPOTIFY_CLIENT_SECRET}`).toString('base64'); const response = await this.request('https://accounts.spotify.com/api/token', { method: 'POST', headers: { Authorization: `Basic ${credentials}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body }); if (!response.ok) throw new AppError('SPOTIFY_TOKEN_EXPIRED', 'Não foi possível obter ou renovar o token do Spotify.', undefined, response.status); const data = (await response.json()) as TokenResponse; const token = { accessToken: data.access_token, refreshToken: data.refresh_token ?? previous?.refreshToken ?? '', expiresAt: new Date(Date.now() + data.expires_in * 1000).toISOString(), scope: (data.scope ?? previous?.scope.join(' ') ?? '').split(' ').filter(Boolean) }; await this.store.write(token); return token; }
}
