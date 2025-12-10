# GuardianOne Landing Page

A privacy-first, independent Security AI landing page built with Next.js 14, TypeScript, and TailwindCSS.

## Features

- Fully client-side rendered (CSR)
- Responsive design (mobile-first)
- Waitlist functionality with file-based storage
- Modern, clean UI with privacy-first design principles

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

- `/app` - Next.js App Router pages and API routes
- `/components` - Reusable React components
- `/data` - File-based storage for waitlist submissions

## Waitlist API

The waitlist API endpoint (`/api/waitlist`) accepts POST requests with an email address and stores submissions in `/data/waitlist.json`.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Lucide React (Icons)

