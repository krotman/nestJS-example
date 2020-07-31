import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CatsService } from './cats.service';
import { MongoDBCat } from '../../../entities/MongoDBCat';

@Module({
    imports: [TypegooseModule.forFeature([MongoDBCat])],
    providers: [CatsService],
    exports: [CatsService],
})
export class CatsMongoDBServicesModule {}
