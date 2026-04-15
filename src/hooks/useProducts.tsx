import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/data/products";

function mapDbProduct(p: any): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: Number(p.price),
    salePrice: p.sale_price ? Number(p.sale_price) : undefined,
    image: p.image || "",
    image2: p.image2 || undefined,
    images: p.images || [],
    category: p.category,
    colors: p.colors || [],
    sizes: p.sizes || [],
    stock: p.stock ?? 0,
    badge: p.badge as Product["badge"],
    description: p.description || undefined,
    sizeGuide: p.size_guide || undefined,
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false });
      setProducts((data ?? []).map(mapDbProduct));
      setLoading(false);
    };
    load();
  }, []);

  return { products, loading };
}

export function useProductBySlug(slug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    const load = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .eq("active", true)
        .single();
      setProduct(data ? mapDbProduct(data) : null);
      setLoading(false);
    };
    load();
  }, [slug]);

  return { product, loading };
}
