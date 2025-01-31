

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_API_URL: string;
  readonly VITE_API_SUPABASE_URL: string;
  readonly VITE_API_SUPABASE_ANON_KEY: string;
  readonly VITE_PRODUCTION_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
