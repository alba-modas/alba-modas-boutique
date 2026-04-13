import { Heart, Share2 } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice, WHATSAPP } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { Link } from "@tanstack/react-router";

export default function ProductCard({ product, className = "" }: { product: Product; className?: string }) {
  const { addItem } = useCart();
  const displayPrice = product.salePrice ?? product.price;

  const shareWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = encodeURIComponent(`Olha essa peça linda da Alba Modas! ${product.name} por ${formatPrice(displayPrice)}`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  return (
    <div className={`group relative ${className}`}>
      <Link to="/produto/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {product.badge && (
            <span className={`absolute top-2 left-2 text-xs font-bold font-body px-2 py-1 rounded ${
              product.badge === "promo" ? "bg-sale text-destructive-foreground" :
              product.badge === "bestseller" ? "bg-gold text-gold-foreground" :
              "bg-primary text-primary-foreground"
            }`}>
              {product.badge === "promo" ? "PROMOÇÃO" : product.badge === "bestseller" ? "MAIS VENDIDO" : "NOVIDADE"}
            </span>
          )}
          {product.stock !== undefined && product.stock <= 3 && product.stock > 0 && (
            <span className="absolute top-2 right-2 text-[10px] font-body font-bold bg-sale text-destructive-foreground px-2 py-0.5 rounded">
              Últimas {product.stock} peças!
            </span>
          )}
          <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-background/90 p-2 rounded-full hover:bg-background" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} aria-label="Favoritar">
              <Heart className="w-4 h-4" />
            </button>
            <button className="bg-background/90 p-2 rounded-full hover:bg-background" onClick={shareWhatsApp} aria-label="Compartilhar">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mt-3">
          <h3 className="font-body text-sm font-medium leading-tight">{product.name}</h3>
          <div className="mt-1 flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="text-sm font-bold text-sale font-body">{formatPrice(product.salePrice)}</span>
                <span className="text-xs line-through text-muted-foreground font-body">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-sm font-bold font-body">{formatPrice(product.price)}</span>
            )}
          </div>
        </div>
      </Link>
      <button
        onClick={() => addItem(product, product.sizes?.[1], product.colors?.[0])}
        className="mt-2 w-full btn-gold text-xs py-2"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
