import { createFileRoute, Link } from "@tanstack/react-router";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories } from "@/data/products";
import { useState } from "react";
import { SlidersHorizontal, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Produtos — Alba Modas e Acessórios" },
      { name: "description", content: "Explore nossa coleção de moda evangélica: feminino, masculino, infantil, calçados, perfumes e acessórios." },
      { property: "og:title", content: "Produtos — Alba Modas e Acessórios" },
      { property: "og:description", content: "Moda evangélica com elegância e fé para toda a família." },
    ],
  }),
  component: ProdutosPage,
});

function ProdutosPage() {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [sort, setSort] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);

  let filtered = selectedCat ? allProducts.filter(p => p.category === selectedCat) : allProducts;

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
  else if (sort === "price-desc") filtered = [...filtered].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
  else if (sort === "bestseller") filtered = [...filtered].sort((a, b) => (a.badge === "bestseller" ? -1 : 1));

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
          <Link to="/">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">Produtos</span>
          {selectedCat && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground capitalize">{selectedCat}</span>
            </>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-2xl md:text-3xl">
            {selectedCat ? categories.find(c => c.slug === selectedCat)?.name ?? "Produtos" : "Todos os Produtos"}
          </h1>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowFilters(!showFilters)} className="md:hidden flex items-center gap-1 text-sm font-body border border-border rounded-lg px-3 py-2">
              <SlidersHorizontal className="w-4 h-4" /> Filtros
            </button>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="text-sm font-body border border-border rounded-lg px-3 py-2 bg-background"
            >
              <option value="recent">Mais Recentes</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="bestseller">Mais Vendidos</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className={`${showFilters ? "fixed inset-0 z-50 bg-background p-6 overflow-y-auto" : "hidden"} md:block md:static md:w-56 flex-shrink-0`}>
            {showFilters && (
              <div className="flex justify-between items-center mb-6 md:hidden">
                <h3 className="font-heading text-lg">Filtros</h3>
                <button onClick={() => setShowFilters(false)} className="text-sm font-body text-gold">Fechar</button>
              </div>
            )}
            <div className="mb-6">
              <h4 className="font-body text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Categoria</h4>
              <div className="space-y-2">
                <button
                  onClick={() => { setSelectedCat(null); setShowFilters(false); }}
                  className={`block w-full text-left text-sm font-body py-1 px-2 rounded ${!selectedCat ? "bg-gold/10 text-gold font-medium" : ""}`}
                >
                  Todos
                </button>
                {categories.map(c => (
                  <button
                    key={c.slug}
                    onClick={() => { setSelectedCat(c.slug); setShowFilters(false); }}
                    className={`block w-full text-left text-sm font-body py-1 px-2 rounded ${selectedCat === c.slug ? "bg-gold/10 text-gold font-medium" : ""}`}
                  >
                    {c.emoji} {c.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <p className="font-body text-sm text-muted-foreground mb-4">{filtered.length} produtos encontrados</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="font-body text-muted-foreground">Nenhum produto encontrado nesta categoria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
