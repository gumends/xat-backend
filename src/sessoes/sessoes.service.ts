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


  async buscaSessoes(id: string) {
    const sessoes = await this.prisma.sessao.findMany({
      where: {
        OR: [
          { usuario_id_I: id },
          { usuario_id_II: id }
        ]
      },
      include: {
        userOne: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        },
        userTwo: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      }
    });

    
    const resultado = sessoes.map(sessao => {
    
      if (sessao.usuario_id_I === id) {
        return { sessao_id: sessao.id, usuario_id: sessao.usuario_id_II, usuario: sessao.userTwo };
      } else {
        return { sessao_id: sessao.id, usuario_id: sessao.usuario_id_I, usuario: sessao.userOne };
      }
    });
    if (resultado.length === 0) {
      throw new ForbiddenException('Nenhuma sessão encontrada');
    }
    
    
    return resultado;
  }
  

}
