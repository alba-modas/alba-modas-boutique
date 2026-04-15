import { useState, useEffect } from "react";

export interface SiteSettings {
  heroText: string;
  heroSubtext: string;
  heroImage: string;
  announcementText: string;
  sectionsVisible: {
    novidades: boolean;
    bestSellers: boolean;
    testimonials: boolean;
    instagram: boolean;
    quemSomos: boolean;
  };
}

export const defaultSettings: SiteSettings = {
  heroText: "Vista-se com Graça e Elegância",
  heroSubtext: "Moda feminina, masculina e infantil para toda a família",
  announcementText: "🚚 Frete grátis em todos os pedidos | 🔄 Troca em até 7 dias garantida",
  sectionsVisible: { novidades: true, bestSellers: true, testimonials: true, instagram: true, quemSomos: true },
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    if (typeof window === "undefined") return defaultSettings;
    try {
      const saved = localStorage.getItem("alba-site-settings");
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "alba-site-settings" && e.newValue) {
        try { setSettings({ ...defaultSettings, ...JSON.parse(e.newValue) }); } catch {}
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return settings;
}
