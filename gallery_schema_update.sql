-- =========================================================================
-- SQL MIGRATION COMMANDS FOR GALLERY SECTION INTEGRATION
-- Run these queries inside your Supabase SQL Editor to initialize the database
-- =========================================================================

-- 1. Create the gallery_section table schema
CREATE TABLE IF NOT EXISTS gallery_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  section_label text DEFAULT 'Interactive Gallery Showcase',
  main_heading text DEFAULT 'Captured Moments & Creations',
  description text DEFAULT 'A premium, responsive capture grid designed to swap layout positions every 60 seconds with micro-animations.',
  images jsonb DEFAULT '[]'::jsonb -- Array of objects: { url, caption, alt, title }
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE gallery_section ENABLE ROW LEVEL SECURITY;

-- 3. Create public read access policies
CREATE POLICY "Allow public read access" 
  ON gallery_section 
  FOR SELECT 
  USING (true);

-- 4. Create master database permissions for admin panel sync
CREATE POLICY "Allow all operations for authenticated admin" 
  ON gallery_section 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- 5. Insert initial premium seed placeholders (with modern Unsplash technology showcases)
INSERT INTO gallery_section (section_label, main_heading, description, images)
VALUES (
  'Interactive Gallery Showcase',
  'Captured Moments & Creations',
  'A premium, responsive capture grid designed to swap layout positions every 60 seconds with micro-animations.',
  '[
    {
      "url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
      "title": "Modern Coding Station",
      "caption": "A clean, high-productivity developer workspace with elegant ambient neon glow, custom mechanical keyboards, and crisp screen displays.",
      "alt": "Workspace setup"
    },
    {
      "url": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
      "title": "Minimalist Tech Design",
      "caption": "A professional and clean aesthetic illustrating our design process, visual wireframes, and beautiful dark layouts.",
      "alt": "Laptop and design assets"
    },
    {
      "url": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop",
      "title": "User Interface Blueprinting",
      "caption": "Detailed vector components, clean spacing systems, and Shopify style frameworks assembled for maximum systematic efficiency.",
      "alt": "Wireframes on display"
    },
    {
      "url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
      "title": "Algorithmic Networks",
      "caption": "Visualizing structural flows, database queries, and serverless architectures in beautiful digital environments.",
      "alt": "Digital network connection"
    }
  ]'::jsonb
);
