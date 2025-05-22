import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Procedimiento } from './entities/procedimiento.entity';
import { CreateProcedimientoDto } from './dto/create-procedimiento.dto';
import { UpdateProcedimientoDto } from './dto/update-procedimiento.dto';
import { Paciente } from '../pacientes/entities/paciente.entity';

@Injectable()
export class ProcedimientosService {
  constructor(
    @InjectRepository(Procedimiento)
    private readonly procedimientoRepository: Repository<Procedimiento>,
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async create(createProcedimientoDto: CreateProcedimientoDto): Promise<Procedimiento> {
    const paciente = await this.pacienteRepository.findOne({ where: { id: createProcedimientoDto.pacienteId } });
    if (!paciente) throw new NotFoundException('Paciente no encontrado');

    const procedimiento = this.procedimientoRepository.create({
      ...createProcedimientoDto,
      paciente,
      fecha: new Date(createProcedimientoDto.fecha),
    });
    return this.procedimientoRepository.save(procedimiento);
  }

  async findAll(): Promise<Procedimiento[]> {
    return this.procedimientoRepository.find();
  }

  async findOne(id: string): Promise<Procedimiento> {
    const procedimiento = await this.procedimientoRepository.findOne({ where: { id } });
    if (!procedimiento) throw new NotFoundException('Procedimiento no encontrado');
    return procedimiento;
  }

  async findByPacienteId(pacienteId: string): Promise<Procedimiento[]> {
    return this.procedimientoRepository.find({
      where: { paciente: { id: pacienteId } },
      relations: ['paciente'],
    });
  }

  async update(id: string, updateProcedimientoDto: UpdateProcedimientoDto): Promise<Procedimiento> {
    const procedimiento = await this.procedimientoRepository.preload({
      id,
      ...updateProcedimientoDto,
      fecha: updateProcedimientoDto.fecha ? new Date(updateProcedimientoDto.fecha) : undefined,
    });
    if (!procedimiento) throw new NotFoundException('Procedimiento no encontrado');
    return this.procedimientoRepository.save(procedimiento);
  }

  async remove(id: string): Promise<void> {
    const result = await this.procedimientoRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Procedimiento no encontrado');
  }
}