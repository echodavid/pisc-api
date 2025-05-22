// src/consultas/consulta.entity.ts
import { Medico } from '../../medicos/entities/medico.entity';
import { Paciente } from '../../pacientes/entities/paciente.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Consulta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Paciente, paciente => paciente.consultas, { eager: true })
  paciente: Paciente;

  @ManyToOne(() => Medico, medico => medico.consultas, { eager: true })
  medico: Medico;

  @Column({ type: 'datetime' })
  fecha: Date;

  @Column()
  motivo: string;

  @Column({ nullable: true })
  notas: string;
}
