import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/hooks/useCart";
import { formatPrice, WHATSAPP } from "@/data/products";
import { Minus, Plus, Trash2, Truck, Store } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Carrinho — Alba Modas e Acessórios" },
      { name: "description", content: "Revise seu pedido e finalize pelo WhatsApp." },
    ],
  }),
  component: CarrinhoPage,
});

function CarrinhoPage() {
  const { items, removeItem, updateQty, subtotal, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [delivery, setDelivery] = useState<"retirar" | "entrega">("entrega");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "ALBA10") {
      setDiscount(subtotal * 0.1);
    }
  };

  const lookupCep = async () => {
    if (cep.length < 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`);
      const data = await res.json();
      if (data.bairro) setNeighborhood(data.bairro);
      if (data.logradouro) setAddress(data.logradouro);
    } catch {}
  };

  const total = subtotal - discount;

  const sendWhatsApp = () => {
    const itemsText = items.map(i => {
      const p = i.product;
      return `• ${p.name} - Tam: ${i.size ?? "-"} - Cor: ${i.color ?? "-"} - Qtd: ${i.quantity} - ${formatPrice((p.salePrice ?? p.price) * i.quantity)}`;
    }).join("\n");

    const msg = `Olá, Alba Modas e Acessórios! 😊 Gostaria de fazer um pedido:\n\n🛍️ MEU PEDIDO:\n${itemsText}\n\n💰 Subtotal: ${formatPrice(subtotal)}${discount > 0 ? `\n🏷️ Cupom ${coupon.toUpperCase()}: -${formatPrice(discount)}` : ""}\n💰 Total: ${formatPrice(total)}\n📦 Entrega: ${delivery === "retirar" ? "Retirar na Loja" : "Entrega"}\n📍 Bairro: ${neighborhood}\n👤 Nome: ${name}\n📱 WhatsApp: ${phone}\n\nAguardo confirmação! 🙏`;

    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-2xl mb-4">Seu carrinho está vazio</h1>
        <p className="font-body text-muted-foreground mb-6">Explore nossos produtos e adicione itens ao carrinho.</p>
        <Link to="/produtos" className="btn-gold inline-flex">Ver Produtos</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl md:text-3xl mb-8">Seu Carrinho</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.product.id} className="flex gap-4 bg-card rounded-xl p-4 shadow-sm">
              <img src={item.product.image} alt={item.product.name} className="w-24 h-28 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-body font-medium">{item.product.name}</h3>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  {item.size && `Tam: ${item.size}`} {item.color && `· Cor: ${item.color}`}
                </p>
                <p className="font-body font-bold mt-2">{formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-border rounded">
                    <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="px-2 py-1"><Minus className="w-3 h-3" /></button>
                    <span className="px-2 text-sm font-body">{item.quantity}</span>
                    <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="px-2 py-1"><Plus className="w-3 h-3" /></button>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="text-sale"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-heading text-lg">Resumo do Pedido</h3>

            <div className="flex gap-2">
              <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Cupom de desconto" className="flex-1 px-3 py-2 text-sm font-body rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-gold" />
              <button onClick={applyCoupon} className="btn-gold text-xs px-4">Aplicar</button>
            </div>

            <div className="space-y-2 text-sm font-body">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-sale"><span>Desconto</span><span>-{formatPrice(discount)}</span></div>}
              <div className="flex justify-between"><span>Frete</span><span className="text-gold font-medium">Grátis</span></div>
              <div className="flex justify-between font-bold text-base border-t border-border pt-2"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-heading text-lg">Entrega</h3>
            <div className="space-y-2">
              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${delivery === "retirar" ? "border-gold bg-gold/5" : "border-border"}`}>
                <input type="radio" name="delivery" checked={delivery === "retirar"} onChange={() => setDelivery("retirar")} className="accent-gold" />
                <Store className="w-4 h-4" />
                <div>
                  <span className="font-body text-sm font-medium">Retirar na Loja</span>
                  <span className="font-body text-xs text-muted-foreground block">Grátis</span>
                </div>
              </label>
              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${delivery === "entrega" ? "border-gold bg-gold/5" : "border-border"}`}>
                <input type="radio" name="delivery" checked={delivery === "entrega"} onChange={() => setDelivery("entrega")} className="accent-gold" />
                <Truck className="w-4 h-4" />
                <div>
                  <span className="font-body text-sm font-medium">Entrega</span>
                  <span className="font-body text-xs text-muted-foreground block">Frete grátis</span>
                </div>
              </label>
            </div>

            {delivery === "entrega" && (
              <div className="space-y-3">
                <div>
                  <input value={cep} onChange={e => setCep(e.target.value)} onBlur={lookupCep} placeholder="CEP" className="w-full px-3 py-2 text-sm font-body rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-gold" />
                </div>
                <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Endereço" className="w-full px-3 py-2 text-sm font-body rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-gold" />
                <input value={neighborhood} onChange={e => setNeighborhood(e.target.value)} placeholder="Bairro" className="w-full px-3 py-2 text-sm font-body rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
            )}
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-heading text-lg">Seus Dados</h3>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome completo" className="w-full px-3 py-2 text-sm font-body rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-gold" />
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="WhatsApp (21) 99999-9999" className="w-full px-3 py-2 text-sm font-body rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-gold" />
          </div>

          <button onClick={sendWhatsApp} className="btn-gold w-full text-center">
            📱 Enviar Pedido pelo WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
