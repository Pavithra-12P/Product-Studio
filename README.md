# Product Studio AI

An AI-powered SaaS platform that translates raw product ideas into comprehensive, production-ready software blueprints in minutes. Designed with a minimal, luxurious, monochrome aesthetic inspired by Linear, Stripe, and Vercel.

## Features

- **Requirement Analysis**: Extract functional, non-functional, business, and technical requirements.
- **User Stories**: Generate epic-based user stories with detailed acceptance criteria and story point estimates.
- **Database Schema**: Interactive database schema planner with normalized tables, columns, data types, and entity relationships.
- **API Planning**: Complete RESTful API route planning, including HTTP methods, paths, summaries, auth constraints, and request/response payloads.
- **UI & System Architecture**: Component diagrams and system layers structured for high-performance scale.
- **Development Roadmap**: Phased execution plan with detailed milestones, task lists, and timelines.
- **Export Specifications**: Export generated blueprints to PDF, Markdown, and directly to Notion (mocked).

## Tech Stack

- **Core**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 4, Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Local Development

1. Clone the repository and navigate into it:
   ```bash
   cd product-studio-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Railway

This repository is optimized for deployment on [Railway](https://railway.app). It includes a `railway.json` configuration file which instructs Railway to build the app using Nixpacks and start the Next.js server.

### Deploy Steps

1. Push your changes to your GitHub repository:
   ```bash
   git push -u origin main
   ```
2. Go to the [Railway Dashboard](https://railway.app) and click **New Project**.
3. Select **Deploy from GitHub repo** and choose the `Product-Studio` repository.
4. Click **Deploy Now**. Railway will automatically build the Next.js app and assign a public domain.
