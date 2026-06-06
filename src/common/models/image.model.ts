import { z } from 'zod'

export const ImageLinkModel = z.object({ quality: z.string(), url: z.string() })
