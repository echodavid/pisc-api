import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacientesController } from './pacientes/pacientes.controller';
import { PacientesModule } from './pacientes/pacientes.module';
import { MedicosModule } from './medicos/medicos.module';
import { ConsultasModule } from './consultas/consultas.module';
import { ProcedimientosModule } from './procedimientos/procedimientos.module';
import { CondicionesModule } from './condiciones/condiciones.module';
import { ConfigModule } from '@nestjs/config'; 
import { AutorizacionModule } from './autorizacion/autorizacion.module';
import { HceModule } from './hce/hce.module';


@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PacientesModule,
    MedicosModule,
    ConsultasModule,
    ProcedimientosModule,
    CondicionesModule,
    AutorizacionModule,
    HceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}