import type { GetUseCases, UseCaseConstructor } from '#common/types'

export const BaseUseCaseService = <T extends Record<string, UseCaseConstructor>>(useCases: T) => {
  class UseCaseService {
    constructor() {
      for (const [name, UseCaseClass] of Object.entries(useCases)) {
        const instance = new UseCaseClass()
        const key = name.charAt(0).toLowerCase() + name.slice(1).replace('UseCase', '')
        ;(this as Record<string, unknown>)[key] = instance.execute.bind(instance)
      }
    }
  }

  return UseCaseService as new () => GetUseCases<T>
}
