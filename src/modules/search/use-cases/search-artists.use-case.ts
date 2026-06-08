import { useCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { toPage, useFetch } from '#common/helpers'
import { ArtistSummaryModel, paginated } from '#common/models'
import { SearchArtistAPIResponseModel, type SearchArgs } from '#modules/search/models'
import { artistResultToSummary } from '#modules/search/search.helper'

export class SearchArtistsUseCase extends useCase(paginated(ArtistSummaryModel)) {
  async execute({ query, page, limit }: SearchArgs) {
    const data = await useFetch({
      endpoint: Endpoints.search.artists,
      params: { q: query, p: page - 1, n: limit },
      schema: SearchArtistAPIResponseModel
    })

    return toPage(data.results.map(artistResultToSummary), { page, limit, total: data.total })
  }
}
