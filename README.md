# AI Sales Assistant

A modern, ChatGPT-style AI sales assistant built with Next.js, React, and TailwindCSS. This application helps sales teams find leads, qualify prospects, create outreach campaigns, and analyze performance.

## Features

### 💬 Chat Interface
- **ChatGPT-style conversational UI** with smooth animations powered by Framer Motion
- **Multi-conversation management** with automatic title generation
- **Editable conversation titles** - click to rename any conversation
- **Conversation search** - quickly find past conversations by title or content
- **Export conversations** - download conversation history as JSON
- **Keyboard shortcuts**:
  - `Enter` - Send message
  - `Shift + Enter` - New line
  - `Ctrl + Enter` - Alternative send
  - `Ctrl + K` - Focus input field
- **LocalStorage persistence** - conversations saved automatically
- **Auto-scroll** to latest messages
- **Typing indicators** with animated dots

### 👥 Lead Management
- Comprehensive lead table with filtering and sorting
- Lead qualification scoring with visual progress bars
- Status management (New, Qualified, Contacted, Responded, Converted)
- Quick actions for email and LinkedIn
- Color-coded status badges

### 📧 Outreach Automation
- Campaign management dashboard
- Campaign status tracking (Draft, Active, Paused, Completed)
- Performance metrics:
  - Contacted leads
  - Response rates
  - Conversion rates
- Visual progress indicators
- Quick campaign controls

### 📚 Playbook System
- Upload and manage sales playbooks
- Drag-and-drop file upload
- Playbook preview and export
- Read time estimates
- Last updated tracking

### 📊 Analytics Dashboard
- Key performance indicators (KPIs)
- Weekly activity charts
- Response trend visualization
- Conversion funnel analysis
- Top performing campaigns
- Interactive charts powered by Recharts

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 19
- **Styling**: TailwindCSS v4
- **Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Type Safety**: TypeScript

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Chat interface (home)
│   ├── leads/                # Lead management
│   ├── outreach/             # Campaign management
│   ├── playbooks/            # Playbook system
│   ├── analytics/            # Analytics dashboard
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles & theme
├── components/
│   ├── chat-interface.tsx    # Main chat component
│   ├── sidebar.tsx           # Navigation sidebar
│   ├── conversation-search.tsx # Search conversations
│   └── ui/                   # Reusable UI components
├── hooks/
│   ├── use-conversations.ts  # Conversation state management
│   ├── use-mobile.ts         # Mobile detection
│   └── use-toast.ts          # Toast notifications
└── lib/
    ├── types.ts              # TypeScript definitions
    └── utils.ts              # Utility functions
\`\`\`

## Key Components

### Chat Interface
The main conversational interface with:
- Message bubbles with role-based styling
- Example prompts for quick starts
- Smooth animations for message appearance
- Loading states with animated indicators

### Conversation Management
Custom hook (`use-conversations.ts`) that handles:
- Creating new conversations
- Switching between conversations
- Updating conversation titles
- Adding messages to conversations
- Deleting conversations
- LocalStorage persistence

### Sidebar
Dynamic navigation with:
- Conversation history (on chat page)
- Editable conversation titles
- Search functionality
- Export/delete actions
- Navigation to all app sections

## Design System

### Colors
- **Primary**: Blue accent for CTAs and highlights
- **Secondary**: Subtle gray for secondary elements
- **Background**: Dark theme with proper contrast
- **Foreground**: High contrast text colors
- **Muted**: Reduced emphasis elements

### Typography
- **Headings**: Geist Sans (semibold, various sizes)
- **Body**: Geist Sans (regular, 14px base)
- **Code**: Geist Mono (for technical content)
- **Line Height**: 1.5-1.6 for optimal readability

### Spacing
- Consistent spacing scale using Tailwind's spacing system
- Gap-based layouts for clean component spacing
- Proper padding and margins for visual hierarchy

## Getting Started

1. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Run development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Future Enhancements

- [ ] Backend API integration for real AI responses
- [ ] User authentication and multi-user support
- [ ] Real-time collaboration features
- [ ] Advanced lead scraping with LinkedIn integration
- [ ] Email automation with SMTP integration
- [ ] Advanced analytics with custom date ranges
- [ ] Export reports as PDF/CSV
- [ ] Mobile app version
- [ ] Voice input support
- [ ] Plugin system for extensibility

## Best Practices

- **Component Modularity**: Each feature is split into focused, reusable components
- **Type Safety**: Full TypeScript coverage for better DX and fewer bugs
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Performance**: Optimized animations, lazy loading, efficient re-renders
- **State Management**: Custom hooks for clean state logic
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## License

MIT License - feel free to use this project for your own purposes.
\`\`\`

This README provides comprehensive documentation for the AI Sales Assistant application, covering all features, technical details, and usage instructions.
