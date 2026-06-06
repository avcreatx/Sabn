import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { toPage, useFetch } from '#common/helpers'
import { SearchPlaylistAPIResponseModel, type SearchArgs } from '#modules/search/models'
import { playlistResultToSummary } from '#modules/search/search.helper'
import type { Paginated, PlaylistSummary } from '#common/models'

export class SearchPlaylistsUseCase extends UseCase<SearchArgs, Paginated<PlaylistSummary>> {
  async execute({ query, page, limit }: SearchArgs): Promise<Paginated<PlaylistSummary>> {
    const data = await useFetch({
      endpoint: Endpoints.search.playlists,
      params: { q: query, p: page - 1, n: limit },
      schema: SearchPlaylistAPIResponseModel
    })

    return toPage(data.results.map(playlistResultToSummary), { page, limit, total: data.total })
  }
}
