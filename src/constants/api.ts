import { createClient } from "@supabase/supabase-js";
export const API_URL = import.meta.env.VITE_API_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;

const supabaseUrl = import.meta.env.VITE_API_SUPABASE_URL!;

const supabaseKey = import.meta.env.VITE_API_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
