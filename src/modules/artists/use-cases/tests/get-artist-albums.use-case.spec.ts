import { paginated } from '#common/models'
import { AlbumModel } from '#modules/albums/album.model'
import { GetArtistAlbumsUseCase } from '#modules/artists/use-cases'
import { beforeAll, describe, expect, it } from 'vitest'

describe('GetArtistAlbums', () => {
  let useCase: GetArtistAlbumsUseCase

  beforeAll(() => {
    useCase = new GetArtistAlbumsUseCase()
  })

  it('returns a paged list of the artist albums', async () => {
    const result = await useCase.execute({ artistId: '1274170', page: 1, sortBy: 'popularity', sortOrder: 'asc' })

    expect(() => paginated(AlbumModel).parse(result)).not.toThrow()
  })
})
