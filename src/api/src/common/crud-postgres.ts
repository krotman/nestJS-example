import { ServiceBasePostgreSQL } from '../services/base-postgres.service';
import { FindConditions, FindOneOptions, DeepPartial, FindManyOptions } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class CommonCrudPostgreSQL<T extends Object> {
    constructor(protected service: ServiceBasePostgreSQL<T>) {}

    findMany(options?: FindManyOptions<T>): Promise<T[]>;
    findMany(conditions?: FindConditions<T>, populate?: string[]): Promise<T[]>;
    findMany(options?: FindManyOptions<T> | FindConditions<T>, populate?: string[]) {
        return this.service.findMany(options, populate);
    }

    findOne(id?: string | number | FindConditions<T>, options?: FindOneOptions<T>): Promise<T>;
    findOne(id?: string | number | FindConditions<T>, populate?: string[], options?: FindOneOptions<T>): Promise<T>;
    async findOne(
        id?: string | number | FindConditions<T>,
        populate?: string[] | FindOneOptions<T>,
        options?: FindOneOptions<T>,
    ) {
        let parsedOptions: FindOneOptions<T> = options || {};
        if (Array.isArray(populate)) {
            parsedOptions.relations = populate;
        } else if (typeof populate === 'object') {
            parsedOptions = {
                ...parsedOptions,
                ...populate,
            };
        }
        if (typeof id === 'object') {
            parsedOptions.where = id;
        } else {
            parsedOptions.where = { id };
        }
        const entity = await this.service.findOne(null, parsedOptions);
        if (!entity) {
            throw new NotFoundException(`${this.service.name} was not found`);
        }
        return entity;
    }
    updateOne(entity: T, data?: DeepPartial<T>): Promise<T>;
    updateOne(id: string | number, data: DeepPartial<T>): Promise<T>;
    async updateOne(id: string | number | T, data: DeepPartial<T>) {
        const { name } = this.service;
        let res: T;
        if (typeof id !== 'object') {
            await this.findOne(id as string);
            res = await this.service.update(id as string, data);
        } else {
            Object.assign(id, data);
            res = await this.service.update(id as T);
        }
        return res;
    }

    async create(data: DeepPartial<T>) {
        const { name } = this.service;
        const res = await this.service.create(data);
        return res;
    }

    async delete(id: string | number | T | FindConditions<T>) {
        const { name } = this.service;
        if (typeof id !== 'object') {
            await this.findOne(id);
        }
        const res = await this.service.delete(id);
        return res;
    }
}
