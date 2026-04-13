import { Heart, Share2 } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice, WHATSAPP } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { Link } from "@tanstack/react-router";

export default function ProductCard({ product, className = "", compact = false }: { product: Product; className?: string; compact?: boolean }) {
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
        <div className="relative overflow-hidden rounded-lg bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${compact ? "aspect-square" : "aspect-[3/4]"}`}
            loading="lazy"
            width={compact ? 200 : 400}
            height={compact ? 200 : 533}
          />
          {product.badge && (
            <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
              <span className={`text-[9px] font-bold font-body px-1.5 py-0.5 rounded ${
                product.badge === "promo" ? "bg-sale text-destructive-foreground" :
                product.badge === "bestseller" ? "bg-gold text-gold-foreground" :
                "bg-primary text-primary-foreground"
              }`}>
                {product.badge === "promo" ? "Promoção" : product.badge === "bestseller" ? "Mais Vendido" : "Novidade"}
              </span>
            </div>
          )}
          {!compact && product.stock !== undefined && product.stock <= 3 && product.stock > 0 && (
            <span className="absolute bottom-2 left-2 text-[10px] font-body font-bold bg-sale text-destructive-foreground px-2 py-0.5 rounded">
              Últimas {product.stock} peças!
            </span>
          )}
          {!compact && (
            <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-8 h-8 rounded-full flex items-center justify-center bg-background/80 text-foreground hover:bg-background transition-colors" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} aria-label="Favoritar">
                <Heart className="w-3.5 h-3.5" />
              </button>
              <button className="w-8 h-8 rounded-full bg-background/80 text-foreground flex items-center justify-center hover:bg-background transition-colors" onClick={shareWhatsApp} aria-label="Compartilhar">
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
        <div className={`${compact ? "mt-1.5 space-y-0.5" : "mt-3 space-y-1"}`}>
          <h3 className={`font-body font-medium leading-tight line-clamp-2 ${compact ? "text-xs" : "text-sm"}`}>{product.name}</h3>
          <div className="flex items-center gap-1.5">
            {product.salePrice ? (
              <>
                <span className={`line-through text-muted-foreground font-body ${compact ? "text-[10px]" : "text-sm"}`}>{formatPrice(product.price)}</span>
                <span className={`font-bold text-sale font-body ${compact ? "text-xs" : "text-sm"}`}>{formatPrice(product.salePrice)}</span>
              </>
            ) : (
              <span className={`font-semibold font-body ${compact ? "text-xs" : "text-sm"}`}>{formatPrice(product.price)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
