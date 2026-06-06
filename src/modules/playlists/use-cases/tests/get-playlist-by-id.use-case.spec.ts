import { beforeAll, describe, expect, it } from 'vitest'
import { PlaylistModel } from '#modules/playlists/playlist.model'
import { GetPlaylistByIdUseCase } from '#modules/playlists/use-cases'

describe('GetAlbumById', () => {
  let getPlaylistByIdUseCase: GetPlaylistByIdUseCase

  beforeAll(() => {
    getPlaylistByIdUseCase = new GetPlaylistByIdUseCase()
  })

  it('should get playlist by id', async () => {
    const playlist = await getPlaylistByIdUseCase.execute({
      id: '159470188',
      page: 1,
      limit: 5
    })

    expect(() => PlaylistModel.parse(playlist)).not.toThrow()
  })
})
