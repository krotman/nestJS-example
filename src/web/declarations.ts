import * as _APIEntities from '../api/public-api';
export type DeepPartial<T> = {
    /* ¯\_(ツ)_/¯ */
    [P in keyof T]?: T[P] extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T[P] extends ReadonlyArray<infer Q>
        ? ReadonlyArray<DeepPartial<Q>>
        : DeepPartial<T[P]>;
};

export namespace APIEntities {
    export type Administrator = DeepPartial<_APIEntities.Administrator>;
    export type MongoDBCat = DeepPartial<_APIEntities.MongoDBCat>;
    export type PostgreSQLDog = DeepPartial<_APIEntities.PostgreSQLDog>;
}
