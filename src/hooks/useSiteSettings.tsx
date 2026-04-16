import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SiteSettings {
  heroText: string;
  heroSubtext: string;
  heroImage: string;
  announcementText: string;
  sectionsVisible: {
    novidades: boolean;
    bestSellers: boolean;
    promocoes: boolean;
    testimonials: boolean;
    instagram: boolean;
    quemSomos: boolean;
  };
  instagramLink: string;
  instagramPhotos: string[];
}

export const defaultSettings: SiteSettings = {
  heroText: "Vista-se com Graça e Elegância",
  heroSubtext: "Moda feminina, masculina e infantil para toda a família",
  heroImage: "",
  announcementText: "🚚 Frete grátis em todos os pedidos | 🔄 Troca em até 7 dias garantida",
  sectionsVisible: { novidades: true, bestSellers: true, promocoes: true, testimonials: true, instagram: true, quemSomos: true },
  instagramLink: "",
  instagramPhotos: [],
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("site_settings").select("key, value");
      if (!data) return;
      const map: Record<string, any> = {};
      data.forEach((r: any) => { map[r.key] = r.value; });

      setSettings({
        heroText: map.general?.heroText ?? defaultSettings.heroText,
        heroSubtext: map.general?.heroSubtext ?? defaultSettings.heroSubtext,
        heroImage: map.general?.heroImage ?? defaultSettings.heroImage,
        announcementText: map.general?.announcementText ?? defaultSettings.announcementText,
        sectionsVisible: { ...defaultSettings.sectionsVisible, ...(map.sections_visible ?? {}) },
        instagramLink: map.instagram?.link ?? "",
        instagramPhotos: map.instagram?.photos ?? [],
      });
    };
    load();
  }, []);

  return settings;
}
