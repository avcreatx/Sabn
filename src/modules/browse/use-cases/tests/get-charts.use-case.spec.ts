import { beforeAll, describe, expect, it } from 'vitest'
import { paginated } from '#common/models'
import { GetChartsUseCase } from '#modules/browse/use-cases'
import { PlaylistSummaryModel } from '#modules/playlists/playlist.model'

describe('GetCharts', () => {
  let getChartsUseCase: GetChartsUseCase

  beforeAll(() => {
    getChartsUseCase = new GetChartsUseCase()
  })

  it('should return paginated charts', async () => {
    const charts = await getChartsUseCase.execute({ page: 1, limit: 10 })

    expect(() => paginated(PlaylistSummaryModel).parse(charts)).not.toThrow()
  })
})
