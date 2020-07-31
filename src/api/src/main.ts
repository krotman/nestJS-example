import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import './common/extensions';
import * as bodyParser from 'body-parser';
import { RolesGuard } from './auth/auth.guard';
import { init } from './init';
import mongoose from 'mongoose';
mongoose.set('debug', true);

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(bodyParser.json({ limit: '50mb' }));
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalGuards(app.get<RolesGuard>(RolesGuard));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    setTimeout(() => {
        init(app);
    }, 2000);
    await app.listen(3000);
}
bootstrap();
