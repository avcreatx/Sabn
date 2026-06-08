import { OpenAPIHono } from '@hono/zod-openapi'
import type { Routes } from '#common/types'

export abstract class Controller implements Routes {
  public readonly controller = new OpenAPIHono()
}
