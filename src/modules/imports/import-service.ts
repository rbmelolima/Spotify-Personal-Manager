import { readFile } from 'node:fs/promises';
import { z } from 'zod';
import { AppError } from '../../shared/errors/app-error.js';
import { normalizeTrackUri } from '../../shared/utils/spotify-uri.js';
import { unique } from '../../shared/utils/collections.js';

const entry = z.union([z.string(), z.object({ uri: z.string() })]);
const schema = z.object({ operation: z.enum(['add', 'remove']).optional(), playlistId: z.string().min(1).optional(), tracks: z.array(entry).min(1) });
export type ImportedTracks = { operation?: 'add' | 'remove'; playlistId?: string; validUris: string[]; invalid: string[]; duplicates: number };
export async function importTracks(path: string): Promise<ImportedTracks> { let data: unknown; try { data = JSON.parse(await readFile(path, 'utf8')); } catch (error: any) { throw new AppError('INVALID_IMPORT_FILE', `Não foi possível importar o arquivo: ${error.message}`); } const parsed = schema.safeParse(data); if (!parsed.success) throw new AppError('INVALID_IMPORT_FILE', 'O arquivo não segue o formato de importação esperado.', parsed.error.flatten()); const raw = parsed.data.tracks.map((item) => typeof item === 'string' ? item : item.uri); const validUris: string[] = []; const invalid: string[] = []; for (const value of raw) { try { validUris.push(normalizeTrackUri(value)); } catch { invalid.push(value); } } return { operation: parsed.data.operation, playlistId: parsed.data.playlistId, validUris: unique(validUris), invalid, duplicates: validUris.length - unique(validUris).length }; }
