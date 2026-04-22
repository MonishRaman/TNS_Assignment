# Student Placement Management System

A Spring Boot REST API application for managing student placements, colleges, and certifications.

## Overview

TNS_Assignment is a comprehensive placement management system that provides REST APIs to manage students, colleges, placements, and certificates. It's built with Spring Boot, JPA, and MySQL.

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

- **Java 17**
- **Spring Boot 4.0.5**
- **Spring Data JPA**
- **MySQL Database**
- **Lombok** (for reducing boilerplate code)
- **Maven**
- **React 19 + Vite 8** (frontend)

## Prerequisites

- Java 17 or higher
- MySQL Server
- Maven 3.6+

## Installation & Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd TNS_Assignment/demo
```

2. Configure the database connection in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/placement_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

3. Build the project:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
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
mvn spring-boot:run
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
mvn test
```

## Build & Packaging

Build the application as a JAR:
```bash
mvn clean package
```

The JAR file will be generated in the `target/` directory as `demo-0.0.1-SNAPSHOT.jar`

## Configuration

Key configuration properties in `application.properties`:
- `spring.datasource.url` - Database connection URL
- `spring.datasource.username` - Database username
- `spring.datasource.password` - Database password
- `spring.jpa.hibernate.ddl-auto` - JPA DDL strategy (update/create/create-drop)
- `spring.jpa.show-sql` - Show SQL queries in logs

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