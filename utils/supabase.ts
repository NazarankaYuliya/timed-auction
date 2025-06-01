import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON as string;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const extractPathFromUrl = (fullUrl: string): string => {
  const base = `${supabaseUrl}/storage/v1/object/public/GR/`;
  return fullUrl.replace(base, "");
};
