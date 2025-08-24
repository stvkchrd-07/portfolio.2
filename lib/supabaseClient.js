// -------------------------------------------------------------------
// 1. ENVIRONMENT & SUPABASE CLIENT SETUP
// -------------------------------------------------------------------

// Create a file named .env.local in your root directory and add these lines:
/*
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL_HERE"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY_HERE"
*/

// Create a file at /lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Use safe fallbacks to prevent build-time crashes when env vars are missing.
// At runtime, ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "public-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

