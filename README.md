# TrueGate
> A secure, modern web platform for seamless user access.

![Homepage Screenshot](./screenshots/homepage.png)

---
## About the Project

TrueGate is a full-stack web application built to provide a secure, role-based platform with modern design principles. It features authentication, protected routes, and an intuitive user experience.

---

##  Features

-  Secure JWT-based login system
-  Role-based authorization (Admin/User)
-  Material UI design system
-  Responsive and accessible layout
-  Redux-based global state management
-  RESTful API architecture
-  Postman-tested endpoints

---

##  Tech Stack

**Frontend:**
- React
- Material UI
- React Router
- Redux

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

**DevOps:**
- Git & GitHub
- Netlify (Frontend)
- Render (Backend)
- Postman (API Testing)

---

## 🛠 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/truegate.git

# Navigate to backend
cd backend
npm install
npm run dev

# Navigate to frontend
cd ../frontend
npm install
npm start
```

---

## Environment Variables

In `/backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 📡 API Reference

Full documentation → [api.doc.md](./api.doc.md)

Example Endpoints:
- POST `/api/auth/login`
- GET `/api/users/:id`
- POST `/api/auth/register`

---

## 🧪 Testing

- ✅ Postman for API endpoint testing
- ✅ Manual UI testing (forms, routing)
- 🧪 Optional: Jest or Mocha for unit tests

---

## 🌍 Deployment

- **Frontend:** [https://www.truegate.live](https://www.truegate.live)
- **Backend:** [https://api.truegate.live](https://api.truegate.live)

---

## ⚔️ Challenges

- 🔁 Handling JWT token expiration
- 🌐 Managing CORS between frontend and backend
- 🧩 Syncing protected routes with authentication state

---

## 👥 Contributors

- Your Name – Frontend & DevOps
- Teammate 2 – Backend Development
- Teammate 3 – API & Testing

---
