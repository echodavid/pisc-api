import { PartialType } from '@nestjs/mapped-types';
import { CreateProcedimientoDto } from './create-procedimiento.dto';

export class UpdateProcedimientoDto extends PartialType(CreateProcedimientoDto) {}
