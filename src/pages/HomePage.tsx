import { Link } from "react-router-dom";
import { Star, Truck, RotateCcw, MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { testimonials, INSTAGRAM } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import heroBanner from "@/assets/hero-banner.jpg";

export default function HomePage() {
  const { products, loading } = useProducts();
  const { categories } = useCategories();
  const settings = useSiteSettings();
  const novidades = products.filter(p => p.badge === "novo").slice(0, 8);
  const bestSellers = products.filter(p => p.badge === "bestseller").slice(0, 6);

  return (
    <>
      <HeroSection heroText={settings.heroText} heroSubtext={settings.heroSubtext} heroImage={settings.heroImage} />
      <TrustBar />
      <CategoriesGrid categories={categories} />
      {!loading && novidades.length > 0 && settings.sectionsVisible.novidades && <ProductSection title="Novidades" products={novidades} scrollable />}
      {!loading && bestSellers.length > 0 && settings.sectionsVisible.bestSellers && <BestSellers products={bestSellers} />}
      {settings.sectionsVisible.testimonials && <Testimonials />}
      {settings.sectionsVisible.quemSomos && <QuemSomosPreview />}
      {settings.sectionsVisible.instagram && <InstagramGrid />}
    </>
  );
}

function HeroSection({ heroText, heroSubtext, heroImage }: { heroText: string; heroSubtext: string; heroImage: string }) {
  const bannerSrc = heroImage || heroBanner;
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[70vh] min-h-[500px] max-h-[700px]">
        <img src={bannerSrc} alt="Alba Modas - Moda Evangélica" className="absolute inset-0 w-full h-full object-cover" width={1920} height={900} />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-lg">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                {heroText}
              </h1>
              <p className="mt-4 text-primary-foreground/80 text-lg font-body">
                {heroSubtext}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/produtos" className="btn-gold">Explorar Coleção</Link>
                <Link to="/quem-somos" className="btn-outline-dark !border-primary-foreground !text-primary-foreground hover:!bg-primary-foreground/20">
                  Conheça Nossa História
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: <Truck className="w-6 h-6 text-gold" />, text: "Entrega Rápida" },
    { icon: <RotateCcw className="w-6 h-6 text-gold" />, text: "Troca Garantida" },
    { icon: <MessageCircle className="w-6 h-6 text-gold" />, text: "Atendimento WhatsApp" },
    { icon: <ShieldCheck className="w-6 h-6 text-gold" />, text: "Compra Segura" },
  ];
  return (
    <section className="border-b border-border py-6 bg-background">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(i => (
          <div key={i.text} className="flex items-center gap-3 justify-center">
            {i.icon}
            <span className="font-body text-sm font-medium">{i.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoriesGrid({ categories }: { categories: { name: string; slug: string; image: string; emoji: string }[] }) {
  if (categories.length === 0) return null;
  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      <h2 className="font-heading text-2xl md:text-3xl text-center mb-8">Explore por Categoria</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map(cat => (
          <Link
            to={`/produtos?categoria=${cat.slug}`}
            key={cat.slug}
            className="group block relative overflow-hidden rounded-xl aspect-[3/4]"
          >
            {cat.image ? (
              <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={300} height={400} />
            ) : (
              <div className="absolute inset-0 bg-muted flex items-center justify-center text-5xl">{cat.emoji || "📁"}</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-2xl">{cat.emoji}</span>
              <h3 className="text-primary-foreground font-heading text-xl font-semibold">{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProductSection({ title, products, scrollable = false }: { title: string; products: any[]; scrollable?: boolean }) {
  return (
    <section className="py-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl md:text-3xl">{title}</h2>
          <Link to="/produtos" className="text-sm font-medium text-gold flex items-center gap-1 hover:gap-2 transition-all">
            Ver Todas <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {scrollable ? (
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
            {products.map(p => (
              <div key={p.id} className="min-w-[150px] max-w-[170px] sm:min-w-[170px] sm:max-w-[190px] snap-start flex-shrink-0">
                <ProductCard product={p} compact />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(p => <ProductCard key={p.id} product={p} compact />)}
          </div>
        )}
      </div>
    </section>
  );
}

function BestSellers({ products }: { products: any[] }) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl md:text-3xl">Mais Vendidos</h2>
          <Link to="/produtos" className="text-sm font-medium text-gold flex items-center gap-1 hover:gap-2 transition-all">
            Ver Todos <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {products.map(p => <ProductCard key={p.id} product={p} compact />)}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl md:text-3xl">O que nossas clientes dizem</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card rounded-xl p-6 shadow-sm">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                <span className="font-body text-sm font-medium">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuemSomosPreview() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl mb-4">Quem Somos</h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              A Alba Modas e Acessórios nasceu do desejo de unir fé, elegância e praticidade para a mulher cristã moderna.
              Acreditamos que vestir-se bem é uma forma de honrar a Deus e expressar quem somos.
            </p>
            <Link to="/quem-somos" className="btn-gold mt-6 inline-flex">Conheça Nossa História</Link>
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80"
              alt="Nossa loja"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InstagramGrid() {
  const igPhotos = [
    "photo-1558618666-fcd25c85f82e", "photo-1469334031218-e382a71b716b",
    "photo-1485968579580-b6d095142e6e", "photo-1492707892479-7bc8d5a4ee93",
    "photo-1487222477894-8943e31ef7b2", "photo-1529139574466-a303027c1d8b",
  ];
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="font-heading text-2xl md:text-3xl mb-2">Siga {INSTAGRAM}</h2>
        <p className="font-body text-sm text-muted-foreground mb-8">Inspiração e novidades todos os dias</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {igPhotos.map(id => (
            <a key={id} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="aspect-square overflow-hidden rounded-lg group">
              <img src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=300&q=80`} alt="Instagram" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
            </a>
          ))}
        </div>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn-outline-dark mt-8 inline-flex">
          Seguir no Instagram
        </a>
      </div>
    </section>
  );
}
