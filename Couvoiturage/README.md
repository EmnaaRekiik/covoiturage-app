# Covoiturage Backend

ASP.NET Core Web API for the Covoiturage project. The backend provides REST endpoints for account authentication and carpooling operations, uses Entity Framework Core for persistence, and stores data in SQL Server.

## Technology

- .NET 8 / ASP.NET Core Web API
- Entity Framework Core 8 with the SQL Server provider
- JWT bearer authentication and role-based authorization
- Swagger / OpenAPI (enabled in the Development environment)

## Project structure

```text
Couvoiturage/
├── Couvoiturage.sln
└── Couvoiturage/
    ├── Controllers/     # HTTP routes and request/response handling
    ├── DTOs/            # API request and response types
    ├── Data/            # EF Core DbContext
    ├── Entities/        # Persisted domain models
    ├── Interfaces/      # Repository contracts
    ├── Migrations/      # EF Core schema migrations
    ├── Repositories/    # Data-access implementations
    └── Services/        # Application/business logic
```

The request flow is organized as controller → service → repository → Entity Framework Core context.

## API areas

All controllers use the `api/[controller]` route prefix. The main resource areas are:

| Resource | Route | Purpose |
| --- | --- | --- |
| Authentication | `/api/Auth` | Register and log in |
| Driver requests | `/api/DriverRequest` | Driver registration/request workflows |
| Evaluations | `/api/Evaluations` | Ride/user evaluations |
| Reservations | `/api/Reservations` | Create, view, accept, refuse, cancel, and complete reservations |
| Reports | `/api/Signalement` | Submit and manage reports |
| Trips | `/api/Trajets` | Search, create, update, cancel, and view trips |
| Users | `/api/Users` | User-related operations |
| Vehicles | `/api/Vehicule` | Vehicle-related operations |

Some operations require a JWT bearer token. Trip creation/management and reservation-management operations also use role-based authorization. Consult the controller actions and Swagger UI for the exact request DTOs, response payloads, and authorization requirements.

## Prerequisites

- .NET 8 SDK
- A reachable SQL Server instance (LocalDB can be used for local Windows development)
- Entity Framework Core CLI (`dotnet-ef`) to apply or create migrations

## Configure local settings

The API reads these settings from configuration:

- `ConnectionStrings:DefaultConnection`
- `Jwt:Key`
- `Jwt:Issuer`
- `Jwt:Audience`

Keep machine-specific connection strings and JWT signing keys out of source control. From the repository root, initialize .NET User Secrets from the API project directory and set the required values:

```powershell
cd .\Couvoiturage\Couvoiturage
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=(localdb)\MSSQLLocalDB;Database=Covoiturage;Trusted_Connection=True;TrustServerCertificate=True"
dotnet user-secrets set "Jwt:Key" "<replace-with-a-long-random-secret>"
dotnet user-secrets set "Jwt:Issuer" "Covoiturage"
dotnet user-secrets set "Jwt:Audience" "Covoiturage"
```

Replace the connection string with one appropriate for your SQL Server instance. Replace the JWT key with a strong, private key; never use the placeholder value. User Secrets are for development only—use your deployment platform's secret/configuration store outside development.

## Restore and create the database

From the repository root, change to `Couvoiturage/Couvoiturage` (the directory containing `Couvoiturage.csproj`):

```powershell
cd .\Couvoiturage\Couvoiturage
dotnet restore
dotnet tool install --global dotnet-ef --version 8.0.24
dotnet ef database update
```

If `dotnet-ef` is already installed, update it with `dotnet tool update --global dotnet-ef --version 8.0.24` instead. The database update applies the migrations in the project. Ensure the configured SQL Server is running and accessible first.

## Run the API

From the repository root:

```powershell
cd .\Couvoiturage\Couvoiturage
dotnet run
```

The checked-in `http` Development profile uses `http://localhost:5231`; Swagger UI is at `http://localhost:5231/swagger`. The `https` profile also configures `https://localhost:7058`. Swagger is only registered when `ASPNETCORE_ENVIRONMENT` is `Development`.

The current CORS policy allows the Angular development origin `http://localhost:4200`.

## Build

From the solution directory:

```powershell
dotnet build .\Couvoiturage.sln
```

## Frontend integration

The Angular application is maintained in the sibling `covoiturage-app` directory. It currently does not call this API; running both projects does not yet provide connected end-to-end flows.
