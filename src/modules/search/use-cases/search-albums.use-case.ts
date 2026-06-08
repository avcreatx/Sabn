import { useCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { toPage, useFetch } from '#common/helpers'
import { AlbumSummaryModel, paginated } from '#common/models'
import { SearchAlbumAPIResponseModel, type SearchArgs } from '#modules/search/models'
import { albumResultToSummary } from '#modules/search/search.helper'

export class SearchAlbumsUseCase extends useCase(paginated(AlbumSummaryModel)) {
  async execute({ query, page, limit }: SearchArgs) {
    const data = await useFetch({
      endpoint: Endpoints.search.albums,
      params: { q: query, p: page - 1, n: limit },
      schema: SearchAlbumAPIResponseModel
    })

    return toPage(data.results.map(albumResultToSummary), { page, limit, total: data.total })
  }
}
