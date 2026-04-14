import { Link, useParams } from "react-router-dom";
import { allProducts, formatPrice, WHATSAPP } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { ChevronRight, Minus, Plus, Share2, Star, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = allProducts.find(p => p.slug === slug);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "sizes" | "policy">("desc");

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="font-heading text-2xl">Produto não encontrado</h2>
        <Link to="/produtos" className="btn-gold mt-6 inline-flex">Ver todos os produtos</Link>
      </div>
    );
  }

  const displayPrice = product.salePrice ?? product.price;
  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const shareWhatsApp = () => {
    const msg = encodeURIComponent(`Olha essa peça da Alba Modas! ${product.name} por ${formatPrice(displayPrice)} 😍`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem(product, selectedSize ?? product.sizes?.[0], selectedColor ?? product.colors?.[0]);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
          <Link to="/">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/produtos">Produtos</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div>
            {product.badge && (
              <span className={`text-xs font-bold font-body px-3 py-1 rounded-full ${
                product.badge === "promo" ? "bg-sale/10 text-sale" :
                product.badge === "bestseller" ? "bg-gold/10 text-gold" :
                "bg-primary/10 text-primary"
              }`}>
                {product.badge === "promo" ? "PROMOÇÃO" : product.badge === "bestseller" ? "MAIS VENDIDO" : "NOVIDADE"}
              </span>
            )}
            <h1 className="font-heading text-2xl md:text-3xl mt-3">{product.name}</h1>

            <div className="flex items-center gap-1 mt-3">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-gold text-gold" />)}
              <span className="font-body text-xs text-muted-foreground ml-2">(4.9) · 127 avaliações</span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              {product.salePrice ? (
                <>
                  <span className="text-3xl font-heading font-bold text-sale">{formatPrice(product.salePrice)}</span>
                  <span className="text-lg line-through text-muted-foreground font-body">{formatPrice(product.price)}</span>
                  <span className="text-xs font-body bg-sale/10 text-sale px-2 py-0.5 rounded">
                    -{Math.round((1 - product.salePrice / product.price) * 100)}%
                  </span>
                </>
              ) : (
                <span className="text-3xl font-heading font-bold">{formatPrice(product.price)}</span>
              )}
            </div>

            {product.stock !== undefined && product.stock <= 3 && product.stock > 0 && (
              <p className="mt-3 text-sm font-body text-sale font-medium">⚠️ Últimas {product.stock} peças em estoque!</p>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <h4 className="font-body text-sm font-medium mb-2">Cor</h4>
                <div className="flex gap-2">
                  {product.colors.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-4 py-2 rounded-lg text-sm font-body border transition-colors ${selectedColor === c ? "border-gold bg-gold/10" : "border-border"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-4">
                <h4 className="font-body text-sm font-medium mb-2">Tamanho</h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-12 h-12 rounded-lg text-sm font-body border transition-colors flex items-center justify-center ${selectedSize === s ? "border-gold bg-gold/10 font-bold" : "border-border"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2"><Minus className="w-4 h-4" /></button>
                <span className="px-3 font-body text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={handleAddToCart} className="btn-gold flex-1">Adicionar ao Carrinho</button>
            </div>

            <button onClick={shareWhatsApp} className="mt-3 w-full btn-outline-dark text-sm flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" /> Compartilhar no WhatsApp
            </button>

            <div className="mt-6 flex items-center gap-2 text-sm font-body text-muted-foreground">
              <Truck className="w-4 h-4 text-gold" />
              <span>Frete grátis para todo o Brasil</span>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <div className="flex gap-4 border-b border-border">
                {(["desc", "sizes", "policy"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-body transition-colors ${activeTab === tab ? "border-b-2 border-gold text-foreground font-medium" : "text-muted-foreground"}`}
                  >
                    {tab === "desc" ? "Descrição" : tab === "sizes" ? "Guia de Tamanhos" : "Política de Troca"}
                  </button>
                ))}
              </div>
              <div className="pt-4 font-body text-sm text-muted-foreground leading-relaxed">
                {activeTab === "desc" && (
                  <p>{product.description ?? `${product.name} — peça elegante e confortável, perfeita para o dia a dia e ocasiões especiais. Moda evangélica com qualidade e estilo.`}</p>
                )}
                {activeTab === "sizes" && (
                  <div>
                    <p className="mb-2">Consulte nosso guia de tamanhos:</p>
                    <table className="w-full text-xs border border-border rounded">
                      <thead><tr className="bg-muted"><th className="p-2 text-left">Tam</th><th className="p-2">Busto</th><th className="p-2">Cintura</th><th className="p-2">Quadril</th></tr></thead>
                      <tbody>
                        <tr><td className="p-2 border-t border-border">PP</td><td className="p-2 border-t border-border text-center">82-86</td><td className="p-2 border-t border-border text-center">62-66</td><td className="p-2 border-t border-border text-center">88-92</td></tr>
                        <tr><td className="p-2 border-t border-border">P</td><td className="p-2 border-t border-border text-center">86-90</td><td className="p-2 border-t border-border text-center">66-70</td><td className="p-2 border-t border-border text-center">92-96</td></tr>
                        <tr><td className="p-2 border-t border-border">M</td><td className="p-2 border-t border-border text-center">90-94</td><td className="p-2 border-t border-border text-center">70-74</td><td className="p-2 border-t border-border text-center">96-100</td></tr>
                        <tr><td className="p-2 border-t border-border">G</td><td className="p-2 border-t border-border text-center">94-98</td><td className="p-2 border-t border-border text-center">74-78</td><td className="p-2 border-t border-border text-center">100-104</td></tr>
                        <tr><td className="p-2 border-t border-border">GG</td><td className="p-2 border-t border-border text-center">98-102</td><td className="p-2 border-t border-border text-center">78-82</td><td className="p-2 border-t border-border text-center">104-108</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
                {activeTab === "policy" && (
                  <div>
                    <p>Aceitamos trocas em até 7 dias após o recebimento. O produto deve estar em perfeito estado, com etiqueta e na embalagem original.</p>
                    <p className="mt-2">Para solicitar a troca, entre em contato pelo WhatsApp (21) 97419-0736.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl mb-8">Clientes também viram</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
