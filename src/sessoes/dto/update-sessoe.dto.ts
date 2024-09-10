import { PartialType } from '@nestjs/mapped-types';
import { CreateSessoeDto } from './create-sessoe.dto';

export class UpdateSessoeDto extends PartialType(CreateSessoeDto) {}
