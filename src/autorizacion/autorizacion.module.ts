import { Module } from '@nestjs/common';
import { AutorizacionService } from './autorizacion.service';
import { AutorizacionController } from './autorizacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autorizacion } from './entities/autorizacion.entity';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { Medico } from '../medicos/entities/medico.entity';

@Module({
  controllers: [AutorizacionController],
  providers: [AutorizacionService],
  imports: [TypeOrmModule.forFeature([Autorizacion, Paciente, Medico])], // Importa el módulo de TypeORM para la entidad Autorizacion
  exports: [TypeOrmModule, AutorizacionService]
})
export class AutorizacionModule {}
