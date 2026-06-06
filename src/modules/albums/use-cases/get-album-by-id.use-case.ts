import { HTTPException } from 'hono/http-exception'
import { UseCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { createAlbumPayload } from '#modules/albums/album.helper'
import type { AlbumAPIResponseModel, AlbumModel } from '#modules/albums/album.model'
import type { z } from 'zod'

export class GetAlbumByIdUseCase extends UseCase<string, z.infer<typeof AlbumModel>> {
  async execute(id: string) {
    const data = await useFetch<z.infer<typeof AlbumAPIResponseModel>>({
      endpoint: Endpoints.albums.id,
      params: { albumid: id }
    })

    if (!data) throw new HTTPException(404, { message: 'album not found' })

    return createAlbumPayload(data)
  }
}
