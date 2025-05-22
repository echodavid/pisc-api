import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consulta } from './entities/consulta.entity';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { Medico } from '../medicos/entities/medico.entity';

@Injectable()
export class ConsultasService {
  constructor(
    @InjectRepository(Consulta)
    private readonly consultaRepository: Repository<Consulta>,
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

    async findByPacienteId(pacienteId: string): Promise<Consulta[]> {
    return this.consultaRepository.find({
      where: { paciente: { id: pacienteId } },
      relations: ['paciente', 'medico'],
    });
  }
  
  async findByMedicoId(medicoId: string): Promise<Consulta[]> {
    return this.consultaRepository.find({
      where: { medico: { id: medicoId } },
      relations: ['paciente', 'medico'],
    });
  }

  async create(createConsultaDto: CreateConsultaDto): Promise<Consulta> {
    const paciente = await this.pacienteRepository.findOne({ where: { id: createConsultaDto.pacienteId } });
    if (!paciente) throw new NotFoundException('Paciente no encontrado');

    const medico = await this.medicoRepository.findOne({ where: { id: createConsultaDto.medicoId } });
    if (!medico) throw new NotFoundException('Médico no encontrado');

    const consulta = this.consultaRepository.create({
      ...createConsultaDto,
      paciente,
      medico,
      fecha: new Date(createConsultaDto.fecha),
    });
    return this.consultaRepository.save(consulta);
  }

  async findAll(): Promise<Consulta[]> {
    return this.consultaRepository.find();
  }

  async findOne(id: string): Promise<Consulta> {
    const consulta = await this.consultaRepository.findOne({ where: { id } });
    if (!consulta) throw new NotFoundException('Consulta no encontrada');
    return consulta;
  }

  async update(id: string, updateConsultaDto: UpdateConsultaDto): Promise<Consulta> {
    const consulta = await this.consultaRepository.preload({
      id,
      ...updateConsultaDto,
      fecha: updateConsultaDto.fecha ? new Date(updateConsultaDto.fecha) : undefined,
    });
    if (!consulta) throw new NotFoundException('Consulta no encontrada');
    return this.consultaRepository.save(consulta);
  }

  async remove(id: string): Promise<void> {
    const result = await this.consultaRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Consulta no encontrada');
  }
}