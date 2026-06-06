import { AlbumSummaryModel, paginated } from '#common/models'
import { SearchAlbumsUseCase } from '#modules/search/use-cases'
import { beforeAll, describe, expect, it } from 'vitest'

describe('SearchAlbums', () => {
  let useCase: SearchAlbumsUseCase

  beforeAll(() => {
    useCase = new SearchAlbumsUseCase()
  })

  it('returns a paged list of album summaries', async () => {
    const result = await useCase.execute({ query: 'imagine dragons', limit: 5, page: 1 })

    expect(() => paginated(AlbumSummaryModel).parse(result)).not.toThrow()
  })
})
