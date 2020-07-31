import { Module } from '@nestjs/common';
import { RolesGuard } from './auth.guard';
import { AdministratorServicesModule } from '../services/postgres/administrators/administrators.module';

@Module({
    imports: [AdministratorServicesModule],
    providers: [RolesGuard],
    exports: [RolesGuard],
})
export class AuthModule {}
