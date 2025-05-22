import { Module } from '@nestjs/common';
import { CondicionesService } from './condiciones.service';
import { CondicionesController } from './condiciones.controller';
import { Condicion } from './entities/condicione.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from '../pacientes/entities/paciente.entity';

@Module({
  controllers: [CondicionesController],
  providers: [CondicionesService],
  imports: [TypeOrmModule.forFeature([Condicion, Paciente])], // Importa el módulo de TypeORM para la entidad Condicion
  exports: [TypeOrmModule, CondicionesService], // Exporta el servicio para que pueda ser utilizado en otros módulos
})
export class CondicionesModule {}
