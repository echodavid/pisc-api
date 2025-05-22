import { forwardRef, Module } from '@nestjs/common';
import { HceController } from './hce.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { Consulta } from '../consultas/entities/consulta.entity';
import { Condicion } from '../condiciones/entities/condicione.entity';
import { Procedimiento } from '../procedimientos/entities/procedimiento.entity';
import { Medico } from '../medicos/entities/medico.entity';
import { AutorizacionModule } from '../autorizacion/autorizacion.module';
import { HceService } from './hce.service';
import { ConsultasModule } from '../consultas/consultas.module';
import { CondicionesModule } from '../condiciones/condiciones.module';
import { ProcedimientosModule } from '../procedimientos/procedimientos.module';

@Module({
  controllers: [HceController],
  providers: [HceService],
  imports: [
    TypeOrmModule.forFeature([Paciente, Consulta, Condicion, Procedimiento, Medico]),
    forwardRef(() => AutorizacionModule),
    ConsultasModule,
    CondicionesModule,
    ProcedimientosModule,
  ],
  exports: [TypeOrmModule]
})
export class HceModule {}
