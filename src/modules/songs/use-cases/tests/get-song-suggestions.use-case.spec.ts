import { beforeAll, describe, expect, it } from 'vitest'
import { GetSongSuggestionsUseCase } from '#modules/songs/use-cases'

describe('GetSongSuggestions', () => {
  let getSongSuggestionsUseCase: GetSongSuggestionsUseCase

  beforeAll(() => {
    getSongSuggestionsUseCase = new GetSongSuggestionsUseCase()
  })

  // limit 1 hits the upstream's single-`song` response shape (regression: it differs from limit>=2)
  it('should return one suggestion when limit is 1', async () => {
    const suggestions = await getSongSuggestionsUseCase.execute({ songId: 'aRZbUYD7', limit: 1 })

    expect(suggestions).toHaveLength(1)
    expect(suggestions[0]?.id).toBeDefined()
  })

  it('should return multiple suggestions when limit is greater than 1', async () => {
    const suggestions = await getSongSuggestionsUseCase.execute({ songId: 'aRZbUYD7', limit: 3 })

    expect(suggestions.length).toBeGreaterThan(1)
    expect(suggestions.length).toBeLessThanOrEqual(3)
    suggestions.forEach((song) => expect(song.id).toBeDefined())
  })
})
