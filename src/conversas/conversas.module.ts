import { Module } from '@nestjs/common';
import { ConversasService } from './conversas.service';
import { ConversasController } from './conversas.controller';

@Module({
  controllers: [ConversasController],
  providers: [ConversasService],
})
export class ConversasModule {}
