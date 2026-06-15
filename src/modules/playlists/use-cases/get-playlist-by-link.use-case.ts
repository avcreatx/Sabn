import { useCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { toPlaylist } from '#modules/playlists/playlist.helper'
import { PlaylistModel, RawPlaylistModel } from '#modules/playlists/playlist.model'

export interface GetPlaylistByLinkArgs {
  token: string
  limit: number
  page: number
}

export class GetPlaylistByLinkUseCase extends useCase(PlaylistModel) {
  async execute({ token, limit, page }: GetPlaylistByLinkArgs) {
    // Upstream ignores the page param, so over-fetch up to the requested page and slice it client-side.
    const data = await useFetch({
      endpoint: Endpoints.playlists.link,
      params: {
        token,
        n: page * limit,
        type: 'playlist'
      },
      schema: RawPlaylistModel,
      notFound: { key: 'title', message: 'playlist not found' }
    })

    const playlist = toPlaylist(data)
    const start = (page - 1) * limit

    return { ...playlist, songs: playlist.songs.slice(start, start + limit) }
  }
}
