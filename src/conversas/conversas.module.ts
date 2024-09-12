import { Module } from '@nestjs/common';
import { ConversasService } from './conversas.service';
import { ConversasController } from './conversas.controller';
import { MensagemGateway } from './mensagem/mensagem.gateway';

@Module({
  controllers: [ConversasController],
  providers: [ConversasService, MensagemGateway],
})
export class ConversasModule {}
