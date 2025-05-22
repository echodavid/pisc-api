// src/medicos/medico.entity.ts
import { Consulta } from '../../consultas/entities/consulta.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Medico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  especialidad: string;

  @Column({ nullable: true })
  cedula: string;

  @OneToMany(() => Consulta, consulta => consulta.medico)
  consultas: Consulta[];
}
