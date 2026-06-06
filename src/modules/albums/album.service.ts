import { BaseUseCaseService } from '#common/classes'
import { GetAlbumByIdUseCase, GetAlbumByLinkUseCase } from '#modules/albums/use-cases'

export class AlbumService extends BaseUseCaseService({ GetAlbumByIdUseCase, GetAlbumByLinkUseCase }) {}
