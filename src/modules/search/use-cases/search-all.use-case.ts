import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { SearchAPIResponseModel, type SearchResultModel } from '#modules/search/models'
import { createSearchPayload } from '#modules/search/search.helper'
import type { z } from 'zod'

export class SearchAllUseCase extends UseCase<string, z.infer<typeof SearchResultModel>> {
  async execute(query: string): Promise<z.infer<typeof SearchResultModel>> {
    const data = await useFetch({
      endpoint: Endpoints.search.all,
      params: { query },
      schema: SearchAPIResponseModel
    })

    return createSearchPayload(data)
  }
}
