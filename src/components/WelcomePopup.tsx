import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function WelcomePopup() {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = localStorage.getItem("alba-popup-dismissed");
    if (dismissed) return;
    const t = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem("alba-popup-dismissed", "1");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      await supabase.from("leads").insert({ phone: phone.trim() });
      const leads = JSON.parse(localStorage.getItem("alba-leads") || "[]");
      leads.push({ phone, date: new Date().toISOString() });
      localStorage.setItem("alba-leads", JSON.stringify(leads));
      setSubmitted(true);
      setTimeout(dismiss, 2000);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative bg-background rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300">
        <button onClick={dismiss} className="absolute top-3 right-3"><X className="w-5 h-5 text-muted-foreground" /></button>
        {submitted ? (
          <div className="text-center py-4">
            <p className="text-3xl mb-2">🎉</p>
            <h3 className="font-heading text-xl">Obrigada!</h3>
            <p className="font-body text-sm text-muted-foreground mt-2">Seu cupom ALBA10 já está ativo!</p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <span className="text-4xl">🎁</span>
              <h3 className="font-heading text-xl mt-3">Ganhe 10% OFF</h3>
              <p className="font-body text-sm text-muted-foreground mt-2">no seu primeiro pedido! Informe seu WhatsApp e receba seu cupom exclusivo.</p>
            </div>
            <form onSubmit={submit} className="mt-6 space-y-3">
              <input
                type="tel"
                placeholder="(21) 99999-9999"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-muted text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button type="submit" className="btn-gold w-full">Quero meu cupom!</button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-3 font-body">Usaremos seu WhatsApp apenas para enviar o cupom.</p>
          </>
        )}
      </div>
    </div>
  );
}
