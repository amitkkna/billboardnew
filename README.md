# Billboard Advertising Platform

A comprehensive web application for advertisement companies to list their billboards, hoardings, and unipoles, and generate business inquiries.

## Features

### For Advertisers (Billboard Owners)
- Create and manage billboard listings with detailed information
- Upload images of billboards
- Receive and respond to inquiries from potential clients
- Track bookings and manage availability
- View analytics on billboard performance
- Manage company profile and settings

### For Clients (Advertisers Looking for Billboard Space)
- Browse available billboards, hoardings, and unipoles
- Search and filter by location, size, price, etc.
- View detailed information about each advertising space
- Submit inquiries to billboard owners
- Track inquiry status and responses

## Tech Stack

### Frontend
- **React** with **Next.js** - For a modern, SEO-friendly frontend with server-side rendering capabilities
- **TypeScript** - For type safety and better developer experience
- **Tailwind CSS** - For rapid UI development with responsive design

### Backend
- **Supabase** - For authentication, database, and storage needs
- **PostgreSQL** (via Supabase) - As the primary database
- **Serverless Functions** (via Next.js API routes) - For backend logic

## Project Structure

```
billboard-advertising-platform/
├── src/
│   ├── app/                  # Next.js app directory
│   │   ├── (public)/         # Public-facing pages
│   │   │   ├── page.tsx      # Homepage
│   │   │   ├── billboards/   # Billboard listings and details
│   │   │   ├── login/        # Authentication pages
│   │   │   ├── signup/       # User registration
│   │   │   └── ...
│   │   ├── dashboard/        # Dashboard for advertisers
│   │   │   ├── page.tsx      # Dashboard home
│   │   │   ├── billboards/   # Billboard management
│   │   │   ├── inquiries/    # Inquiry management
│   │   │   ├── bookings/     # Booking management
│   │   │   └── ...
│   │   ├── api/              # API routes
│   │   └── layout.tsx        # Root layout
│   ├── components/           # Reusable components
│   ├── lib/                  # Utility functions and libraries
│   │   ├── supabase/         # Supabase client and utilities
│   │   └── ...
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
├── tailwind.config.js        # Tailwind CSS configuration
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies
└── README.md                 # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/billboard-advertising-platform.git
cd billboard-advertising-platform
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

The application can be easily deployed on Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Set the environment variables
4. Deploy

## Future Enhancements

- Mobile app for on-the-go management
- Integration with payment gateways for online booking
- Advanced analytics and reporting
- Map-based billboard discovery
- AI-powered recommendations for advertisers
- Integration with digital billboard management systems

## License

This project is licensed under the MIT License - see the LICENSE file for details.
