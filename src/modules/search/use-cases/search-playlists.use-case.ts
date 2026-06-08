import { useCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { toPage, useFetch } from '#common/helpers'
import { paginated, PlaylistSummaryModel } from '#common/models'
import { SearchPlaylistAPIResponseModel, type SearchArgs } from '#modules/search/models'
import { playlistResultToSummary } from '#modules/search/search.helper'

export class SearchPlaylistsUseCase extends useCase(paginated(PlaylistSummaryModel)) {
  async execute({ query, page, limit }: SearchArgs) {
    const data = await useFetch({
      endpoint: Endpoints.search.playlists,
      params: { q: query, p: page - 1, n: limit },
      schema: SearchPlaylistAPIResponseModel
    })

    return toPage(data.results.map(playlistResultToSummary), { page, limit, total: data.total })
  }
}
