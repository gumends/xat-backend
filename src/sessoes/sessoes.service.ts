import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSessoeDto } from './dto/create-sessoe.dto';
import { UpdateSessoeDto } from './dto/update-sessoe.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessoesService {
  constructor(private readonly prisma: PrismaService) {}
  
  async criarSessao(createSessoeDto: CreateSessoeDto) {
    const verificarSessao = await this.prisma.sessao.findFirst({
      where: {
        usuario_id_I: createSessoeDto.usuario_id_I,
        usuario_id_II: createSessoeDto.usuario_id_II
      }
    })
    if (verificarSessao) throw new ForbiddenException('Sessão já existente');
    const sessao = await this.prisma.sessao.create({
      data: {
        ...createSessoeDto
      }
    });
    if (!sessao) throw new ForbiddenException('Sessão não criada');
    return sessao;
  }

  //Buscar todas as sessões do usuario
  async buscaSessoes(id: string) {
    const sessoes = await this.prisma.sessao.findMany({
      where: { id }
    });
    if (!sessoes) throw new ForbiddenException('Nenhuma sessão encontrada');
    return sessoes;
  }

}
