import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { AutorizacionService } from './autorizacion.service';

@Controller('autorizaciones')
export class AutorizacionController {
  constructor(private readonly autorizacionService: AutorizacionService) {}

  @Post()
  async create(
    @Body() body: { pacienteId: string; medicoId: string; expiresAt?: string }
  ) {
    // Si no se envía expiresAt, por defecto 1 día
    const expiresAt = body.expiresAt
      ? new Date(body.expiresAt)
      : new Date(Date.now() + 24 * 60 * 60 * 1000);
    return this.autorizacionService.create(body.pacienteId, body.medicoId, expiresAt);
  }

  @Get()
  findAll() {
    return this.autorizacionService.findAll();
  }

  @Get('paciente/:pacienteId')
  findByPaciente(@Param('pacienteId') pacienteId: string) {
    return this.autorizacionService.findByPaciente(pacienteId);
  }

  @Get('medico/:medicoId')
  findByMedico(@Param('medicoId') medicoId: string) {
    return this.autorizacionService.findByMedico(medicoId);
  }

  @Get('vigente/:pacienteId/:medicoId')
  findVigente(
    @Param('pacienteId') pacienteId: string,
    @Param('medicoId') medicoId: string
  ) {
    return this.autorizacionService.findVigente(pacienteId, medicoId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autorizacionService.remove(id);
  }
}