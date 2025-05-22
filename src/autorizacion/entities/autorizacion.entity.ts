import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Paciente } from '../../pacientes/entities/paciente.entity';
import { Medico } from '../../medicos/entities/medico.entity';

@Entity()
export class Autorizacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Paciente, { eager: true })
  paciente: Paciente;

  @ManyToOne(() => Medico, { eager: true })
  medico: Medico;

  @Column({ type: 'datetime' })
  expiresAt: Date; // Fecha y hora de expiración de la autorización
}