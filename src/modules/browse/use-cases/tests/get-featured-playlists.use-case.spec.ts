import { beforeAll, describe, expect, it } from 'vitest'
import { paginated } from '#common/models'
import { GetFeaturedPlaylistsUseCase } from '#modules/browse/use-cases'
import { PlaylistSummaryModel } from '#modules/playlists/playlist.model'

describe('GetFeaturedPlaylists', () => {
  let getFeaturedPlaylistsUseCase: GetFeaturedPlaylistsUseCase

  beforeAll(() => {
    getFeaturedPlaylistsUseCase = new GetFeaturedPlaylistsUseCase()
  })

  it('should return paginated featured playlists', async () => {
    const playlists = await getFeaturedPlaylistsUseCase.execute({ page: 1, limit: 10 })

    expect(() => paginated(PlaylistSummaryModel).parse(playlists)).not.toThrow()
  })
})
