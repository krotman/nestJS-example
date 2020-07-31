import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const IntQuery = createParamDecorator((key: string, req: Request) => {
    if (key in req.query) {
        return parseInt(req.query[key] || 0, 10);
    }
    return undefined;
});
