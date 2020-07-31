export enum ROLE {
    ADMIN = 'ADMIN',
    USER = 'USER',
    M2M = 'M2M',
    FORGOTTEN_PASSWORD = 'FORGOTTEN_PASSWORD',
}

export interface JWTPayload {
    administratorId: string;
    role: ROLE;
}

export const SECRET = process.env.SECRET || 'secret';
export type DeepPartial<T> = {
    /* ¯\_(ツ)_/¯ */
    [P in keyof T]?: T[P] extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T[P] extends ReadonlyArray<infer Q>
        ? ReadonlyArray<DeepPartial<Q>>
        : DeepPartial<T[P]>;
};
