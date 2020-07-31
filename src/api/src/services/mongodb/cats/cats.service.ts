import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { MongoDBCat } from '../../../entities/MongoDBCat';
import { BaseServiceMongoDB } from '../../base-mongodb.service';

@Injectable()
export class CatsService extends BaseServiceMongoDB<MongoDBCat> {
    constructor(@InjectModel(MongoDBCat) model: ReturnModelType<typeof MongoDBCat>) {
        super(model);
    }
}
