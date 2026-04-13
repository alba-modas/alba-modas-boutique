import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, ChevronRight, Truck, RefreshCw, MessageCircle, Shield } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import {
  categories, novidades, bestSellers, testimonials, outfitCombos,
  formatPrice, INSTAGRAM,
} from "@/data/products";

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
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80"
        alt="Moda evangélica elegante"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-lg">
            <h1 className="font-heading text-4xl md:text-6xl text-background leading-tight">
              Vista-se com Graça e Elegância
            </h1>
            <p className="font-body text-background/80 mt-4 text-sm md:text-base leading-relaxed">
              Moda feminina, masculina, infantil, calçados, perfumes e acessórios para toda a família
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/produtos" className="btn-gold">Explorar Coleção</Link>
              <Link to="/quem-somos" className="btn-outline-dark !border-background/60 !text-background hover:!bg-background/10">
                Conheça Nossa História
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: <Truck className="w-5 h-5" />, text: "Entrega Rápida" },
    { icon: <RefreshCw className="w-5 h-5" />, text: "Troca Garantida" },
    { icon: <MessageCircle className="w-5 h-5" />, text: "Atendimento no WhatsApp" },
    { icon: <Shield className="w-5 h-5" />, text: "Compra Segura" },
  ];
  return (
    <section className="border-b border-border py-6 bg-card">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(i => (
          <div key={i.text} className="flex items-center gap-3 justify-center">
            <span className="text-gold">{i.icon}</span>
            <span className="font-body text-sm font-medium">{i.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoriesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="font-heading text-2xl md:text-3xl">Categorias</h2>
        <p className="font-body text-sm text-muted-foreground mt-2">Encontre o que você procura</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map(cat => (
          <Link
            to="/produtos"
            key={cat.slug}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden"
          >
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-2xl">{cat.emoji}</span>
              <h3 className="font-heading text-lg text-background mt-1">{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProductSection({ title, products, scrollable = false }: { title: string; products: typeof novidades; scrollable?: boolean }) {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl md:text-3xl">{title}</h2>
          <Link to="/produtos" className="font-body text-sm text-gold flex items-center gap-1 hover:underline">
            Ver todos <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {scrollable ? (
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4">
            {products.map(p => (
              <div key={p.id} className="min-w-[200px] md:min-w-[240px] flex-shrink-0">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function BestSellers() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl md:text-3xl">Mais Vendidos</h2>
          <Link to="/produtos" className="font-body text-sm text-gold flex items-center gap-1 hover:underline">
            Ver todos <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}

function MonteSeuLook() {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl md:text-3xl">Monte seu Look</h2>
          <p className="font-body text-sm text-muted-foreground mt-2">Combinações prontas para você arrasar</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {outfitCombos.map((combo, i) => {
            const total = combo.products.filter(Boolean).reduce((s, p) => s + (p.salePrice ?? p.price), 0);
            return (
              <div key={i} className="bg-card rounded-xl p-6 shadow-sm">
                <h3 className="font-heading text-lg mb-4">{combo.title}</h3>
                <div className="flex gap-2 mb-4">
                  {combo.products.filter(Boolean).map(p => (
                    <img key={p.id} src={p.image} alt={p.name} className="w-1/3 aspect-square object-cover rounded-lg" loading="lazy" />
                  ))}
                </div>
                <div className="space-y-1 mb-4">
                  {combo.products.filter(Boolean).map(p => (
                    <div key={p.id} className="flex justify-between font-body text-xs">
                      <span className="truncate mr-2">{p.name}</span>
                      <span className="font-medium whitespace-nowrap">{formatPrice(p.salePrice ?? p.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="font-body text-sm font-bold">Total: {formatPrice(total)}</span>
                  <button className="btn-gold text-xs py-2 px-4">Ver Look Completo</button>
                </div>
              </div>
            );
          })}
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
    <section className="py-16 bg-secondary/50">
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
