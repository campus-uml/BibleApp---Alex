import { createClient } from "@supabase/supabase-js";
export const API_URL = import.meta.env.VITE_API_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;
export const PRODUCTION_URL = import.meta.env.VITE_PRODUCTION_URL;


const supabaseUrl = import.meta.env.VITE_API_SUPABASE_URL!;

const supabaseKey = import.meta.env.VITE_API_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
