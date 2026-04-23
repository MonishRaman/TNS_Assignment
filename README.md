# Vettripath - Student Placement Management System

A Spring Boot REST API application for managing student placements, colleges, and certifications.

## Overview

Vettripath is a placement management system that provides REST APIs to manage students, colleges, placements, and certificates. It is built with Spring Boot, JPA, PostgreSQL, and a React + Vite frontend.

## Features

- **Student Management**: Create, read, and manage student profiles
- **College Management**: Manage college information and locations
- **Placement Tracking**: Track student placements and companies
- **Certificate Management**: Manage and track student certifications
- **User Authentication**: User registration and authentication
- **RESTful APIs**: Comprehensive REST endpoints for all operations

## Project Structure

```
demo/
├── src/
│   ├── main/
│   │   ├── java/com/example/demo/
│   │   │   ├── controller/        # REST controllers
│   │   │   ├── model/             # Entity classes
│   │   │   ├── repository/        # Data access layer
│   │   │   ├── service/           # Business logic layer
│   │   │   └── DemoApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/com/example/demo/
├── pom.xml                         # Maven configuration
└── mvnw/mvnw.cmd                  # Maven wrapper scripts
```

## Technologies Used

- **Java 21**
- **Spring Boot 4.0.5**
- **Spring Data JPA**
- **PostgreSQL** (Local and Neon)
- **Lombok** (for reducing boilerplate code)
- **Maven**
- **React 19 + Vite 8** (frontend)

## Prerequisites

- Java 21 or higher
- PostgreSQL (local) or Neon PostgreSQL
- Maven 3.6+

## Installation & Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd TNS_Assignment/demo
```

2. Backend uses dual DB configuration out of the box:
- Local PostgreSQL is default.
- Neon is used automatically when Neon env vars are set.

Current datasource config in `demo/src/main/resources/application.properties`:
```properties
spring.datasource.url=${NEON_JDBC_URL:jdbc:postgresql://localhost:5432/placement_db}
spring.datasource.username=${NEON_DB_USER:postgres}
spring.datasource.password=${NEON_DB_PASSWORD:postgres}
```

3. Choose one database mode.

Local PostgreSQL mode (default):
```powershell
Set-Location "e:\MONISHRAMAN GIT\TNS_Assignment\demo"
.\mvnw.cmd test
```

Neon mode:
```powershell
Set-Location "e:\MONISHRAMAN GIT\TNS_Assignment\demo"
$env:NEON_JDBC_URL="jdbc:postgresql://<your-neon-host>/neondb?sslmode=require&channelBinding=require"
$env:NEON_DB_USER="<your-neon-user>"
$env:NEON_DB_PASSWORD="<your-neon-password>"
.\mvnw.cmd test
```

Multi-device recommended mode (no repeated env commands):
```powershell
Set-Location "e:\MONISHRAMAN GIT\TNS_Assignment\demo"
Copy-Item .env.properties.example .env.properties
```

Then edit `.env.properties` and set:
- `NEON_JDBC_URL`
- `NEON_DB_USER`
- `NEON_DB_PASSWORD`

Suggested multi-device routine:
- Keep Neon values in a password manager (Bitwarden/1Password/etc.).
- On each new device, copy `.env.properties.example` to `.env.properties` and paste values once.
- Do not store production credentials in terminal history or commit them to git.

Now run normally (same on every device):
```powershell
.\mvnw.cmd spring-boot:run
```

Notes:
- `demo/.env.properties` is git-ignored, so each machine can keep its own secrets safely.
- If both `.env.properties` and shell env vars exist, shell env vars take priority.
- If `.env.properties.example` accidentally contains real credentials, rotate Neon password immediately and replace the file with placeholders.

4. Build the project:
```bash
./mvnw clean install
```

5. Run the application:
```bash
./mvnw spring-boot:run
```

The application will start on `http://localhost:8080`

## Frontend Setup (React)

The project now includes a React frontend in the `frontend/` folder.

1. Open a new terminal and move to frontend:
```bash
cd TNS_Assignment/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend:
```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Running Frontend + Backend Together

1. Start backend from `demo/`:
```bash
./mvnw spring-boot:run
```

2. Start frontend from `frontend/`:
```bash
npm run dev
```

3. Open `http://localhost:5173`

Notes:
- Vite proxy is configured to forward `/api/*` calls to Spring Boot (`http://localhost:8080`).
- Backend CORS is enabled for `http://localhost:5173` and `http://127.0.0.1:5173`.
- Optional override: set `VITE_API_BASE_URL` in frontend environment if you want to point React to a different API URL.

## API Endpoints

### Student Management
- `GET /students` - Get all students
- `GET /students/{id}` - Get student by ID
- `GET /students/hall/{hallTicket}` - Search by hall ticket
- `GET /students/name/{name}` - Search by name
- `POST /students` - Create a new student
- `DELETE /students/{id}` - Delete a student

### College Management
- `GET /colleges` - Get all colleges
- `GET /colleges/{id}` - Get college by ID
- `POST /colleges` - Create a new college
- `DELETE /colleges/{id}` - Delete a college

### Placement Management
- `GET /placements` - Get all placements
- `GET /placements/{id}` - Get placement by ID
- `POST /placements` - Create a new placement
- `DELETE /placements/{id}` - Delete a placement

### Certificate Management
- `GET /certificates` - Get all certificates
- `GET /certificates/{id}` - Get certificate by ID
- `POST /certificates` - Create a new certificate
- `DELETE /certificates/{id}` - Delete a certificate

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login

## Database Schema

### Student
- `id` (Long, Primary Key)
- `name` (String)
- `qualification` (String)
- `course` (String)
- `year` (Integer)
- `hallTicketNo` (Long)

### College
- `id` (Long, Primary Key)
- `collegeName` (String)
- `location` (String)

### Placement
- `id` (Long, Primary Key)
- Student and Company information

### Certificate
- `id` (Long, Primary Key)
- Certificate details

## Running Tests

```bash
./mvnw test
```

## Build & Packaging

Build the application as a JAR:
```bash
./mvnw clean package
```

The JAR file will be generated in the `target/` directory as `demo-0.0.1-SNAPSHOT.jar`

## Configuration

Key configuration properties in `demo/src/main/resources/application.properties`:
- `spring.datasource.url` - Database connection URL
- `spring.datasource.username` - Database username
- `spring.datasource.password` - Database password
- `spring.jpa.hibernate.ddl-auto` - JPA DDL strategy (update/create/create-drop)
- `spring.jpa.show-sql` - Show SQL queries in logs

Neon environment variables:
- `NEON_JDBC_URL`
- `NEON_DB_USER`
- `NEON_DB_PASSWORD`

Optional local secrets file:
- `demo/.env.properties` (loaded automatically)
- Template: `demo/.env.properties.example`

Credential safety checklist:
- Keep real passwords only in `.env.properties` (never in tracked files).
- Rotate Neon credentials if they were shared in chats/screenshots/commits.
- Prefer placeholders in `.env.properties.example`.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is part of TNS Assignment.

## Author

Your Name / Organization

## Support

For issues or questions, please contact the development team or open an issue in the repository.