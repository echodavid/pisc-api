import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Condicion } from './entities/condicione.entity';
import { CreateCondicionDto } from './dto/create-condicione.dto';
import { UpdateCondicioneDto } from './dto/update-condicione.dto';
import { Paciente } from '../pacientes/entities/paciente.entity';

@Injectable()
export class CondicionesService {
  constructor(
    @InjectRepository(Condicion)
    private readonly condicionRepository: Repository<Condicion>,
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async create(createCondicionDto: CreateCondicionDto): Promise<Condicion> {
    const paciente = await this.pacienteRepository.findOne({ where: { id: createCondicionDto.pacienteId } });
    if (!paciente) throw new NotFoundException('Paciente no encontrado');

    const condicion = this.condicionRepository.create({
      ...createCondicionDto,
      paciente,
    });
    return this.condicionRepository.save(condicion);
  }
  async findByPacienteId(pacienteId: string) {
    return this.condicionRepository.find({
      where: { paciente: { id: pacienteId } },
      relations: ['paciente'],
    });
  }
  async findAll(): Promise<Condicion[]> {
    return this.condicionRepository.find();
  }

  async findOne(id: string): Promise<Condicion> {
    const condicion = await this.condicionRepository.findOne({ where: { id } });
    if (!condicion) throw new NotFoundException('Condición no encontrada');
    return condicion;
  }

  async update(id: string, updateCondicioneDto: UpdateCondicioneDto): Promise<Condicion> {
    const condicion = await this.condicionRepository.preload({
      id,
      ...updateCondicioneDto,
    });
    if (!condicion) throw new NotFoundException('Condición no encontrada');
    return this.condicionRepository.save(condicion);
  }

  async remove(id: string): Promise<void> {
    const result = await this.condicionRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Condición no encontrada');
  }
}