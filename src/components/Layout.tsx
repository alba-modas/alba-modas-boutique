import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Menu, X, Home, Grid3X3, ChevronRight } from "lucide-react";
import { useState, useCallback } from "react";
import { useCart } from "@/hooks/useCart";
import { WHATSAPP, INSTAGRAM } from "@/data/products";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Início", to: "/" },
  { label: "Feminino", to: "/produtos?categoria=feminino" },
  { label: "Masculino", to: "/produtos?categoria=masculino" },
  { label: "Infantil", to: "/produtos?categoria=infantil" },
  { label: "Acessórios", to: "/produtos?categoria=acessorios" },
  { label: "Promoções", to: "/produtos?categoria=perfumes", isPromo: true },
];

function AnnouncementBar() {
  const settings = useSiteSettings();
  return (
    <div className="bg-primary text-primary-foreground text-xs md:text-sm py-2 text-center font-body">
      {settings.announcementText}
    </div>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const openMenu = useCallback(() => setMobileOpen(true), []);
  const closeMenu = useCallback(() => setMobileOpen(false), []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button type="button" className="lg:hidden p-2 -ml-2 touch-manipulation" onClick={openMenu} aria-label="Abrir menu">
              <Menu className="w-6 h-6" />
            </button>
            <a href="/" onClick={handleLogoClick} className="flex items-center gap-2">
              <img src={logo} alt="Alba Modas e Acessórios" className="h-16 md:h-20 w-auto object-contain" />
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map(l => (
              <Link key={l.label} to={l.to} className={`hover:text-gold transition-colors ${l.isPromo ? "text-sale font-semibold" : ""}`}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:bg-secondary rounded-full transition-colors" aria-label="Buscar">
              <Search className="w-5 h-5" />
            </button>
            <button type="button" className="p-2 hover:bg-secondary rounded-full transition-colors relative" onClick={() => setIsOpen(true)} aria-label="Carrinho">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-gold-foreground text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border px-4 py-3">
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Buscar produtos..." className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold" autoFocus />
            </div>
          </div>
        )}
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col" role="dialog" aria-modal="true">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <img src={logo} alt="Alba Modas" className="h-10 object-contain" />
            <button type="button" onClick={closeMenu} className="p-2 touch-manipulation" aria-label="Fechar menu">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navLinks.map(l => (
              <Link key={l.label} to={l.to} onClick={closeMenu} className={`flex items-center justify-between py-3 px-2 text-lg font-body border-b border-border/50 ${l.isPromo ? "text-sale font-semibold" : ""}`}>
                {l.label}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h3 className="font-heading text-xl mb-3">Alba Modas e Acessórios</h3>
          <p className="text-sm opacity-80 leading-relaxed max-w-md font-body">
            Moda evangélica com elegância e fé. Roupas femininas, masculinas, infantis, calçados, perfumes e acessórios para toda a família.
          </p>
          <p className="text-sm mt-4 opacity-60 font-body">Vista-se com graça e elegância</p>
        </div>
        <div>
          <h4 className="font-heading text-sm uppercase tracking-wider mb-4 opacity-60">Links</h4>
          <ul className="space-y-2 text-sm font-body">
            <li><Link to="/" className="hover:opacity-100 opacity-80">Início</Link></li>
            <li><Link to="/produtos" className="hover:opacity-100 opacity-80">Produtos</Link></li>
            <li><Link to="/quem-somos" className="hover:opacity-100 opacity-80">Quem Somos</Link></li>
            <li><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-80">Contato via WhatsApp</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-sm uppercase tracking-wider mb-4 opacity-60">Contato</h4>
          <ul className="space-y-2 text-sm font-body opacity-80">
            <li>📱 WhatsApp: (21) 97419-0736</li>
            <li>📸 Instagram: {INSTAGRAM}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-4 text-center text-xs font-body opacity-50">
        © 2026 Alba Modas e Acessórios. Todos os direitos reservados.
      </div>
    </footer>
  );
}

function MobileBottomNav() {
  const { totalItems, setIsOpen } = useCart();
  const location = useLocation();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border">
      <div className="flex items-center justify-around py-2">
        <Link to="/" className={`flex flex-col items-center gap-0.5 text-xs font-body ${location.pathname === "/" ? "text-gold" : "text-muted-foreground"}`}>
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link to="/produtos" className={`flex flex-col items-center gap-0.5 text-xs font-body ${location.pathname === "/produtos" ? "text-gold" : "text-muted-foreground"}`}>
          <Grid3X3 className="w-5 h-5" />
          <span>Categorias</span>
        </Link>
        <button type="button" className="flex flex-col items-center gap-0.5 text-xs font-body text-muted-foreground relative" onClick={() => setIsOpen(true)}>
          <ShoppingBag className="w-5 h-5" />
          {totalItems > 0 && <span className="absolute -top-1 right-1 bg-gold text-gold-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItems}</span>}
          <span>Carrinho</span>
        </button>
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
