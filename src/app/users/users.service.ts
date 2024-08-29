import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.usersEntity.findMany({
            select: {
                id: true,
                firstName: true,
                lastname: true,
                email: true
            }
        })
    }
    
    async findOne(
        id: string
    ) {
        const user = await this.prisma.usersEntity.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                firstName: true,
                lastname: true,
                email: true
            }
        })
        if (!user) throw new Error('User not found')
            return user
    }

    async update(id: string, data: UpdateUserDto) {
        const user = await this.prisma.usersEntity.update({
            where: {
                id
            },
            data
        })
        if (!user) throw new Error('User not found')
        return user
    }    
    
    async store(data: CreateUserDto) {
        const user = await this.prisma.usersEntity.create({
            data
        })
        if (!user) throw new Error('User not found')
        return user
    }

    async destroy( id: string) {
        const user = await this.prisma.usersEntity.delete({
            where: {
                id
            }
        })
        if (!user) throw new Error('User not found')
        return user
    }
}
