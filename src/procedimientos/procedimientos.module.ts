import { Module } from '@nestjs/common';
import { ProcedimientosService } from './procedimientos.service';
import { ProcedimientosController } from './procedimientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedimiento } from './entities/procedimiento.entity';
import { Paciente } from '../pacientes/entities/paciente.entity';

@Module({
  controllers: [ProcedimientosController],
  providers: [ProcedimientosService],
  imports: [TypeOrmModule.forFeature([Procedimiento, Paciente])], // Importa el módulo de TypeORM para la entidad Procedimiento
  exports: [TypeOrmModule, ProcedimientosService], // Exporta el módulo de TypeORM para la entidad Procedimiento
})
export class ProcedimientosModule {}
