#!/bin/bash

# TrueGate Production Deployment Script
# This script sets up the TrueGate application for production deployment

set -e

echo "🚀 Starting TrueGate Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_warning "Running as root. This is not recommended for security reasons."
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists
if [ ! -f "./backend/.env" ]; then
    print_error "Backend .env file not found. Please create it first."
    echo "You can copy from .env.example if available."
    exit 1
fi

# Stop and remove existing containers
print_status "Stopping existing containers..."
docker-compose down --remove-orphans || true

# Remove old images to ensure fresh build
print_status "Removing old images..."
docker system prune -f || true

# Build and start containers
print_status "Building and starting containers..."
docker-compose up --build -d

# Wait for containers to be healthy
print_status "Waiting for containers to be healthy..."
sleep 10

# Check container status
print_status "Checking container status..."
if docker-compose ps | grep -q "Up"; then
    print_status "✅ Containers are running successfully!"
else
    print_error "❌ Some containers failed to start. Check logs with: docker-compose logs"
    exit 1
fi

# Check backend health
print_status "Checking backend health..."
if curl -f -s http://localhost:5000/health > /dev/null; then
    print_status "✅ Backend is healthy!"
else
    print_warning "⚠️  Backend health check failed. This might be normal during startup."
fi

# Check frontend accessibility
print_status "Checking frontend accessibility..."
if curl -f -s http://localhost > /dev/null; then
    print_status "✅ Frontend is accessible!"
else
    print_warning "⚠️  Frontend accessibility check failed. This might be normal during startup."
fi

# Display access information
echo ""
print_status "🎉 Deployment completed successfully!"
echo ""
echo "📋 Access Information:"
echo "   Frontend: http://localhost"
echo "   Backend API: http://localhost:5000"
echo "   API Documentation: http://localhost:5000/api-docs"
echo "   Health Check: http://localhost:5000/health"
echo ""
echo "🌐 For domain access (truegate.live):"
echo "   1. Ensure your domain DNS points to this server's IP"
echo "   2. Configure your firewall to allow ports 80 and 443"
echo "   3. Set up SSL certificates (recommended for production)"
echo ""
echo "📊 Useful Commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   Update and redeploy: ./deploy.sh"
echo ""

# Check if domain is accessible (if running on the domain server)
if command -v nslookup &> /dev/null; then
    print_status "Checking domain DNS resolution..."
    if nslookup truegate.live &> /dev/null; then
        print_status "✅ Domain DNS resolution successful!"
    else
        print_warning "⚠️  Domain DNS resolution failed. Make sure your domain points to this server."
    fi
fi

print_status "Deployment script completed!" 