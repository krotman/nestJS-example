import { Module } from '@nestjs/common';
import { DogsController } from './dogs.controller';
import { DogsPostgresServicesModule } from '../../services/postgres/dogs/dogs.module';

@Module({
    imports: [DogsPostgresServicesModule],
    controllers: [DogsController],
})
export class DogsModule {}
