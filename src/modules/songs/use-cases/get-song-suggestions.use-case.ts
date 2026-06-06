import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { ApiContextEnum } from '#common/enums'
import { useFetch } from '#common/helpers'
import { SongAPIResponseModel, type SongModel } from '#modules/songs/models'
import { createSongPayload } from '#modules/songs/song.helper'
import { CreateSongStationUseCase } from '#modules/songs/use-cases'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'

export interface GetSongSuggestionsArgs {
  songId: string
  limit: number
}

export class GetSongSuggestionsUseCase extends UseCase<GetSongSuggestionsArgs, z.infer<typeof SongModel>[]> {
  private readonly createSongStation = new CreateSongStationUseCase()

  async execute({ songId, limit }: GetSongSuggestionsArgs) {
    const stationId = await this.createSongStation.execute(songId)

    const data = await useFetch({
      endpoint: Endpoints.songs.suggestions,
      params: {
        stationid: stationId,
        k: limit
      },
      context: ApiContextEnum.ANDROID,
      schema: z.object({ stationid: z.string() }).and(z.record(z.string(), z.object({ song: SongAPIResponseModel })))
    })

    if (!data) {
      throw new HTTPException(404, { message: `no suggestions found for the given song` })
    }

    const { stationid, ...suggestions } = data

    return (
      Object.values(suggestions)
        .map((element) => element && createSongPayload(element.song))
        .filter(Boolean)
        .slice(0, limit) || []
    )
  }
}
