import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { TypegooseModule } from 'nestjs-typegoose';

import { AdministratorServicesModule } from './services/postgres/administrators/administrators.module';
import { AuthModule } from './auth/auth.module';
import { doImport } from './init';
import { CatsMongoDBServicesModule } from './services/mongodb/cats/cats.module';
import { DogsPostgresServicesModule } from './services/postgres/dogs/dogs.module';
import { DogsModule } from './routes/dogs/dogs.module';
import { CatsModule } from './routes/cats/cats.module';

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            schema: 'example',
            username: 'example',
            password: 'localpass',
            database: 'example',
            autoLoadEntities: true,
            synchronize: true,
            dropSchema: doImport,
            logging: ['error', 'migration', 'query'],
            extra: { max: 100 },
            keepConnectionAlive: false,
        }),
        TypegooseModule.forRoot('mongodb://localhost:27017/example'),

        CatsMongoDBServicesModule,
        DogsPostgresServicesModule,
        AdministratorServicesModule,

        AuthModule,

        DogsModule,

        CatsModule,
    ],
})
export class AppModule {}
