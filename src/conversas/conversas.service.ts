import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateConversaDto } from './dto/create-conversa.dto';
import { UpdateConversaDto } from './dto/update-conversa.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConversasService {
  constructor(private readonly prisma: PrismaService) {}

  async criarConversa(conversa: CreateConversaDto) {
    const novaConversa = await this.prisma.conversas.create({ data: conversa });
    if(!novaConversa) throw new ForbiddenException('Conversa não criada');
    await this.prisma.sessao.update({
      where: {
        id: conversa.sessao_id
      },
      data: {
        updated_at: new Date()
      }
    })
    return novaConversa;
  }

  async buscarConversa(id: string) {
    const conversas = await this.prisma.conversas.findMany({
      where: {
        sessao_id: id
      }
    })
    if (!conversas) { throw new ForbiddenException('Conversa não encontrada'); }
    return conversas
  }

  async apagarConversa(id1: string, id2: string) {
    const sessao_id = await this.prisma.sessao.findFirst({
      where: {
        OR: [
          { usuario_id_I: id1, usuario_id_II: id2 },
          { usuario_id_I: id2, usuario_id_II: id1 }
        ]
      },
      select: {
        id: true
      }
    })
    if (!sessao_id) { throw new ForbiddenException('Nenhuma conversa encontrada'); }
    const conversas = await this.prisma.conversas.deleteMany({
      where: {
        sessao_id: sessao_id.id
      }
    })
    if (!conversas) { throw new ForbiddenException('Conversa não encontrada'); }
    const sessao = await this.prisma.sessao.delete({
      where: {
        id: sessao_id.id
      }
    })
    if (!sessao) { throw new ForbiddenException('Sessão não encontrada'); }
    return {
      sessao,
      conversas
    }
  }

}
