import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLE } from '../common/declarations';
import { AdministratorsService } from '../services/postgres/administrators/administrators.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private administratorsService: AdministratorsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const controllerRoles = this.reflector.get<any>('roles', context.getClass()) || [];
        const actionRoles = this.reflector.get<string[]>('roles', context.getHandler()) || [];
        const roles = [...controllerRoles, ...actionRoles];
        const request = context.switchToHttp().getRequest() as Request;
        request.user = null;
        const token = (request.headers.authorization || '').replace('Bearer ', '');
        const payload = this.administratorsService.validateAuthToken(token);
        if (!payload) {
            return !roles.length;
        }
        if (payload.role === ROLE.ADMIN) {
            const user = await this.administratorsService.findOne(payload.administratorId);
            request.user = user;
        }
        return !roles.length || (request.user && roles.includes(payload.role));
    }
}
