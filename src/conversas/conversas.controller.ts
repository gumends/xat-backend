import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConversasService } from './conversas.service';
import { CreateConversaDto } from './dto/create-conversa.dto';
import { UpdateConversaDto } from './dto/update-conversa.dto';

@Controller('conversas')
export class ConversasController {
  constructor(private readonly conversasService: ConversasService) {}

  @Post('criar')
  criarConversa(@Body() createConversaDto: CreateConversaDto) {
    return this.conversasService.criarConversa(createConversaDto);
  }

  @Get('buscar/:id1/:id2')
  buscarConversa(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this.conversasService.buscarConversa(id1, id2);
  }

  @Delete('apagar/:id1/:id2')
  apagarConversa(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this.conversasService.apagarConversa(id1, id2);
  }
}
