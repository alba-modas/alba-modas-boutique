import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  image: string;
  sort_order: number;
}

export function useCategories() {
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order", { ascending: true });
      setCategories(
        (data ?? []).map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          emoji: c.emoji || "",
          image: c.image || "",
          sort_order: c.sort_order ?? 0,
        }))
      );
      setLoading(false);
    };
    load();
  }, []);

  return { categories, loading };
}
