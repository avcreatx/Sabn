import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { toPage, useFetch } from '#common/helpers'
import { SongAPIResponseModel, type SongModel } from '#modules/songs/models'
import { createSongPayload } from '#modules/songs/song.helper'
import { z } from 'zod'
import type { Paginated } from '#common/models'
import type { SearchArgs } from '#modules/search/models'

export class SearchSongsUseCase extends UseCase<SearchArgs, Paginated<z.infer<typeof SongModel>>> {
  async execute({ query, page, limit }: SearchArgs): Promise<Paginated<z.infer<typeof SongModel>>> {
    const data = await useFetch({
      endpoint: Endpoints.search.songs,
      params: { q: query, p: page - 1, n: limit },
      schema: z.object({
        total: z.number(),
        start: z.number(),
        results: z.array(SongAPIResponseModel)
      })
    })

    return toPage(data.results.map(createSongPayload), { page, limit, total: data.total })
  }
}
