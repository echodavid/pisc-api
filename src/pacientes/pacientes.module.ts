import { Module } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';

@Module({
  controllers: [PacientesController],
  providers: [PacientesService],
  imports: [TypeOrmModule.forFeature([Paciente])], // Importa el módulo de TypeORM para la entidad Paciente
  exports: [PacientesService], // Exporta el servicio para que pueda ser utilizado en otros módulos
})
export class PacientesModule {}
