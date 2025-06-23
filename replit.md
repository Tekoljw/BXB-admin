# BeDAO-ho Cryptocurrency Trading Dashboard

## Overview

BeDAO-ho is a modern cryptocurrency trading dashboard application built with Next.js 14 and React. The application provides real-time cryptocurrency price tracking, portfolio management, trading interfaces, and social features in a comprehensive web platform. It features a bilingual interface (Chinese/English) with both light and dark themes, designed for cryptocurrency traders and enthusiasts.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 14 with App Router for server-side rendering and optimal performance
- **Styling**: Tailwind CSS with custom design system and shadcn/ui components
- **State Management**: React Context API for theme and language preferences
- **Charts**: Recharts library for data visualization and trading charts
- **Icons**: Lucide React for consistent iconography
- **Routing**: Next.js App Router with instant navigation optimizations

### Backend Architecture
- **Server**: Express.js server with session management
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Replit Auth integration with OpenID Connect
- **Session Storage**: PostgreSQL-backed session store with connect-pg-simple
- **API Structure**: RESTful API endpoints with authentication middleware

### Development Environment
- **Runtime**: Node.js 20 with TypeScript support
- **Package Manager**: pnpm for efficient dependency management
- **Development Tools**: Flask-based development environment manager
- **Database**: PostgreSQL 16 for data persistence

## Key Components

### Core Features
1. **Multi-page Dashboard**: Chat, social moments, marketplace, wallet management
2. **Trading Interfaces**: USDT trading, spot trading, futures trading, market analysis
3. **Wallet Management**: Portfolio tracking, transaction history, balance overview
4. **Social Features**: Chat system, friend moments, community interaction
5. **Real-time Data**: Cryptocurrency price feeds and market data

### User Interface Components
- **Responsive Navigation**: Collapsible sidebar with mobile-friendly design
- **Theme System**: Dynamic light/dark mode switching with persistent preferences
- **Internationalization**: Chinese/English language toggle with translation system
- **Loading States**: Custom creative loaders and skeleton components
- **Performance Optimizations**: Instant response buttons and optimized rendering

### Authentication System
- **Replit Auth**: Integrated OpenID Connect authentication
- **Session Management**: Secure session handling with PostgreSQL storage
- **User Storage**: User profiles and preferences in database
- **Protected Routes**: Middleware for route protection

## Data Flow

### Client-Side Flow
1. User interactions trigger optimized event handlers
2. React Context manages global state (theme, language, user preferences)  
3. Next.js App Router handles navigation with pre-loading
4. Components use hooks for data fetching and state management
5. Recharts renders real-time financial data visualizations

### Server-Side Flow
1. Express server handles API requests with authentication middleware
2. Drizzle ORM manages database queries with type safety
3. Session store maintains user authentication state
4. RESTful endpoints provide data to frontend components
5. Database operations are optimized for performance

### Authentication Flow
1. Users authenticate via Replit Auth (OpenID Connect)
2. Server validates tokens and creates user sessions
3. User data is stored/retrieved from PostgreSQL database
4. Protected routes verify authentication status
5. Client maintains authentication state in React Context

## External Dependencies

### Core Dependencies
- **React 19**: Latest React version for component architecture
- **Next.js 14**: Modern React framework with App Router
- **Drizzle ORM**: Type-safe database operations
- **Neon Database**: Serverless PostgreSQL database connection
- **Express.js**: Backend server framework
- **Passport.js**: Authentication middleware

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Recharts**: Chart library for data visualization
- **Lucide React**: Icon library
- **shadcn/ui**: Component library built on Radix UI

### Development Tools
- **TypeScript**: Type safety across the application
- **Flask**: Development environment management
- **pnpm**: Fast, efficient package manager
- **ESLint**: Code linting and formatting

## Deployment Strategy

### Development Environment
- **Replit Integration**: Configured for Replit development environment
- **Multi-runtime Support**: Python 3.11, Node.js 20, PostgreSQL 16
- **Development Server**: Next.js dev server on port 5000
- **Hot Reloading**: Automatic code reloading during development

### Production Considerations
- **Build Optimization**: Next.js production build with static optimization
- **Database Connection**: Neon PostgreSQL for serverless deployment
- **Environment Variables**: Secure configuration management
- **Asset Optimization**: Image optimization and static asset serving

### Performance Optimizations
- **Instant Response**: Custom button components bypass React's synthetic events
- **Route Pre-loading**: Background loading of route components
- **Optimized Rendering**: Reduced re-renders and efficient state updates
- **Code Splitting**: Next.js automatic code splitting for optimal loading

## Changelog

- June 23, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.