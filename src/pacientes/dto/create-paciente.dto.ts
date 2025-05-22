import { IsString, IsOptional, IsDateString, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePacienteDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value || null)
  fechaNacimiento?: string;

  @IsOptional()
  @IsString()
  genero?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}