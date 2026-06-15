import { describe, expect, it } from 'vitest'
import { toPage } from '#common/helpers'

describe('toPage', () => {
  it('uses the provided total', () => {
    expect(toPage(['a', 'b'], { page: 1, limit: 10, total: 99 })).toEqual({
      total: 99,
      page: 1,
      limit: 10,
      items: ['a', 'b']
    })
  })

  it('falls back to the item count when total is omitted', () => {
    expect(toPage(['a', 'b'], { page: 2, limit: 10 })).toEqual({
      total: 2,
      page: 2,
      limit: 10,
      items: ['a', 'b']
    })
  })
})
