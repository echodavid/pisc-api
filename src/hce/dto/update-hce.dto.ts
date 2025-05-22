import { PartialType } from '@nestjs/mapped-types';
import { CreateHceDto } from './create-hce.dto';

export class UpdateHceDto extends PartialType(CreateHceDto) {}
