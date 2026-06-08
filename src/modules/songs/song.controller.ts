import { createRoute, z } from '@hono/zod-openapi'
import { Controller } from '#common/classes'
import { openApiJsonResponse } from '#common/helpers'
import { SongModel } from '#modules/songs/models'
import { SongService } from '#modules/songs/song.service'

export class SongController extends Controller {
  private readonly songService = new SongService()

  public getSongs = this.controller.openapi(
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

  public getSongById = this.controller.openapi(
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

  public getSongSuggestions = this.controller.openapi(
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
