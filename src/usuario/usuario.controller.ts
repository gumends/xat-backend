import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('buscar/:id')
  buscaPorId(@Param('id') id: string) {
    return this.usuarioService.buscaPorId(id);
  }

  @Post("criar")
  criar(@Body() data: CreateUsuarioDto) {
    return this.usuarioService.criar(data);
  }
}
