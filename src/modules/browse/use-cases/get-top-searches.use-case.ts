import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { toPage, useFetch } from '#common/helpers'
import { toCards } from '#modules/browse/browse.helper'
import { FeedListAPIResponseModel } from '#modules/browse/models'
import type { EntityCard, Paginated, PaginationArgs } from '#common/models'

export class GetTopSearchesUseCase extends UseCase<PaginationArgs, Paginated<EntityCard>> {
  async execute({ page, limit }: PaginationArgs): Promise<Paginated<EntityCard>> {
    const data = await useFetch({
      endpoint: Endpoints.browse.topSearches,
      params: {},
      schema: FeedListAPIResponseModel
    })

    const all = toCards(data)
    const start = (page - 1) * limit

    return toPage(all.slice(start, start + limit), { page, limit, total: all.length })
  }
}
