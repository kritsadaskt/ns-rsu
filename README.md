# NS RSU Database

A Next.js application with App Router for viewing and editing student data stored on Supabase.

## Features

- ✅ View all students in a table
- ✅ Create new students
- ✅ Edit existing students
- ✅ Delete students
- ✅ Server-side rendering with Next.js App Router
- ✅ Type-safe Supabase integration
- ✅ Modern UI with responsive design

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Supabase account and project with the database schema already set up

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Configure Environment Variables

Your environment variables should already be set in your `.env` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Make sure these match your Supabase project credentials from your project settings.

### 3. Database Schema

The application works with the following main tables:
- `students` - Main student information
- `academic_terms` - Academic terms
- `subjects` - Course subjects
- `student_grades` - Student grades
- `citizen_detail` - Citizen card details
- `current_addr` - Current address information
- `defense_exam` - Defense exam records
- `proposal_exam` - Proposal exam records

The schema is defined in `schema.sql`. Make sure your Supabase database has these tables set up.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── actions.ts              # Server actions for CRUD operations
│   ├── components/             # React components
│   │   ├── DeleteButton.tsx
│   │   └── StudentForm.tsx
│   ├── create/                # Create new student page
│   ├── edit/[id]/             # Edit student page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page (view all students)
│   └── globals.css            # Global styles
├── lib/
│   └── supabase/
│       ├── client.ts          # Browser Supabase client
│       ├── server.ts          # Server Supabase client
│       └── types.ts           # TypeScript types matching your schema
├── schema.sql                 # Database schema reference
└── package.json
```

## Customization

### Database Schema

The TypeScript types in `lib/supabase/types.ts` match your database schema. If you modify the schema:
1. Update `lib/supabase/types.ts` - TypeScript types
2. Update `app/actions.ts` - Server actions
3. Update `app/components/StudentForm.tsx` - Form fields

### Styling

Global styles are in `app/globals.css`. You can customize the design by modifying the CSS variables and classes.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in Vercel's project settings
4. Deploy!

### Other Platforms

Make sure to set the environment variables in your hosting platform's settings.

## License

MIT
