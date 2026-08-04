export interface Playlist { id: string; name: string; description: string; public: boolean | null; collaborative: boolean; snapshotId: string; totalItems: number; uri: string; externalUrl: string | null; owner: { id: string; displayName: string | null } }
export interface CreatePlaylistInput { name: string; description?: string; public?: boolean; collaborative?: boolean }
export interface AddPlaylistItemsInput { playlistId: string; uris: string[]; removeInputDuplicates: boolean }
export interface RemovePlaylistItemsInput { playlistId: string; uris: string[]; removeAllOccurrences: boolean; snapshotId?: string }
export interface PlaylistUpdateResult { playlistId: string; requested: number; processed: number; failed: number; batchesProcessed: number; snapshotId?: string; failedBatch?: number; remainingUris?: string[] }
export type SpotifyPlaylist = any;
