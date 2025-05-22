// src/pacientes/paciente.entity.ts
import { Condicion } from '../../condiciones/entities/condicione.entity';
import { Consulta } from '../../consultas/entities/consulta.entity';
import { Procedimiento } from '../../procedimientos/entities/procedimiento.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  apellido: string;

  @Column({ type: 'date', nullable: true })
  fechaNacimiento: string;

  @Column({ nullable: true })
  genero: string; // male, female, other, unknown

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => Consulta, consulta => consulta.paciente)
  consultas: Consulta[];

  @OneToMany(() => Procedimiento, procedimiento => procedimiento.paciente)
  procedimientos: Procedimiento[];

  @OneToMany(() => Condicion, condicion => condicion.paciente)
  condiciones: Condicion[];
}
