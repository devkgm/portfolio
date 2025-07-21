import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Portfolio {
  id: number;
  title: string;
  description: string;
  githubUrl: string;
  thumbnail: string;
  tags: string;
  createdAt: string;
  updatedAt: string;
}

export const portfolioDb = {
  create: async (data: Omit<Portfolio, "id" | "createdAt" | "updatedAt">) => {
    const { data: result, error } = await supabase
      .from("portfolios")
      .insert([{ ...data }])
      .select()
      .single();
    if (error) throw error;
    return result;
  },

  getAll: async () => {
    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .order("createdAt", { ascending: false });
    if (error) throw error;
    return data as Portfolio[];
  },

  getById: async (id: number) => {
    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data as Portfolio;
  },

  update: async (id: number, data: Partial<Portfolio>) => {
    const { data: result, error } = await supabase
      .from("portfolios")
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return result;
  },

  delete: async (id: number) => {
    const { error } = await supabase.from("portfolios").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  },
};
