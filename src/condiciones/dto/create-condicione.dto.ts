import { IsString, IsOptional, IsDateString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCondicionDto {
  @IsUUID()
  pacienteId: string;

  @IsString()
  descripcion: string;

  @IsDateString()
  fechaDiagnostico: string;

  @IsOptional()
  @IsString()
  estado?: string; // active|recurrence|remission|resolved
}
