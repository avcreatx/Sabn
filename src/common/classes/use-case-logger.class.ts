import { consola, type ConsolaInstance } from 'consola'

type LogContext = Record<string, unknown>

export class UseCaseLogger {
  private readonly logger: ConsolaInstance

  constructor(action: string) {
    this.logger = consola.withTag(action)
  }

  info(message: string, params?: LogContext): void {
    this.logger.info(message, params)
  }

  warn(message: string, params?: LogContext): void {
    this.logger.warn(message, params)
  }

  error(message: string, error?: unknown, params?: LogContext): void {
    this.logger.error(message, { ...params, error })
  }
}
