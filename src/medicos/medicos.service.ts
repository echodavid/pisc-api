import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  async create(createMedicoDto: CreateMedicoDto): Promise<Medico> {
    const medico = this.medicoRepository.create(createMedicoDto);
    return this.medicoRepository.save(medico);
  }

  async findAll(): Promise<Medico[]> {
    return this.medicoRepository.find();
  }

  async findOne(id: string): Promise<Medico> {
    const medico = await this.medicoRepository.findOne({ where: { id } });
    if (!medico) throw new NotFoundException('Médico no encontrado');
    return medico;
  }

  async update(id: string, updateMedicoDto: UpdateMedicoDto): Promise<Medico> {
    const medico = await this.medicoRepository.preload({
      id,
      ...updateMedicoDto,
    });
    if (!medico) throw new NotFoundException('Médico no encontrado');
    return this.medicoRepository.save(medico);
  }

  async remove(id: string): Promise<void> {
    const result = await this.medicoRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Médico no encontrado');
  }
}