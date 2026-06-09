import { createImageLinks } from '#common/helpers'
import { toBoolean, toNumber, toText } from '#common/utils'
import type { AlbumSummary, ArtistSummary, EntityCard, PlaylistSummary, SongSummary } from '#common/models'
import type {
  SearchAlbumAPIResponseModel,
  SearchAPIResponseModel,
  SearchArtistAPIResponseModel,
  SearchPlaylistAPIResponseModel,
  SearchResultModel
} from '#modules/search/models'
import type { z } from 'zod'

type AlbumResult = z.infer<typeof SearchAlbumAPIResponseModel>['results'][number]
type ArtistResult = z.infer<typeof SearchArtistAPIResponseModel>['results'][number]
type PlaylistResult = z.infer<typeof SearchPlaylistAPIResponseModel>['results'][number]
type TopQueryItem = z.infer<typeof SearchAPIResponseModel>['topquery']['data'][number]

// ---- per-type search results → summaries ----

export const albumResultToSummary = (i: AlbumResult): AlbumSummary => ({
  type: 'album',
  id: i.id,
  name: i.title,
  url: i.perma_url,
  image: createImageLinks(i.image),
  artist: toText(i.more_info?.music),
  year: toText(i.year),
  songCount: toNumber(i.more_info?.song_count),
  language: toText(i.language),
  explicitContent: toBoolean(i.explicit_content)
})

export const artistResultToSummary = (i: ArtistResult): ArtistSummary => ({
  type: 'artist',
  id: i.id,
  name: i.name,
  url: i.perma_url,
  image: createImageLinks(i.image),
  role: toText(i.role)
})

export const playlistResultToSummary = (i: PlaylistResult): PlaylistSummary => ({
  type: 'playlist',
  id: i.id,
  name: i.title,
  url: i.perma_url,
  image: createImageLinks(i.image),
  songCount: toNumber(i.more_info?.song_count),
  followerCount: null,
  language: toText(i.more_info?.language),
  explicitContent: toBoolean(i.explicit_content)
})

// ---- global search (autocomplete) → grouped summaries + top cards ----

const topQueryToCard = (i: TopQueryItem): EntityCard | null => {
  const card = { id: i.id, name: i.title, url: i.perma_url ?? '', image: createImageLinks(i.image) }
  switch (i.type) {
    case 'song':
      return {
        type: 'song',
        ...card,
        album: toText(i.more_info?.album),
        artists: toText(i.more_info?.primary_artists),
        language: toText(i.more_info?.language),
        explicitContent: toBoolean(i.explicit_content)
      }
    case 'album':
      return {
        type: 'album',
        ...card,
        artist: null,
        year: null,
        songCount: null,
        language: toText(i.more_info?.language),
        explicitContent: toBoolean(i.explicit_content)
      }
    case 'artist':
      return { type: 'artist', ...card, role: null }
    case 'playlist':
      return {
        type: 'playlist',
        ...card,
        songCount: null,
        followerCount: null,
        language: toText(i.more_info?.language),
        explicitContent: toBoolean(i.explicit_content)
      }
    default:
      return null
  }
}

export const createSearchPayload = (
  data: z.infer<typeof SearchAPIResponseModel>
): z.infer<typeof SearchResultModel> => ({
  topQuery: data.topquery.data.map(topQueryToCard).filter((c): c is EntityCard => c !== null),
  songs: data.songs.data.map(
    (s): SongSummary => ({
      type: 'song',
      id: s.id,
      name: s.title,
      url: s.perma_url,
      image: createImageLinks(s.image),
      album: toText(s.more_info?.album),
      artists: toText(s.more_info?.primary_artists),
      language: toText(s.more_info?.language),
      explicitContent: toBoolean(s.explicit_content)
    })
  ),
  albums: data.albums.data.map(
    (a): AlbumSummary => ({
      type: 'album',
      id: a.id,
      name: a.title,
      url: a.perma_url,
      image: createImageLinks(a.image),
      artist: toText(a.more_info?.music),
      year: toText(a.more_info?.year),
      songCount: null,
      language: toText(a.more_info?.language),
      explicitContent: toBoolean(a.explicit_content)
    })
  ),
  artists: data.artists.data.map(
    (a): ArtistSummary => ({
      type: 'artist',
      id: a.id,
      name: a.title,
      url: '',
      image: createImageLinks(a.image),
      role: null
    })
  ),
  playlists: data.playlists.data.map(
    (p): PlaylistSummary => ({
      type: 'playlist',
      id: p.id,
      name: p.title,
      url: p.perma_url,
      image: createImageLinks(p.image),
      songCount: null,
      followerCount: null,
      language: toText(p.more_info?.language),
      explicitContent: toBoolean(p.explicit_content)
    })
  )
})
