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

  // Upstream is 0-indexed; page 1 must map to its first page and page 2 to a distinct second page.
  it('should paginate — page 2 differs from page 1', async () => {
    const page1 = await getFeaturedPlaylistsUseCase.execute({ page: 1, limit: 5 })
    const page2 = await getFeaturedPlaylistsUseCase.execute({ page: 2, limit: 5 })

    expect(page1.items[0]?.id).not.toBe(page2.items[0]?.id)
  })

  // An out-of-range page returns `{ data: null }`, which must degrade to an empty page, not crash.
  it('should return an empty page for an out-of-range page', async () => {
    const playlists = await getFeaturedPlaylistsUseCase.execute({ page: 999, limit: 10 })

    expect(playlists.items).toEqual([])
  })
})
