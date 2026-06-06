import { z } from 'zod'
import { ImageLinkModel } from './image.model'

const base = {
  id: z.string(),
  name: z.string(),
  url: z.string(),
  image: z.array(ImageLinkModel)
}

export const SongSummaryModel = z.object({
  type: z.literal('song'),
  ...base,
  album: z.string().nullable(),
  artists: z.string().nullable(),
  language: z.string().nullable(),
  explicitContent: z.boolean()
})

export const AlbumSummaryModel = z.object({
  type: z.literal('album'),
  ...base,
  artist: z.string().nullable(),
  year: z.string().nullable(),
  songCount: z.number().nullable(),
  language: z.string().nullable(),
  explicitContent: z.boolean()
})

export const ArtistSummaryModel = z.object({
  type: z.literal('artist'),
  ...base,
  role: z.string().nullable()
})

export const PlaylistSummaryModel = z.object({
  type: z.literal('playlist'),
  ...base,
  songCount: z.number().nullable(),
  followerCount: z.number().nullable(),
  language: z.string().nullable(),
  explicitContent: z.boolean()
})

export const RadioStationSummaryModel = z.object({
  type: z.literal('radio_station'),
  ...base,
  subtitle: z.string().nullable()
})

/** Any list/feed item, discriminated by `type`. */
export const EntityCardModel = z.discriminatedUnion('type', [
  SongSummaryModel,
  AlbumSummaryModel,
  ArtistSummaryModel,
  PlaylistSummaryModel,
  RadioStationSummaryModel
])

export type SongSummary = z.infer<typeof SongSummaryModel>
export type AlbumSummary = z.infer<typeof AlbumSummaryModel>
export type ArtistSummary = z.infer<typeof ArtistSummaryModel>
export type PlaylistSummary = z.infer<typeof PlaylistSummaryModel>
export type RadioStationSummary = z.infer<typeof RadioStationSummaryModel>
export type EntityCard = z.infer<typeof EntityCardModel>
