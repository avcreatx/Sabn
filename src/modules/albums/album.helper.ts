import { createImageLinks } from '#common/helpers'
import { toBoolean, toList, toNumber, toText } from '#common/utils'
import { createArtistMapPayload } from '#modules/artists/artist.helper'
import { createSongPayload } from '#modules/songs/song.helper'
import type { AlbumModel, RawAlbumModel } from '#modules/albums/album.model'
import type { z } from 'zod'

export const createAlbumPayload = (album: z.infer<typeof RawAlbumModel>): z.infer<typeof AlbumModel> => ({
  id: album.id,
  name: album.title,
  description: toText(album.header_desc),
  type: album.type,
  year: toNumber(album.year),
  playCount: toNumber(album.play_count),
  language: album.language,
  explicitContent: toBoolean(album.explicit_content),
  url: album.perma_url,
  copyright: toText(album.more_info?.copyright_text),
  songCount: toNumber(album.more_info?.song_count),
  artists: {
    primary: toList(album.more_info?.artistMap?.primary_artists, createArtistMapPayload),
    featured: toList(album.more_info?.artistMap?.featured_artists, createArtistMapPayload),
    all: toList(album.more_info?.artistMap?.artists, createArtistMapPayload)
  },
  image: createImageLinks(album.image),
  songs: toList(album.list, createSongPayload)
})
