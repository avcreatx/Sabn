import {
  AlbumSummaryModel,
  ArtistSummaryModel,
  EntityCardModel,
  PlaylistSummaryModel,
  RadioStationSummaryModel
} from '#common/models'
import { z } from 'zod'

// ---------------- Upstream (raw JioSaavn feed item) ----------------

export const FeedItemAPIResponseModel = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  type: z.string(),
  image: z.string(),
  perma_url: z.string(),
  explicit_content: z.string().optional(),
  count: z.number().optional(),
  more_info: z
    .object({
      year: z.string(),
      song_count: z.string(),
      language: z.string(),
      music: z.string(),
      firstname: z.string(),
      follower_count: z.string(),
      album: z.string(),
      primary_artists: z.string(),
      singers: z.string()
    })
    .partial()
    .optional()
})

export const FeedListAPIResponseModel = z.array(FeedItemAPIResponseModel)

export const LaunchDataAPIResponseModel = z.object({
  new_trending: z.array(FeedItemAPIResponseModel).optional(),
  new_albums: z.array(FeedItemAPIResponseModel).optional(),
  top_playlists: z.array(FeedItemAPIResponseModel).optional(),
  charts: z.array(FeedItemAPIResponseModel).optional(),
  radio: z.array(FeedItemAPIResponseModel).optional(),
  artist_recos: z.array(FeedItemAPIResponseModel).optional()
})

export const FeaturedPlaylistsAPIResponseModel = z.object({
  data: z.array(FeedItemAPIResponseModel),
  count: z.number().optional(),
  last_page: z.boolean().optional()
})

// ---------------- Public (home feed) ----------------

export const ModulesModel = z.object({
  trending: z.array(EntityCardModel),
  albums: z.array(AlbumSummaryModel),
  playlists: z.array(PlaylistSummaryModel),
  charts: z.array(PlaylistSummaryModel),
  radioStations: z.array(RadioStationSummaryModel),
  artistRecommendations: z.array(ArtistSummaryModel)
})

export type FeedItem = z.infer<typeof FeedItemAPIResponseModel>
