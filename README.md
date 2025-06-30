# Authentication Service (Developer Guide)

## Project Overview

This project is an **Authentication Service** designed to provide secure user authentication and management features.  
It serves as a development playground for adding, testing, and integrating frontend features with Firebase as a temporary backend.


---

## Setup Instructions

### Frontend

> **Requirements:**  
> - Node.js installed (for npm dependencies)
>
> 1. Navigate to the frontend directory:  
> cd frontend
>
> 2. Install Dependancies:
> npm install
>
> 3. Start the development server:
> npm run dev

### Back End
Coming Soon.....

### Testing 
Coming Soon.....

### Deployment
Coming Soon.....

## Branch Heirarchy
| Branch      | Purpose                                                                      |
| ----------- | ---------------------------------------------------------------------------- |
| `main`      | Production-ready frontend code only.                                         |
| `frontend`  | Development branch for new features, validations, and UI components.         |
| `feature/*` | Feature-specific branches off `frontend` (e.g., `feature/protected-routes`). |
| `backend`   | Backend development (coming soon).                                           |




## Coding Guidelines

- Use **Prettier** to format code for consistency.
- Commit messages should follow conventional commit styles:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `test:` for tests
  - `docs:` for documentation updates



## Important Information

- **Firebase Authentication** is used as the temporary authentication provider.
- **Firestore** is used as the temporary database backend.
- Backend and database infrastructure will be upgraded in future versions.
- Please Update ME everytime so that it is best for all