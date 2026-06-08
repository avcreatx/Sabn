import { useCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { toPage, useFetch } from '#common/helpers'
import { EntityCardModel, paginated, type PaginationArgs } from '#common/models'
import { toCards } from '#modules/browse/browse.helper'
import { FeedListAPIResponseModel } from '#modules/browse/models'

export class GetTopSearchesUseCase extends useCase(paginated(EntityCardModel)) {
  async execute({ page, limit }: PaginationArgs) {
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
