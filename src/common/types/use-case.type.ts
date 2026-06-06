interface Obj {
  [key: string]: any
}

export interface IUseCase<T extends Obj | string = any, TRes = any> {
  execute: (params: T) => Promise<TRes>
}

export type UseCaseConstructor = new () => { execute: (...args: any[]) => Promise<any> }

// 'GetAlbumByIdUseCase' -> 'getAlbumById'
export type UseCaseKey<T extends string> = T extends `${infer Prefix}UseCase` ? Uncapitalize<Prefix> : never

// Maps a record of use-case constructors to a service shape: { getAlbumById: (...) => Promise<...>, ... }
export type GetUseCases<T extends Record<string, UseCaseConstructor>> = {
  [K in keyof T as UseCaseKey<K & string>]: InstanceType<T[K]>['execute']
}
