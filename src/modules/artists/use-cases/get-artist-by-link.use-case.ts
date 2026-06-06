import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { createArtistPayload } from '#modules/artists/artist.helper'
import { HTTPException } from 'hono/http-exception'
import type { ArtistAPIResponseModel, ArtistModel } from '#modules/artists/models'
import type { z } from 'zod'

export interface GetArtistByLinkArgs {
  token: string
  page: number
  songCount: number
  albumCount: number
  sortBy: 'popularity' | 'latest' | 'alphabetical'
  sortOrder: 'asc' | 'desc'
}

export class GetArtistByLinkUseCase extends UseCase<GetArtistByLinkArgs, z.infer<typeof ArtistModel>> {
  async execute({ token, page, songCount, albumCount, sortBy, sortOrder }: GetArtistByLinkArgs) {
    const data = await useFetch<z.infer<typeof ArtistAPIResponseModel>>({
      endpoint: Endpoints.artists.link,
      params: {
        token,
        n_song: songCount,
        n_album: albumCount,
        page,
        sort_order: sortOrder,
        category: sortBy,
        type: 'artist'
      }
    })

    if (!data) throw new HTTPException(404, { message: 'artist not found' })

    return createArtistPayload(data)
  }
}
