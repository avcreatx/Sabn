import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { ApiContextEnum } from '#common/enums'
import { useFetch } from '#common/helpers'
import { HTTPException } from 'hono/http-exception'

export class CreateSongStationUseCase extends UseCase<string, string> {
  async execute(songId: string) {
    const encodedSongId = JSON.stringify([encodeURIComponent(songId)])

    const data = await useFetch<{ stationid: string }>({
      endpoint: Endpoints.songs.station,
      params: {
        entity_id: encodedSongId,
        entity_type: 'queue'
      },
      context: ApiContextEnum.ANDROID
    })

    if (!data || !data.stationid) throw new HTTPException(500, { message: 'could not create station' })

    return data.stationid
  }
}
