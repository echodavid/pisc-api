import { PartialType } from '@nestjs/mapped-types';
import { CreateAutorizacionDto } from './create-autorizacion.dto';

export class UpdateAutorizacionDto extends PartialType(CreateAutorizacionDto) {}
