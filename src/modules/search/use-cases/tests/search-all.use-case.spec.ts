import { SearchResultModel } from '#modules/search/models'
import { SearchAllUseCase } from '#modules/search/use-cases'
import { beforeAll, describe, expect, it } from 'vitest'

describe('SearchEverything', () => {
  let useCase: SearchAllUseCase

  beforeAll(() => {
    useCase = new SearchAllUseCase()
  })

  it('returns grouped search results', async () => {
    const result = await useCase.execute('imagine dragons bones')

    expect(() => SearchResultModel.parse(result)).not.toThrow()
  })
})
