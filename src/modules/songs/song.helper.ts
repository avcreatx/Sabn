import { createDownloadLinks, createImageLinks } from '#common/helpers'
import { toBoolean, toList, toNumber, toText } from '#common/utils'
import { createArtistMapPayload } from '#modules/artists/artist.helper'
import type { RawSongModel, SongModel } from '#modules/songs/models'
import type { z } from 'zod'

export const createSongPayload = (song: z.infer<typeof RawSongModel>): z.infer<typeof SongModel> => ({
  id: song.id,
  name: song.title,
  type: song.type,
  year: toNumber(song.year),
  releaseDate: toText(song.more_info?.release_date),
  duration: toNumber(song.more_info?.duration),
  label: toText(song.more_info?.label),
  explicitContent: toBoolean(song.explicit_content),
  playCount: toNumber(song.play_count),
  language: song.language,
  hasLyrics: toBoolean(song.more_info?.has_lyrics),
  lyricsId: toText(song.more_info?.lyrics_id),
  url: song.perma_url,
  copyright: toText(song.more_info?.copyright_text),
  album: {
    id: toText(song.more_info?.album_id),
    name: toText(song.more_info?.album),
    url: toText(song.more_info?.album_url)
  },
  artists: {
    primary: toList(song.more_info?.artistMap?.primary_artists, createArtistMapPayload),
    featured: toList(song.more_info?.artistMap?.featured_artists, createArtistMapPayload),
    all: toList(song.more_info?.artistMap?.artists, createArtistMapPayload)
  },
  image: createImageLinks(song.image),
  downloadUrl: createDownloadLinks(song.more_info?.encrypted_media_url)
})
