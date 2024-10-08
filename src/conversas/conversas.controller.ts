import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ConversasService } from './conversas.service';
import { CreateConversaDto } from './dto/create-conversa.dto';
import { UpdateConversaDto } from './dto/update-conversa.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('conversas')
export class ConversasController {
  constructor(private readonly conversasService: ConversasService) {}

  @Post('criar')
  criarConversa(@Body() createConversaDto: CreateConversaDto) {
    return this.conversasService.criarConversa(createConversaDto);
  }

  @Get('buscar/:id')
  buscarConversa(@Param('id') id: string) {
    return this.conversasService.buscarConversa(id);
  }

  @Delete('apagar/:id1/:id2')
  apagarConversa(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this.conversasService.apagarConversa(id1, id2);
  }
}
