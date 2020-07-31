import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from '../../services/mongodb/cats/cats.service';
import { MongoDBCat } from '../../entities/MongoDBCat';
import { Roles } from '../../auth/auth.decorators';
import { ROLE } from '../../common/declarations';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Get()
    getAll() {
        return this.catsService.findAll();
    }

    // this decorator adds authentication, can be used on controller, check administrators service for details
    // @Roles(ROLE.ADMIN)
    @Post()
    createOne(@Body() body: MongoDBCat) {
        return this.catsService.create(body);
    }
}
