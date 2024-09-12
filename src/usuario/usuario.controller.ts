import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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

  @Patch('atualizar/:id')
  atualizar(@Param('id') id: string, @Body() data: UpdateUsuarioDto) {
    return this.usuarioService.atualizar(id, data);
  }

  @Patch('ativar_desativar/:id')
  ativar_desativer(@Param('id') id: string) {
    return this.usuarioService.ativar_desdativar(id);
  }

  @Get('contato/:email')
  buscarContato(@Param('email') email: string) {
    return this.usuarioService.buscarContato(email);
  }

  @Patch('atualizar_senha/:id')
  async atualizarSenha(@Param('id') id: string, @Body() password: string) {
    return this.usuarioService.atualizarSenha(id, password);
  }

  @Delete('apagar/:id')
  apagar(@Param('id') id: string) {
    return this.usuarioService.apagarUsuario(id);
  }

  @Get('listar')
  buscarTodos(@Query('busca') busca: string) {
    return this.usuarioService.buscarTodos(busca);
  }
}
