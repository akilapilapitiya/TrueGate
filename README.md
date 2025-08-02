# TrueGate - Security Management System

A comprehensive security management system with user authentication, device management, and security monitoring capabilities.

## Features

- 🔐 Secure user authentication with CSRF protection
- 📱 Responsive React frontend with Material-UI
- 🛡️ Security monitoring and logging
- 📊 Dashboard with real-time statistics
- 🔒 Role-based access control
- 📧 Email verification system
- 🔄 Password reset functionality

## Quick Start with Docker

### Prerequisites

- Docker and Docker Compose installed
- Node.js 20+ (for local development)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TrueGate
   ```

2. **Set up environment variables**
   ```bash
   # Copy the backend environment template
   cp backend/.env.example backend/.env
   
   # Edit the environment file with your development values
   nano backend/.env
   ```

3. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs

### Production Deployment (Domain Setup)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TrueGate
   ```

2. **Set up environment variables**
   ```bash
   # Copy the backend environment template
   cp backend/.env.example backend/.env
   
   # Edit the environment file with your production values
   nano backend/.env
   ```

3. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build -d
   ```

4. **Access the application**
   - Frontend: http://localhost (or your domain)
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs

5. **For domain access (e.g., truegate.live)**
   - See [DOMAIN_SETUP.md](./DOMAIN_SETUP.md) for detailed instructions
   - Ensure DNS A records point to your server IP
   - Configure firewall to allow ports 80 and 443

### Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=27017
DB_NAME=truegate
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# Email Configuration (for password reset and verification)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Security Configuration
CSRF_SECRET=your_csrf_secret
SESSION_SECRET=your_session_secret

# Application Configuration
NODE_ENV=production
PORT=5000
```

## Development Setup

### Backend Development

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your development values
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

### Frontend Development

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

## API Documentation

The API documentation is available at `/api-docs` when the backend is running. It provides interactive documentation for all endpoints.

## Security Features

- **CSRF Protection**: All state-changing operations are protected against CSRF attacks
- **Rate Limiting**: API endpoints are protected against brute force attacks
- **Security Logging**: All security events are logged for monitoring
- **Input Validation**: All user inputs are validated and sanitized
- **Secure Headers**: Security headers are automatically added to responses

## Troubleshooting

### Common Issues

1. **"curl: not found" error**
   - This has been fixed in the updated Dockerfile
   - The frontend container now includes curl and netcat for health checks

2. **Backend not responding**
   - Check if the backend container is running: `docker ps`
   - View backend logs: `docker logs truegate-backend`
   - Ensure environment variables are properly set

3. **Database connection issues**
   - Verify MongoDB is running and accessible
   - Check database credentials in the `.env` file
   - Ensure the database host and port are correct

4. **Frontend can't connect to backend**
   - Verify both containers are running: `docker ps`
   - Check the API proxy configuration in `nginx.conf`
   - Ensure the backend health endpoint is responding

### Health Checks

The application includes built-in health checks:

- **Backend Health**: `GET /health`
- **Frontend Health**: `GET /health`

### Logs

View application logs:

```bash
# Backend logs
docker logs truegate-backend

# Frontend logs
docker logs truegate-frontend

# Follow logs in real-time
docker logs -f truegate-backend
```

## Production Considerations

1. **Environment Variables**: Always use strong, unique secrets in production
2. **Database**: Use a production-grade MongoDB instance
3. **SSL/TLS**: Configure HTTPS in production environments
4. **Monitoring**: Set up proper logging and monitoring
5. **Backups**: Implement regular database backups
6. **Updates**: Keep dependencies updated for security patches

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.