import { HTTPException } from 'hono/http-exception'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { CreateSongStationUseCase } from '#modules/songs/use-cases'

describe('CreateSongStation', () => {
  let createSongStationUseCase: CreateSongStationUseCase

  beforeAll(() => {
    createSongStationUseCase = new CreateSongStationUseCase()
  })

  afterEach(() => vi.unstubAllGlobals())

  it('should create a song station', async () => {
    const station = await createSongStationUseCase.execute('3IoDK8qI')

    expect(station).toBeDefined()
  })

  // The radio service always returns a station id in practice; stub the upstream to drive the 500 arm.
  it('throws 500 when the response has no station id', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Response.json({}))
    )

    await expect(createSongStationUseCase.execute('songId')).rejects.toThrow(HTTPException)
  })
})
