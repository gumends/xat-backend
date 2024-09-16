import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessoesService } from './sessoes.service';
import { CreateSessoeDto } from './dto/create-sessoe.dto';
import { UpdateSessoeDto } from './dto/update-sessoe.dto';

@Controller('sessoes')
export class SessoesController {
  constructor(private readonly sessoesService: SessoesService) {}

  @Post('criar')
  criarSessao(@Body() createSessoeDto: CreateSessoeDto) {
    return this.sessoesService.criarSessao(createSessoeDto);
  }

  @Get('buscar/:id')
  buscaSessoes(@Param('id') id: string) {
    return this.sessoesService.buscaSessoes(id);
  }

}