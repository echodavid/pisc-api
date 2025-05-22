import { IsUUID, IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateConsultaDto {
  @IsUUID()
  pacienteId: string;

  @IsUUID()
  medicoId: string;

  @IsDateString()
  fecha: string;

  @IsString()
  motivo: string;

  @IsOptional()
  @IsString()
  notas?: string;
}