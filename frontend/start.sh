#!/bin/sh

# Production-ready startup script for TrueGate Frontend
# This script ensures the backend is ready before starting nginx

set -e

echo "Starting TrueGate Frontend..."

# Function to check if backend is ready
check_backend() {
    echo "Checking backend health..."
    
    # Try to connect to backend health endpoint
    if curl -f -s --max-time 10 http://backend:5000/health > /dev/null 2>&1; then
        echo "Backend is healthy and responding"
        return 0
    else
        echo "Backend health check failed"
        return 1
    fi
}

# Function to check if backend is accessible (fallback)
check_backend_connectivity() {
    echo "Checking backend connectivity..."
    
    # Try to connect to backend on port 5000
    if nc -z backend 5000 2>/dev/null; then
        echo "Backend is accessible on port 5000"
        return 0
    else
        echo "Backend is not accessible on port 5000"
        return 1
    fi
}

# Wait for backend to be ready
echo "Waiting for backend to be ready..."
max_attempts=30
attempt=1

while [ $attempt -le $max_attempts ]; do
    echo "Attempt $attempt/$max_attempts"
    
    if check_backend; then
        echo "Backend is ready!"
        break
    elif check_backend_connectivity; then
        echo "Backend is accessible, proceeding..."
        break
    else
        if [ $attempt -eq $max_attempts ]; then
            echo "WARNING: Backend is not responding correctly after $max_attempts attempts"
            echo "Starting nginx anyway..."
            break
        fi
        
        echo "Backend not ready yet, waiting 2 seconds..."
        sleep 2
        attempt=$((attempt + 1))
    fi
done

# Start nginx
echo "Starting nginx..."
exec nginx -g "daemon off;" 