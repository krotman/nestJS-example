import { Schema, Types } from 'mongoose';
import { buildSchema, prop, modelOptions } from '@typegoose/typegoose';
import { IsEmpty } from 'class-validator';

export const prepareIdSchemaOptions = {
    schemaOptions: {
        toJSON: {
            transform(doc, ret, options) {
                ret.id = doc.id;
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    },
    timestamps: true,
};
@modelOptions(prepareIdSchemaOptions)
export abstract class BaseModel {
    @IsEmpty()
    @prop()
    createdAt?: Date;
    @IsEmpty()
    @prop()
    updatedAt?: Date;

    @prop()
    slug?: string;

    @IsEmpty()
    get id() {
        if (!(this as any)._id) {
            return null;
        }
        return ((this as any)._id as Types.ObjectId).toHexString();
    }
    set id(value: string) {
        // ignore me
    }

    @IsEmpty()
    static get schema(): Schema {
        return buildSchema(this as any, {
            timestamps: true,
            toJSON: {
                getters: true,
                virtuals: true,
            },
        });
    }

    @IsEmpty()
    static get modelName(): string {
        return this.name;
    }
}
