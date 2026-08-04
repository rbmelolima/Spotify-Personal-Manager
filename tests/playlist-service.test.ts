import { describe, expect, it } from 'vitest';
import { PlaylistService } from '../src/modules/playlists/playlist-service.js';

describe('PlaylistService', () => {
  it('uses the item total returned by the current Spotify playlist response', async () => {
    const client = {
      fetchAllPages: async () => [{
        id: 'playlist-1', name: 'Favorites', snapshot_id: 'snapshot-1', uri: 'spotify:playlist:playlist-1',
        items: { total: 42 }, owner: { id: 'user-1' },
      }],
    };
    const service = new PlaylistService(client as any);

    await expect(service.listPlaylists()).resolves.toMatchObject([{ id: 'playlist-1', totalItems: 42 }]);
  });

  it('creates a playlist through the current-user endpoint', async () => {
    const fetch = async (path: string, init: RequestInit) => {
      expect(path).toBe('/me/playlists');
      expect(init).toMatchObject({ method: 'POST' });
      expect(JSON.parse(init.body as string)).toEqual({
        name: 'New playlist',
        description: '',
        public: false,
        collaborative: false,
      });
      return {
        id: 'playlist-1',
        name: 'New playlist',
        collaborative: false,
        snapshot_id: 'snapshot-1',
        uri: 'spotify:playlist:playlist-1',
      };
    };
    const service = new PlaylistService({ fetch } as any);

    await expect(service.create({ name: '  New playlist  ' })).resolves.toMatchObject({
      id: 'playlist-1',
      name: 'New playlist',
    });
  });
});
