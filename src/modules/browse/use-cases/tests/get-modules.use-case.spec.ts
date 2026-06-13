import { beforeAll, describe, expect, it } from 'vitest'
import { ModulesModel } from '#modules/browse/models'
import { GetModulesUseCase } from '#modules/browse/use-cases'

describe('GetModules', () => {
  let getModulesUseCase: GetModulesUseCase

  beforeAll(() => {
    getModulesUseCase = new GetModulesUseCase()
  })

  it('should return the home feed modules', async () => {
    const modules = await getModulesUseCase.execute()

    expect(() => ModulesModel.parse(modules)).not.toThrow()
  })
})
