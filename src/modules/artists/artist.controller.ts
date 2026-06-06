import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import { openApiJsonResponse, openApiPaginatedResponse } from '#common/helpers'
import { AlbumModel } from '#modules/albums/album.model'
import { ArtistService } from '#modules/artists/artist.service'
import { ArtistModel } from '#modules/artists/models'
import { SongModel } from '#modules/songs/models'
import type { Routes } from '#common/types'

export class ArtistController implements Routes {
  public controller = new OpenAPIHono()
  private readonly artistService = new ArtistService()

  public initRoutes() {
    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/artists/{id}',
        tags: ['Artists'],
        summary: 'Get an artist by ID',
        operationId: 'getArtistById',
        request: {
          params: z.object({ id: z.string().openapi({ example: '1274170' }) }),
          query: z.object({
            page: z.coerce.number().int().min(0).optional(),
            songCount: z.coerce.number().int().min(1).max(50).optional(),
            albumCount: z.coerce.number().int().min(1).max(50).optional(),
            sortBy: z.enum(['popularity', 'latest', 'alphabetical']).optional(),
            sortOrder: z.enum(['asc', 'desc']).optional()
          })
        },
        responses: openApiJsonResponse(ArtistModel)
      }),
      async (ctx) => {
        const {
          page = 0,
          songCount = 10,
          albumCount = 10,
          sortBy = 'popularity',
          sortOrder = 'asc'
        } = ctx.req.valid('query')
        return ctx.json(
          await this.artistService.getArtistById({
            artistId: ctx.req.param('id'),
            page,
            songCount,
            albumCount,
            sortBy,
            sortOrder
          })
        )
      }
    )

    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/artists/{id}/songs',
        tags: ['Artists'],
        summary: "Get an artist's songs",
        operationId: 'getArtistSongs',
        request: {
          params: z.object({ id: z.string().openapi({ example: '1274170' }) }),
          query: z.object({
            page: z.coerce.number().int().min(0).optional(),
            sortBy: z.enum(['popularity', 'latest', 'alphabetical']).optional(),
            sortOrder: z.enum(['asc', 'desc']).optional()
          })
        },
        responses: openApiPaginatedResponse(SongModel)
      }),
      async (ctx) => {
        const { page = 1, sortBy = 'popularity', sortOrder = 'desc' } = ctx.req.valid('query')
        return ctx.json(
          await this.artistService.getArtistSongs({ artistId: ctx.req.param('id'), page, sortBy, sortOrder })
        )
      }
    )

    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/artists/{id}/albums',
        tags: ['Artists'],
        summary: "Get an artist's albums",
        operationId: 'getArtistAlbums',
        request: {
          params: z.object({ id: z.string().openapi({ example: '1274170' }) }),
          query: z.object({
            page: z.coerce.number().int().min(0).optional(),
            sortBy: z.enum(['popularity', 'latest', 'alphabetical']).optional(),
            sortOrder: z.enum(['asc', 'desc']).optional()
          })
        },
        responses: openApiPaginatedResponse(AlbumModel)
      }),
      async (ctx) => {
        const { page = 1, sortBy = 'popularity', sortOrder = 'desc' } = ctx.req.valid('query')
        return ctx.json(
          await this.artistService.getArtistAlbums({ artistId: ctx.req.param('id'), page, sortBy, sortOrder })
        )
      }
    )
  }
}
