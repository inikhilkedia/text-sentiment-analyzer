# Text Sentiment Analyzer 📊

A modern, user-friendly web application that performs real-time sentiment analysis on text input. Built with **React + TypeScript** and **Node.js + TypeScript**, this application provides an intuitive interface for analyzing text sentiment while maintaining user-specific analysis history.

<img width="1456" alt="Screenshot 2025-06-13 at 11 57 09 PM" src="https://github.com/user-attachments/assets/546f86c4-e12a-4ffb-b8db-a6b0aff585ca" />

## 🌟 Features

### Core Functionality

- **Real-time Sentiment Analysis**: Instantly analyze text to determine if it's positive, neutral, or negative
- **User Profile Management**: Switch between different user profiles to maintain separate analysis histories
- **Analysis History**: View and track analyses for each user with timestamps
- **Persistent Storage**: Analysis results are saved and persisted across sessions

### Technical Features

- **Full TypeScript Implementation**: Both frontend and backend built with TypeScript
- **Responsive Design**: Optimized for all devices (desktop, tablet, and mobile)
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Real-time Updates**: Instant feedback on analysis results
- **Error Handling**: Graceful error management and user notifications
- **Performance Optimized**: Built with React best practices for optimal performance
- **Hot Reload**: Development servers with automatic reloading

## 🚀 Quick Start

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/text-sentiment-analyzer.git
   cd text-sentiment-analyzer
   ```

2. **Install dependencies**

   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Start the application**

   ```bash
   # Start both frontend and backend simultaneously (recommended)
   npm run dev:full

   # Or start them separately:
   # Terminal 1 - Frontend only
   npm run dev:client

   # Terminal 2 - Backend only
   npm run dev:server
   ```

The application will be available at:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3002

## 📖 Usage Guide

1. **Select a User Profile**

   - Click the user dropdown in the top-right corner
   - Choose from available user profiles (Admin, User1, User2)

2. **Analyze Text**

   - Enter or paste your text in the input field
   - The analysis happens automatically as you type
   - View the sentiment result (positive, negative, neutral) with score and magnitude

3. **Save Analysis**

   - Click "Analyze" button to save the current analysis to your user's history
   - View your analysis history in the table below

4. **View History**
   - Recent analyses appear in the table below the input field
   - Each entry shows the text, sentiment, score, magnitude, timestamp, and user

## 🏗️ Project Structure

```
text-sentiment-analyzer/
├── src/                        # Frontend source code (TypeScript)
│   ├── components/            # React components
│   │   ├── Header/           # Application header
│   │   │   ├── Header.tsx
│   │   │   └── Header.module.css
│   │   ├── InputField/       # Text input component
│   │   │   ├── InputField.tsx
│   │   │   ├── InputField.test.tsx
│   │   │   └── InputField.module.css
│   │   ├── ResultDisplay/    # Analysis results display
│   │   │   ├── ResultDisplay.tsx
│   │   │   ├── ResultDisplay.test.tsx
│   │   │   └── ResultDisplay.module.css
│   │   ├── ResultItem/       # Individual result item
│   │   │   ├── ResultItem.tsx
│   │   │   └── ResultItem.module.css
│   │   ├── UserAnalyses/     # User history component
│   │   │   ├── UserAnalyses.tsx
│   │   │   ├── UserAnalyses.test.tsx
│   │   │   └── UserAnalyses.module.css
│   │   └── UserDropdown/     # User selection component
│   │       ├── UserDropdown.tsx
│   │       ├── UserDropdown.test.tsx
│   │       └── UserDropdown.module.css
│   ├── hooks/                # Custom React hooks
│   │   ├── useTextAnalyzer.ts
│   │   └── useTextAnalyzer.test.ts
│   ├── types/                # TypeScript type definitions
│   │   ├── index.ts          # Main type definitions
│   │   └── css.d.ts          # CSS module types
│   ├── App.tsx              # Main application component
│   ├── App.test.tsx         # App tests
│   ├── App.module.css       # App styles
│   ├── index.tsx            # Application entry point
│   ├── index.css            # Global styles
│   ├── setupTests.ts        # Test setup
│   └── test-utils.tsx       # Test utilities
├── server/                    # Backend server (TypeScript)
│   ├── server.ts             # Express server setup
│   ├── analysisData.json     # Data storage
│   ├── package.json          # Server dependencies
│   ├── tsconfig.json         # Server TypeScript config
│   └── dist/                 # Compiled JavaScript (if built)
├── public/                    # Static assets
│   ├── index.html            # HTML template
│   ├── favicon.ico           # App icon
│   ├── manifest.json         # PWA manifest
│   └── robots.txt            # SEO robots file
├── tsconfig.json             # Frontend TypeScript configuration
├── tsconfig.node.json        # Node TypeScript configuration
├── vite.config.ts            # Vite configuration
├── package.json              # Project metadata and dependencies
├── .eslintrc.cjs             # ESLint configuration
└── .gitignore               # Git ignore rules
```

## 🛠️ Development

### TypeScript Configuration

The project uses TypeScript for both frontend and backend development with strict type checking:

- **Frontend**: React with TypeScript, Vite for fast development
- **Backend**: Node.js with TypeScript, Express server
- **Testing**: Vitest for unit testing with React Testing Library
- **Linting**: ESLint with TypeScript support

### Available Scripts

```bash
# Development
npm run dev:full          # Start both frontend and backend
npm run dev:client        # Start frontend only (Vite dev server)
npm run dev:server        # Start backend only (with hot reload)
npm run dev               # Start frontend only (alias for dev:client)

