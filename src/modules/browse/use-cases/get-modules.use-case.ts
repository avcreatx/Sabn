import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { createModulesPayload } from '#modules/browse/browse.helper'
import { LaunchDataAPIResponseModel, type ModulesModel } from '#modules/browse/models'
import type { z } from 'zod'

export class GetModulesUseCase extends UseCase<void, z.infer<typeof ModulesModel>> {
  async execute(): Promise<z.infer<typeof ModulesModel>> {
    const data = await useFetch({
      endpoint: Endpoints.browse.modules,
      params: {},
      schema: LaunchDataAPIResponseModel
    })

    return createModulesPayload(data)
  }
}
