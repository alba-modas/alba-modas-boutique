
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings are viewable by everyone"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage site settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Seed default settings
INSERT INTO public.site_settings (key, value) VALUES
  ('general', '{"heroText": "Vista-se com Graça e Elegância", "heroSubtext": "Moda feminina, masculina e infantil para toda a família", "heroImage": "", "announcementText": "🚚 Frete grátis em todos os pedidos | 🔄 Troca em até 7 dias garantida"}'::jsonb),
  ('sections_visible', '{"novidades": true, "bestSellers": true, "promocoes": true, "testimonials": true, "instagram": true, "quemSomos": true}'::jsonb),
  ('instagram', '{"link": "", "photos": []}'::jsonb);
