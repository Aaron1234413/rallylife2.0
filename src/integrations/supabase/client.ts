// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sdrndqcaskaitzcwgnaw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkcm5kcWNhc2thaXR6Y3dnbmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3MDE1NjUsImV4cCI6MjA2MTI3NzU2NX0.eiQYkeJaM5z9BmaCxdZJQu3-pb4Nxc8c_XQAk_lXROw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);