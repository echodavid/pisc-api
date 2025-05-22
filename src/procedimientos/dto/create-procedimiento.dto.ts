import { IsUUID, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateProcedimientoDto {
  @IsUUID()
  pacienteId: string;

  @IsString()
  descripcion: string;

  @IsDateString()
  fecha: string;

  @IsOptional()
  @IsString()
  resultado?: string;
}