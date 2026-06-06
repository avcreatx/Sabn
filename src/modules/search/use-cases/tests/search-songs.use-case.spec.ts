import { paginated } from '#common/models'
import { SearchSongsUseCase } from '#modules/search/use-cases'
import { SongModel } from '#modules/songs/models'
import { beforeAll, describe, expect, it } from 'vitest'

describe('SearchSongs', () => {
  let useCase: SearchSongsUseCase

  beforeAll(() => {
    useCase = new SearchSongsUseCase()
  })

  it('returns a paged list of full songs', async () => {
    const result = await useCase.execute({ query: 'ride', limit: 5, page: 1 })

    expect(() => paginated(SongModel).parse(result)).not.toThrow()
  })
})
