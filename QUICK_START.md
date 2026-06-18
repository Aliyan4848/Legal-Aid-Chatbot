# 🇵🇰 Pakistani Legal Aid Chatbot - Quick Reference Guide

## 🎯 What This Project Does

Provides **free, 24/7 legal guidance** to Pakistani citizens based on Pakistan's Constitution and laws using AI-powered responses.

---

## 🚀 Getting Started (5 Minutes)

### 1. **Get Grok API Key** (1 minute)
```
Visit: https://console.x.ai/
- Sign up
- Create API key
- Copy the key
```

### 2. **Configure**
```bash
# Edit .env file
GROK_API_KEY=your_key_here
```

### 3. **Run (Choose One)**

**Docker (Easiest):**
```bash
docker-compose up -d
open http://localhost:3000
```

**Local Development:**
```bash
# Terminal 1 - Backend
cd backend && python -m venv venv && source venv/bin/activate
pip install -r requirements.txt && python app.py

# Terminal 2 - Frontend
cd frontend && npm install && npm run dev
open http://localhost:3000
```

---

## 📊 Project Architecture

```
┌─────────────────────────────────────────────────┐
│        FRONTEND (React/Next.js/TypeScript)       │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │       Chat Interface (Premium UI)        │   │
│  │  - Message display with animations      │   │
│  │  - Legal categories sidebar             │   │
│  │  - Real-time typing indicators          │   │
│  └──────────────────────────────────────────┘   │
│                     ↕ HTTP                       │
│  ┌──────────────────────────────────────────┐   │
│  │         Zustand State Management         │   │
│  │  - Stores chat messages                 │   │
│  │  - Manages session ID                   │   │
│  │  - Tracks loading states                │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                        ↕
                   REST API (JSON)
                        ↕
┌─────────────────────────────────────────────────┐
│         BACKEND (Flask/Python)                   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │      API Routes (/api/chat/*)           │   │
│  │  - /message (POST)                      │   │
│  │  - /categories (GET)                    │   │
│  │  - /history (GET)                       │   │
│  │  - /clear (DELETE)                      │   │
│  └──────────────────────────────────────────┘   │
│                     ↕                            │
│  ┌──────────────────────────────────────────┐   │
│  │      Grok API Integration                │   │
│  │  - Connects to AI model                 │   │
│  │  - Sends legal queries                  │   │
│  │  - Receives responses                   │   │
│  └──────────────────────────────────────────┘   │
│                     ↕                            │
│  ┌──────────────────────────────────────────┐   │
│  │    Legal Knowledge Base (Python)         │   │
│  │  - Pakistan Constitution info           │   │
│  │  - Law categories and details           │   │
│  │  - Emergency contacts                   │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## 📚 Legal Categories Covered

| Category | Areas | Laws |
|----------|-------|------|
| **Criminal Law** | Crimes, Defense, Prosecution | PPC 1860, CrPC 1898 |
| **Family Law** | Marriage, Divorce, Custody | Family Law Ordinance, Islamic Law |
| **Labor Law** | Worker Rights, Employment | Industrial Relations Ordinance |
| **Civil Law** | Contracts, Disputes, Tort | CPC 1908, Contract Act 1872 |
| **Corporate Law** | Business, Taxation, Governance | Companies Act 2017 |
| **Property Law** | Real Estate, Succession | Transfer of Property Act 1882 |

---

## 🎨 UI Components

### **Home Page**
```
┌─────────────────────────────────────────┐
│          LEGAL AID CHATBOT               │
│      Pakistani Legal Guidance            │
│                                          │
│  [Get Started] [Learn More]              │
│                                          │
│  Features Cards: 24/7, AI-Powered, Free │
│  Legal Categories: Criminal, Family...   │
│  Emergency Contacts                      │
└─────────────────────────────────────────┘
```

### **Chat Page**
```
┌─────────────────────────────────────────┐
│  Categories  │  Chat Area               │
│  ┌────────┐  │  ┌─────────────────────┐│
│  │All     │  │  │  Legal Advisor      ││
│  │Criminal│  │  │  ┌─────────────────┐││
│  │Family  │  │  │  │ Your response   │││
│  │Labor   │  │  │  └─────────────────┘││
│  │Civil   │  │  │  ┌─────────────────┐││
│  │Corp    │  │  │  │ You: My question│││
│  │Property│  │  │  └─────────────────┘││
│  │        │  │  │  [Input area]       ││
│  └────────┘  │  └─────────────────────┘│
└─────────────────────────────────────────┘
```

---

## 🔑 Key Features

✅ **AI-Powered Responses** - Uses Grok API for intelligent answers
✅ **Pakistani Laws Focus** - Based on Constitution and legal code
✅ **Premium UI Design** - Modern dark theme with animations
✅ **Real-time Chat** - Instant message delivery
✅ **Category Filtering** - Narrow results by legal field
✅ **Conversation History** - Keep track of all discussions
✅ **Mobile Responsive** - Works on all devices
✅ **Docker Ready** - One-command deployment
✅ **Secure** - No stack trace exposure, secure randomness
✅ **Free & Open** - MIT License

---

## 🔧 Environment Variables

```
# .env file (root directory)

