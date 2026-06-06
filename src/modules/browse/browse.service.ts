import { BaseUseCaseService } from '#common/classes'
import {
  GetChartsUseCase,
  GetFeaturedPlaylistsUseCase,
  GetModulesUseCase,
  GetTopSearchesUseCase
} from '#modules/browse/use-cases'

export class BrowseService extends BaseUseCaseService({
  GetModulesUseCase,
  GetChartsUseCase,
  GetFeaturedPlaylistsUseCase,
  GetTopSearchesUseCase
}) {}
