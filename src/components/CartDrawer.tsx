import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/data/products";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { items, removeItem, updateQty, subtotal, totalItems, isOpen, setIsOpen } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading text-lg">Seu Carrinho ({totalItems})</h2>
          <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            <p className="font-body text-muted-foreground">Seu carrinho está vazio</p>
            <button onClick={() => setIsOpen(false)} className="btn-gold text-sm">Continuar Comprando</button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-24 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-body text-sm font-medium truncate">{item.product.name}</h4>
                    {item.size && <p className="text-xs text-muted-foreground font-body">Tam: {item.size}</p>}
                    {item.color && <p className="text-xs text-muted-foreground font-body">Cor: {item.color}</p>}
                    <p className="text-sm font-bold mt-1 font-body">{formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-6 h-6 rounded border border-border flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                      <span className="text-sm font-body w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-6 h-6 rounded border border-border flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                      <button onClick={() => removeItem(item.product.id)} className="ml-auto text-xs text-sale font-body">Remover</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-4 space-y-3">
              <div className="flex justify-between font-body">
                <span className="text-sm">Subtotal</span>
                <span className="font-bold">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground font-body">🚚 Frete grátis em todos os pedidos</p>
              <Link to="/carrinho" onClick={() => setIsOpen(false)} className="btn-gold w-full text-center block">
                Finalizar Pedido
              </Link>
              <button onClick={() => setIsOpen(false)} className="w-full text-center text-sm text-muted-foreground font-body py-2">
                Continuar Comprando
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
