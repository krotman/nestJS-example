import { Controller, Get, Post, Body } from '@nestjs/common';
import { DogsService } from '../../services/postgres/dogs/dogs.service';
import { PostgreSQLDog } from '../../entities';
import { Roles } from '../../auth/auth.decorators';
import { ROLE } from '../../common/declarations';

@Controller('dogs')
export class DogsController {
    constructor(private dogsService: DogsService) {}

    @Get()
    getAll() {
        return this.dogsService.findMany();
    }

    // @Roles(ROLE.ADMIN)
    @Post()
    createNew(@Body() body: PostgreSQLDog) {
        return this.dogsService.commonCrud.create(body);
    }
}
