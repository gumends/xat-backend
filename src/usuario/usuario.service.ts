import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';

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

  async criar (data: CreateUsuarioDto) {
    const hashedPassword = await hash(data.password, 10);
    const userData = { ...data, password: hashedPassword };
    const usuario = await this.prisma.usersEntity.create({
      data: {
        ...userData,
        avatar: userData.avatar || null, // set avatar to null if it's undefined
      },
    });

    if (!usuario) throw new ForbiddenException('Usuário não criado');

    return usuario;
  }

  async atualizar(id: string, data: UpdateUsuarioDto) {
    const usuario = await this.prisma.usersEntity.update({
      where: { id },
      data: {
        ...data
      }
    })
    if (!usuario) { throw new ForbiddenException('Usuário não encontrado'); }
    return usuario
  }

  async ativar_desdativar(id: string) {
    const statusUsuario = await this.prisma.usersEntity.findUnique({
      where: { id },
      select: { status: true }
    })
    const usuario = await this.prisma.usersEntity.update({
      where: { id },
      data: {
        status: statusUsuario ? 0 : 1
      }
    })
    if (!usuario) { throw new ForbiddenException('Usuário não encontrado'); }
    return usuario
  }

  async buscarContato( email: string ) {
    const contato = await this.prisma.usersEntity.findFirst({
      where: { email },
      select: { 
        id: true,
        nome: true,
        sobreNome: true,
        email: true,
        status: true,
        avatar: true
      }
    })
    if (!contato) { throw new ForbiddenException('Contato não encontrado'); }
    return contato
  }

  async atualizarSenha(id: string, password: string) {
    const hashedPassword = await hash(password, 10);
    const usuario = await this.prisma.usersEntity.update({
      where: { id },
      data: {
        password: hashedPassword
      }
    })
    if (!usuario) { throw new ForbiddenException('Usuário não encontrado'); }
    return usuario
  }

  async apagarUsuario(id: string) {
    const usuario = await this.prisma.usersEntity.delete({ where: { id } })
    if (!usuario) { throw new ForbiddenException('Usuário não encontrado'); }
    return usuario
  }
}
