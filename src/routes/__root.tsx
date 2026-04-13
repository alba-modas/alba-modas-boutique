import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import Layout from "@/components/Layout";
import { CartProvider } from "@/hooks/useCart";
import CartDrawer from "@/components/CartDrawer";
import WelcomePopup from "@/components/WelcomePopup";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold font-heading text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold font-heading text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground font-body">A página que você procura não existe ou foi movida.</p>
        <div className="mt-6">
          <Link to="/" className="btn-gold">Voltar ao Início</Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Alba Modas e Acessórios — Moda Evangélica com Elegância e Fé" },
      { name: "description", content: "Moda evangélica feminina, masculina, infantil, calçados, perfumes e acessórios. Vista-se com graça e elegância. Frete grátis em todos os pedidos." },
      { property: "og:title", content: "Alba Modas e Acessórios — Moda Evangélica com Elegância e Fé" },
      { property: "og:description", content: "Moda evangélica feminina, masculina, infantil, calçados, perfumes e acessórios. Vista-se com graça e elegância. Frete grátis em todos os pedidos." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Alba Modas e Acessórios — Moda Evangélica com Elegância e Fé" },
      { name: "twitter:description", content: "Moda evangélica feminina, masculina, infantil, calçados, perfumes e acessórios. Vista-se com graça e elegância. Frete grátis em todos os pedidos." },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return <Outlet />;
  }

  return (
    <CartProvider>
      <Layout>
        <Outlet />
      </Layout>
      <CartDrawer />
      <WelcomePopup />
    </CartProvider>
  );
}
