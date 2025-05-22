import { Consulta } from '../consultas/entities/consulta.entity';
import { Medico } from '../medicos/entities/medico.entity';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { Procedimiento } from '../procedimientos/entities/procedimiento.entity';
import { DataSource } from 'typeorm';
import 'dotenv/config'; 
import * as faker from 'faker';
import { Condicion } from '../condiciones/entities/condicione.entity';

const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Paciente, Medico, Consulta, Procedimiento, Condicion],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  // Crear muchos médicos
  const medicos: Medico[] = [];
  for (let i = 0; i < 20; i++) {
    const medico = AppDataSource.manager.create(Medico, {
      nombre: faker.name.findName(),
      especialidad: faker.name.jobType(),
      cedula: faker.datatype.number({ min: 1000000, max: 9999999 }).toString(),
    });
    medicos.push(medico);
  }
  await AppDataSource.manager.save(medicos);

  // Crear muchos pacientes
  const pacientes: Paciente[] = [];
  for (let i = 0; i < 100; i++) {
    const paciente = AppDataSource.manager.create(Paciente, {
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      fechaNacimiento: faker.date.between('1940-01-01', '2022-01-01').toISOString().slice(0, 10),
      genero: faker.random.arrayElement(['male', 'female', 'other']),
      telefono: faker.phone.phoneNumber(),
      email: faker.internet.email(),
    });
    pacientes.push(paciente);
  }
  await AppDataSource.manager.save(pacientes);

  // Crear consultas, procedimientos y condiciones para cada paciente
  const consultas: Consulta[] = [];
  const procedimientos: Procedimiento[] = [];
  const condiciones: Condicion[] = [];

  for (const paciente of pacientes) {
    // Cada paciente tendrá entre 1 y 5 consultas
    const numConsultas = faker.datatype.number({ min: 1, max: 5 });
    for (let i = 0; i < numConsultas; i++) {
      const medico = faker.random.arrayElement(medicos);
      const consulta = AppDataSource.manager.create(Consulta, {
        paciente,
        medico,
        fecha: faker.date.recent(365),
        motivo: faker.lorem.sentence(),
        notas: faker.lorem.sentences(2),
      });
      consultas.push(consulta);
    }

    // Cada paciente tendrá entre 0 y 3 procedimientos
    const numProcedimientos = faker.datatype.number({ min: 0, max: 3 });
    for (let i = 0; i < numProcedimientos; i++) {
      const procedimiento = AppDataSource.manager.create(Procedimiento, {
        paciente,
        descripcion: faker.lorem.words(3),
        fecha: faker.date.recent(365),
        resultado: faker.lorem.sentence(),
      });
      procedimientos.push(procedimiento);
    }

    // Cada paciente tendrá entre 0 y 2 condiciones
    const numCondiciones = faker.datatype.number({ min: 0, max: 2 });
    for (let i = 0; i < numCondiciones; i++) {
      const condicion = AppDataSource.manager.create(Condicion, {
        paciente,
        descripcion: faker.lorem.words(2),
        fechaDiagnostico: faker.date.past(10).toISOString().slice(0, 10),
        estado: faker.random.arrayElement(['active', 'remission', 'resolved']),
      });
      condiciones.push(condicion);
    }
  }

  await AppDataSource.manager.save(consultas);
  await AppDataSource.manager.save(procedimientos);
  await AppDataSource.manager.save(condiciones);

  console.log('Seed masivo completado');
  await AppDataSource.destroy();
}

seed();