# Grok API Configuration
GROK_API_KEY=sk-...                    # Get from console.x.ai

# Flask Configuration  
FLASK_ENV=development                  # or 'production'
FLASK_DEBUG=False                       # Never True in production
SECRET_KEY=change-me                   # Change in production

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://localhost:5000
```

---

## 📖 API Examples

### Send a Question
```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is my right to fair trial?",
    "session_id": "user-123",
    "category": "criminal_law"
  }'
```

**Response:**
```json
{
  "success": true,
  "response": "According to Article 24-25 of the Constitution...",
  "session_id": "user-123"
}
```

### Get All Categories
```bash
curl http://localhost:5000/api/chat/categories
```

---

## 🛡️ Security

| Issue | Fix |
|-------|-----|
| Debug Mode Enabled | ✅ Disabled by default |
| Stack Trace Exposure | ✅ Errors logged, not exposed |
| Insecure Randomness | ✅ Uses crypto.getRandomValues() |
| API Key in Frontend | ✅ Server-side only |
| CORS Misconfigured | ✅ Properly configured |

---

## 📋 Troubleshooting

### Port 5000 Already in Use
```bash
lsof -i :5000
kill -9 <PID>
```

### Backend Not Responding
```bash
# Check if running
curl http://localhost:5000/health

# Check logs
# Verify GROK_API_KEY is set
# Restart backend
```

### Frontend Can't Connect to Backend
```bash
# Verify backend is running
# Check NEXT_PUBLIC_API_URL=http://localhost:5000
# Check CORS configuration
```

---

## 🚀 Deployment Checklist

- [ ] Get Grok API key
- [ ] Set all environment variables
- [ ] Change SECRET_KEY to random value
- [ ] Set FLASK_ENV=production
- [ ] Set FLASK_DEBUG=False
- [ ] Enable HTTPS/SSL
- [ ] Configure proper CORS origins
- [ ] Test API endpoints
- [ ] Run security audit
- [ ] Set up monitoring/logging
- [ ] Deploy to server/cloud

---

## 📞 Getting Help

| Issue | Solution |
|-------|----------|
| No Grok API key | Visit https://console.x.ai/ |
| Installation issues | See INSTALLATION.md |
| Legal questions | Use the chatbot! |
| Bug reports | Open GitHub issue |

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `.env` | Environment variables (SECRET) |
| `backend/app.py` | Flask main application |
| `frontend/pages/chat.tsx` | Main chat interface |
| `docker-compose.yml` | Docker orchestration |
| `README.md` | Full documentation |
| `INSTALLATION.md` | Setup guide |

---

## 💡 Pro Tips

1. **Quick Local Development**
   ```bash
   docker-compose up -d  # Everything in one command
   ```

2. **See Real API Responses**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Send a message
   - See JSON responses

3. **Test Without Frontend**
   - Use `curl` or Postman
   - Send requests directly to API
   - Great for debugging

4. **Clear Chat History**
   - Click "Clear Chat" button
   - Or make DELETE request to `/api/chat/clear/{session_id}`

---

## 🎓 Learning Resources

- **Next.js**: https://nextjs.org/docs
- **Flask**: https://flask.palletsprojects.com/
- **Grok API**: https://docs.x.ai/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs/

---

## 📝 License

MIT License - Use freely with attribution

---

## 🙏 Thank You

Built with ❤️ for Pakistani citizens
Powered by Grok AI
Based on Pakistan's Constitutional Laws

**Version**: 1.0.0  
**Status**: Production Ready ✅  
**Last Updated**: June 2024
