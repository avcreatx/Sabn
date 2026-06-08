import { createRoute, z } from '@hono/zod-openapi'
import { Controller } from '#common/classes'
import { openApiJsonResponse } from '#common/helpers'
import { PlaylistModel } from '#modules/playlists/playlist.model'
import { PlaylistService } from '#modules/playlists/playlist.service'

export class PlaylistController extends Controller {
  private readonly playlistService = new PlaylistService()

  public getPlaylistById = this.controller.openapi(
    createRoute({
      method: 'get',
      path: '/playlists/{id}',
      tags: ['Playlists'],
      summary: 'Get a playlist by ID',
      operationId: 'getPlaylistById',
      request: {
        params: z.object({ id: z.string().openapi({ example: '82914609' }) }),
        query: z.object({
          page: z.coerce.number().int().min(0).default(0),
          limit: z.coerce.number().int().min(1).max(50).default(10)
        })
      },
      responses: openApiJsonResponse(PlaylistModel)
    }),
    async (ctx) => {
      const { page, limit } = ctx.req.valid('query')
      return ctx.json(await this.playlistService.getPlaylistById({ id: ctx.req.param('id'), page, limit }))
    }
  )
}
