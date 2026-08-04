# Modelos e schemas

## 1. Token

```ts
interface SpotifyToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  scope: string[];
}
```

## 2. Playlist

```ts
interface Playlist {
  id: string;
  name: string;
  description: string;
  public: boolean | null;
  collaborative: boolean;
  snapshotId: string;
  totalItems: number;
  uri: string;
  externalUrl: string | null;
  owner: {
    id: string;
    displayName: string | null;
  };
}
```

## 3. Item exportado

```ts
interface ExportedPlaylistItem {
  position: number;
  addedAt: string | null;
  addedBy: {
    id: string | null;
    displayName: string | null;
  } | null;
  track: ExportedTrack | null;
}
```

## 4. Música exportada

```ts
interface ExportedTrack {
  id: string | null;
  uri: string | null;
  name: string;
  artists: ExportedArtist[];
  album: ExportedAlbum | null;
  durationMs: number | null;
  explicit: boolean | null;
  isLocal: boolean;
  isPlayable: boolean | null;
  spotifyUrl: string | null;
}
```

## 5. Operações em massa

```ts
interface AddPlaylistItemsInput {
  playlistId: string;
  uris: string[];
  removeInputDuplicates: boolean;
}

interface RemovePlaylistItemsInput {
  playlistId: string;
  uris: string[];
  removeAllOccurrences: boolean;
  snapshotId?: string;
}

interface PlaylistUpdateResult {
  playlistId: string;
  requested: number;
  processed: number;
  failed: number;
  batchesProcessed: number;
  snapshotId?: string;
}
```

## 6. Schema Zod de importação

```ts
import { z } from "zod";

const spotifyTrackUriSchema = z
  .string()
  .regex(/^spotify:track:[A-Za-z0-9]+$/);

export const bulkTrackOperationSchema = z.object({
  operation: z.enum(["add", "remove"]).optional(),
  playlistId: z.string().min(1).optional(),
  tracks: z.array(
    z.union([
      spotifyTrackUriSchema,
      z.object({ uri: spotifyTrackUriSchema })
    ])
  ).min(1)
});
```

## 7. Funções proibidas no MVP

Não deverão existir serviços públicos para:

```ts
replaceItems();
clearPlaylist();
reorderItems();
replaceTrack();
```
