import { createRoute, z } from '@hono/zod-openapi'
import { Controller } from '#common/classes'
import { openApiJsonResponse } from '#common/helpers'
import { ResolveResultModel } from '#modules/resolve/resolve.model'
import { ResolveService } from '#modules/resolve/resolve.service'

export class ResolveController extends Controller {
  private readonly resolveService = new ResolveService()

  public resolve = this.controller.openapi(
    createRoute({
      method: 'get',
      path: '/resolve',
      tags: ['Resolve'],
      summary: 'Resolve a JioSaavn share link to its entity',
      description: 'Detects whether the link is a song, album, artist or playlist and returns the resolved entity.',
      operationId: 'resolve',
      request: {
        query: z.object({
          url: z.string().url().openapi({ example: 'https://www.jiosaavn.com/song/houdini/OgwhbhtDRwM' })
        })
      },
      responses: openApiJsonResponse(ResolveResultModel)
    }),
    async (ctx) => {
      const result = await this.resolveService.resolve(ctx.req.valid('query').url)
      return ctx.json(result)
    }
  )
}
