# MariaDB Docker Setup

This project provides a simple setup for running a MariaDB database using Docker. 

## Prerequisites

- Docker installed on your machine.
- Docker Compose installed.

## Getting Started

Follow these steps to set up and run the MariaDB database:

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd mariadb-docker
   ```

2. **Configure the environment variables** (optional):
   You can modify the `docker-compose.yml` file to set your desired environment variables for the MariaDB instance, such as the database name, user, and password.

3. **Start the MariaDB container**:
   Run the following command to start the MariaDB service:
   ```bash
   docker-compose up -d
   ```

4. **Access the MariaDB database**:
   You can connect to the MariaDB instance using a MySQL client or any database management tool. Use the following connection details:
   - Host: `localhost`
   - Port: `3306` (or the port you specified in `docker-compose.yml`)
   - User: `your_user` (as specified in `docker-compose.yml`)
   - Password: `your_password` (as specified in `docker-compose.yml`)

5. **Stopping the containers**:
   To stop the running containers, use:
   ```bash
   docker-compose down
   ```

## Additional Information

For more details on MariaDB, visit the [official MariaDB documentation](https://mariadb.org/documentation/). 

Feel free to contribute to this project by submitting issues or pull requests.