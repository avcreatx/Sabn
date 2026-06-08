import { beforeAll, describe, expect, it } from 'vitest'
import { ArtistModel } from '#modules/artists/models'
import { ArtistController } from '#modules/index'

describe('ArtistController', () => {
  let controller: ArtistController

  beforeAll(() => {
    controller = new ArtistController()
  })

  it('get artist by id', async () => {
    const response = await controller.controller.request('/artists/1274170')
    const data = await response.json()
    expect(() => ArtistModel.parse(data)).not.toThrow()
  })
})
