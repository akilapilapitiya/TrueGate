# Test Environment Setup Script for TrueGate Backend
# This script sets up environment variables for running tests

Write-Host "Setting up test environment variables..." -ForegroundColor Green

# Set test environment variables
$env:NODE_ENV = "test"
$env:PORT = "4002"
$env:MONGODB_DB = "truegate_test"
$env:JWT_SECRET = "test-jwt-secret-key-for-testing-only"
$env:CSRF_SECRET = "test-csrf-secret-key-for-testing-only"

# Check if MONGODB_URI is already set
if ($env:MONGODB_URI) {
    Write-Host "✅ MONGODB_URI is already set: $($env:MONGODB_URI)" -ForegroundColor Green
} else {
    Write-Host "⚠️  MONGODB_URI is not set. Please set it manually:" -ForegroundColor Yellow
    Write-Host "   For local MongoDB: mongodb://localhost:27017/truegate_test" -ForegroundColor Cyan
    Write-Host "   For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/truegate_test" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   Example:" -ForegroundColor White
    Write-Host "   `$env:MONGODB_URI = 'mongodb://localhost:27017/truegate_test'" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Environment variables set:" -ForegroundColor Green
Write-Host "  NODE_ENV: $env:NODE_ENV" -ForegroundColor Gray
Write-Host "  PORT: $env:PORT" -ForegroundColor Gray
Write-Host "  MONGODB_DB: $env:MONGODB_DB" -ForegroundColor Gray
Write-Host "  JWT_SECRET: $env:JWT_SECRET" -ForegroundColor Gray
Write-Host "  CSRF_SECRET: $env:CSRF_SECRET" -ForegroundColor Gray

Write-Host ""
Write-Host "You can now run tests with:" -ForegroundColor Green
Write-Host "  npm test" -ForegroundColor Cyan
Write-Host "  npm test test/auth.test.js" -ForegroundColor Cyan
Write-Host "  npm run test:coverage" -ForegroundColor Cyan 