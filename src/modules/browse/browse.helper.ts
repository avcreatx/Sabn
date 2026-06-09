import { createImageLinks } from '#common/helpers'
import { toBoolean, toNumber, toText } from '#common/utils'
import type {
  AlbumSummary,
  ArtistSummary,
  EntityCard,
  PlaylistSummary,
  RadioStationSummary,
  SongSummary
} from '#common/models'
import type { FeedItem, LaunchDataAPIResponseModel, ModulesModel } from '#modules/browse/models'
import type { z } from 'zod'

export const toSongSummary = (i: FeedItem): SongSummary => ({
  type: 'song',
  id: i.id,
  name: i.title,
  url: i.perma_url,
  image: createImageLinks(i.image),
  album: toText(i.more_info?.album),
  artists: toText(i.more_info?.primary_artists),
  language: toText(i.more_info?.language),
  explicitContent: toBoolean(i.explicit_content)
})

export const toAlbumSummary = (i: FeedItem): AlbumSummary => ({
  type: 'album',
  id: i.id,
  name: i.title,
  url: i.perma_url,
  image: createImageLinks(i.image),
  artist: toText(i.more_info?.music),
  year: toText(i.more_info?.year),
  songCount: toNumber(i.more_info?.song_count),
  language: toText(i.more_info?.language),
  explicitContent: toBoolean(i.explicit_content)
})

export const toArtistSummary = (i: FeedItem): ArtistSummary => ({
  type: 'artist',
  id: i.id,
  name: i.title,
  url: i.perma_url,
  image: createImageLinks(i.image),
  role: toText(i.subtitle)
})

export const toPlaylistSummary = (i: FeedItem): PlaylistSummary => ({
  type: 'playlist',
  id: i.id,
  name: i.title,
  url: i.perma_url,
  image: createImageLinks(i.image),
  songCount: toNumber(i.more_info?.song_count) ?? i.count ?? null,
  followerCount: toNumber(i.more_info?.follower_count),
  language: toText(i.more_info?.language),
  explicitContent: toBoolean(i.explicit_content)
})

export const toRadioStationSummary = (i: FeedItem): RadioStationSummary => ({
  type: 'radio_station',
  id: i.id,
  name: i.title,
  url: i.perma_url,
  image: createImageLinks(i.image),
  subtitle: toText(i.subtitle)
})

/** Maps any feed item to its typed card, or null for unsupported types. */
export const toCard = (i: FeedItem): EntityCard | null => {
  switch (i.type) {
    case 'song':
      return toSongSummary(i)
    case 'album':
      return toAlbumSummary(i)
    case 'artist':
      return toArtistSummary(i)
    case 'playlist':
      return toPlaylistSummary(i)
    case 'radio_station':
    case 'station':
    case 'featured_station':
      return toRadioStationSummary(i)
    default:
      return null
  }
}

export const toCards = (items: FeedItem[] = []): EntityCard[] =>
  items.map(toCard).filter((c): c is EntityCard => c !== null)

export const createModulesPayload = (
  data: z.infer<typeof LaunchDataAPIResponseModel>
): z.infer<typeof ModulesModel> => ({
  trending: toCards(data.new_trending ?? []),
  albums: (data.new_albums ?? []).map(toAlbumSummary),
  playlists: (data.top_playlists ?? []).map(toPlaylistSummary),
  charts: (data.charts ?? []).map(toPlaylistSummary),
  radioStations: (data.radio ?? []).map(toRadioStationSummary),
  artistRecommendations: (data.artist_recos ?? []).map(toArtistSummary)
})
