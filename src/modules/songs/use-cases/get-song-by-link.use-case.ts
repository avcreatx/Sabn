import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { SongAPIResponseModel, type SongModel } from '#modules/songs/models'
import { createSongPayload } from '#modules/songs/song.helper'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'

export class GetSongByLinkUseCase extends UseCase<string, z.infer<typeof SongModel>[]> {
  async execute(token: string) {
    const data = await useFetch({
      endpoint: Endpoints.songs.link,
      params: { token, type: 'song' },
      schema: z.object({ songs: z.array(SongAPIResponseModel) })
    })

    if (!data.songs?.length) throw new HTTPException(404, { message: 'song not found' })

    return data.songs.map((song) => createSongPayload(song))
  }
}
