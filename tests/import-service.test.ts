import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { importTracks } from '../src/modules/imports/import-service.js';

describe('importTracks', () => {
  it('keeps valid tracks and reports invalid values and duplicates', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'spotify-import-'));
    const file = join(dir, 'tracks.json');
    await writeFile(file, JSON.stringify({ operation: 'add', playlistId: 'p1', tracks: ['spotify:track:a1', { uri: 'https://open.spotify.com/track/b2' }, 'spotify:album:no'] }));
    await expect(importTracks(file)).resolves.toMatchObject({ operation: 'add', playlistId: 'p1', validUris: ['spotify:track:a1', 'spotify:track:b2'], invalid: ['spotify:album:no'] });
  });
});
