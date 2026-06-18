# Pakistani Legal Aid Chatbot

A premium AI-powered chatbot providing free legal guidance based on Pakistan's Constitution and laws. Get instant assistance on criminal law, family law, labor law, civil law, corporate law, and property law.

## 🎯 Features

- **24/7 Availability**: Get legal guidance anytime, anywhere
- **Pakistani Laws Focus**: Based on Constitution of Pakistan 1973 and all major laws
- **Multiple Categories**: Criminal, Family, Labor, Civil, Corporate, and Property Law
- **Premium UI**: Modern, responsive, and professional interface
- **Free & Confidential**: Anonymous legal assistance
- **AI-Powered**: Uses Grok API for intelligent responses
- **Multiple Languages**: Support for Urdu and English

## 🏗️ Architecture

```
Legal-Aid-Chatbot/
├── backend/
│   ├── app.py                 # Flask application
│   ├── config.py              # Configuration
│   ├── requirements.txt        # Python dependencies
│   ├── utils/
│   │   ├── grok_integration.py # Grok API client
│   │   └── legal_knowledge.py  # Legal knowledge base
│   └── routes/
│       └── chat.py            # Chat API endpoints
├── frontend/
│   ├── pages/
│   │   ├── _app.tsx          # Next.js app wrapper
│   │   ├── _document.tsx      # HTML document wrapper
│   │   ├── index.tsx          # Homepage
│   │   ├── chat.tsx           # Chat page
│   │   └── about.tsx          # About page
│   ├── components/
│   │   ├── Header.tsx         # Navigation header
│   │   └── ChatInterface.tsx  # Main chat component
│   ├── store/
│   │   └── chatStore.ts       # Zustand state management
│   ├── utils/
│   │   └── api.ts             # API client
│   ├── styles/
│   │   └── globals.css        # Global styles
│   ├── package.json           # Node dependencies
│   ├── tailwind.config.js     # Tailwind CSS config
│   ├── next.config.js         # Next.js config
│   └── tsconfig.json          # TypeScript config
├── .env.example               # Environment variables template
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- Grok API key (free at https://console.x.ai/)

### Backend Setup

1. **Clone and navigate to backend**:
```bash
cd backend
```

2. **Create virtual environment**:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

4. **Create .env file** (copy from .env.example):
```bash
cp ../.env.example .env
# Edit .env and add your Grok API key
```

5. **Run Flask server**:
```bash
python app.py
```

The backend will start at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend**:
```bash
cd frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create environment file**:
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
```

4. **Run development server**:
```bash
npm run dev
```

The frontend will start at `http://localhost:3000`

## 📚 Legal Categories

### Criminal Law
- Crimes and punishments
- Pakistan Penal Code sections
- Defense and prosecution guidance

### Family Law
- Marriage and divorce procedures
- Guardianship and custody
- Inheritance and succession
- Islamic family law provisions

### Labor Law
- Worker rights and protections
- Employment contracts
- Workplace safety
- Industrial relations

### Civil Law
- Contract law
- Property disputes
- Tort remedies
- Civil procedures

### Corporate Law
- Company formation and registration
- Business taxation
- Corporate governance
- Shareholder rights

### Property Law
- Real estate ownership
- Property transfer and sale
- Lease and tenancy
- Mortgage laws

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```
# Backend Configuration
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-change-in-production

# Grok API Configuration
GROK_API_KEY=your-grok-api-key-here

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://localhost:5000
```

## 🤖 Using Grok API

1. **Get API Key**:
   - Go to https://console.x.ai/
   - Sign up or log in
   - Create an API key
   - Copy and paste into `.env` file

2. **API Models**:
   - `grok-2`: Latest model (recommended)
   - Supports chat completions

## 📖 API Endpoints

### Chat Endpoints

**Send Message**
```
POST /api/chat/message
{
  "message": "Your legal question",
  "session_id": "unique-session-id",
  "category": "criminal_law"  // optional
}
```

**Get Categories**
```
GET /api/chat/categories
```

**Get Conversation History**
```
GET /api/chat/history/{session_id}
```

**Clear History**
```
DELETE /api/chat/clear/{session_id}
```

**Health Check**
```
GET /health
```

## 🎨 Frontend Components

### Pages
- **Home (`/`)**: Landing page with features and categories
- **Chat (`/chat`)**: Main chat interface
- **About (`/about`)**: Information and legal resources

### Components
- **Header**: Navigation and branding
- **ChatInterface**: Main chat UI with categories and messages

## 🛡️ Security Considerations

- ✅ API key is server-side only
- ✅ CORS is configured for trusted origins
- ✅ No sensitive data stored in frontend
- ✅ HTTPS recommended for production
- ✅ Rate limiting recommended for production

## 📋 Legal Disclaimer

This chatbot provides general legal information based on Pakistani laws. It is **NOT** a substitute for professional legal advice from a qualified lawyer. For critical legal matters, always consult with a licensed attorney.

## 🔗 Legal Resources

- **Pakistan Legal Aid Organization**: Free legal aid for poor citizens
- **Supreme Court Bar Association**: www.scba.org.pk
- **Emergency Services**: Police (15), FIA Cyber (111-824-111)

## 🚀 Deployment

### Using Docker (Recommended)

```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Manual Deployment

1. **Backend (Production)**:
```bash
cd backend
gunicorn --bind 0.0.0.0:5000 app:app
```

2. **Frontend (Production)**:
```bash
cd frontend
npm run build
npm run start
```

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact local legal aid organizations
- Consult a qualified lawyer for legal matters

## 🙏 Acknowledgments

- Built with ❤️ for Pakistani citizens
- Powered by Grok AI
- Based on Pakistan's Constitutional Laws and Legal System

---

**Last Updated**: June 2024
**Status**: Active & Maintained ✅
