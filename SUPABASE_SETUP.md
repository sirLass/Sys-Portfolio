# Supabase Setup Guide

## 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" 
3. Sign up/login with GitHub
4. Create a new project
5. Wait for the project to be ready (2-3 minutes)

## 2. Get Your Credentials
In your Supabase project dashboard:
1. Go to Settings → API
2. Copy the **Project URL** 
3. Copy the **anon public** key

## 3. Configure Environment Variables
Create a `.env.local` file in your project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace with your actual credentials from step 2.

## 4. Create Tables
In Supabase SQL Editor, run:

```sql
-- Home/Hero Section
CREATE TABLE personal_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  name varchar(255),
  title varchar(255),
  description text,
  image text
);

-- About Section
CREATE TABLE About (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  paragraph1 text,
  paragraph2 text,
  name varchar(255),
  email varchar(255),
  location varchar(255),
  status varchar(100),
  cv_link varchar(500),
  image_url text
);

-- Skills Section
CREATE TABLE skills_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  design_skills jsonb,
  development_skills jsonb,
  tools jsonb
);

-- Projects Section
CREATE TABLE projects_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  section_label text,
  main_heading text,
  description text,
  projects jsonb
);

-- Experience Section
CREATE TABLE experience_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  section_label text,
  main_heading text,
  description text,
  experiences jsonb
);

-- Contact Section
CREATE TABLE contact_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  section_label text,
  main_heading text,
  description text,
  email text,
  github text,
  location text,
  form_heading text
);
```

## 5. Restart Your Development Server
Stop your current server (Ctrl+C) and restart:
```bash
npm run dev
```

## 6. Verify Setup
- The yellow warning should disappear from the About admin panel
- Your data will now save to Supabase instead of just localStorage
- Check the Supabase table editor to see your saved data

## Troubleshooting
- **White screen**: Check that your `.env.local` file has the correct format
- **404 errors**: Ensure your Supabase URL is correct and project is active
- **Permission errors**: Make sure your anon key is correct and RLS policies allow access
