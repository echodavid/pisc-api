// src/condiciones/condicion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Paciente } from '../../pacientes/entities/paciente.entity';

@Entity()
export class Condicion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Paciente, paciente => paciente.condiciones, { eager: true })
  paciente: Paciente;

  @Column()
  descripcion: string; // code.text

  @Column({ type: 'date' })
  fechaDiagnostico: string;

  @Column({ nullable: true })
  estado: string; // active|recurrence|remission|resolved
}
