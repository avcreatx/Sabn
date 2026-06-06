import { z } from 'zod'

export const ErrorModel = z.object({ error: z.object({ code: z.string(), message: z.string() }) })
