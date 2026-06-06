import { z } from 'zod'
import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { toPage, useFetch } from '#common/helpers'
import { createAlbumPayload } from '#modules/albums/album.helper'
import { AlbumAPIResponseModel, type AlbumModel } from '#modules/albums/album.model'
import type { Paginated } from '#common/models'

export interface GetArtistAlbumsArgs {
  artistId: string
  page: number
  sortBy: 'popularity' | 'latest' | 'alphabetical'
  sortOrder: 'asc' | 'desc'
}

export class GetArtistAlbumsUseCase extends UseCase<GetArtistAlbumsArgs, Paginated<z.infer<typeof AlbumModel>>> {
  async execute(args: GetArtistAlbumsArgs): Promise<Paginated<z.infer<typeof AlbumModel>>> {
    const { artistId, page, sortBy, sortOrder } = args

    const data = await useFetch({
      endpoint: Endpoints.artists.albums,
      params: { artistId, page: page - 1, sort_order: sortOrder, category: sortBy },
      schema: z.object({
        artistId: z.string(),
        name: z.string(),
        subtitle: z.string().optional(),
        image: z.string(),
        follower_count: z.string(),
        type: z.string(),
        isVerified: z.boolean(),
        dominantLanguage: z.string(),
        dominantType: z.string(),
        topAlbums: z.object({
          albums: z.array(AlbumAPIResponseModel),
          total: z.number()
        })
      })
    })

    const results = data.topAlbums.albums.map(createAlbumPayload)
    return toPage(results, { page, limit: results.length, total: data.topAlbums.total })
  }
}
