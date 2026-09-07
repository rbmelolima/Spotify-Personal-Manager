import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ExportService } from '../src/modules/exports/export-service.js';

describe('ExportService', () => {
  it('exports tracks returned in the current item field', async () => {
    const outputDirectory = await mkdtemp(join(tmpdir(), 'spotify-export-'));
    const playlists = {
      getPlaylist: async () => ({ id: 'p1', name: 'Favorites' }),
      listItems: async () => [{
        added_at: '2026-07-23T17:45:53Z',
        added_by: { id: 'user-1', display_name: 'User' },
        item: {
          type: 'track', id: 'track-1', uri: 'spotify:track:track-1', name: 'Song',
          artists: [{ id: 'artist-1', name: 'Artist', uri: 'spotify:artist:artist-1' }],
          album: { id: 'album-1', name: 'Album', uri: 'spotify:album:album-1', release_date: '2026-01-01' },
          duration_ms: 123000, explicit: false, is_local: false, is_playable: true,
        },
      }],
    };
    const service = new ExportService(playlists as any, outputDirectory);

    const path = await service.playlistItemsToJson('p1');
    const exported = JSON.parse(await readFile(path, 'utf8'));

    expect(exported).toEqual({ playlistName: 'Favorites', tracks: [{ name: 'Song', artist: 'Artist', uri: 'spotify:track:track-1' }] });
  });
});
