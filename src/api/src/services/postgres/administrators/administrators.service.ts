import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { ServiceBasePostgreSQL } from '../../base-postgres.service';
import { Administrator } from '../../../entities/Administrator';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ROLE, JWTPayload, SECRET } from '../../../common/declarations';

@Injectable()
export class AdministratorsService extends ServiceBasePostgreSQL<Administrator> {
    public withTransactionFactory(entityManager: EntityManager) {
        return new AdministratorsService(entityManager.getRepository(Administrator));
    }
    constructor(@InjectRepository(Administrator) repository: Repository<Administrator>) {
        super(repository);
    }

    async registerUser(admin: Administrator, parent: Administrator) {
        const duplicate = await this.findOne({
            email: admin.email,
        });
        if (duplicate) {
            throw new ConflictException();
        }
        admin.passwordHash = this.hashPassword(admin.passwordHash);
        const newAdmin = await this.create({
            ...admin,
            parent,
        });
        return {
            token: this.getAuthToken(newAdmin),
        };
    }

    async updatePassword(admin: Administrator, password: string) {
        admin.passwordHash = this.hashPassword(password);
        await this.update(admin);
    }
    hashPassword(password: string) {
        return bcrypt.hashSync(password, 10);
    }

    verifyPassword(password: string, passwordHash: string) {
        return bcrypt.compareSync(password, passwordHash);
    }

    async loginUser(email: string, password: string) {
        const user = await this.findOne({
            email,
        });
        if (!user || !this.verifyPassword(password, user.passwordHash)) {
            throw new UnauthorizedException();
        }
        return {
            token: this.getAuthToken(user),
        };
    }

    getAuthToken(
        administrator: Administrator,
        role: ROLE = ROLE.ADMIN,
        data: { [index in keyof JWTPayload]?: any } = {},
    ) {
        const payload: JWTPayload = {
            role,
            administratorId: administrator.id,
            ...data,
        };
        return jwt.sign(payload, SECRET, {
            expiresIn: '3d',
        });
    }

    validateAuthToken(token: string): JWTPayload {
        try {
            return jwt.verify(token, SECRET) as JWTPayload;
        } catch {
            return null;
        }
    }
}
