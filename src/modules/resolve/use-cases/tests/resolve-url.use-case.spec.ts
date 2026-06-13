import { HTTPException } from 'hono/http-exception'
import { beforeAll, describe, expect, it } from 'vitest'
import { ResolveResultModel } from '#modules/resolve/resolve.model'
import { ResolveUseCase } from '#modules/resolve/use-cases'

describe('ResolveUrl', () => {
  let resolveUseCase: ResolveUseCase

  beforeAll(() => {
    resolveUseCase = new ResolveUseCase()
  })

  it('should resolve a song url', async () => {
    const result = await resolveUseCase.execute('https://www.jiosaavn.com/song/tum-hi-ho/EToxUyFpcwQ')

    expect(result.type).toBe('song')
    expect(() => ResolveResultModel.parse(result)).not.toThrow()
  })

  it('should resolve an album url', async () => {
    const result = await resolveUseCase.execute('https://www.jiosaavn.com/album/evolve/gvCWqZLfVbs_')

    expect(result.type).toBe('album')
    expect(() => ResolveResultModel.parse(result)).not.toThrow()
  })

  it('should reject an unrecognized url', async () => {
    await expect(resolveUseCase.execute('https://example.com/not-jiosaavn')).rejects.toThrow(HTTPException)
  })
})
