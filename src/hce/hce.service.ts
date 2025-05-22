import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { Consulta } from '../consultas/entities/consulta.entity';
import { Condicion } from '../condiciones/entities/condicione.entity';
import { Procedimiento } from '../procedimientos/entities/procedimiento.entity';
import { AutorizacionService } from '../autorizacion/autorizacion.service';

@Injectable()
export class HceService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Consulta)
    private readonly consultaRepository: Repository<Consulta>,
    @InjectRepository(Condicion)
    private readonly condicionRepository: Repository<Condicion>,
    @InjectRepository(Procedimiento)
    private readonly procedimientoRepository: Repository<Procedimiento>,
    private readonly autorizacionService: AutorizacionService,
  ) {}

  async getResumen(pacienteId: string, medicoId: string) {
    // Verifica autorización vigente
    const autorizacion = await this.autorizacionService.findVigente(pacienteId, medicoId);
    if (!autorizacion) throw new ForbiddenException('No autorizado');

    const paciente = await this.pacienteRepository.findOne({ where: { id: pacienteId } });
    const consultas = await this.consultaRepository.find({ where: { paciente: { id: pacienteId } }, relations: ['medico'] });
    const condiciones = await this.condicionRepository.find({ where: { paciente: { id: pacienteId } } });
    const procedimientos = await this.procedimientoRepository.find({ where: { paciente: { id: pacienteId } } });

    return {
      paciente,
      consultas,
      condiciones,
      procedimientos,
    };
  }
}