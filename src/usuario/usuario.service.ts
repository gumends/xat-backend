import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}
  async buscaPorId(id: string) {
    const usuario = await this.prisma.usersEntity.findUnique({
      where: { id },
    });
    if (!usuario) {
      throw new ForbiddenException('Usuário não encontrado');
    }
    return usuario;
  }
}
