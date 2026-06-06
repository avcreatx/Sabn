import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { toPage, useFetch } from '#common/helpers'
import { SearchAlbumAPIResponseModel, type SearchArgs } from '#modules/search/models'
import { albumResultToSummary } from '#modules/search/search.helper'
import type { AlbumSummary, Paginated } from '#common/models'

export class SearchAlbumsUseCase extends UseCase<SearchArgs, Paginated<AlbumSummary>> {
  async execute({ query, page, limit }: SearchArgs): Promise<Paginated<AlbumSummary>> {
    const data = await useFetch({
      endpoint: Endpoints.search.albums,
      params: { q: query, p: page - 1, n: limit },
      schema: SearchAlbumAPIResponseModel
    })

    return toPage(data.results.map(albumResultToSummary), { page, limit, total: data.total })
  }
}
