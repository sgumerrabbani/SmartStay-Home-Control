# SmartStay - Smart Home Control Application

## Overview
SmartStay is a complete web application combining a marketing landing page with a functional smart home control dashboard. Users can view the product features on the landing page and access the full dashboard to control their home devices.

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── landing/        # Landing page components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── ClientLogos.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── CTA.tsx
│   │   │   └── Footer.tsx
│   │   ├── dashboard/      # Dashboard components
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── ScenePills.tsx
│   │   │   ├── RoomPills.tsx
│   │   │   ├── DeviceTile.tsx
│   │   │   ├── ScheduleModal.tsx
│   │   │   └── SceneConfirmDialog.tsx
│   │   ├── ui/             # Shadcn UI components
│   │   └── ImageWithFallback.tsx
│   ├── pages/
│   │   ├── Landing.tsx     # Marketing landing page
│   │   ├── Dashboard.tsx   # Smart home control dashboard
│   │   └── not-found.tsx
│   ├── lib/
│   │   ├── smartHomeState.ts  # State management for smart home
│   │   ├── queryClient.ts
│   │   └── utils.ts
│   └── App.tsx             # Main app with routing
server/
├── routes.ts               # API endpoints (newsletter)
└── storage.ts              # In-memory storage
shared/
└── schema.ts               # TypeScript types and Zod schemas
```

## Features
### Landing Page
- Responsive navigation with smooth scroll to sections
- Hero section with CTAs leading to dashboard
- Feature cards highlighting app capabilities
- Client logos section
- Testimonials with user photos
- CTA section with gradient background
- Footer with newsletter subscription

### Dashboard
- **Scene Control**: Home, Away, Night modes with confirmation dialogs
- **Room Management**: Switch between Living Room, Kitchen, Bedroom
- **Device Control**: 
  - Lights: Toggle on/off
  - Thermostats: Slider control (16-30°C)
  - Appliances: Toggle on/off
- **Scheduling**: Set device schedules (daily, weekdays, once)
- **Bulk Actions**: "All Off" button to turn off non-essential devices
- **LocalStorage Persistence**: State persists across browser sessions

## API Endpoints
- `POST /api/newsletter` - Subscribe to newsletter
- `GET /api/newsletter` - Get all subscriptions

## Design System
- **Primary Color**: Blue (#1E88E5 / HSL 207 77% 51%)
- **Font**: Inter
- **Border Radius**: 0.5rem
- Uses Shadcn UI components with Tailwind CSS

## Navigation Flow
- Landing page → Dashboard via "Get Started" / "Try Demo" buttons
- Dashboard → Landing page via menu or logo click
- Smooth scroll navigation for landing page sections

## Running the Application
```bash
npm run dev
```
The application runs on port 5000 with the Express backend and Vite frontend.

## Recent Changes
- Combined landing page with smart home dashboard
- Implemented full device control functionality
- Added scene automation system
- Created scheduling system with modal interface
- LocalStorage persistence for all device states
