import { describe, expect, it } from 'vitest';
import { chunk, unique } from '../src/shared/utils/collections.js';
import { sanitizeFileName } from '../src/shared/utils/files.js';
import { normalizeTrackUri } from '../src/shared/utils/spotify-uri.js';

describe('Spotify input utilities', () => {
  it('normalizes track URLs and keeps valid URIs', () => {
    expect(normalizeTrackUri('https://open.spotify.com/track/AbC123?si=x')).toBe('spotify:track:AbC123');
    expect(normalizeTrackUri('spotify:track:AbC123')).toBe('spotify:track:AbC123');
    expect(() => normalizeTrackUri('spotify:album:AbC123')).toThrow('não representa uma música');
  });
  it('chunks while preserving order and removes duplicates', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b']);
  });
  it('makes Windows-safe export names', () => expect(sanitizeFileName('  Rock: 2000/01?  ')).toBe('Rock- 2000-01-'));
});
