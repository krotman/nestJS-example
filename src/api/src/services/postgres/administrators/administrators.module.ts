import { Module } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from '../../../entities/Administrator';

@Module({
    imports: [TypeOrmModule.forFeature([Administrator])],
    providers: [AdministratorsService],
    exports: [AdministratorsService],
})
export class AdministratorServicesModule {}
