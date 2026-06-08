import { createRoute } from '@hono/zod-openapi'
import { Controller } from '#common/classes'
import { openApiJsonResponse, openApiPaginatedResponse } from '#common/helpers'
import { EntityCardModel, PaginationQuery, PlaylistSummaryModel } from '#common/models'
import { BrowseService } from '#modules/browse/browse.service'
import { ModulesModel } from '#modules/browse/models'

export class BrowseController extends Controller {
  private readonly browseService = new BrowseService()

  public getModules = this.controller.openapi(
    createRoute({
      method: 'get',
      path: '/browse',
      tags: ['Browse'],
      summary: 'Home feed',
      description: 'Curated home feed — trending, new albums, top playlists, charts, radio and artist recommendations.',
      operationId: 'getModules',
      responses: openApiJsonResponse(ModulesModel)
    }),
    async (ctx) => {
      const modules = await this.browseService.getModules()
      return ctx.json(modules)
    }
  )

  public getCharts = this.controller.openapi(
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

  public getFeaturedPlaylists = this.controller.openapi(
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

  public getTopSearches = this.controller.openapi(
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
