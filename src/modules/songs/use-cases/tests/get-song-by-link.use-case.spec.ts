import { HTTPException } from 'hono/http-exception'
import { beforeAll, describe, expect, it } from 'vitest'
import { SongModel } from '#modules/songs/models'
import { GetSongByLinkUseCase } from '#modules/songs/use-cases'

describe('GetSongByLink', () => {
  let getSongByLinkUseCase: GetSongByLinkUseCase

  beforeAll(() => {
    getSongByLinkUseCase = new GetSongByLinkUseCase()
  })

  it('should return a song by link', async () => {
    const song = await getSongByLinkUseCase.execute('OgwhbhtDRwM')

    expect(() => SongModel.parse(song[0])).not.toThrow()
  })

  // A garbage token returns a bare `[]` (array branch); an empty token returns an `{ error }` object
  // with no `songs` (object branch) — together they cover both arms of the not-found normalization.
  it('should throw 404 for a garbage token', async () => {
    await expect(getSongByLinkUseCase.execute('invalid-link')).rejects.toThrow(HTTPException)
  })

  it('should throw 404 for an empty token', async () => {
    await expect(getSongByLinkUseCase.execute('')).rejects.toThrow(HTTPException)
  })
})
