import { BaseUseCaseService } from '#common/classes'
import {
  SearchAlbumsUseCase,
  SearchAllUseCase,
  SearchArtistsUseCase,
  SearchPlaylistsUseCase,
  SearchSongsUseCase
} from '#modules/search/use-cases'

export class SearchService extends BaseUseCaseService({
  SearchAllUseCase,
  SearchSongsUseCase,
  SearchAlbumsUseCase,
  SearchArtistsUseCase,
  SearchPlaylistsUseCase
}) {}
