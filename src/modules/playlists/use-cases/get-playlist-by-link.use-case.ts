import { HTTPException } from 'hono/http-exception'
import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { createPlaylistPayload } from '#modules/playlists/playlist.helper'
import type { PlaylistAPIResponseModel, PlaylistModel } from '#modules/playlists/playlist.model'
import type { z } from 'zod'

export interface GetPlaylistByLinkArgs {
  token: string
  limit: number
  page: number
}

export class GetPlaylistByLinkUseCase extends UseCase<GetPlaylistByLinkArgs, z.infer<typeof PlaylistModel>> {
  async execute({ token, limit, page }: GetPlaylistByLinkArgs) {
    const data = await useFetch<z.infer<typeof PlaylistAPIResponseModel>>({
      endpoint: Endpoints.playlists.link,
      params: {
        token,
        n: limit,
        p: page,
        type: 'playlist'
      }
    })

    if (!data) throw new HTTPException(404, { message: 'playlist not found' })

    const playlist = createPlaylistPayload(data)

    return {
      ...playlist,
      songCount: playlist?.songs?.length || null,
      songs: playlist?.songs?.slice(0, limit) || []
    }
  }
}
