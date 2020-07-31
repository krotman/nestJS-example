import { BaseModel } from './MongoDBBase';

import { prop, modelOptions } from '@typegoose/typegoose';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

@modelOptions({
    schemaOptions: {
        collection: 'cats',
    },
})
export class MongoDBCat extends BaseModel {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @prop()
    name: string;
}
