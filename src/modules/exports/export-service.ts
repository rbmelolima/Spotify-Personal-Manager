import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { timestampForFile } from '../../shared/utils/files.js';
import type { PlaylistService } from '../playlists/playlist-service.js';

export class ExportService {
  constructor(private readonly playlists: PlaylistService, private readonly outputDirectory: string) {}
  async playlistsToJson(): Promise<string> { const playlists = await this.playlists.listPlaylists(); const body = playlists.map(({ id, name, totalItems }) => ({ id, name, totalItems })); return this.write('playlists', `spotify-playlists-${timestampForFile()}.json`, body); }
  async playlistItemsToJson(playlistId: string): Promise<string> { const [playlist, items] = await Promise.all([this.playlists.getPlaylist(playlistId), this.playlists.listItems(playlistId)]); const tracks = items.map((item) => item.item ?? item.track).filter((item) => item?.type !== 'episode' && typeof item?.uri === 'string').map((item) => ({ name: item.name, artist: (item.artists ?? []).map((artist: any) => artist.name).join(', '), uri: item.uri })); return this.write('playlist-items', `${playlistId}-${timestampForFile()}.json`, { playlistName: playlist.name, tracks }); }
  private async write(category: string, name: string, value: unknown): Promise<string> { const dir = join(this.outputDirectory, category); await mkdir(dir, { recursive: true }); const path = join(dir, name); await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8'); return path; }
}
