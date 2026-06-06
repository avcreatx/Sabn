import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { createArtistPayload } from '#modules/artists/artist.helper'
import { HTTPException } from 'hono/http-exception'
import type { ArtistAPIResponseModel, ArtistModel } from '#modules/artists/models'
import type { z } from 'zod'

export interface GetArtistByIdArgs {
  artistId: string
  page: number
  songCount: number
  albumCount: number
  sortBy: 'popularity' | 'latest' | 'alphabetical'
  sortOrder: 'asc' | 'desc'
}

export class GetArtistByIdUseCase extends UseCase<GetArtistByIdArgs, z.infer<typeof ArtistModel>> {
  async execute({ artistId, page, songCount, albumCount, sortBy, sortOrder }: GetArtistByIdArgs) {
    const data = await useFetch<z.infer<typeof ArtistAPIResponseModel>>({
      endpoint: Endpoints.artists.id,
      params: {
        artistId,
        n_song: songCount,
        n_album: albumCount,
        page,
        sort_order: sortOrder,
        category: sortBy
      }
    })

    if (!data) throw new HTTPException(404, { message: 'artist not found' })

    return createArtistPayload(data)
  }
}
