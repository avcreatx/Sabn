import { BaseUseCaseService } from '#common/classes'
import {
  CreateSongStationUseCase,
  GetSongByIdsUseCase,
  GetSongByLinkUseCase,
  GetSongSuggestionsUseCase
} from '#modules/songs/use-cases'

export class SongService extends BaseUseCaseService({
  GetSongByIdsUseCase,
  GetSongByLinkUseCase,
  CreateSongStationUseCase,
  GetSongSuggestionsUseCase
}) {}
