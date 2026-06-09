import { createImageLinks } from '#common/helpers'
import { safeJsonParse, toList, toNumber, toText } from '#common/utils'
import { createAlbumPayload } from '#modules/albums/album.helper'
import { createSongPayload } from '#modules/songs/song.helper'
import type { ArtistMapModel, ArtistModel, RawArtistMapModel, RawArtistModel } from '#modules/artists/models'
import type { z } from 'zod'

export const createArtistPayload = (artist: z.infer<typeof RawArtistModel>): z.infer<typeof ArtistModel> => ({
  id: artist.artistId || artist.id || '',
  name: artist.name,
  url: artist.urls?.overview || artist.perma_url || '',
  type: artist.type,
  followerCount: toNumber(artist.follower_count),
  fanCount: toNumber(artist.fan_count),
  isVerified: artist.isVerified || null,
  dominantLanguage: toText(artist.dominantLanguage),
  dominantType: toText(artist.dominantType),
  bio: safeJsonParse(artist.bio),
  dob: toText(artist.dob),
  fb: toText(artist.fb),
  twitter: toText(artist.twitter),
  wiki: toText(artist.wiki),
  availableLanguages: artist.availableLanguages ?? [],
  isRadioPresent: artist.isRadioPresent || null,
  image: createImageLinks(artist.image),
  topSongs: toList(artist.topSongs, createSongPayload),
  topAlbums: toList(artist.topAlbums, createAlbumPayload),
  singles: toList(artist.singles, createSongPayload),
  latestRelease: toList(artist.latest_release, (r) => ({
    id: r.id,
    name: r.title,
    type: r.type,
    url: r.perma_url,
    image: createImageLinks(r.image)
  })),
  similarArtists: toList(artist.similarArtists, (s) => ({
    id: s.id,
    name: s.name,
    url: s.perma_url,
    image: createImageLinks(s.image_url),
    type: s.type
  }))
})

export const createArtistMapPayload = (artist: z.infer<typeof RawArtistMapModel>): z.infer<typeof ArtistMapModel> => ({
  id: artist.id,
  name: artist.name,
  role: artist.role,
  image: createImageLinks(artist.image),
  type: artist.type,
  url: artist.perma_url
})
