import { createImageLinks } from '#common/helpers'
import { toBoolean, toNumber, toText } from '#common/utils'
import { toArtists } from '#modules/artists/artist.helper'
import type { AlbumSummaryModel } from '#modules/albums/album.model'
import type { ArtistSummaryModel } from '#modules/artists/models'
import type {
  EntityCardModel,
  FeedItemAPIResponseModel,
  LaunchDataAPIResponseModel,
  ModulesModel,
  RadioStationSummaryModel
} from '#modules/browse/models'
import type { PlaylistSummaryModel } from '#modules/playlists/playlist.model'
import type { SongSummaryModel } from '#modules/songs/models'
import type { z } from 'zod'

export const toSongSummary = (item: z.infer<typeof FeedItemAPIResponseModel>): z.infer<typeof SongSummaryModel> => ({
  type: 'song',
  id: item.id,
  name: item.title,
  url: item.perma_url,
  image: createImageLinks(item.image),
  album: toText(item.more_info?.album),
  artists: toArtists(item.more_info?.artistMap, item.more_info?.primary_artists),
  language: toText(item.language),
  explicitContent: toBoolean(item.explicit_content)
})

export const toAlbumSummary = (item: z.infer<typeof FeedItemAPIResponseModel>): z.infer<typeof AlbumSummaryModel> => ({
  type: 'album',
  id: item.id,
  name: item.title,
  url: item.perma_url,
  image: createImageLinks(item.image),
  artists: toArtists(item.more_info?.artistMap, item.more_info?.music),
  year: toText(item.year),
  songCount: toNumber(item.more_info?.song_count),
  language: toText(item.language),
  explicitContent: toBoolean(item.explicit_content)
})

export const toArtistSummary = (
  item: z.infer<typeof FeedItemAPIResponseModel>
): z.infer<typeof ArtistSummaryModel> => ({
  type: 'artist',
  id: item.id,
  name: item.title,
  url: item.perma_url,
  image: createImageLinks(item.image),
  role: toText(item.subtitle)
})

export const toPlaylistSummary = (
  item: z.infer<typeof FeedItemAPIResponseModel>
): z.infer<typeof PlaylistSummaryModel> => ({
  type: 'playlist',
  id: item.id,
  name: item.title,
  url: item.perma_url,
  image: createImageLinks(item.image),
  songCount: toNumber(item.more_info?.song_count) ?? item.count ?? null,
  followerCount: toNumber(item.more_info?.follower_count),
  language: toText(item.language),
  explicitContent: toBoolean(item.explicit_content)
})

export const toRadioStationSummary = (
  item: z.infer<typeof FeedItemAPIResponseModel>
): z.infer<typeof RadioStationSummaryModel> => ({
  type: 'radio_station',
  id: item.id,
  name: item.title,
  url: item.perma_url,
  image: createImageLinks(item.image),
  subtitle: toText(item.subtitle)
})

export const toCard = (item: z.infer<typeof FeedItemAPIResponseModel>): z.infer<typeof EntityCardModel> | null => {
  switch (item.type) {
    case 'song':
      return toSongSummary(item)
    case 'album':
      return toAlbumSummary(item)
    case 'artist':
      return toArtistSummary(item)
    case 'playlist':
      return toPlaylistSummary(item)
    case 'radio_station':
    case 'station':
    case 'featured_station':
      return toRadioStationSummary(item)
    default:
      return null
  }
}

export const toCards = (items: z.infer<typeof FeedItemAPIResponseModel>[] = []): z.infer<typeof EntityCardModel>[] =>
  items.map(toCard).filter((card): card is z.infer<typeof EntityCardModel> => card !== null)

export const toModules = (data: z.infer<typeof LaunchDataAPIResponseModel>): z.infer<typeof ModulesModel> => ({
  trending: toCards(data.new_trending ?? []),
  albums: (data.new_albums ?? []).map(toAlbumSummary),
  playlists: (data.top_playlists ?? []).map(toPlaylistSummary),
  charts: (data.charts ?? []).map(toPlaylistSummary),
  radioStations: (data.radio ?? []).map(toRadioStationSummary),
  artistRecommendations: (data.artist_recos ?? []).map(toArtistSummary)
})
