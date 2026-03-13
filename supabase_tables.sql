-- ============================================
-- CREATE ALL TABLES FOR PORTFOLIO
-- ============================================

-- 1. Personal Info / Hero Section
CREATE TABLE IF NOT EXISTS personal_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  name varchar(255),
  title varchar(255),
  description text,
  image text,
  cover_image text
);

-- 2. About Section
CREATE TABLE IF NOT EXISTS about (
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

-- 3. Skills Section
CREATE TABLE IF NOT EXISTS skills_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  section_label text,
  main_heading text,
  description text,
  design_skills jsonb,
  development_skills jsonb,
  tools jsonb
);

-- 4. Projects Section
CREATE TABLE IF NOT EXISTS projects_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  section_label text,
  main_heading text,
  description text,
  projects jsonb
);

-- 5. Experience Section
CREATE TABLE IF NOT EXISTS experience_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  section_label text,
  main_heading text,
  description text,
  active_filter text DEFAULT 'all',
  experiences jsonb
);

-- 6. Contact Section
CREATE TABLE IF NOT EXISTS contact_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  section_label text,
  main_heading text,
  description text,
  email text, -- Legacy single email (for backward compatibility)
  github text, -- Legacy single github (for backward compatibility)
  emails jsonb DEFAULT '[]'::jsonb, -- Array of email addresses
  githubs jsonb DEFAULT '[]'::jsonb, -- Array of GitHub URLs
  location text,
  form_heading text,
  socials jsonb DEFAULT '[]'::jsonb
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_section ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CREATE POLICIES FOR PUBLIC READ ACCESS
-- ============================================

-- Allow anyone to read personal_info
CREATE POLICY "Allow public read access" ON personal_info
  FOR SELECT USING (true);

-- Allow anyone to read about
CREATE POLICY "Allow public read access" ON about
  FOR SELECT USING (true);

-- Allow anyone to read skills_section
CREATE POLICY "Allow public read access" ON skills_section
  FOR SELECT USING (true);

-- Allow anyone to read projects_section
CREATE POLICY "Allow public read access" ON projects_section
  FOR SELECT USING (true);

-- Allow anyone to read experience_section
CREATE POLICY "Allow public read access" ON experience_section
  FOR SELECT USING (true);

-- Allow anyone to read contact_section
CREATE POLICY "Allow public read access" ON contact_section
  FOR SELECT USING (true);

-- ============================================
-- CREATE POLICIES FOR WRITE ACCESS (Allow anonymous for admin panel)
-- ============================================

-- Personal Info - allow all operations
CREATE POLICY "Allow all operations" ON personal_info
  FOR ALL USING (true) WITH CHECK (true);

-- About - allow all operations
CREATE POLICY "Allow all operations" ON about
  FOR ALL USING (true) WITH CHECK (true);

-- Skills - allow all operations
CREATE POLICY "Allow all operations" ON skills_section
  FOR ALL USING (true) WITH CHECK (true);

-- Projects - allow all operations
CREATE POLICY "Allow all operations" ON projects_section
  FOR ALL USING (true) WITH CHECK (true);

-- Experience - allow all operations
CREATE POLICY "Allow all operations" ON experience_section
  FOR ALL USING (true) WITH CHECK (true);

-- Contact - allow all operations
CREATE POLICY "Allow all operations" ON contact_section
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- MIGRATIONS FOR EXISTING DATABASES
-- ============================================

-- Add emails and githubs columns to contact_section (for existing databases)
ALTER TABLE contact_section 
ADD COLUMN IF NOT EXISTS emails jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS githubs jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS socials jsonb DEFAULT '[]'::jsonb;

-- Insert sample hero data
INSERT INTO personal_info (name, title, description, image, cover_image)
VALUES (
  'Your Name',
  'Full Stack Developer',
  'I build amazing web applications.',
  'https://via.placeholder.com/400',
  'https://via.placeholder.com/1200x400'
);

-- Insert sample contact data
INSERT INTO contact_section (section_label, main_heading, description, email, github, location, form_heading)
VALUES (
  'Let''s work together',
  'Get In Touch',
  'Have a project in mind? Let''s chat!',
  'your@email.com',
  'https://github.com/yourusername',
  'Your Location',
  'Send a Message'
);
