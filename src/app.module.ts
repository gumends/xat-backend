import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { SessoesModule } from './sessoes/sessoes.module';
import { ConversasModule } from './conversas/conversas.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, UsuarioModule, SessoesModule, ConversasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
