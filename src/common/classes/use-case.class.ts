import { UseCaseLogger } from './use-case-logger.class'

export abstract class UseCase<TArgs, TResult> {
  protected readonly logger = new UseCaseLogger(this.constructor.name)

  abstract execute(args: TArgs): Promise<TResult>
}
