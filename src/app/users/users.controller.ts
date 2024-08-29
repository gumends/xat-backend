import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/vl/users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get('')
    async index() { 
        return this.userService.findAll();
     }

    @Post('')
    async store(@Body() data: CreateUserDto) { 
        return this.userService.store(data);
     }

    @Get(':id')
    async show(@Param('id') id: string) {
        return this.userService.findOne(id);
     }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: CreateUserDto) {
        return this.userService.update(id, data);
    } 

    @Delete(':id')
    async destroy(@Param('id') id: string) {
        return this.userService.destroy(id);
    }
}
