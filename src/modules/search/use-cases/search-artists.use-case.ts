import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { toPage, useFetch } from '#common/helpers'
import { SearchArtistAPIResponseModel, type SearchArgs } from '#modules/search/models'
import { artistResultToSummary } from '#modules/search/search.helper'
import type { ArtistSummary, Paginated } from '#common/models'

export class SearchArtistsUseCase extends UseCase<SearchArgs, Paginated<ArtistSummary>> {
  async execute({ query, page, limit }: SearchArgs): Promise<Paginated<ArtistSummary>> {
    const data = await useFetch({
      endpoint: Endpoints.search.artists,
      params: { q: query, p: page - 1, n: limit },
      schema: SearchArtistAPIResponseModel
    })

    return toPage(data.results.map(artistResultToSummary), { page, limit, total: data.total })
  }
}
