import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { toPage, useFetch } from '#common/helpers'
import { SongAPIResponseModel, type SongModel } from '#modules/songs/models'
import { createSongPayload } from '#modules/songs/song.helper'
import { z } from 'zod'
import type { Paginated } from '#common/models'

export interface GetArtistSongsArgs {
  artistId: string
  page: number
  sortBy: 'popularity' | 'latest' | 'alphabetical'
  sortOrder: 'asc' | 'desc'
}

export class GetArtistSongsUseCase extends UseCase<GetArtistSongsArgs, Paginated<z.infer<typeof SongModel>>> {
  async execute({
    artistId,
    page,
    sortOrder,
    sortBy
  }: GetArtistSongsArgs): Promise<Paginated<z.infer<typeof SongModel>>> {
    const data = await useFetch({
      endpoint: Endpoints.artists.songs,
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
        topSongs: z.object({
          songs: z.array(SongAPIResponseModel),
          total: z.number()
        })
      })
    })

    const results = data.topSongs.songs.map(createSongPayload)
    return toPage(results, { page, limit: results.length, total: data.topSongs.total })
  }
}
