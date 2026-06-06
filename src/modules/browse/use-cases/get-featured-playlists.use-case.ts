import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { toPage, useFetch } from '#common/helpers'
import { toPlaylistSummary } from '#modules/browse/browse.helper'
import { FeaturedPlaylistsAPIResponseModel } from '#modules/browse/models'
import type { Paginated, PaginationArgs, PlaylistSummary } from '#common/models'

export class GetFeaturedPlaylistsUseCase extends UseCase<PaginationArgs, Paginated<PlaylistSummary>> {
  async execute({ page, limit }: PaginationArgs): Promise<Paginated<PlaylistSummary>> {
    const data = await useFetch({
      endpoint: Endpoints.browse.featuredPlaylists,
      params: { p: page, n: limit },
      schema: FeaturedPlaylistsAPIResponseModel
    })

    return toPage(data.data.map(toPlaylistSummary), { page, limit, total: data.count ?? data.data.length })
  }
}
