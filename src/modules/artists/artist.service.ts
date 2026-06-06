import { BaseUseCaseService } from '#common/classes'
import {
  GetArtistAlbumsUseCase,
  GetArtistByIdUseCase,
  GetArtistByLinkUseCase,
  GetArtistSongsUseCase
} from '#modules/artists/use-cases'

export class ArtistService extends BaseUseCaseService({
  GetArtistByIdUseCase,
  GetArtistByLinkUseCase,
  GetArtistSongsUseCase,
  GetArtistAlbumsUseCase
}) {}
