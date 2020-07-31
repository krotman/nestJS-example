import {
    FindManyOptions,
    FindConditions,
    DeepPartial,
    Repository,
    FindOneOptions,
    getConnection,
    EntityManager,
    QueryRunner,
} from 'typeorm';
import { CommonCrudPostgreSQL } from '../common/crud-postgres';
import { startTransaction } from '../common/services';

export abstract class ServiceBasePostgreSQL<T> {
    public queryRunner: QueryRunner;
    constructor(public repository: Repository<T>) {}

    protected abstract withTransactionFactory(entityManager: EntityManager): ServiceBasePostgreSQL<T>;

    startTransaction(): Promise<this>;
    startTransaction(queryRunner?: QueryRunner): this;
    startTransaction(queryRunner?: QueryRunner) {
        const fallback = () => {
            const newInstance = this.withTransactionFactory(queryRunner.manager);
            newInstance.queryRunner = queryRunner;
            return newInstance;
        };
        if (!queryRunner) {
            return startTransaction().then(generatedQueryRunner => {
                queryRunner = generatedQueryRunner;
                return Promise.resolve(fallback());
            });
        }
        return fallback();
    }

    commitTransaction() {
        return this.queryRunner.commitTransaction();
    }

    rollbackTransaction() {
        return this.queryRunner.rollbackTransaction();
    }

    get name() {
        return this.repository.metadata.targetName;
    }
    commonCrud = new CommonCrudPostgreSQL(this);

    count() {
        return this.repository.count();
    }

    findMany(options?: FindManyOptions<T>): Promise<T[]>;
    findMany(conditions?: FindConditions<T>, populate?: string[]): Promise<T[]>;
    findMany(options?: FindManyOptions<T> | FindConditions<T>, populate?: string[]): Promise<T[]>;
    findMany(options?: FindManyOptions<T> | FindConditions<T>, populate?: string[]) {
        if (populate) {
            options = {
                where: options,
                relations: populate,
            };
        }
        return this.repository.find(options);
    }

    findOne(where?: FindConditions<T>, options?: FindOneOptions<T>): Promise<T>;
    findOne(id?: string | number, options?: FindOneOptions<T>): Promise<T>;
    findOne(id?: string | number | FindConditions<T>, options?: FindOneOptions<T>) {
        if (id && typeof id === 'object') {
            return this.repository.findOne(id, options);
        }
        if (typeof id === 'number' || typeof id === 'string') {
            return this.repository.findOne(id, options);
        }
        return this.repository.findOne(options);
    }

    create(data: DeepPartial<T>) {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    update(entity: T): Promise<T>;
    update(id: string | number, data: DeepPartial<T>): Promise<T>;
    async update(id: string | number | T, data?: DeepPartial<T>): Promise<T> {
        if (typeof id === 'object') {
            return this.repository.save(id);
        } else {
            const entity = await this.findOne(id as string | number);
            Object.assign(entity, data);
            return this.repository.save(entity);
        }
    }

    delete(id: string | number | T | FindConditions<T>) {
        return this.repository.delete(id);
    }
}
