# Overview

This is a modern full-stack web application for a professional thumbnail designer portfolio and business website. The application showcases design work, allows potential clients to contact the designer, and provides an admin panel for content management. Built with React on the frontend and Express.js on the backend, it features a clean, dark-themed design optimized for visual content presentation.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool and development server
- **Routing**: Wouter for lightweight client-side routing with pages for Home, Portfolio, About, Contact, and Admin
- **UI Components**: Comprehensive design system using shadcn/ui components with Radix UI primitives and Tailwind CSS
- **Styling**: Dark-themed design with CSS custom properties, Inter font family, and responsive layouts
- **State Management**: TanStack React Query for server state management and data fetching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Animations**: Custom scroll-reveal animations and smooth transitions throughout the interface

## Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Database ORM**: Drizzle ORM with PostgreSQL database schema including projects and contact messages tables
- **File Handling**: Multer middleware for image upload processing with local file storage
- **Request Logging**: Custom middleware for API request/response logging and performance monitoring
- **Development Setup**: Vite middleware integration for hot module reloading in development mode

## Data Layer
- **Database**: PostgreSQL with Neon serverless connection pooling
- **Schema**: Well-defined tables for projects (thumbnails) and contact messages with proper relationships
- **Migrations**: Drizzle Kit for database schema management and migrations
- **Type Safety**: Zod schemas for runtime validation and TypeScript types generation

## Authentication & Authorization
- **Admin Access**: Simple credential-based authentication for admin panel access
- **Session Management**: Basic session handling for admin login state
- **Security**: Input validation and file upload restrictions for security

## File Management
- **Image Uploads**: Local file storage with multer for thumbnail images
- **File Serving**: Express static file serving for uploaded images
- **Upload Validation**: File type and size restrictions for security and performance

# External Dependencies

## Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL database hosting with connection pooling
- **WebSocket Support**: For real-time database connections in serverless environments

## UI & Styling
- **Radix UI**: Comprehensive primitive components for accessibility and functionality
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Google Fonts**: Inter font family for modern typography
- **Font Awesome**: Icon library for consistent iconography

## Development Tools
- **Replit Integration**: Development environment plugins and runtime error handling
- **TypeScript**: Full type safety across frontend, backend, and shared schemas
- **ESBuild**: Fast bundling for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

## Form & Validation
- **React Hook Form**: Efficient form state management and validation
- **Zod**: Runtime type validation and schema generation
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation

## Image & File Handling
- **Multer**: Multipart form data handling for file uploads
- **Sharp/Image Processing**: Potential future integration for image optimization