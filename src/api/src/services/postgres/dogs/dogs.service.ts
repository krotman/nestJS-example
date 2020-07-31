import { Injectable } from '@nestjs/common';
import { ServiceBasePostgreSQL } from '../../base-postgres.service';
import { PostgreSQLDog } from '../../../entities';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DogsService extends ServiceBasePostgreSQL<PostgreSQLDog> {
    public withTransactionFactory(entityManager: EntityManager) {
        return new DogsService(entityManager.getRepository(PostgreSQLDog));
    }
    constructor(@InjectRepository(PostgreSQLDog) repository: Repository<PostgreSQLDog>) {
        super(repository);
    }
}
