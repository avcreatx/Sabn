import { beforeAll, describe, expect, it } from 'vitest'
import { paginated } from '#common/models'
import { EntityCardModel } from '#modules/browse/models'
import { GetTopSearchesUseCase } from '#modules/browse/use-cases'

describe('GetTopSearches', () => {
  let getTopSearchesUseCase: GetTopSearchesUseCase

  beforeAll(() => {
    getTopSearchesUseCase = new GetTopSearchesUseCase()
  })

  it('should return paginated top searches as entity cards', async () => {
    const topSearches = await getTopSearchesUseCase.execute({ page: 1, limit: 10 })

    expect(() => paginated(EntityCardModel).parse(topSearches)).not.toThrow()
  })
})
