import { beforeAll, describe, expect, it } from 'vitest'
import { paginated } from '#common/models'
import { EntityCardModel, ModulesModel } from '#modules/browse/models'
import { BrowseController } from '#modules/index'
import { PlaylistSummaryModel } from '#modules/playlists/playlist.model'

describe('BrowseController', () => {
  let controller: BrowseController

  beforeAll(() => {
    controller = new BrowseController()
  })

  it('home feed modules', async () => {
    const response = await controller.controller.request('/browse')
    const data = await response.json()
    expect(() => ModulesModel.parse(data)).not.toThrow()
  })

  it('charts', async () => {
    const response = await controller.controller.request('/browse/charts')
    const data = await response.json()
    expect(() => paginated(PlaylistSummaryModel).parse(data)).not.toThrow()
  })

  it('featured playlists', async () => {
    const response = await controller.controller.request('/browse/featured-playlists')
    const data = await response.json()
    expect(() => paginated(PlaylistSummaryModel).parse(data)).not.toThrow()
  })

  it('top searches', async () => {
    const response = await controller.controller.request('/browse/top-searches')
    const data = await response.json()
    expect(() => paginated(EntityCardModel).parse(data)).not.toThrow()
  })
})
