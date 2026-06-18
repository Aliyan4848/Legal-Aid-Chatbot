# Installation & Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Docker Setup](#docker-setup)
4. [Configuration](#configuration)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required
- **Python 3.8+** - Download from [python.org](https://www.python.org/)
- **Node.js 16+** - Download from [nodejs.org](https://nodejs.org/)
- **Grok API Key** - Get free key from [console.x.ai](https://console.x.ai/)
- **Git** - Download from [git-scm.com](https://git-scm.com/)

### Optional (for Docker deployment)
- **Docker** - Download from [docker.com](https://www.docker.com/)
- **Docker Compose** - Usually included with Docker Desktop

---

## Local Development Setup

### Step 1: Clone Repository
```bash
git clone https://github.com/Aliyan4848/Legal-Aid-Chatbot.git
cd Legal-Aid-Chatbot
```

### Step 2: Backend Setup

#### Create Python Virtual Environment
```bash
cd backend
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

#### Install Python Dependencies
```bash
pip install -r requirements.txt
```

#### Create Backend Configuration
```bash
# Copy the environment template
cp ../.env.example .env

# Edit .env and add your Grok API key
# GROK_API_KEY=your_key_here
```

#### Start Backend Server
```bash
python app.py
```

Expected output:
```
 * Running on http://0.0.0.0:5000
```

### Step 3: Frontend Setup (in new terminal)

#### Navigate to Frontend
```bash
cd frontend
```

#### Install Node Dependencies
```bash
npm install
```

#### Create Frontend Environment
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
```

#### Start Frontend Development Server
```bash
npm run dev
```

Expected output:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Step 4: Access Application
- **Frontend**: Open http://localhost:3000 in your browser
- **Backend API**: http://localhost:5000
- **API Documentation**: Visit http://localhost:5000/ for endpoint info

---

## Docker Setup

### Quick Start with Docker Compose

#### 1. Set Environment Variables
```bash
# Create .env file
cat > .env << EOF
GROK_API_KEY=your_grok_api_key_here
SECRET_KEY=your_secret_key_here
FLASK_ENV=production
EOF
```

#### 2. Build and Run Containers
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f
```

#### 3. Access Application
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

#### 4. Stop Containers
```bash
docker-compose down
```

---

## Configuration

### Backend Configuration (.env)

```
# Flask Settings
FLASK_ENV=development          # Set to 'production' for deployment
FLASK_DEBUG=True               # Set to False in production
SECRET_KEY=change-me           # Change this to a random string

# Grok API
GROK_API_KEY=your_key_here     # Get from https://console.x.ai/

# CORS Settings
CORS_ORIGINS=http://localhost:3000,http://localhost:5000
```

### Frontend Configuration (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Getting Grok API Key

1. Go to [console.x.ai](https://console.x.ai/)
2. Click "Sign Up" or "Log In"
3. Navigate to API Keys section
4. Click "Create API Key"
5. Copy the key
6. Paste it in your .env file: `GROK_API_KEY=paste_here`

---

## Troubleshooting

### Backend Issues

#### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill process (Linux/macOS)
kill -9 <PID>

# On Windows, use Task Manager
```

#### Module Not Found Error
```bash
# Make sure virtual environment is activated
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

#### GROK_API_KEY Error
- Ensure `.env` file exists in backend directory
- Verify API key format: `GROK_API_KEY=sk-...`
- Check key is valid at https://console.x.ai/

### Frontend Issues

#### Port Already in Use
```bash
# Kill process using port 3000
# On Windows: Find process in Task Manager
# On Linux/macOS:
lsof -i :3000
kill -9 <PID>
```

#### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### API Connection Error
- Ensure backend is running on http://localhost:5000
- Check NEXT_PUBLIC_API_URL in .env.local
- Verify CORS_ORIGINS in backend .env includes frontend URL

### Docker Issues

#### Permission Denied
```bash
# Add user to docker group (Linux)
sudo usermod -aG docker $USER
newgrp docker
```

#### Build Fails
```bash
# Remove old images
docker-compose down
docker system prune -a

# Rebuild
docker-compose build --no-cache
```

#### Services Don't Connect
- Ensure Docker daemon is running
- Check docker-compose.yml for correct service names
- Verify all required .env variables are set

---

## Verification

### Test Backend
```bash
# Health check
curl http://localhost:5000/health

# Expected response:
# {"status": "healthy", "service": "Legal Aid Chatbot API"}
```

### Test Frontend
- Visit http://localhost:3000
- Click "Start Free Consultation"
- Try sending a test message

### Test Integration
1. Send a message in chat
2. Verify response appears
3. Check backend logs for request handling
4. Verify Grok API is being called

---

## Production Deployment

### Before Going Live
1. ✅ Change all SECRET_KEY values
2. ✅ Set FLASK_ENV=production
3. ✅ Set FLASK_DEBUG=False
4. ✅ Enable HTTPS/SSL
5. ✅ Configure proper CORS_ORIGINS
6. ✅ Set up proper environment variables
7. ✅ Review security settings
8. ✅ Add rate limiting
9. ✅ Set up logging and monitoring
10. ✅ Test thoroughly

### Deployment Options

#### Option 1: Heroku
```bash
heroku create your-app-name
heroku config:set GROK_API_KEY=your_key
git push heroku main
```

#### Option 2: AWS
```bash
# Use EC2 with Docker or Elastic Beanstalk
# Requires AWS account setup
```

#### Option 3: DigitalOcean
```bash
# Deploy using Docker Compose or App Platform
```

---

## Support & Resources

- **Issues**: Open GitHub issue with details
- **Documentation**: See README.md
- **Legal Resources**: See About page in app
- **Grok API Docs**: https://docs.x.ai/

---

**Last Updated**: June 2024
