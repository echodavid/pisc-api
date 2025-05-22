# Pisc-Piloto

Proyecto piloto de gestión de pacientes, médicos, consultas, condiciones y procedimientos usando [NestJS](https://nestjs.com/) y [MariaDB](https://mariadb.org/).

## Características

- API RESTful para entidades: Pacientes, Médicos, Consultas, Condiciones y Procedimientos.
- Validación de datos con `class-validator` y `class-transformer`.
- Persistencia con TypeORM y MariaDB.
- Endpoints para búsquedas por paciente y médico.
- Script de seed para poblar la base de datos con datos de ejemplo.
- Listo para desarrollo local con Docker Compose para MariaDB.

## Requisitos

- Node.js >= 18
- Docker y Docker Compose (opcional, recomendado para base de datos)
- MariaDB

## Instalación

```bash
npm install
```

## Configuración de la base de datos

Puedes levantar MariaDB fácilmente con Docker Compose:

```bash
cd mariadb-docker
docker-compose up -d
```

Asegúrate de que los datos de conexión en tu archivo `.env` coincidan con los de tu `docker-compose.yml`:

- DB_HOST=localhost o mariadb
- DB_USERNAME=example_user
- DB_PASSWORD=example_password
- DB_DATABASE=example_db
- DB_PORT=3306

## Uso

### Levantar la API

```bash
npm run start:dev
```

La API estará disponible en [http://localhost:3000/api](http://localhost:3000/api).

### Poblar la base de datos (seed)

```bash
npm run seed
```

Esto generará médicos, pacientes, consultas, condiciones y procedimientos de ejemplo.

## Endpoints principales


- `POST /api/pacientes` — Crear paciente
- `GET /api/pacientes` — Listar pacientes
- `GET /api/pacientes/:id` — Obtener paciente por ID
- `POST /api/medicos` — Crear médico
- `GET /api/medicos` — Listar médicos
- `GET /api/medicos/cedula/:cedula` — Buscar médico por cédula
- `POST /api/autorizaciones` — Autorizar a un médico (requiere pacienteId, medicoId y duración)
- `GET /api/autorizaciones/paciente/:pacienteId` — Ver médicos autorizados por paciente
- `GET /api/autorizaciones/medico/:medicoId` — Ver pacientes autorizados para el médico
- `GET /api/consultas/paciente/:pacienteId/medico/:medicoId` — Consultas de un paciente (requiere autorización vigente)
- `GET /api/condiciones/paciente/:pacienteId/medico/:medicoId` — Condiciones de un paciente (requiere autorización vigente)
- `GET /api/procedimientos/paciente/:pacienteId/medico/:medicoId` — Procedimientos de un paciente (requiere autorización vigente)
- `GET /api/hce/:pacienteId/medico/:medicoId` — Resumen completo de la historia clínica electrónica (requiere autorización vigente)
- `POST /api/hce/:pacienteId/medico/:medicoId/consulta` — Registrar consulta (requiere autorización vigente)
- `POST /api/hce/:pacienteId/medico/:medicoId/condicion` — Registrar diagnóstico/condición (requiere autorización vigente)
- `POST /api/hce/:pacienteId/medico/:medicoId/procedimiento` — Registrar procedimiento (requiere autorización vigente)

## Pruebas

```bash
npm run test
```

## Recursos útiles

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io/)
- [MariaDB Documentation](https://mariadb.org/documentation/)

---

Desarrollado como piloto para ExpoCiencias, 4to semestre UV.