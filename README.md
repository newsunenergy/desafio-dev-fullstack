# Energy Compensation Simulator

A full-stack application designed to simulate energy compensation plans. Users can submit energy bills, view simulations, and manage leads through a modern web interface. The backend is built with **NestJS** and **TypeORM**, using a **PostgreSQL** database, while the frontend is powered by **Next.js** with **React** and **Tailwind CSS**. The application supports file uploads for energy bills (PDFs), real-time search.

## Features

- **Lead Management**: Create, update, delete, and view leads with associated energy consumption data.
- **Energy Bill Processing**: Upload and process energy bills (PDFs) to extract consumption data via an external API.
- **Real-time Search**: Search leads by name, email, or phone number with debounced input.
- **Responsive UI**: Modern, user-friendly interface with Tailwind CSS and Next.js.
- **Health Checks**: Monitor database connectivity with a dedicated `/health` endpoint.
- **Form Validation**: Client and server-side validation using Zod and class-validator.
- **File Uploads**: Support for multiple PDF uploads with validation for size and format.
- **Data Visualization**: Display energy consumption history in tabular format.

## Tech Stack

### Backend

- **Node.js** with **NestJS**: Framework for building scalable server-side applications.
- **TypeORM**: ORM for PostgreSQL database interactions.
- **PostgreSQL**: Relational database for storing leads, units, and consumption data.
- **Axios**: For making HTTP requests to external APIs (e.g., for processing energy bills).
- **NestJS Terminus**: For health checks.
- **Multer**: For handling file uploads.

### Frontend

- **Next.js**: React framework for server-side rendering and static site generation.
- **React Hook Form**: Form handling with validation using Zod.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Tanstack React Table**: For rendering data tables.
- **SweetAlert2**: For toast notifications.
- **React Dropzone**: For drag-and-drop file uploads.

### DevOps

- **Docker**: Containerization for backend and frontend services.
- **Environment Variables**: Configured via `.env` files.

## Prerequisites

- **Node.js** (v22.16.0 or higher)
- **PostgreSQL** (running locally or via Docker)
- **Docker** and **Docker Compose** (for containerized setup)
- **npm** (Node Package Manager)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Mirian97/energy-compensation-simulator-fullstack.git
   cd energy-compensation-simulator-fullstack
   ```

2. **Install Backend Dependencies**:
   Navigate to the backend directory and run:

   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**:
   Navigate to the frontend directory or the root if Next.js is in the same directory:

   ```bash
   cd web
   npm install
   ```

4. **Set Up PostgreSQL**:
   - Ensure PostgreSQL is running locally or via Docker.
   - Create a database named `compensationSimulator`:
     ```sql
     CREATE DATABASE compensationSimulator;
     ```

## Environment Variables

Create a `.env` file inside server and web folders:

```env
# /server/.env
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=compensationSimulator
DB_PORT=5432
PORT=3004
API_URL=<external-api-url> # URL for the external energy bill processing API

# /web/.env
NEXT_PUBLIC_BASE_URL=http://localhost:3004
```

Replace `<external-api-url>` with the actual URL of the energy bill processing API (e.g., for the `/magic-pdf` endpoint).

## Running the Application

### Backend

1. Start the NestJS server in development mode:
   ```bash
   npm run start:dev
   ```
   The backend will run on `http://localhost:3004`.

---

### Frontend

1. Start the Next.js application:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`.

---

### Database

Ensure the PostgreSQL database is running and accessible. TypeORM will automatically synchronize the schema (`synchronize: true` in `ormconfig`).

---

## Docker Setup

**Build and Run using Docker Compose**:

```bash
docker compose --env-file ./server/.env up -d --build
```

## API Endpoints

### Lead Management (`/lead`)

- **POST /lead**: Create a new lead with energy bill uploads.
  - Body: `CreateLeadDto` (nomeCompleto, email, telefone) + `informacoesDaFatura` (PDF files).
  - Response: Created `Lead` object.
- **GET /lead**: Retrieve all leads with optional search query.
  - Query: `search` (string, optional).
  - Response: Array of `Lead` objects.
- **GET /lead/:id**: Retrieve a lead by ID.
  - Response: `Lead` object or 404 if not found.
- **PATCH /lead/:id**: Update a lead by ID.
  - Body: `UpdateLeadDto`.
  - Response: Updated `Lead` object.
- **DELETE /lead/:id**: Delete a lead by ID.
  - Response: Deletion result.

### Unit Management (`/unidade`)

- **POST /unidade**: Create a new consumption unit.
  - Body: `CreateUnidadeDto` (codigoDaUnidadeConsumidora, modeloFasico, enquadramento, consumoEmReais, historicoDeConsumoEmKWH).
  - Response: Created `Unidade` object.
- **GET /unidade**: Retrieve all units.
  - Response: Array of `Unidade` objects.
- **GET /unidade/:id**: Retrieve a unit by ID.
  - Response: `Unidade` object or 404 if not found.
- **PATCH /unidade/:id**: Update a unit by ID.
  - Body: `UpdateUnidadeDto`.
  - Response: Updated `Unidade` object.
- **DELETE /unidade/:id**: Delete a unit by ID.
  - Response: Deletion result.

### Consumption Management (`/consumo`)

- **POST /consumo**: Create a new consumption record.
  - Body: `CreateConsumoDto` (consumoForaPontaEmKWH, mesDoConsumo).
  - Response: Created `Consumo` object.
- **GET /consumo**: Retrieve all consumption records.
  - Response: Array of `Consumo` objects.
- **GET /consumo/:id**: Retrieve a consumption record by ID.
  - Response: `Consumo` object or 404 if not found.
- **PATCH /consumo/:id**: Update a consumption record by ID.
  - Body: `UpdateConsumoDto`.
  - Response: Updated `Consumo` object.
- **DELETE /consumo/:id**: Delete a consumption record by ID.
  - Response: Deletion result.

### Health Check (`/health`)

- **GET /health**: Check database connectivity.
  - Response: `{ status: 'ok', info: { database: { status: 'up' } } }` or error if down.

## Frontend Pages

- **Home (`/`)**: Landing page with options to start a new simulation or view existing ones.
- **New Simulation (`/simular`)**: Form to submit lead details and energy bills (PDFs).
- **Simulations List (`/listagem`)**: Table displaying all leads with search functionality.
- **Lead Details (`/listagem/:id`)**: Detailed view of a lead, including client info, energy data, and consumption history.

## License

This project is licensed under the MIT License. See the [LICENSE](./docs/LICENSE.md) file for details.
