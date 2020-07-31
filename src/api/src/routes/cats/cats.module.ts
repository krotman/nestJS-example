import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsMongoDBServicesModule } from '../../services/mongodb/cats/cats.module';

@Module({
    imports: [CatsMongoDBServicesModule],
    controllers: [CatsController],
})
export class CatsModule {}
