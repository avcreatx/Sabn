import { useCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { toPage, useFetch } from '#common/helpers'
import { paginated, PlaylistSummaryModel, type PaginationArgs } from '#common/models'
import { toPlaylistSummary } from '#modules/browse/browse.helper'
import { FeaturedPlaylistsAPIResponseModel } from '#modules/browse/models'

export class GetFeaturedPlaylistsUseCase extends useCase(paginated(PlaylistSummaryModel)) {
  async execute({ page, limit }: PaginationArgs) {
    const data = await useFetch({
      endpoint: Endpoints.browse.featuredPlaylists,
      params: { p: page, n: limit },
      schema: FeaturedPlaylistsAPIResponseModel
    })

    return toPage(data.data.map(toPlaylistSummary), { page, limit, total: data.count ?? data.data.length })
  }
}
