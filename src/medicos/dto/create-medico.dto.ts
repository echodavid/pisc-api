import { IsString, IsOptional } from 'class-validator';

export class CreateMedicoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  especialidad?: string;

  @IsOptional()
  @IsString()
  cedula?: string;
}