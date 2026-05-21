import { decodeEntities } from '#common/helpers'
import { describe, expect, it } from 'vitest'

describe('decodeEntities', () => {
  it('decodes named HTML entities', () => {
    expect(decodeEntities('Tips &amp; Tricks')).toBe('Tips & Tricks')
    expect(decodeEntities('Rock &quot;n&quot; Roll')).toBe('Rock "n" Roll')
  })

  it('decodes decimal and hex numeric entities', () => {
    expect(decodeEntities('It&#039;s')).toBe("It's")
    expect(decodeEntities('It&#x27;s')).toBe("It's")
  })

  it('does not double-decode an escaped entity', () => {
    expect(decodeEntities('A &amp;amp; B')).toBe('A &amp; B')
  })

  it('passes plain strings through unchanged', () => {
    expect(decodeEntities('Plain Name')).toBe('Plain Name')
  })

  it('passes null and undefined through untouched', () => {
    expect(decodeEntities(null)).toBeNull()
    expect(decodeEntities(undefined)).toBeUndefined()
  })
})
