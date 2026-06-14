import { useCase } from '#common/classes'
import { Endpoints } from '#common/constants'
import { assertFound, useFetch } from '#common/helpers'
import { toAlbum } from '#modules/albums/album.helper'
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

    return toAlbum(assertFound(data, 'title', 'album not found'))
  }
}
