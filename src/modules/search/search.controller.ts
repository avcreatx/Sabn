import { createRoute, z } from '@hono/zod-openapi'
import { Controller } from '#common/classes'
import { openApiJsonResponse, openApiPaginatedResponse } from '#common/helpers'
import { AlbumSummaryModel } from '#modules/albums/album.model'
import { ArtistSummaryModel } from '#modules/artists/models'
import { PlaylistSummaryModel } from '#modules/playlists/playlist.model'
import { SearchQuery, SearchResultModel } from '#modules/search/models'
import { SearchService } from '#modules/search/search.service'
import { SongModel } from '#modules/songs/models'

export class SearchController extends Controller {
  private readonly searchService = new SearchService()

  public search = this.controller.openapi(
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

  public searchSongs = this.controller.openapi(
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

  public searchAlbums = this.controller.openapi(
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

  public searchArtists = this.controller.openapi(
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

  public searchPlaylists = this.controller.openapi(
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
