import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgreSQLDog } from '../../../entities';

@Module({
    imports: [TypeOrmModule.forFeature([PostgreSQLDog])],
    providers: [DogsService],
    exports: [DogsService],
})
export class DogsPostgresServicesModule {}
