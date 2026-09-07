import { AppError } from '../errors/app-error.js';

const trackUri = /^spotify:track:([A-Za-z0-9]+)$/;
const trackUrl = /^https?:\/\/open\.spotify\.com\/track\/([A-Za-z0-9]+)(?:[/?].*)?$/;

export function normalizeTrackUri(value: string): string {
  const input = value.trim();
  if (trackUri.test(input)) return input;
  const match = input.match(trackUrl);
  if (match?.[1]) return `spotify:track:${match[1]}`;
  throw new AppError('INVALID_SPOTIFY_URI', `A URI informada não representa uma música do Spotify: ${value}`);
}
