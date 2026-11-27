-- PinCraftly Supabase Database Schema
-- Run this script in the Supabase SQL Editor if you need to create or update tables.

-- 1. Schedules Table
CREATE TABLE IF NOT EXISTS public.schedules (
  id BIGSERIAL PRIMARY KEY,
  pin_id BIGINT REFERENCES public.pins(id) ON DELETE CASCADE,
  board_id TEXT NOT NULL,
  scheduled_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled', -- 'scheduled', 'published', 'cancelled'
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for schedules
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own schedules"
ON public.schedules
FOR ALL
USING (auth.uid() = user_id OR auth.role() = 'authenticated')
WITH CHECK (auth.uid() = user_id OR auth.role() = 'authenticated');

-- 2. Websites Table
CREATE TABLE IF NOT EXISTS public.websites (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for websites
ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their websites"
ON public.websites
FOR ALL
USING (auth.uid() = user_id OR auth.role() = 'authenticated')
WITH CHECK (auth.uid() = user_id OR auth.role() = 'authenticated');

-- 3. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'starter',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their profile"
ON public.profiles
FOR ALL
USING (auth.uid() = id OR auth.role() = 'authenticated')
WITH CHECK (auth.uid() = id OR auth.role() = 'authenticated');
