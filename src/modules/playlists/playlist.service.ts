import { BaseUseCaseService } from '#common/classes'
import { GetPlaylistByIdUseCase, GetPlaylistByLinkUseCase } from '#modules/playlists/use-cases'

export class PlaylistService extends BaseUseCaseService({ GetPlaylistByIdUseCase, GetPlaylistByLinkUseCase }) {}
