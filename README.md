# Covoiturage App

A modern Angular carpooling web application designed to help users find, offer, and manage shared rides. The app focuses on a clean user experience for trip search, ride creation, and trip management in a mobility-sharing context.

## Project overview

This project is a front-end prototype for a ride-sharing platform inspired by services like BlaBlaCar. It includes a complete user flow for:

- searching for available rides
- creating a new ride offer
- viewing and managing personal rides
- signing in or creating an account
- viewing a user profile

The application uses Angular 21 with standalone components, Angular Router, and a responsive interface built around a travel / eco-mobility theme.

## Key features

- Home landing page with hero section and trip search form
- Search screen for departure, destination, date, and passenger filters
- Ride creation form with route, time, price, and seat selection
- My rides dashboard for personal trip management
- Authentication screens for login and registration
- User profile page
- Responsive design for desktop and mobile browsing
- Client-side route navigation with reusable components and modular page structure

## Tech stack

- Angular 21
- TypeScript
- Angular Router
- Angular Forms
- CSS for custom styling
- Angular SSR support
- Vitest (configured in the project tooling)

## Project structure

```text
src/
  app/
    app.routes.ts
    app.ts
    app.html
    app.css
    models/
      ride.ts
    pages/
      home/
      search/
      create-ride/
      my-rides/
      login/
      register/
      profile/
      navbar/
```

## Routes

The application includes the following pages:

- `/` - Home page
- `/search` - Search for rides
- `/create` - Create a ride offer
- `/my-rides` - Manage personal rides
- `/login` - User login
- `/register` - User registration
- `/profile` - User profile

## Getting started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (recommended: current LTS version)
- npm

### Install dependencies

```bash
npm install
```

### Run the app in development mode

```bash
npm start
```

or

```bash
ng serve
```

Then open:

```text
http://localhost:4200/
```

The app will automatically reload when you change source files.

## Build for production

```bash
npm run build
```

This creates a production build in the `dist/` folder.

## Run tests

```bash
npm test
```

## Notes

This project is currently a front-end prototype and does not yet include a real backend, database, or authentication service. It is structured so that those services can be connected later without major refactoring.

## License

This project is for educational / personal use and is not currently configured with a formal commercial license.

## Useful resources

- Angular documentation: https://angular.dev
- Angular CLI: https://angular.dev/tools/cli
