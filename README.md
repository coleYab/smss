# README

## SSMS Backend and Frontend Setup

This guide explains how to set up a Golang backend and a Next.js frontend for an ecommerce application. Follow the steps below to get your development environment up and running.

---

## Prerequisites

Ensure you have the following installed on your system:

- [Golang](https://go.dev/doc/install) (version 1.18 or later)
- [Node.js](https://nodejs.org/en/download/) (version 16 or later)
- [PostgreSQL](https://www.postgresql.org/download/) (version 12 or later)
- [Git](https://git-scm.com/downloads)
- [Make](https://www.gnu.org/software/make/)
- A terminal or command prompt

---

## Backend (Golang)

### 1. Clone the Repository
```bash
git clone https://github.com/coleYab/smss.git
cd smss
```

### 2. Set Up Environment Variables
Create a `.env` file in the root of the project and add the following variables:
```env
DB_HOST=localhost
DB_PORT=5432
DB_PWD=your_database_password
DB_NAME=smss
DB_USER=postgres
PORT=8080
JWT_EXPIRATION=3600
JWT_SECRET=MySuperSecret
```

### 3. Run PostgreSQL
Ensure that your PostgreSQL instance is running, and a database named `ecom` is created:
```sql
CREATE DATABASE smss;
```

### 4. Install Dependencies
```bash
go mod tidy
```

### 5. Run the Backend
```bash
make migrate-up
make run
```

The backend server will start on the port specified in the `.env` file (default: `8080`).

---

## Frontend (Next.js)

### 1. Navigate to the Frontend Directory
If the frontend is stored in the same repository under a `frontend` folder:
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the `frontend` directory and add any environment variables required for the frontend, such as:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 4. Run the Frontend
```bash
npm run dev
```

The Next.js development server will start on [http://localhost:3000](http://localhost:3000).

---

## Running Tests

### Backend Tests
```bash
make test
```

### Frontend Tests
```bash
npm test
```

---

## Deployment

### Backend
1. Build the binary:
   ```bash
   make migrate-up
   make build
   ```

2. Run the binary:
   ```bash
   ./ssms
   ```

### Frontend
1. Build the Next.js application:
   ```bash
   npm run build
   ```
2. Serve the static files:
   ```bash
   npm start
   ```

---

## Contributing
1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Commit your changes.
4. Push the branch and open a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For any questions or issues, feel free to open an issue in the repository or contact the maintainer.
