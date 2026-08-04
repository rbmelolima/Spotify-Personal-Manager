import { describe, expect, it } from 'vitest';
import { SpotifyClient } from '../src/shared/spotify/client.js';

describe('SpotifyClient', () => {
  it('includes Spotify error details in an API error', async () => {
    const client = new SpotifyClient(
      { accessToken: async () => 'token' } as any,
      0,
      async () =>
        new Response(
          JSON.stringify({ error: { status: 403, message: 'Insufficient client scope' } }),
          { status: 403, headers: { 'Content-Type': 'application/json' } },
        ),
    );

    await expect(client.fetch('/me/playlists')).rejects.toMatchObject({
      code: 'PLAYLIST_FORBIDDEN',
      details: { error: { status: 403, message: 'Insufficient client scope' } },
      statusCode: 403,
    });
  });
});
