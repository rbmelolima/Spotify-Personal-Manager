import { AppError } from '../errors/app-error.js';
import type { AuthService } from '../../modules/auth/auth-service.js';

export interface SpotifyPage<T> { items: T[]; next: string | null; total: number; limit: number; offset: number }
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class SpotifyClient {
  constructor(private readonly auth: AuthService, private readonly maxRetries: number, private readonly request: typeof fetch = fetch) {}
  async fetch<T>(path: string, init: RequestInit = {}): Promise<T> {
    const url = path.startsWith('http') ? path : `https://api.spotify.com/v1${path}`;
    for (let attempt = 0; ; attempt += 1) {
      const token = await this.auth.accessToken();
      const response = await this.request(url, { ...init, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...init.headers } });
      if (response.status === 429 && attempt < this.maxRetries) { await wait((Number(response.headers.get('retry-after')) || 1) * 1000); continue; }
      if (response.status >= 500 && attempt < this.maxRetries) { await wait(250 * (attempt + 1)); continue; }
      if (!response.ok) throw await this.toError(response);
      return response.status === 204 ? (undefined as T) : (await response.json()) as T;
    }
  }
  async fetchAllPages<T>(initialPath: string): Promise<T[]> { const all: T[] = []; let next: string | null = initialPath; while (next) { const page: SpotifyPage<T> = await this.fetch<SpotifyPage<T>>(next); all.push(...page.items); next = page.next; } return all; }
  private async toError(response: Response): Promise<AppError> { const code = response.status === 401 ? 'SPOTIFY_NOT_AUTHENTICATED' : response.status === 403 ? 'PLAYLIST_FORBIDDEN' : response.status === 404 ? 'PLAYLIST_NOT_FOUND' : response.status === 429 ? 'SPOTIFY_RATE_LIMIT' : 'SPOTIFY_API_ERROR'; const details = await response.json().catch(() => null); return new AppError(code, `A API do Spotify respondeu com erro (${response.status}).`, details, response.status); }
}
