import { HTTPException } from 'hono/http-exception'
import { beforeAll, describe, expect, it } from 'vitest'
import { SongModel } from '#modules/songs/models'
import { GetSongByIdsUseCase } from '#modules/songs/use-cases'

describe('GetSongById', () => {
  let getSongByIdsUseCase: GetSongByIdsUseCase

  beforeAll(() => {
    getSongByIdsUseCase = new GetSongByIdsUseCase()
  })

  it('should return a song by id', async () => {
    const song = await getSongByIdsUseCase.execute({ songIds: '3IoDK8qI' })

    expect(() => SongModel.parse(song[0])).not.toThrow()
  })

  it('should return multiple songs by ids', async () => {
    const song = await getSongByIdsUseCase.execute({ songIds: '3IoDK8qI,K1P4T0jI' })

    expect(() => SongModel.parse(song[0])).not.toThrow()
  })

  it('should throw 404 error when song is not found', async () => {
    await expect(getSongByIdsUseCase.execute({ songIds: 'invalid-id' })).rejects.toThrow(HTTPException)
  })
})
