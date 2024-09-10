import { PartialType } from '@nestjs/mapped-types';
import { CreateConversaDto } from './create-conversa.dto';

export class UpdateConversaDto extends PartialType(CreateConversaDto) {}
