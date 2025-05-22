import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Autorizacion } from './entities/autorizacion.entity';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { Medico } from '../medicos/entities/medico.entity';

@Injectable()
export class AutorizacionService {
  constructor(
    @InjectRepository(Autorizacion)
    private readonly autorizacionRepository: Repository<Autorizacion>,
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  async create(pacienteId: string, medicoId: string, expiresAt: Date): Promise<Autorizacion> {
    const paciente = await this.pacienteRepository.findOne({ where: { id: pacienteId } });
    if (!paciente) throw new NotFoundException('Paciente no encontrado');
    const medico = await this.medicoRepository.findOne({ where: { id: medicoId } });
    if (!medico) throw new NotFoundException('Médico no encontrado');

    const autorizacion = this.autorizacionRepository.create({
      paciente,
      medico,
      expiresAt,
    });
    return this.autorizacionRepository.save(autorizacion);
  }

  async findAll(): Promise<Autorizacion[]> {
    return this.autorizacionRepository.find();
  }

  async findByPaciente(pacienteId: string): Promise<Autorizacion[]> {
    return this.autorizacionRepository.find({
      where: { paciente: { id: pacienteId } },
      relations: ['medico', 'paciente'],
    });
  }

  async findByMedico(medicoId: string): Promise<Autorizacion[]> {
    return this.autorizacionRepository.find({
      where: { medico: { id: medicoId } },
      relations: ['medico', 'paciente'],
    });
  }

  async findVigente(pacienteId: string, medicoId: string): Promise<Autorizacion | null> {
    return this.autorizacionRepository.findOne({
      where: {
        paciente: { id: pacienteId },
        medico: { id: medicoId },
        expiresAt: MoreThan(new Date()),
      },
      relations: ['paciente', 'medico'],
    });
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.autorizacionRepository.delete(id);
    return { deleted: (result.affected ?? 0) > 0 };
  }
}