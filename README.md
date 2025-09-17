# ResumeQuest - Mindcraft Your Own Career

ResumeQuest is an interactive career development application that gamifies the resume building process. Build your professional profile through quest-based interactions and generate tailored resumes for specific job descriptions using AI.

![ResumeQuest Interface](https://github.com/user-attachments/assets/f98f2bc6-1809-40d8-8046-ed72b7067bac)

## Features

- **Quest-Based Profile Building**: Complete quests across different "islands" to build a comprehensive professional profile
- **AI-Powered Resume Tailoring**: Generate job-specific resumes using Google's Gemini AI
- **Interactive Navigation**: Modern, clean interface with intuitive navigation
- **Local Data Storage**: Survey data and progress stored locally in browser

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API
- **Development**: Modern ES modules with hot reload

## Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Google Gemini API key (optional, for resume tailoring features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CamelCod/mindcraft-your-own-cateer.git
   cd mindcraft-your-own-cateer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (optional)**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

   To get a Gemini API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key
   - Copy the key to your `.env` file

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application running.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npx tsc --noEmit` - Type check TypeScript files

## Project Structure

```
├── components/           # React components
│   ├── views/           # Page components (Home, Quest, Tailor)
│   └── ui/              # Reusable UI components
├── services/            # API services and utilities
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Features Overview

### 🏠 Home View
Welcome page with navigation to main features

### 🗺️ Quest View  
Interactive quest system with three main areas:
- **Island of Self-Discovery**: Build your origin story and core skills
- **The Volcanic Projects**: Showcase project experience and teamwork
- **Future-Proof Peaks**: Define career goals and aspirations

### 📝 Tailor Resume View
AI-powered resume generation:
- Paste job descriptions
- Generate tailored resumes
- Survey system for user feedback

## Development

### Type Checking
The project uses TypeScript for type safety:
```bash
npx tsc --noEmit
```

### Building for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Environment Variables
The application supports the following environment variables:

- `GEMINI_API_KEY` - Google Gemini API key for AI features

## API Integration

The app integrates with Google's Gemini AI for resume tailoring. The API service (`services/apiService.ts`) handles:
- Mock data storage in localStorage
- Simulated API calls with delays
- Quest progression tracking
- Survey data collection

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please:
1. Check the existing [issues](https://github.com/CamelCod/mindcraft-your-own-cateer/issues)
2. Create a new issue with detailed information about your problem
3. Include your environment details (Node.js version, browser, etc.)

---

Built with ❤️ using React, TypeScript, and Vite