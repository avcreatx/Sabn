import type { z } from 'zod'

export const useCase = <TOutput extends z.ZodType>(output: TOutput) => {
  abstract class UseCase {
    protected readonly outputSchema = output
    abstract execute(args: unknown): Promise<z.infer<TOutput>>
  }
  return UseCase
}
