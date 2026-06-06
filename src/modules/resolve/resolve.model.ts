import { AlbumModel } from '#modules/albums/album.model'
import { ArtistModel } from '#modules/artists/models'
import { PlaylistModel } from '#modules/playlists/playlist.model'
import { SongModel } from '#modules/songs/models'
import { z } from 'zod'

/** A resolved JioSaavn link — the entity, discriminated by `type`. */
export const ResolveResultModel = z.discriminatedUnion('type', [
  z.object({ type: z.literal('song'), data: SongModel }),
  z.object({ type: z.literal('album'), data: AlbumModel }),
  z.object({ type: z.literal('artist'), data: ArtistModel }),
  z.object({ type: z.literal('playlist'), data: PlaylistModel })
])

export type ResolveResult = z.infer<typeof ResolveResultModel>
