# CampusAI Assistant - Oxford College of Engineering

An advanced AI-powered intelligent assistant designed for Oxford College of Engineering students, featuring real-time AI integration, professional UI, and comprehensive college information management.

## 🚀 Overview

CampusAI is a modern, enterprise-grade chatbot platform that provides students with instant access to college policies, procedures, and information through an intuitive conversational interface powered by cutting-edge AI technology.

## ✨ Key Features

### AI Integration
- **Multiple AI Providers**: Support for Google Gemini, OpenAI GPT-4/GPT-3.5, and Anthropic Claude
- **Intelligent Responses**: Context-aware answers with source citations
- **Fallback System**: Local knowledge base ensures 24/7 availability
- **Real-time Processing**: Instant responses with typing indicators

### User Experience
- **Professional Design**: Modern glassmorphism UI with smooth 3D animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Themes**: Automatic theme switching with smooth transitions
- **Accessibility**: WCAG-compliant interface with keyboard navigation

### College Information
- Academic regulations and examination schedules
- Fee structures and payment deadlines
- Placement drives and eligibility criteria
- Hostel facilities and accommodation details
- Library services and digital resources
- Attendance requirements and policies

### Technical Features
- **Real-time Chat**: WebSocket-like experience with instant message delivery
- **Source Attribution**: Every response cites relevant college documents
- **Persistent Storage**: API keys stored securely in browser localStorage
- **Error Handling**: Graceful degradation with comprehensive error messages
- **Performance**: Optimized rendering with CSS animations and transitions

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: Zero dependencies, pure ES6+ implementation
- **Web APIs**: localStorage, Fetch API, Async/Await patterns

### AI Integration
- **Google Gemini API**: Free tier with generous limits
- **OpenAI API**: GPT-4 and GPT-3.5-turbo support
- **Anthropic Claude API**: Claude 3 Sonnet integration
- **Fallback Engine**: Local knowledge base with intelligent matching

### Design System
- **Color Palette**: Professional purple gradient theme
- **Typography**: Inter font family for optimal readability
- **Animations**: Smooth 60fps CSS animations and transitions
- **Components**: Modular design with reusable UI elements

## 📦 Installation & Setup

### Quick Start (Local Development)

1. **Clone the repository**
```bash
   git clone https://github.com/nithin2113/campusai-assistant.git
   cd campusai-assistant
```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   
   # Using VS Code Live Server extension
   Right-click index.html → "Open with Live Server"
```

3. **Access the application**
   - Navigate to `http://localhost:8000`
   - The chatbot is immediately functional in local mode

### AI Integration Setup

#### Option 1: Google Gemini (Recommended - FREE)

1. Visit [Google AI Studio](https://aistudio.google.com)
2. Sign in with your Google account
3. Navigate to "API Keys" section
4. Click "Create API key in new project"
5. Copy the generated key (starts with `AIza`)
6. In CampusAI, click the settings icon (⚙️)
7. Select "Google Gemini" from provider dropdown
8. Paste your API key and click "Save & Connect"

**Important**: Enable the Generative Language API:
```
https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
```

#### Option 2: OpenAI GPT

1. Visit [OpenAI Platform](https://platform.openai.com)
2. Create an account and add billing information
3. Navigate to API Keys section
4. Create a new secret key
5. Configure in CampusAI settings
6. Choose between GPT-4 (most capable) or GPT-3.5-turbo (faster)

#### Option 3: Local Mode (No API Required)

- Works immediately without any setup
- Uses intelligent keyword matching
- Provides instant responses
- Perfect for development and testing

## 🎨 Customization

### Update College Information

Edit `config.js` to customize:
```javascript
const KNOWLEDGE_BASE = {
    college: {
        name: "Your College Name",
        location: "City, State",
        email: "contact@college.edu",
        phone: "+91-XXX-XXXXXXX"
    },
    
    fees: {
        tuition: 150000,  // Update with your fees
        // ... more fields
    },
    
    placements: {
        companies: [
            { 
                name: "Company Name", 
                date: "Month DD-DD, YYYY",
                cgpa: 7.0,
                package: "X-Y LPA"
            }
            // Add more companies
        ]
    }
    // ... update other sections
};
```

### Change Theme Colors

Modify CSS variables in `style.css`:
```css
:root {
    --accent-primary: #8b5cf6;    /* Primary purple */
    --accent-secondary: #7c3aed;  /* Secondary purple */
    /* Change to your brand colors */
}
```

### Add New Features

The modular architecture allows easy feature additions:
- Extend `KNOWLEDGE_BASE` in `config.js`
- Add response handlers in `app.js`
- Update UI components in `index.html`

## 📁 Project Structure
```
campusai-assistant/
├── index.html          # Main HTML structure
├── style.css           # Professional styling & animations
├── app.js              # Core application logic & AI integration
├── config.js           # Knowledge base & configuration
├── README.md           # Documentation
└── assets/             # (Optional) Images and resources
```

## 🌐 Deployment

### GitHub Pages (Free)

1. Push code to GitHub repository
2. Go to repository Settings → Pages
3. Select branch (main) and root directory
4. Save and wait for deployment
5. Access at: `https://yourusername.github.io/repo-name`

### Netlify (Recommended)

1. Connect your GitHub repository
2. Configure build settings (not required for static sites)
3. Deploy with one click
4. Get custom domain: `your-app.netlify.app`

### Vercel

1. Import GitHub repository
2. Auto-detected as static site
3. Deploy instantly
4. Custom domain available

## 🔐 Security & Privacy

- **API Keys**: Stored locally in browser, never sent to third parties
- **No Backend**: All processing happens client-side
- **HTTPS**: Always use secure connections in production
- **Rate Limiting**: Implement API request throttling for production
- **Data Privacy**: No user data is collected or stored on servers

## 📊 Performance

- **Load Time**: < 1 second on modern connections
- **First Contentful Paint**: < 0.5 seconds
- **Interactive**: Immediately responsive
- **Bundle Size**: ~50KB total (uncompressed)
- **Animations**: 60fps smooth transitions

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

**Nithin S**
- GitHub: [@nithin2113](https://github.com/nithin2113)
- Project: [CampusAI Assistant](https://github.com/nithin2113/campusai-assistant)

## 🙏 Acknowledgments

- Oxford College of Engineering for institutional support
- Google Gemini AI for free API tier
- Open source community for inspiration and tools
- All contributors and users of this platform

## 📞 Support

For issues, questions, or suggestions:
- **GitHub Issues**: [Create an issue](https://github.com/nithin2113/campusai-assistant/issues)
- **Email**: nithin@oxfordcollege.edu.in
- **Live Demo**: [https://nithin2113.github.io/campusai-assistant/](https://nithin2113.github.io/campusai-assistant/)

## 🗺️ Roadmap

### Upcoming Features
- [ ] Voice input/output capabilities
- [ ] Multi-language support (English, Hindi, Kannada)
- [ ] File upload for document queries
- [ ] Chat history export (PDF/Text)
- [ ] Student portal integration
- [ ] Real-time notifications
- [ ] Mobile native apps (iOS/Android)
- [ ] Advanced analytics dashboard

### Version History
- **v2.0.0** (Current) - AI integration, professional UI, 3D animations
- **v1.0.0** - Initial release with local knowledge base

---

**Made with ❤️ for Oxford College of Engineering Students**

*Last Updated: November 2025*