# Building
npm run build             # Build frontend for production
npm run preview           # Preview production build

# Testing
npm run test              # Run all tests with Vitest

# Code Quality
npm run lint              # Run ESLint
```

### Development Workflow

1. **Start Development**: Run `npm run dev:full` to start both servers
2. **Frontend Development**: Edit files in `src/` - changes auto-reload
3. **Backend Development**: Edit files in `server/` - server auto-restarts
4. **Testing**: Run `npm run test` to execute test suite
5. **Type Checking**: TypeScript errors show in your IDE and during build

### Code Style

- Follow TypeScript best practices with strict type checking
- Use ESLint configuration for code quality
- Write tests for components and hooks
- Use CSS modules for component styling
- Follow React functional component patterns with hooks

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Component and hook tests using Vitest
- **Testing Library**: React Testing Library for component testing
- **Test Coverage**: Tests for all major components and functionality

Run tests with:

```bash
npm run test              # Run all tests
npm run test -- --watch   # Run tests in watch mode
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**

   ```bash
   # Find process using port 5173 (frontend) or 3002 (backend)
   lsof -i :5173
   lsof -i :3002
   # Kill the process
   kill -9 <PID>
   ```

2. **TypeScript errors**

   ```bash
   # Check for TypeScript errors
   npx tsc --noEmit
   ```

3. **Dependencies issues**

   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Backend connection errors**
   - Ensure the backend server is running on port 3002
   - Check browser console for CORS errors
   - Verify the API endpoints are accessible

## 🔮 Future Improvements

- [ ] Implement real sentiment analysis using NLP APIs (OpenAI, Google Cloud NLP)
- [ ] Add user authentication and authorization
- [ ] Integrate with a proper database (MongoDB/PostgreSQL)
- [ ] Add support for batch text analysis
- [ ] Implement export functionality for analysis history
- [ ] Add dark mode support
- [ ] Create a mobile app version
- [ ] Add support for multiple languages
- [ ] Implement real-time collaboration features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure all tests pass and follow the existing code style guidelines.

## 👥 Authors

- Your Name - Initial work - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Express.js for the backend framework
- All contributors who have helped shape this project

---

⭐ Star this project if you find it useful!
