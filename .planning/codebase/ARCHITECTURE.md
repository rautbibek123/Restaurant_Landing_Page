# Architecture

## High-Level Overview

Annapurna Kitchen is structured as a modern Single Page Application (SPA) for the frontend, with a planned REST API backend.

### Frontend Architecture
- **Component-Based**: The UI is divided into semantic sections (`Hero`, `About`, `Menu`, etc.) assembled in `App.jsx`.
- **Global State**: Minimal global state. The `ToastProvider` utilizes React Context to provide application-wide notification capabilities.
- **Data Management**: Menu items, specials, testimonials, and gallery images are currently statically defined in `src/data/menuData.js`.
- **Styling Approach**: BEM-like CSS methodology implemented using Vanilla CSS (`global.css` for tokens/resets, `App.css` for component styles). Extensive use of CSS Custom Properties for theming (e.g., Gold, Dark, Accent).

### Backend Architecture (Planned)
The upcoming backend will follow a standard MVC or layered approach:
- **Routes**: Define API endpoints (`/api/reservations`, `/api/newsletter`).
- **Controllers**: Handle business logic and request/response formatting.
- **Models**: Mongoose schemas defining data structure for MongoDB.
- **Services**: Abstract external operations (like sending emails).

## Data Flow
1. **User Interaction**: User fills out a reservation or newsletter form.
2. **Frontend Validation**: Client-side checks (e.g., regex for email, required fields).
3. **API Call**: `fetch` POST request sent to backend (currently falling back to mock success states).
4. **Backend Processing**: Express handles validation, saves to MongoDB, and triggers email service.
5. **Feedback**: Backend responds, frontend triggers a Toast notification (success/error).
