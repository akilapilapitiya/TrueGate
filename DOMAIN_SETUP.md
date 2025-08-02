# TrueGate Domain Setup Guide

This guide will help you set up `truegate.live` to work with your TrueGate application.

## 🚨 Current Issue: Cannot Access truegate.live

Based on your logs, the containers are running successfully, but you can't access the domain. Here are the most common causes and solutions:

## 🔍 Step-by-Step Troubleshooting

### 1. **DNS Configuration Check**

First, verify that your domain DNS is pointing to your server:

```bash
# Check if your domain resolves to your server IP
nslookup truegate.live
dig truegate.live
```

**Expected Result:** Should show your server's IP address.

**If DNS is not configured:**
- Go to your domain registrar (GoDaddy, Namecheap, etc.)
- Add an A record: `truegate.live` → `YOUR_SERVER_IP`
- Add an A record: `www.truegate.live` → `YOUR_SERVER_IP`

### 2. **Firewall Configuration**

Ensure your server's firewall allows HTTP and HTTPS traffic:

```bash
# For UFW (Ubuntu)
sudo ufw allow 80
sudo ufw allow 443
sudo ufw status

# For iptables
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```

### 3. **Port Configuration**

Your current setup exposes the frontend on port 80, which is correct for domain access:

```yaml
# In docker-compose.yml
frontend:
  ports:
    - "80:80"  # This allows domain access
```

### 4. **Container Status Check**

Verify your containers are running and healthy:

```bash
# Check container status
docker ps

# Check container logs
docker logs truegate-frontend
docker logs truegate-backend

# Check if nginx is serving content
curl -I http://localhost
```

### 5. **Nginx Configuration Verification**

The nginx configuration now includes your domain:

```nginx
server {
    listen 80;
    server_name localhost truegate.live www.truegate.live;
    # ... rest of config
}
```

## 🛠️ Quick Fix Commands

Run these commands on your server to fix the most common issues:

```bash
# 1. Stop and restart containers with new configuration
docker-compose down
docker-compose up --build -d

# 2. Check if containers are running
docker ps

# 3. Test local access
curl http://localhost

# 4. Test domain access (if DNS is configured)
curl http://truegate.live

# 5. Check nginx configuration
docker exec truegate-frontend nginx -t
```

## 🌐 DNS Setup Instructions

### For Popular Domain Registrars:

**GoDaddy:**
1. Log into GoDaddy
2. Go to DNS Management
3. Add A record: `@` → `YOUR_SERVER_IP`
4. Add A record: `www` → `YOUR_SERVER_IP`

**Namecheap:**
1. Log into Namecheap
2. Go to Domain List → Manage
3. Go to Advanced DNS
4. Add A record: `@` → `YOUR_SERVER_IP`
5. Add A record: `www` → `YOUR_SERVER_IP`

**Cloudflare:**
1. Log into Cloudflare
2. Go to DNS settings
3. Add A record: `truegate.live` → `YOUR_SERVER_IP`
4. Add A record: `www` → `YOUR_SERVER_IP`

## 🔒 SSL/HTTPS Setup (Recommended)

For production, you should set up SSL certificates:

```bash
# Install Certbot
sudo apt update
sudo apt install certbot

# Get SSL certificate
sudo certbot certonly --standalone -d truegate.live -d www.truegate.live

# The certificates will be in /etc/letsencrypt/live/truegate.live/
```

## 📋 Complete Deployment Checklist

- [ ] DNS A records point to your server IP
- [ ] Firewall allows ports 80 and 443
- [ ] Docker containers are running (`docker ps`)
- [ ] Frontend is accessible locally (`curl http://localhost`)
- [ ] Backend health check passes (`curl http://localhost:5000/health`)
- [ ] Domain resolves to your server (`nslookup truegate.live`)
- [ ] SSL certificates installed (optional but recommended)

## 🚀 Production Deployment

Use the deployment script for a complete setup:

```bash
# Make script executable (on Linux server)
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## 🔧 Manual Testing Commands

```bash
# Test backend health
curl http://localhost:5000/health

# Test frontend
curl http://localhost

# Test domain (if DNS is configured)
curl http://truegate.live

# Check container logs
docker-compose logs -f

# Restart services
docker-compose restart
```

## 📞 Support

If you're still having issues:

1. **Check the logs:** `docker-compose logs -f`
2. **Verify DNS:** `nslookup truegate.live`
3. **Test connectivity:** `curl -v http://truegate.live`
4. **Check firewall:** `sudo ufw status`

The most common issue is DNS configuration - make sure your domain registrar has the correct A records pointing to your server's IP address. 