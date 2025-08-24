import { createClient, SupabaseClient } from "@supabase/supabase-js";
let supabase: SupabaseClient | null = null;

export function getServerClient(): SupabaseClient {
  if (!supabase) {
    supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );
  }
  return supabase;
}
