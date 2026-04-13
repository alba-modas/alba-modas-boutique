import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, ChevronRight, Truck, RotateCcw, MessageCircle, ShieldCheck, ArrowRight, Plus, Check } from "lucide-react";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import {
  categories, novidades, bestSellers, testimonials, outfitCombos, allProducts,
  formatPrice, INSTAGRAM,
} from "@/data/products";
import heroBanner from "@/assets/hero-banner.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alba Modas e Acessórios — Moda Evangélica com Elegância e Fé" },
      { name: "description", content: "Moda evangélica feminina, masculina, infantil, calçados, perfumes e acessórios. Frete grátis. Vista-se com graça e elegância." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoriesGrid />
      <ProductSection title="Novidades" products={novidades} scrollable />
      <BestSellers />
      <MonteSeuLook />
      <Testimonials />
      <QuemSomosPreview />
      <InstagramGrid />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[70vh] min-h-[500px] max-h-[700px]">
        <img
          src={heroBanner}
          alt="Alba Modas - Moda Evangélica"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={900}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-lg">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Vista-se com Graça e Elegância
              </h1>
              <p className="mt-4 text-primary-foreground/80 text-lg font-body">
                Moda feminina, masculina e infantil para toda a família
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

function CategoriesGrid() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      <h2 className="font-heading text-2xl md:text-3xl text-center mb-8">Explore por Categoria</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map(cat => (
          <Link
            to="/produtos"
            key={cat.slug}
            className="group block relative overflow-hidden rounded-xl aspect-[3/4]"
          >
            <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={300} height={400} />
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

function ProductSection({ title, products, scrollable = false }: { title: string; products: typeof novidades; scrollable?: boolean }) {
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

function BestSellers() {
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
          {bestSellers.map(p => <ProductCard key={p.id} product={p} compact />)}
        </div>
      </div>
    </section>
  );
}

function MonteSeuLook() {
  const [mode, setMode] = useState<"pronto" | "livre">("pronto");
  const [selectedProducts, setSelectedProducts] = useState<typeof allProducts>([]);

  const toggleProduct = (product: typeof allProducts[0]) => {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      if (prev.length >= 5) return prev;
      return [...prev, product];
    });
  };

  const selectedTotal = selectedProducts.reduce((s, p) => s + (p.salePrice ?? p.price), 0);

  return (
    <section className="py-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl">Monte seu Look</h2>
          <p className="font-body text-sm text-muted-foreground mt-2">Escolha combinações prontas ou monte o seu look do seu jeito</p>
          <div className="flex justify-center gap-2 mt-4">
            <button onClick={() => setMode("pronto")} className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-colors ${mode === "pronto" ? "bg-gold text-gold-foreground" : "bg-card border border-border"}`}>
              Looks Prontos
            </button>
            <button onClick={() => setMode("livre")} className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-colors ${mode === "livre" ? "bg-gold text-gold-foreground" : "bg-card border border-border"}`}>
              Montar Livre
            </button>
          </div>
        </div>

        {mode === "pronto" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {outfitCombos.map((combo, i) => {
              const total = combo.products.filter(Boolean).reduce((s, p) => s + (p.salePrice ?? p.price), 0);
              return (
                <div key={i} className="bg-card rounded-xl p-5 shadow-sm">
                  <h3 className="font-heading text-lg mb-3">{combo.title}</h3>
                  <div className="flex gap-2 mb-3">
                    {combo.products.filter(Boolean).map(p => (
                      <img key={p.id} src={p.image} alt={p.name} className="w-1/3 aspect-square object-cover rounded-lg" loading="lazy" />
                    ))}
                  </div>
                  <div className="space-y-1 mb-3">
                    {combo.products.filter(Boolean).map(p => (
                      <div key={p.id} className="flex justify-between font-body text-xs">
                        <span className="truncate mr-2">{p.name}</span>
                        <span className="font-medium whitespace-nowrap">{formatPrice(p.salePrice ?? p.price)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <span className="font-body text-sm font-bold">Total: {formatPrice(total)}</span>
                    <button className="btn-gold text-xs py-2 px-4">Ver Look</button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {selectedProducts.length > 0 && (
              <div className="bg-card rounded-xl p-5 shadow-sm mb-6">
                <h3 className="font-heading text-lg mb-3">Seu Look ({selectedProducts.length} peças)</h3>
                <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                  {selectedProducts.map(p => (
                    <div key={p.id} className="relative min-w-[80px]">
                      <img src={p.image} alt={p.name} className="w-20 h-20 object-cover rounded-lg" />
                      <button onClick={() => toggleProduct(p)} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-sale text-sale-foreground rounded-full flex items-center justify-center text-xs">×</button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="font-body text-sm font-bold">Total: {formatPrice(selectedTotal)}</span>
                  <button className="btn-gold text-xs py-2 px-4">Adicionar ao Carrinho</button>
                </div>
              </div>
            )}
            <p className="font-body text-xs text-muted-foreground mb-3">Selecione até 5 peças para montar seu look:</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {allProducts.map(p => {
                const isSelected = selectedProducts.some(s => s.id === p.id);
                return (
                  <button key={p.id} onClick={() => toggleProduct(p)} className={`relative rounded-lg overflow-hidden border-2 transition-colors ${isSelected ? "border-gold" : "border-transparent"}`}>
                    <img src={p.image} alt={p.name} className="w-full aspect-square object-cover" loading="lazy" />
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-gold-foreground" />
                      </div>
                    )}
                    <div className="p-1.5">
                      <p className="font-body text-[10px] truncate">{p.name}</p>
                      <p className="font-body text-[10px] font-bold">{formatPrice(p.salePrice ?? p.price)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
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
