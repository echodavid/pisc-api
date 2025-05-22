import { Module } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { ConsultasController } from './consultas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { Medico } from '../medicos/entities/medico.entity';

@Module({
  controllers: [ConsultasController],
  providers: [ConsultasService],
  imports: [TypeOrmModule.forFeature([Consulta, Paciente, Medico])], // Importa el módulo de TypeORM para la entidad Consulta
  exports: [TypeOrmModule], // Exporta el servicio para que pueda ser utilizado en otros módulos
})
export class ConsultasModule {}
