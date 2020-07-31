import { SetMetadata, createParamDecorator } from '@nestjs/common';
import { ROLE } from '../common/declarations';

export const Roles = (...roles: ROLE[]) => SetMetadata('roles', roles);
export const InjectUser = createParamDecorator((data, req) => {
    return req.user;
});
