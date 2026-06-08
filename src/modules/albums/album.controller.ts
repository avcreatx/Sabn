import { createRoute, z } from '@hono/zod-openapi'
import { Controller } from '#common/classes'
import { openApiJsonResponse } from '#common/helpers'
import { AlbumModel } from '#modules/albums/album.model'
import { AlbumService } from '#modules/albums/album.service'

export class AlbumController extends Controller {
  private readonly albumService = new AlbumService()

  public getAlbumById = this.controller.openapi(
    createRoute({
      method: 'get',
      path: '/albums/{id}',
      tags: ['Albums'],
      summary: 'Get an album by ID',
      operationId: 'getAlbumById',
      request: { params: z.object({ id: z.string().openapi({ example: '23241654' }) }) },
      responses: openApiJsonResponse(AlbumModel)
    }),
    async (ctx) => {
      const album = await this.albumService.getAlbumById(ctx.req.param('id'))
      return ctx.json(album)
    }
  )
}
