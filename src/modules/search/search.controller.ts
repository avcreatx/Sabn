import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import { openApiJsonResponse, openApiPaginatedResponse } from '#common/helpers'
import { AlbumSummaryModel, ArtistSummaryModel, PlaylistSummaryModel } from '#common/models'
import { SearchQuery, SearchResultModel } from '#modules/search/models'
import { SearchService } from '#modules/search/search.service'
import { SongModel } from '#modules/songs/models'
import type { Routes } from '#common/types'

export class SearchController implements Routes {
  public controller = new OpenAPIHono()
  private readonly searchService = new SearchService()

  public initRoutes() {
    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/search',
        tags: ['Search'],
        summary: 'Global search',
        description: 'Search across songs, albums, artists and playlists; returns top match plus grouped results.',
        operationId: 'search',
        request: { query: z.object({ query: z.string().min(1) }) },
        responses: openApiJsonResponse(SearchResultModel)
      }),
      async (ctx) => {
        const results = await this.searchService.searchAll(ctx.req.valid('query').query)
        return ctx.json(results)
      }
    )

    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/search/songs',
        tags: ['Search'],
        summary: 'Search songs',
        operationId: 'searchSongs',
        request: { query: SearchQuery },
        responses: openApiPaginatedResponse(SongModel)
      }),
      async (ctx) => {
        const songs = await this.searchService.searchSongs(ctx.req.valid('query'))
        return ctx.json(songs)
      }
    )

    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/search/albums',
        tags: ['Search'],
        summary: 'Search albums',
        operationId: 'searchAlbums',
        request: { query: SearchQuery },
        responses: openApiPaginatedResponse(AlbumSummaryModel)
      }),
      async (ctx) => {
        const albums = await this.searchService.searchAlbums(ctx.req.valid('query'))
        return ctx.json(albums)
      }
    )

    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/search/artists',
        tags: ['Search'],
        summary: 'Search artists',
        operationId: 'searchArtists',
        request: { query: SearchQuery },
        responses: openApiPaginatedResponse(ArtistSummaryModel)
      }),
      async (ctx) => {
        const artists = await this.searchService.searchArtists(ctx.req.valid('query'))
        return ctx.json(artists)
      }
    )

    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/search/playlists',
        tags: ['Search'],
        summary: 'Search playlists',
        operationId: 'searchPlaylists',
        request: { query: SearchQuery },
        responses: openApiPaginatedResponse(PlaylistSummaryModel)
      }),
      async (ctx) => {
        const playlists = await this.searchService.searchPlaylists(ctx.req.valid('query'))
        return ctx.json(playlists)
      }
    )
  }
}
