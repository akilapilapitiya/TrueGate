 # TrueGate
 
**Professional Home Security Appliance Management Platform**
 
 [Features](#features) • [Quick Start](#quick-start) • [API Documentation](#api-documentation)
 
 ---
 
 ## Overview
 
 TrueGate is a comprehensive authentication and management system designed for home security appliances. Built with enterprise-grade security in mind, it provides a robust platform for managing multiple security devices with advanced user authentication, real-time monitoring, and centralized control capabilities.
 
 ### Key Features
 
 - Advanced Authentication System - Multi-factor authentication with JWT tokens
 - Device Management - Centralized control for multiple security appliances
 - Cloud Integration - MongoDB Atlas for scalable data storage
 - Responsive Dashboard - Modern web interface for all devices
 - Enterprise Security - Industry-standard encryption and security protocols
 - Real-time Monitoring - Live status updates and alerts
 - RESTful API - Comprehensive API for third-party integrations
 
 ---
 
 ## Architecture
 
 ```
 ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
 │   Frontend      │    │    Backend      │    │   Database      │
 │   (React/Vue)   │◄──►│   (Node.js)     │◄──►│ MongoDB Atlas   │
 │                 │    │   Express.js    │    │                 │
 └─────────────────┘    └─────────────────┘    └─────────────────┘
 ```
 
 ---
 
 ## Quick Start
 
 ### Prerequisites
 
 Before you begin, ensure you have the following installed:
 
 - **Node.js** (v16.0.0 or higher)
 - **npm** (v8.0.0 or higher)
 - **MongoDB Atlas** account and connection string
 
 ### Installation
 
 1. **Clone the repository**
    ```bash
    git clone https://github.com/akilapilapitiya/TrueGate.git
    cd TrueGate
    ```
 
 2. **Backend Setup**
    ```bash
    cd backend
    npm install
    cp .env.example .env
    # Edit .env with your configuration
    npm run dev
    ```
 
 3. **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
 
 4. **Access the Application**
    - Frontend: `http://localhost:5174`
    - Backend API: `http://localhost:4000`
 
 ---
 
 ## Configuration
 
 ### Environment Variables
 
 Create a `.env` file in the backend directory with the following variables:
 
 ```env
 # Server Configuration
 PORT=4000
 
 # Authentication
 JWT_SECRET=your_super_secure_jwt_secret_key
 
 # Database Configuration
 MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
 MONGODB_DB=truegate
 
 # Email Service
 BREVO_API_KEY=your_brevo_api_key
 BREVO_USER=your_brevo_user_email
 
 # Security
 CSRF_SECRET=your_csrf_secret_key
 ```

 ### Database Setup

 1. Create a MongoDB Atlas cluster
 2. Whitelist your IP address
 3. Create a database user
 4. Copy the connection string to your `.env` file
 
 ---
 
 ## API Documentation
 
 ### Authentication Endpoints
 
 To view all REST API endpoints and methods, visit: https://truegate.live/api-docs
 
 ## Screenshots
 
 ### Home Page
 <img src = "./screenshots/home.PNG" alt="homepage">
 
 ### Login Interface
 <img src = "./screenshots/login.PNG" alt="Login Page">

 
 ---
 
 ## Security Features
 
 - **JWT Authentication** - Stateless token-based authentication
 - **Password Hashing** - Bcrypt with configurable rounds
 - **Rate Limiting** - Protection against brute force attacks
 - **CORS Protection** - Configurable cross-origin resource sharing
 - **Input Validation** - Server-side validation for all inputs
 - **SQL Injection Prevention** - MongoDB's built-in protection
 - **XSS Protection** - Content Security Policy headers
 - **CSRF Protection** - Cross-Site Request Forgery protection
 
 ---
 
 ## Development
 
 ### Project Structure
 
 ```
 TrueGate/
 ├── backend/
 │   ├── controllers/
 │   ├── middleware/
 │   ├── models/
 │   ├── routes/
 │   ├── utils/
 │   ├── app.js
 │   └── package.json
 ├── frontend/
 │   ├── src/
 │   │   ├── components/
 │   │   ├── pages/
 │   │   ├── services/
 │   │   └── utils/
 │   ├── public/
 │   └── package.json
 └── README.md
 ```
 
 ### Available Scripts
 
 **Backend:**
 ```bash
 npm start          # Start production server
 npm run dev        # Start development server with nodemon
 ```
 
 **Frontend:**
 ```bash
 npm run dev        # Start development server
 npm run build      # Build for production
 npm run lint       # Run ESLint
 npm run preview    # Preview production build
 ```

 # Team
 - Lead Frontend Designer - <a href = "https://github.com/Tharuka621">Tharuka Subashi</a>
 - Lead DevOps Manager- <a href = "https://github.com/shpeiris">Sandali Peiris</a>
 - Lead Backend Developer - <a href = "https://github.com/budd9442">Buddhika Bandara</a>
 - Lead Frontend Developer - <a href = "https://github.com/akilapilapitiya">Akila Pilapitiya</a>
 - Lead Quality Assurance - <a href = "https://github.com/YonaliKavi">Yonali Kanvindya</a>
