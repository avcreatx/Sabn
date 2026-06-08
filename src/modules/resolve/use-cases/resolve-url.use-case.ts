import { HTTPException } from 'hono/http-exception'
import { useCase } from '#common/classes'
import { AlbumService } from '#modules/albums/album.service'
import { ArtistService } from '#modules/artists/artist.service'
import { PlaylistService } from '#modules/playlists/playlist.service'
import { ResolveResultModel } from '#modules/resolve/resolve.model'
import { SongService } from '#modules/songs/song.service'

// Maps a JioSaavn URL shape to its entity type + perma-token.
const RESOLVERS = [
  { type: 'song', regex: /jiosaavn\.com\/song\/[^/]+\/([^/]+)/ },
  { type: 'album', regex: /jiosaavn\.com\/album\/[^/]+\/([^/]+)/ },
  { type: 'artist', regex: /jiosaavn\.com\/artist\/[^/]+\/([^/]+)/ },
  { type: 'playlist', regex: /(?:jiosaavn|saavn)\.com\/(?:featured|s\/playlist)\/[^/]+\/([^/]+)/ }
] as const

export class ResolveUseCase extends useCase(ResolveResultModel) {
  private readonly songService = new SongService()
  private readonly albumService = new AlbumService()
  private readonly artistService = new ArtistService()
  private readonly playlistService = new PlaylistService()

  async execute(url: string) {
    for (const { type, regex } of RESOLVERS) {
      const token = url.match(regex)?.[1]
      if (!token) continue

      switch (type) {
        case 'song': {
          const [song] = await this.songService.getSongByLink(token)
          return { type, data: song }
        }
        case 'album':
          return { type, data: await this.albumService.getAlbumByLink(token) }
        case 'artist':
          return {
            type,
            data: await this.artistService.getArtistByLink({
              token,
              page: 0,
              songCount: 10,
              albumCount: 10,
              sortBy: 'popularity',
              sortOrder: 'asc'
            })
          }
        case 'playlist':
          return { type, data: await this.playlistService.getPlaylistByLink({ token, page: 0, limit: 10 }) }
      }
    }

    throw new HTTPException(400, { message: 'Unrecognized JioSaavn URL' })
  }
}
