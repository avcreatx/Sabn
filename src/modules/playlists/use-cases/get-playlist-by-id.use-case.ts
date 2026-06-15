import { useCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { toPlaylist } from '#modules/playlists/playlist.helper'
import { PlaylistModel, RawPlaylistModel } from '#modules/playlists/playlist.model'

export interface GetPlaylistByIdArgs {
  id: string
  limit: number
  page: number
}

export class GetPlaylistByIdUseCase extends useCase(PlaylistModel) {
  async execute({ id, limit, page }: GetPlaylistByIdArgs) {
    // Upstream ignores the page param, so over-fetch up to the requested page and slice it client-side.
    const data = await useFetch({
      endpoint: Endpoints.playlists.id,
      params: {
        listid: id,
        n: page * limit
      },
      schema: RawPlaylistModel,
      notFound: { key: 'title', message: 'playlist not found' }
    })

    const playlist = toPlaylist(data)
    const start = (page - 1) * limit

    return { ...playlist, songs: playlist.songs.slice(start, start + limit) }
  }
}
