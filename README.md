# ParkingSystem.UI

### Parking Management System — Frontend

**ParkingSystem.UI** is the Angular Single Page Application (SPA) frontend of the Parking Management System.

The application provides the user interface for interacting with parking management services, including parking spot availability, booking operations, and user management.

It communicates with the ASP.NET Core Web API backend through RESTful HTTP endpoints.

## Architecture Overview

The solution is organized as a frontend application integrated with a separate backend API.

| Component | Technology | Responsibility |
|---|---|---|
| Frontend | Angular SPA | User interface and application navigation |
| UI Framework | Angular | Components, services, and application structure |
| Backend | ASP.NET Core Web API | Business logic and REST API services |
| Database | Microsoft SQL Server | Application data persistence |

### Related Backend

The frontend communicates with:

**ParkingSystem.Core**

Backend Repository: [ParkingSystem.Core](https://github.com/mosaabudosh/ParkingSystem.Core)

## Technology Stack

- Angular
- TypeScript
- HTML5
- CSS / SCSS
- Angular CLI
- REST API integration
- Node.js
- npm

## Application Scope

The application is designed to support parking management workflows, including:

### Parking Management
- Display parking spots.
- View parking spot availability.
- Retrieve available parking information.

### Booking Management
- Create parking reservations.
- Check parking booking status.
- Validate booking duration.
- Display booking information.

### User Management
- User registration.
- User login.
- User logout.
- Authentication through the backend API.

## Prerequisites

According to the project setup requirements:

- Node.js v18.15.0 or higher.
- npm.
- Angular CLI 16.2.16.
- A compatible development environment.
- ParkingSystem.Core backend API.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mosaabudosh/ParkingSystem.UI.git
```

### 2. Navigate to the Project Directory

```bash
cd ParkingSystem.UI
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Backend API Connection

Configure the backend API base URL using the project's existing Angular environment or application configuration.

Make sure the backend API is running and accessible before testing frontend functionality.

The corresponding backend repository is:

[ParkingSystem.Core](https://github.com/mosaabudosh/ParkingSystem.Core)

### 5. Run the Development Server

```bash
ng serve --open
```

The Angular development server will start and open the application in your default browser.

## Backend API Integration

The frontend communicates with the backend through RESTful endpoints.

The main API areas include:

| API Area | Purpose |
|---|---|
| User Management | Registration, authentication, and logout |
| Parking Spots | Retrieve parking spots and availability |
| Booking | Create reservations and validate bookings |

For complete endpoint documentation, request formats, and backend setup instructions, refer to:

[ParkingSystem.Core README](https://github.com/mosaabudosh/ParkingSystem.Core)

## Development Workflow

1. Start the SQL Server database.
2. Configure and run the ParkingSystem.Core backend.
3. Configure the frontend API base URL.
4. Install frontend dependencies.
5. Start the Angular development server.
6. Test the frontend workflows through the running application.

## Configuration and Security

- Keep environment-specific configuration separate.
- Avoid committing credentials or sensitive API configuration.
- Use the backend API for business validation and data operations.
- Handle API errors and unsuccessful requests appropriately.
- Ensure the frontend and backend API contracts remain synchronized.

## Build and Validation

Before preparing a release, verify that:

- Dependencies install successfully.
- The Angular application compiles successfully.
- The application starts without runtime errors.
- Backend API connectivity works.
- User management workflows work correctly.
- Parking spot availability is displayed correctly.
- Booking operations communicate with the backend as expected.

## Related Repository

**Backend:** [ParkingSystem.Core](https://github.com/mosaabudosh/ParkingSystem.Core)

---

**ParkingSystem — Parking Management System**
