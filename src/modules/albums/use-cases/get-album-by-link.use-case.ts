import { HTTPException } from 'hono/http-exception'
import { useCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { createAlbumPayload } from '#modules/albums/album.helper'
import { AlbumModel, RawAlbumModel } from '#modules/albums/album.model'

export class GetAlbumByLinkUseCase extends useCase(AlbumModel) {
  async execute(token: string) {
    const data = await useFetch({
      endpoint: Endpoints.albums.link,
      params: {
        token,
        type: 'album'
      },
      schema: RawAlbumModel
    })

    if (!data) throw new HTTPException(404, { message: 'album not found' })

    return createAlbumPayload(data)
  }
}
