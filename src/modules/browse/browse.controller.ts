import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { openApiJsonResponse, openApiPaginatedResponse } from '#common/helpers'
import { EntityCardModel, PaginationQuery, PlaylistSummaryModel } from '#common/models'
import { BrowseService } from '#modules/browse/browse.service'
import { ModulesModel } from '#modules/browse/models'
import type { Routes } from '#common/types'

export class BrowseController implements Routes {
  public controller = new OpenAPIHono()
  private readonly browseService = new BrowseService()

  public initRoutes() {
    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/browse',
        tags: ['Browse'],
        summary: 'Home feed',
        description:
          'Curated home feed — trending, new albums, top playlists, charts, radio and artist recommendations.',
        operationId: 'getModules',
        responses: openApiJsonResponse(ModulesModel)
      }),
      async (ctx) => {
        const modules = await this.browseService.getModules()
        return ctx.json(modules)
      }
    )

    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/browse/charts',
        tags: ['Browse'],
        summary: 'Charts',
        operationId: 'getCharts',
        request: { query: PaginationQuery },
        responses: openApiPaginatedResponse(PlaylistSummaryModel)
      }),
      async (ctx) => {
        const charts = await this.browseService.getCharts(ctx.req.valid('query'))
        return ctx.json(charts)
      }
    )

    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/browse/featured-playlists',
        tags: ['Browse'],
        summary: 'Featured playlists',
        operationId: 'getFeaturedPlaylists',
        request: { query: PaginationQuery },
        responses: openApiPaginatedResponse(PlaylistSummaryModel)
      }),
      async (ctx) => {
        const playlists = await this.browseService.getFeaturedPlaylists(ctx.req.valid('query'))
        return ctx.json(playlists)
      }
    )

    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/browse/top-searches',
        tags: ['Browse'],
        summary: 'Top searches',
        operationId: 'getTopSearches',
        request: { query: PaginationQuery },
        responses: openApiPaginatedResponse(EntityCardModel)
      }),
      async (ctx) => {
        const topSearches = await this.browseService.getTopSearches(ctx.req.valid('query'))
        return ctx.json(topSearches)
      }
    )
  }
}
