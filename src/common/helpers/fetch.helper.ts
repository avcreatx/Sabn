import { consola } from 'consola'
import { HTTPException } from 'hono/http-exception'
import { userAgents } from '#common/constants'
import type { ApiContextEnum } from '#common/enums'
import type { z } from 'zod'

const logger = consola.withTag('jiosaavn:drift')

interface FetchParams<T> {
  endpoint: string
  params: Record<string, string | number>
  context?: ApiContextEnum
  schema?: z.ZodType<T>
  timeout?: number
}

const JIOSAAVN_API_URL = 'https://www.jiosaavn.com/api.php'
const DEFAULT_TIMEOUT_MS = 10_000

const request = async (url: URL, timeout: number): Promise<Response> => {
  const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)]
  try {
    return await fetch(url, {
      headers: { 'Content-Type': 'application/json', 'User-Agent': userAgent },
      signal: AbortSignal.timeout(timeout)
    })
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'TimeoutError'
    throw new HTTPException(timedOut ? 504 : 502, {
      message: timedOut ? `JioSaavn request timed out after ${timeout}ms` : 'Failed to reach JioSaavn'
    })
  }
}

export const useFetch = async <T>(args: FetchParams<T>): Promise<T> => {
  const { endpoint, params, context, schema, timeout = DEFAULT_TIMEOUT_MS } = args

  const url = new URL(JIOSAAVN_API_URL)
  const ctx = context ?? 'web6dot0'
  const search = new URLSearchParams({ __call: endpoint, _format: 'json', api_version: '4', ctx })

  for (const [key, value] of Object.entries(params)) search.append(key, String(value))

  url.search = search.toString()

  const response = await request(url, timeout)

  if (!response.ok) throw new HTTPException(502, { message: `JioSaavn responded with status ${response.status}` })

  const body = await response.json().catch(() => {
    throw new HTTPException(502, { message: 'JioSaavn returned a non-JSON response' })
  })

  if (schema) {
    const { success, data, error } = schema.safeParse(body)
    if (success) return data
    const issues = error.issues.map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`)
    logger.warn(`upstream response drift on ${endpoint}`, { issues })
  }

  return body as T
}
