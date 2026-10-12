# Covoiturage

A carpooling application project with an Angular web frontend and an ASP.NET Core Web API. The frontend provides the ride-sharing interface, while the backend contains the API, authentication, and SQL Server data-access layers.

> **Integration status:** The frontend and backend are currently separate projects. The Angular frontend does not yet make HTTP requests to the API; its screens should be treated as frontend/UI work rather than as a fully connected end-to-end application.

## Repository layout

```text
.
├── Couvoiturage/
│   ├── Couvoiturage.sln
│   ├── README.md                 # Backend/API documentation
│   └── Couvoiturage/
│       ├── Couvoiturage.csproj
│       ├── Controllers/
│       ├── DTOs/
│       ├── Data/
│       ├── Entities/
│       ├── Migrations/
│       ├── Repositories/
│       └── Services/
└── covoiturage-app/
    ├── package.json
    ├── angular.json
    ├── README.md                 # Frontend-only documentation
    └── src/
```

## Project components

### Frontend

The frontend is an Angular 21 application using TypeScript, standalone components, Angular Router, and Angular SSR tooling. Its pages cover the home screen, ride search, ride creation, a user's rides, login, registration, and profile.

See [`covoiturage-app/README.md`](./covoiturage-app/README.md) for frontend-specific installation, development, build, and test instructions.

### Backend

The backend is an ASP.NET Core Web API targeting .NET 8. It uses Entity Framework Core with SQL Server, JWT bearer authentication, and Swagger in the Development environment. Its API areas include authentication, users, driver requests, vehicles, trips, reservations, evaluations, and reports.

See [`Couvoiturage/README.md`](./Couvoiturage/README.md) for backend configuration, database setup, API areas, and run instructions.

## Prerequisites

- Git
- Node.js and npm versions supported by Angular 21
- .NET 8 SDK
- A SQL Server instance for the backend

## Run locally

Set up the backend configuration and database as described in [`Couvoiturage/README.md`](./Couvoiturage/README.md). Then run the frontend and backend in separate terminals from the repository root.

**Terminal 1 — backend**

```powershell
cd .\Couvoiturage\Couvoiturage
dotnet run
```

With the checked-in Development launch profile, the API listens at `http://localhost:5231` and Swagger UI is available at `http://localhost:5231/swagger`.

**Terminal 2 — frontend**

```powershell
cd .\covoiturage-app
npm install
npm start
```

Open `http://localhost:4200/`. Running both projects does not currently connect the frontend to the API; integration still needs to be implemented.

## Contributing

Keep frontend and backend setup instructions in their respective READMEs. Do not commit credentials, JWT signing keys, or other local secrets.
