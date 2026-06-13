import { createImageLinks } from '#common/helpers'
import { toBoolean, toNumber, toText } from '#common/utils'
import { toArtists } from '#modules/artists/artist.helper'
import type { AlbumSummaryModel } from '#modules/albums/album.model'
import type { ArtistSummaryModel } from '#modules/artists/models'
import type { EntityCardModel } from '#modules/browse/models'
import type { PlaylistSummaryModel } from '#modules/playlists/playlist.model'
import type {
  SearchAlbumAPIResponseModel,
  SearchAPIResponseModel,
  SearchArtistAPIResponseModel,
  SearchPlaylistAPIResponseModel,
  SearchResultModel
} from '#modules/search/models'
import type { SongSummaryModel } from '#modules/songs/models'
import type { z } from 'zod'

export const toAlbumSummary = (
  item: z.infer<typeof SearchAlbumAPIResponseModel>['results'][number]
): z.infer<typeof AlbumSummaryModel> => ({
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
  item: z.infer<typeof SearchArtistAPIResponseModel>['results'][number]
): z.infer<typeof ArtistSummaryModel> => ({
  type: 'artist',
  id: item.id,
  name: item.name,
  url: item.perma_url,
  image: createImageLinks(item.image),
  role: toText(item.role)
})

export const toPlaylistSummary = (
  item: z.infer<typeof SearchPlaylistAPIResponseModel>['results'][number]
): z.infer<typeof PlaylistSummaryModel> => ({
  type: 'playlist',
  id: item.id,
  name: item.title,
  url: item.perma_url,
  image: createImageLinks(item.image),
  songCount: toNumber(item.more_info?.song_count),
  followerCount: null,
  language: toText(item.more_info?.language),
  explicitContent: toBoolean(item.explicit_content)
})

const toCard = (
  item: z.infer<typeof SearchAPIResponseModel>['topquery']['data'][number]
): z.infer<typeof EntityCardModel> | null => {
  const card = { id: item.id, name: item.title, url: item.perma_url ?? '', image: createImageLinks(item.image) }
  switch (item.type) {
    case 'song':
      return {
        type: 'song',
        ...card,
        album: toText(item.more_info?.album),
        artists: toArtists(undefined, item.more_info?.primary_artists),
        language: toText(item.more_info?.language),
        explicitContent: toBoolean(item.explicit_content)
      }
    case 'album':
      return {
        type: 'album',
        ...card,
        artists: [],
        year: null,
        songCount: null,
        language: toText(item.more_info?.language),
        explicitContent: toBoolean(item.explicit_content)
      }
    case 'artist':
      return { type: 'artist', ...card, role: null }
    case 'playlist':
      return {
        type: 'playlist',
        ...card,
        songCount: null,
        followerCount: null,
        language: toText(item.more_info?.language),
        explicitContent: toBoolean(item.explicit_content)
      }
    default:
      return null
  }
}

export const toSearchResult = (data: z.infer<typeof SearchAPIResponseModel>): z.infer<typeof SearchResultModel> => ({
  topQuery: data.topquery.data.map(toCard).filter((card): card is z.infer<typeof EntityCardModel> => card !== null),
  songs: data.songs.data.map(
    (song): z.infer<typeof SongSummaryModel> => ({
      type: 'song',
      id: song.id,
      name: song.title,
      url: song.perma_url,
      image: createImageLinks(song.image),
      album: toText(song.more_info?.album),
      artists: toArtists(undefined, song.more_info?.primary_artists),
      language: toText(song.more_info?.language),
      explicitContent: toBoolean(song.explicit_content)
    })
  ),
  albums: data.albums.data.map(
    (album): z.infer<typeof AlbumSummaryModel> => ({
      type: 'album',
      id: album.id,
      name: album.title,
      url: album.perma_url,
      image: createImageLinks(album.image),
      artists: toArtists(undefined, album.more_info?.music),
      year: toText(album.more_info?.year),
      songCount: null,
      language: toText(album.more_info?.language),
      explicitContent: toBoolean(album.explicit_content)
    })
  ),
  artists: data.artists.data.map(
    (artist): z.infer<typeof ArtistSummaryModel> => ({
      type: 'artist',
      id: artist.id,
      name: artist.title,
      url: '',
      image: createImageLinks(artist.image),
      role: null
    })
  ),
  playlists: data.playlists.data.map(
    (playlist): z.infer<typeof PlaylistSummaryModel> => ({
      type: 'playlist',
      id: playlist.id,
      name: playlist.title,
      url: playlist.perma_url,
      image: createImageLinks(playlist.image),
      songCount: null,
      followerCount: null,
      language: toText(playlist.more_info?.language),
      explicitContent: toBoolean(playlist.explicit_content)
    })
  )
})
