import { z } from 'zod'
import { ImageLinkModel } from '#common/models'
import { AlbumSummaryModel } from '#modules/albums/album.model'
import { ArtistSummaryModel } from '#modules/artists/models'
import { RawArtistMapGroupModel } from '#modules/artists/models/artist-map.model'
import { PlaylistSummaryModel } from '#modules/playlists/playlist.model'
import { SongSummaryModel } from '#modules/songs/models'

export const FeedItemAPIResponseModel = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().nullish(),
  type: z.string(),
  image: z.string(),
  perma_url: z.string(),
  language: z.string().nullish(),
  year: z.string().nullish(),
  play_count: z.string().nullish(),
  explicit_content: z.string().nullish(),
  count: z.number().nullish(),
  more_info: z
    .object({
      song_count: z.string(),
      music: z.string(),
      firstname: z.string(),
      follower_count: z.string(),
      album: z.string(),
      album_id: z.string(),
      album_url: z.string(),
      primary_artists: z.string(),
      singers: z.string(),
      artistMap: z.union([RawArtistMapGroupModel, z.array(z.unknown())])
    })
    .partial()
    .nullish()
})

export const FeedListAPIResponseModel = z.array(FeedItemAPIResponseModel)

export const LaunchDataAPIResponseModel = z.object({
  new_trending: z.array(FeedItemAPIResponseModel).nullish(),
  new_albums: z.array(FeedItemAPIResponseModel).nullish(),
  top_playlists: z.array(FeedItemAPIResponseModel).nullish(),
  charts: z.array(FeedItemAPIResponseModel).nullish(),
  radio: z.array(FeedItemAPIResponseModel).nullish(),
  artist_recos: z.array(FeedItemAPIResponseModel).nullish()
})

export const FeaturedPlaylistsAPIResponseModel = z.object({
  data: z.array(FeedItemAPIResponseModel).nullish(),
  count: z.number().nullish(),
  last_page: z.boolean().nullish()
})

export const RadioStationSummaryModel = z.object({
  type: z.literal('radio_station'),
  id: z.string(),
  name: z.string(),
  url: z.string(),
  image: z.array(ImageLinkModel),
  subtitle: z.string().nullable()
})

export const EntityCardModel = z.discriminatedUnion('type', [
  SongSummaryModel,
  AlbumSummaryModel,
  ArtistSummaryModel,
  PlaylistSummaryModel,
  RadioStationSummaryModel
])

export const ModulesModel = z.object({
  trending: z.array(EntityCardModel),
  albums: z.array(AlbumSummaryModel),
  playlists: z.array(PlaylistSummaryModel),
  charts: z.array(PlaylistSummaryModel),
  radioStations: z.array(RadioStationSummaryModel),
  artistRecommendations: z.array(ArtistSummaryModel)
})
