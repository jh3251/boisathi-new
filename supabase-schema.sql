-- Run this in your Supabase SQL Editor
-- First, drop existing tables if they exist to start fresh
DROP TABLE IF EXISTS public.messages;
DROP TABLE IF EXISTS public.conversations;
DROP TABLE IF EXISTS public."bookListings";
DROP TABLE IF EXISTS public.users;

-- 1. Users Table
CREATE TABLE public.users (
  uid UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  "displayName" TEXT NOT NULL,
  username TEXT,
  email TEXT NOT NULL,
  "photoURL" TEXT,
  phone TEXT,
  "createdAt" BIGINT NOT NULL
);

-- 2. Book Listings Table
CREATE TABLE public."bookListings" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  subject TEXT NOT NULL,
  condition TEXT NOT NULL,
  price NUMERIC NOT NULL,
  "contactPhone" TEXT NOT NULL,
  description TEXT NOT NULL,
  "sellerId" UUID REFERENCES public.users(uid) NOT NULL,
  "sellerName" TEXT NOT NULL,
  location JSONB NOT NULL,
  "createdAt" BIGINT NOT NULL,
  "imageUrl" TEXT,
  "imageDeleteToken" TEXT
);

-- 3. Conversations Table
CREATE TABLE public.conversations (
  id TEXT PRIMARY KEY,
  "bookId" UUID REFERENCES public."bookListings"(id) NOT NULL,
  "bookTitle" TEXT NOT NULL,
  "bookImageUrl" TEXT,
  participants UUID[] NOT NULL,
  "participantNames" JSONB NOT NULL,
  "lastMessage" TEXT,
  "updatedAt" BIGINT NOT NULL
);

-- 4. Messages Table
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "conversationId" TEXT REFERENCES public.conversations(id) NOT NULL,
  "senderId" UUID REFERENCES public.users(uid) NOT NULL,
  text TEXT NOT NULL,
  "createdAt" BIGINT NOT NULL
);

-- Note: We used camelCase columns like 'displayName' and 'bookListings' because the React app expects it.
-- Supabase handles them if quoted properly in SQL, or you can let Supabase return whatever.
-- Since Javascript expects exact property matches, creating the tables with quoted camelCase is necessary.

-- Enable Row Level Security (RLS) and allow all access for this MVP.
-- IN PRODUCTION: You must replace these with secure policies.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for users" ON public.users FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE public."bookListings" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for bookListings" ON public."bookListings" FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for conversations" ON public.conversations FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for messages" ON public.messages FOR ALL USING (true) WITH CHECK (true);

-- Reload PostgREST schema cache so the API knows about the newly created/updated columns
NOTIFY pgrst, 'reload schema';
