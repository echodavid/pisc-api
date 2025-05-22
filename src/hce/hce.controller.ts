import { Controller, Get, Post, Body, Param, ForbiddenException } from '@nestjs/common';
import { HceService } from './hce.service';
import { ConsultasService } from '../consultas/consultas.service';
import { CondicionesService } from '../condiciones/condiciones.service';
import { ProcedimientosService } from '../procedimientos/procedimientos.service';
import { AutorizacionService } from '../autorizacion/autorizacion.service';
import { CreateConsultaDto } from '../consultas/dto/create-consulta.dto';
import { CreateProcedimientoDto } from '../procedimientos/dto/create-procedimiento.dto';
import { CreateCondicionDto } from '../condiciones/dto/create-condicione.dto';

@Controller('hce')
export class HceController {
  constructor(
    private readonly hceService: HceService,
    private readonly consultasService: ConsultasService,
    private readonly condicionesService: CondicionesService,
    private readonly procedimientosService: ProcedimientosService,
    private readonly autorizacionService: AutorizacionService,
  ) {}

  @Get(':pacienteId/medico/:medicoId')
  getResumen(@Param('pacienteId') pacienteId: string, @Param('medicoId') medicoId: string) {
    return this.hceService.getResumen(pacienteId, medicoId);
  }

  @Post(':pacienteId/medico/:medicoId/consulta')
  async crearConsulta(
    @Param('pacienteId') pacienteId: string,
    @Param('medicoId') medicoId: string,
    @Body() dto: CreateConsultaDto,
  ) {
    const autorizado = await this.autorizacionService.findVigente(pacienteId, medicoId);
    if (!autorizado) throw new ForbiddenException('No autorizado');
    return this.consultasService.create({ ...dto, pacienteId, medicoId });
  }

  @Post(':pacienteId/medico/:medicoId/condicion')
  async crearCondicion(
    @Param('pacienteId') pacienteId: string,
    @Param('medicoId') medicoId: string,
    @Body() dto: CreateCondicionDto,
  ) {
    const autorizado = await this.autorizacionService.findVigente(pacienteId, medicoId);
    if (!autorizado) throw new ForbiddenException('No autorizado');
    // Puedes guardar el id del médico en la condición si tu modelo lo permite
    return this.condicionesService.create({ ...dto, pacienteId });
  }

  @Post(':pacienteId/medico/:medicoId/procedimiento')
  async crearProcedimiento(
    @Param('pacienteId') pacienteId: string,
    @Param('medicoId') medicoId: string,
    @Body() dto: CreateProcedimientoDto,
  ) {
    const autorizado = await this.autorizacionService.findVigente(pacienteId, medicoId);
    if (!autorizado) throw new ForbiddenException('No autorizado');
    return this.procedimientosService.create({ ...dto, pacienteId });
  }
}