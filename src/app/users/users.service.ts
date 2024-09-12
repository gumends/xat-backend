import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { compare, hash } from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.usuarios.findMany({
            select: {
                id: true,
                nome: true,
                email: true
            }
        })
    }

    async findOneOrThrow(id: string) {
        const user = await this.prisma.usuarios.findFirstOrThrow({
            where: {
                email: id
            }
        })
        if (!user) throw new ForbiddenException('User not found')
        return user
    }

    async update(id: string, data: UpdateUserDto) {
        const user = await this.prisma.usuarios.update({
            where: {
                id
            },
            data
        })
        if (!user) throw new Error('User not found')
        return user
    }

    async store(data: CreateUserDto) {
        const hashedPassword = await hash(data.password, 10);
        const userData = { ...data, password: hashedPassword };
        return this.prisma.usuarios.create({
            data: {
                ...userData,
                avatar: userData.avatar || null
            },
        });
    }

    async destroy(id: string) {
        const user = await this.prisma.usuarios.delete({
            where: {
                id
            }
        })
        if (!user) throw new Error('User not found')
        return user
    }
}
