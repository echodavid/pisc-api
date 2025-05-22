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
- `GET /api/consultas/paciente/:pacienteId` — Consultas por paciente
- `GET /api/consultas/medico/:medicoId` — Consultas por médico
- `GET /api/condiciones/paciente/:pacienteId` — Condiciones por paciente
- `GET /api/procedimientos/paciente/:pacienteId` — Procedimientos por paciente

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