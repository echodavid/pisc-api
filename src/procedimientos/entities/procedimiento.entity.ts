// src/procedimientos/procedimiento.entity.ts
import { Paciente } from '../../pacientes/entities/paciente.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Procedimiento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Paciente, paciente => paciente.procedimientos, { eager: true })
  paciente: Paciente;

  @Column()
  descripcion: string; // code.text

  @Column({ type: 'datetime' })
  fecha: Date;

  @Column({ nullable: true })
  resultado: string;
}
