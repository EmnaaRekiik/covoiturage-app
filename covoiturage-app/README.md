# Covoiturage Frontend

The Angular frontend for the Covoiturage carpooling project. This directory documents and runs only the web client; the ASP.NET Core API is a separate project in `../Couvoiturage`.

> **Current scope:** This project provides the Angular interface and route/page structure. It does not currently make HTTP requests to the backend API, so the frontend screens are not yet connected to backend data or authentication.

## Frontend features and pages

- Home page and ride-search interface
- Ride search page with route/date and filter fields
- Ride creation page
- Personal rides page
- Login and registration pages
- User profile page
- Responsive layouts and shared navigation

Routes are configured in `src/app/app.routes.ts`: `/`, `/search`, `/create`, `/my-rides`, `/login`, `/register`, and `/profile`.

## Technology

- Angular 21 and TypeScript
- Angular Router and Forms
- Angular SSR tooling
- CSS
- Vitest through the Angular test builder

## Prerequisites

- Node.js and npm versions supported by Angular 21

## Install and run locally

From this directory:

```powershell
npm install
npm start
```

Open `http://localhost:4200/`. The development server reloads the application when source files change.

## Build

```powershell
npm run build
```

The production build is written under `dist/`. The project is configured for server-side rendering; after a successful build, the generated server can be run with:

```powershell
npm run serve:ssr:covoiturage-app
```

## Tests

```powershell
npm test
```

## Related project

For API, SQL Server, authentication, and database setup, see [`../Couvoiturage/README.md`](../Couvoiturage/README.md). Starting the API does not connect it to this frontend; that integration is not implemented yet.
