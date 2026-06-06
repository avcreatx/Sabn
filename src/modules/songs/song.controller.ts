import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import { openApiJsonResponse } from '#common/helpers'
import { SongModel } from '#modules/songs/models'
import { SongService } from '#modules/songs/song.service'
import type { Routes } from '#common/types'

export class SongController implements Routes {
  public controller = new OpenAPIHono()
  private readonly songService = new SongService()

  public initRoutes() {
    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/songs',
        tags: ['Songs'],
        summary: 'Get songs by IDs',
        operationId: 'getSongs',
        request: {
          query: z.object({
            ids: z.string().openapi({ description: 'Comma-separated song IDs', example: '3IoDK8qI,4IoDK8qI' })
          })
        },
        responses: openApiJsonResponse(z.array(SongModel))
      }),
      async (ctx) => {
        const songs = await this.songService.getSongByIds({ songIds: ctx.req.valid('query').ids })
        return ctx.json(songs)
      }
    )

    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/songs/{id}',
        tags: ['Songs'],
        summary: 'Get a song by ID',
        operationId: 'getSongById',
        request: { params: z.object({ id: z.string().openapi({ example: '3IoDK8qI' }) }) },
        responses: openApiJsonResponse(SongModel)
      }),
      async (ctx) => {
        const songs = await this.songService.getSongByIds({ songIds: ctx.req.param('id') })
        return ctx.json(songs[0])
      }
    )

    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/songs/{id}/suggestions',
        tags: ['Songs'],
        summary: 'Get song suggestions',
        operationId: 'getSongSuggestions',
        request: {
          params: z.object({ id: z.string().openapi({ example: 'yDeAS8Eh' }) }),
          query: z.object({ limit: z.coerce.number().int().min(1).max(50).default(10) })
        },
        responses: openApiJsonResponse(z.array(SongModel))
      }),
      async (ctx) => {
        const suggestions = await this.songService.getSongSuggestions({
          songId: ctx.req.param('id'),
          limit: ctx.req.valid('query').limit
        })

        return ctx.json(suggestions)
      }
    )
  }
}
