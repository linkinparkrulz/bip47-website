# BIP47 & Paynym Showcase

A full-stack web application demonstrating Bitcoin's BIP47 payment protocol and Paynym identity system with proper auth47 authentication.

## 🚀 Features

### **Authentication**
- **Real Auth47 Integration**: Bitcoin-based identity verification using cryptographic signatures
- **Wallet Compatibility**: Works with Samourai Wallet, Sparrow Wallet, and other auth47-compatible wallets
- **Secure Implementation**: Uses `@noble/secp256k1` for proper Bitcoin message verification

### **BIP47 Education**
- **Interactive Lab**: Explore payment codes and stealth address generation
- **Technical Documentation**: Learn about BIP47 specification and implementation
- **Visual Demonstrations**: See how privacy-preserving Bitcoin payments work

### **Paynym Integration**
- **Identity Explorer**: Search and discover Paynym identities
- **Guestbook**: Leave cryptographically signed messages for the community
- **Contact Management**: Store and manage Paynym contacts

## 🏗️ Architecture

### **Backend (Node.js/Express)**
- **Port**: 3001
- **Database**: SQLite with user management and guestbook
- **Authentication**: Real auth47 with Bitcoin signature verification
- **API**: RESTful endpoints for auth47, BIP47, and Paynym features

### **Frontend (Next.js/React)**
- **Port**: 3002 (development)
- **Styling**: Tailwind CSS with cypherpunk/terminal aesthetic
- **Features**: QR code generation, wallet integration, interactive demos

## 🛠️ Installation & Setup

### **Prerequisites**
- Node.js 18.x.x or higher
- npm or yarn
- Git

### **Backend Setup**

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### **Frontend Setup**

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3002`

## 🔐 Auth47 Authentication

### **Development Setup**
For local development, the app uses HTTP callbacks:
- Callback URL: `http://localhost:3001/authenticate`
- No additional setup required

### **Production Setup**
For production or wallet testing, you'll need HTTPS:

1. **Using ngrok (recommended for testing)**:
```bash
# Install ngrok
npm install -g ngrok

# Start ngrok for your backend
ngrok http 3001

# Update your .env file:
NGROK_URL=https://your-ngrok-url.ngrok-free.app
```

2. **Using HTTPS certificates**:
```bash
# Update your .env file:
CALLBACK_URL=https://your-domain.com/authenticate
```

### **Wallet Integration**
1. Visit `http://localhost:3002/auth`
2. Scan the QR code with your auth47-compatible wallet
3. Approve the signature request
4. You'll be automatically redirected back

**Supported Wallets:**
- Samourai Wallet (Android)
- Sparrow Wallet (Desktop)
- Other auth47-compatible Bitcoin wallets

## 📚 API Endpoints

### **Authentication**
- `GET /api/auth/challenge` - Generate auth47 challenge
- `GET /api/auth/authenticate` - Auth47 callback endpoint
- `POST /api/auth/verify` - Legacy verification endpoint

### **BIP47**
- `GET /api/paynym/info` - BIP47 educational content
- `GET /api/paynym/explorer/:paymentCode` - Paynym explorer
- `POST /api/paynym/lab/generate-stealth` - Generate stealth addresses
- `GET /api/paynym/lab/examples` - BIP47 transaction examples

### **Guestbook**
- `GET /api/guestbook/entries` - Get all guestbook entries
- `POST /api/guestbook/sign` - Sign a guestbook entry

## 🔧 Development

### **Project Structure**
```
bip47-paynym-showcase/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── database/       # Database setup
│   │   └── utils/          # Utility functions
│   ├── server.js           # Main server file
│   └── package.json
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App pages
│   │   └── components/    # React components
│   └── package.json
└── README.md
```

### **Key Technologies**
- **Backend**: Node.js, Express, SQLite, JWT, @noble/secp256k1
- **Frontend**: Next.js, React, Tailwind CSS, QRCode
- **Authentication**: Auth47 protocol with Bitcoin signature verification
- **Database**: SQLite with user management and guestbook

### **Security Features**
- **Real Cryptographic Verification**: Uses Bitcoin message signing
- **JWT Tokens**: Secure session management
- **Challenge-Response**: Prevents replay attacks
- **Input Validation**: Comprehensive input sanitization

## 🧪 Testing

### **API Testing**
```bash
# Test auth47 challenge generation
curl http://localhost:3001/api/auth/challenge

# Test health endpoint
curl http://localhost:3001/api/health
```

### **Frontend Testing**
1. Open `http://localhost:3002` in your browser
2. Navigate to the auth page
3. Test the QR code generation
4. Verify wallet integration (requires compatible wallet)

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Review the documentation
- Check the API endpoints

## 🔗 Related Resources

- [BIP47 Specification](https://github.com/bitcoin/bips/blob/master/bip-0047.mediawiki)
- [Paynym.rs](https://paynym.rs/)
- [Auth47 Protocol](https://github.com/Samourai-Wallet/auth47)
- [Samourai Wallet](https://samouraiwallet.com/)

---

**Built with ❤️ for the cypherpunk community**
