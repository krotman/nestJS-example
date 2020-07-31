import { ServiceBasePostgreSQL } from '../services/base-postgres.service';
import { getConnection, QueryRunner } from 'typeorm';

export async function startTransaction() {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.startTransaction();
    return queryRunner;
}

// DONT SAY ANYTHING. IT IS PERFECT. My precious creation...
export function startTransactionOnServices<T1>(services: [T1]): Promise<[T1, QueryRunner]>;
export function startTransactionOnServices<T1, T2>(services: [T1, T2]): Promise<[T1, T2, QueryRunner]>;
export function startTransactionOnServices<T1, T2, T3>(services: [T1, T2, T3]): Promise<[T1, T2, T3, QueryRunner]>;
export function startTransactionOnServices<T1, T2, T3, T4>(
    services: [T1, T2, T3, T4],
): Promise<[T1, T2, T3, T4, QueryRunner]>;
export function startTransactionOnServices<T1, T2, T3, T4, T5>(
    services: [T1, T2, T3, T4, T5],
): Promise<[T1, T2, T3, T4, T5, QueryRunner]>;
export async function startTransactionOnServices(services: Array<ServiceBasePostgreSQL<any>>) {
    const queryRunner = await startTransaction();
    return [...services.map(x => x.startTransaction(queryRunner)), queryRunner];
}
