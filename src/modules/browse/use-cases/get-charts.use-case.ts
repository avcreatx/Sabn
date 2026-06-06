import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { toPage, useFetch } from '#common/helpers'
import { toPlaylistSummary } from '#modules/browse/browse.helper'
import { FeedListAPIResponseModel } from '#modules/browse/models'
import type { Paginated, PaginationArgs, PlaylistSummary } from '#common/models'

export class GetChartsUseCase extends UseCase<PaginationArgs, Paginated<PlaylistSummary>> {
  async execute({ page, limit }: PaginationArgs): Promise<Paginated<PlaylistSummary>> {
    const data = await useFetch({
      endpoint: Endpoints.browse.charts,
      params: {},
      schema: FeedListAPIResponseModel
    })

    const all = data.map(toPlaylistSummary)
    const start = (page - 1) * limit

    return toPage(all.slice(start, start + limit), { page, limit, total: all.length })
  }
}
