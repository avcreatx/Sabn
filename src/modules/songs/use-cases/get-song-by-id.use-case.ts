import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'
import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { SongAPIResponseModel, type SongModel } from '#modules/songs/models'
import { createSongPayload } from '#modules/songs/song.helper'

export interface GetSongByIdArgs {
  songIds: string
}

export class GetSongByIdsUseCase extends UseCase<GetSongByIdArgs, z.infer<typeof SongModel>[]> {
  async execute({ songIds }: GetSongByIdArgs) {
    const data = await useFetch({
      endpoint: Endpoints.songs.id,
      params: { pids: songIds },
      schema: z.object({ songs: z.array(SongAPIResponseModel) })
    })

    if (!data.songs?.length) throw new HTTPException(404, { message: 'song not found' })

    const songs = data.songs.map((song) => createSongPayload(song))

    return songs
  }
}
