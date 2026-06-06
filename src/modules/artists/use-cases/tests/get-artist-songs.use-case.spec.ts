import { beforeAll, describe, expect, it } from 'vitest'
import { paginated } from '#common/models'
import { GetArtistSongsUseCase } from '#modules/artists/use-cases'
import { SongModel } from '#modules/songs/models'

describe('GetArtistSongs', () => {
  let useCase: GetArtistSongsUseCase

  beforeAll(() => {
    useCase = new GetArtistSongsUseCase()
  })

  it('returns a paged list of the artist songs', async () => {
    const result = await useCase.execute({ artistId: '1274170', page: 1, sortBy: 'popularity', sortOrder: 'asc' })

    expect(() => paginated(SongModel).parse(result)).not.toThrow()
  })
})
