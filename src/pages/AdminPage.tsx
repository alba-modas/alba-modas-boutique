import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Package, ShoppingCart, Users, Tag, BarChart3, AlertTriangle,
  LogOut, Plus, Edit, Trash2, Download, Search, X, Save, Upload, Settings, Layers
} from "lucide-react";
import { formatPrice } from "@/data/products";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { defaultSettings, type SiteSettings } from "@/hooks/useSiteSettings";

type Tab = "dashboard" | "produtos" | "categorias" | "pedidos" | "estoque" | "leads" | "cupons" | "configuracoes";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) { setError(error.message); } else {
      setSuccess("Conta criada! Fazendo login...");
      setTimeout(async () => { await supabase.auth.signInWithPassword({ email, password }); }, 1000);
    }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); };

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-muted"><div className="animate-spin w-8 h-8 border-4 border-gold border-t-transparent rounded-full" /></div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <Toaster />
        <div className="bg-card rounded-xl shadow-lg p-8 w-full max-w-md">
          <h1 className="font-heading text-2xl text-center mb-2">Painel Admin</h1>
          <p className="font-body text-sm text-muted-foreground text-center mb-6">Alba Modas e Acessórios</p>
          {error && <p className="text-sale text-sm font-body mb-4 text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm font-body mb-4 text-center">{success}</p>}
          <form onSubmit={isSignup ? handleSignup : handleLogin} className="space-y-4">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-muted text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold border border-border" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha (mínimo 6 caracteres)" className="w-full px-4 py-3 rounded-lg bg-muted text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold border border-border" required minLength={6} />
            <button type="submit" className="btn-gold w-full">{isSignup ? "Criar Conta" : "Entrar"}</button>
          </form>
          <button onClick={() => { setIsSignup(!isSignup); setError(""); setSuccess(""); }} className="w-full text-center text-sm font-body text-muted-foreground mt-4 hover:text-foreground transition-colors">
            {isSignup ? "Já tem conta? Fazer login" : "Primeiro acesso? Criar conta"}
          </button>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "dashboard", label: "Dashboard", icon: <BarChart3 className="w-4 h-4" /> },
    { key: "produtos", label: "Produtos", icon: <Package className="w-4 h-4" /> },
    { key: "categorias", label: "Categorias", icon: <Layers className="w-4 h-4" /> },
    { key: "pedidos", label: "Pedidos", icon: <ShoppingCart className="w-4 h-4" /> },
    { key: "estoque", label: "Estoque", icon: <AlertTriangle className="w-4 h-4" /> },
    { key: "leads", label: "Leads", icon: <Users className="w-4 h-4" /> },
    { key: "cupons", label: "Cupons", icon: <Tag className="w-4 h-4" /> },
    { key: "configuracoes", label: "Configurações", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-muted">
      <Toaster />
      <header className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-heading text-lg">Alba Modas</Link>
          <span className="text-xs opacity-60 font-body">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-body opacity-80 hidden sm:inline">{user.email}</span>
          <button onClick={handleLogout} className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        <aside className="w-56 bg-card border-r border-border min-h-[calc(100vh-52px)] hidden md:block">
          <nav className="p-4 space-y-1">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-colors ${tab === t.key ? "bg-gold/10 text-gold font-medium" : "hover:bg-muted"}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="md:hidden flex overflow-x-auto border-b border-border bg-card px-2 gap-1 hide-scrollbar">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-body whitespace-nowrap border-b-2 transition-colors ${tab === t.key ? "border-gold text-gold" : "border-transparent text-muted-foreground"}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {tab === "dashboard" && <DashboardTab />}
          {tab === "produtos" && <ProdutosTab />}
          {tab === "categorias" && <CategoriasTab />}
          {tab === "pedidos" && <PedidosTab />}
          {tab === "estoque" && <EstoqueTab />}
          {tab === "leads" && <LeadsTab />}
          {tab === "cupons" && <CuponsTab />}
          {tab === "configuracoes" && <ConfiguracoesTab />}
        </main>
      </div>
    </div>
  );
}

// ==================== DASHBOARD ====================
function DashboardTab() {
  const [stats, setStats] = useState({ products: 0, orders: 0, lowStock: 0, leads: 0 });
  useEffect(() => {
    const load = async () => {
      const [p, o, l] = await Promise.all([
        supabase.from("products").select("id, stock", { count: "exact" }),
        supabase.from("orders").select("id", { count: "exact" }),
        supabase.from("leads").select("id", { count: "exact" }),
      ]);
      const lowStock = (p.data ?? []).filter(x => (x.stock ?? 0) <= 3).length;
      setStats({ products: p.count ?? 0, orders: o.count ?? 0, lowStock, leads: l.count ?? 0 });
    };
    load();
  }, []);

  const cards = [
    { label: "Total Produtos", value: stats.products, icon: <Package className="w-6 h-6 text-gold" /> },
    { label: "Pedidos Recebidos", value: stats.orders, icon: <ShoppingCart className="w-6 h-6 text-gold" /> },
    { label: "Estoque Baixo", value: stats.lowStock, icon: <AlertTriangle className="w-6 h-6 text-sale" /> },
    { label: "Leads Capturados", value: stats.leads, icon: <Users className="w-6 h-6 text-gold" /> },
  ];

  return (
    <div>
      <h2 className="font-heading text-xl mb-6">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(c => (
          <div key={c.label} className="bg-card rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">{c.icon}<span className="font-heading text-2xl">{c.value}</span></div>
            <p className="font-body text-xs text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== CATEGORY SELECT (from DB) ====================
function CategorySelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [cats, setCats] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("categories").select("*").order("sort_order", { ascending: true }).then(({ data }) => setCats(data ?? []));
  }, []);
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border">
      {cats.length === 0 && <option value="">Carregando...</option>}
      {cats.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
    </select>
  );
}

// ==================== PRODUTOS ====================
interface ProductForm {
  name: string; slug: string; description: string; category: string;
  price: number; sale_price: number | null; image: string; image2: string;
  images: string[];
  colors: string[]; sizes: string[]; stock: number; badge: string; active: boolean;
  sizeGuideHeaders: string[];
  sizeGuideRows: string[][];
}

const emptyProduct: ProductForm = {
  name: "", slug: "", description: "", category: "",
  price: 0, sale_price: null, image: "", image2: "",
  images: [],
  colors: [], sizes: [], stock: 0, badge: "", active: true,
  sizeGuideHeaders: ["Tam", "Busto", "Cintura", "Quadril"],
  sizeGuideRows: [],
};

function ProdutosTab() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>({ ...emptyProduct });
  const [saving, setSaving] = useState(false);
  const [colorsInput, setColorsInput] = useState("");
  const [sizesInput, setSizesInput] = useState("");

  const load = useCallback(async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data ?? []);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const openNew = () => { setForm({ ...emptyProduct }); setColorsInput(""); setSizesInput(""); setEditingId(null); setShowForm(true); };

  const openEdit = (p: any) => {
    const sg = p.size_guide as any;
    setForm({
      name: p.name, slug: p.slug, description: p.description || "",
      category: p.category, price: p.price, sale_price: p.sale_price,
      image: p.image || "", image2: p.image2 || "",
      images: p.images || [],
      colors: p.colors || [], sizes: p.sizes || [],
      stock: p.stock ?? 0, badge: p.badge || "", active: p.active ?? true,
      sizeGuideHeaders: sg?.headers || ["Tam", "Busto", "Cintura", "Quadril"],
      sizeGuideRows: sg?.rows || [],
    });
    setColorsInput((p.colors || []).join(", "));
    setSizesInput((p.sizes || []).join(", "));
    setEditingId(p.id);
    setShowForm(true);
  };

  const generateSlug = (name: string) => name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSave = async () => {
    setSaving(true);
    const sizeGuide = form.sizeGuideRows.length > 0 ? { headers: form.sizeGuideHeaders, rows: form.sizeGuideRows } : null;
    const payload: any = {
      name: form.name,
      slug: form.slug || generateSlug(form.name),
      description: form.description,
      category: form.category,
      price: form.price,
      sale_price: form.sale_price,
      image: form.image,
      image2: form.image2,
      images: form.images,
      colors: colorsInput.split(",").map(s => s.trim()).filter(Boolean),
      sizes: sizesInput.split(",").map(s => s.trim()).filter(Boolean),
      stock: form.stock,
      badge: form.badge || null,
      active: form.active,
      size_guide: sizeGuide,
    };

    if (editingId) {
      await supabase.from("products").update(payload).eq("id", editingId);
      toast.success("Produto atualizado!");
    } else {
      await supabase.from("products").insert(payload);
      toast.success("Produto criado!");
    }
    setSaving(false);
    setShowForm(false);
    load();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Excluir este produto?")) return;
    await supabase.from("products").delete().eq("id", id);
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success("Produto excluído!");
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await supabase.storage.from("product-images").upload(path, file);
    if (!error && data) {
      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(data.path);
      return urlData.publicUrl;
    }
    return null;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "image" | "image2") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) {
      setForm(f => ({ ...f, [field]: url }));
      toast.success("Imagem enviada!");
    }
  };

  const handleMultiImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const url = await uploadImage(files[i]);
      if (url) {
        setForm(f => ({ ...f, images: [...f.images, url] }));
      }
    }
    toast.success("Imagens enviadas!");
  };

  const removeExtraImage = (index: number) => {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  };

  // Size guide helpers
  const addSizeGuideRow = () => {
    setForm(f => ({ ...f, sizeGuideRows: [...f.sizeGuideRows, f.sizeGuideHeaders.map(() => "")] }));
  };
  const removeSizeGuideRow = (index: number) => {
    setForm(f => ({ ...f, sizeGuideRows: f.sizeGuideRows.filter((_, i) => i !== index) }));
  };
  const updateSizeGuideHeader = (index: number, value: string) => {
    setForm(f => {
      const h = [...f.sizeGuideHeaders];
      h[index] = value;
      return { ...f, sizeGuideHeaders: h };
    });
  };
  const addSizeGuideColumn = () => {
    setForm(f => ({
      ...f,
      sizeGuideHeaders: [...f.sizeGuideHeaders, ""],
      sizeGuideRows: f.sizeGuideRows.map(r => [...r, ""]),
    }));
  };
  const removeSizeGuideColumn = (index: number) => {
    setForm(f => ({
      ...f,
      sizeGuideHeaders: f.sizeGuideHeaders.filter((_, i) => i !== index),
      sizeGuideRows: f.sizeGuideRows.map(r => r.filter((_, i) => i !== index)),
    }));
  };
  const updateSizeGuideCell = (ri: number, ci: number, value: string) => {
    setForm(f => {
      const rows = f.sizeGuideRows.map((r, i) => i === ri ? r.map((c, j) => j === ci ? value : c) : r);
      return { ...f, sizeGuideRows: rows };
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl">Produtos ({products.length})</h2>
        <button onClick={openNew} className="btn-gold text-xs py-2 px-3 flex items-center gap-1"><Plus className="w-3 h-3" /> Novo Produto</button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl p-5 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg">{editingId ? "Editar Produto" : "Novo Produto"}</h3>
            <button onClick={() => setShowForm(false)}><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: generateSlug(e.target.value) }))} placeholder="Nome do produto" className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
              <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="Slug (URL)" className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Descrição" rows={3} className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border resize-none" />
              <CategorySelect value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" step="0.01" value={form.price || ""} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} placeholder="Preço (R$)" className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
                <input type="number" step="0.01" value={form.sale_price ?? ""} onChange={e => setForm(f => ({ ...f, sale_price: e.target.value ? Number(e.target.value) : null }))} placeholder="Preço Promocional" className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Imagem principal</label>
                <div className="flex gap-2">
                  <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="URL da imagem" className="flex-1 px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
                  <label className="btn-outline-dark text-xs py-2 px-3 cursor-pointer flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, "image")} />
                  </label>
                </div>
                {form.image && <img src={form.image} alt="" className="w-20 h-20 rounded object-cover mt-2" />}
              </div>

              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Fotos adicionais (múltiplas)</label>
                <label className="btn-outline-dark text-xs py-2 px-3 cursor-pointer inline-flex items-center gap-1">
                  <Upload className="w-3 h-3" /> Adicionar Fotos
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleMultiImageUpload} />
                </label>
                {form.images.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative group">
                        <img src={img} alt="" className="w-16 h-16 rounded object-cover" />
                        <button onClick={() => removeExtraImage(i)} className="absolute -top-1 -right-1 bg-sale text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input value={colorsInput} onChange={e => setColorsInput(e.target.value)} placeholder="Cores (separadas por vírgula)" className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
              <input value={sizesInput} onChange={e => setSizesInput(e.target.value)} placeholder="Tamanhos (separados por vírgula)" className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: parseInt(e.target.value) || 0 }))} placeholder="Estoque" className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
                <select value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border">
                  <option value="">Sem badge</option>
                  <option value="novo">Novidade</option>
                  <option value="promo">Promoção</option>
                  <option value="bestseller">Mais Vendido</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm font-body">
                <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="rounded" />
                Produto ativo
              </label>
            </div>
          </div>

          {/* Size Guide Editor */}
          <div className="mt-4 border-t border-border pt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-heading text-sm">Guia de Tamanhos (opcional)</h4>
              <div className="flex gap-2">
                <button onClick={addSizeGuideColumn} className="text-xs text-gold hover:underline">+ Coluna</button>
                <button onClick={addSizeGuideRow} className="text-xs text-gold hover:underline">+ Linha</button>
              </div>
            </div>
            {(form.sizeGuideHeaders.length > 0) && (
              <div className="overflow-x-auto">
                <table className="text-xs border border-border rounded w-full">
                  <thead>
                    <tr className="bg-muted">
                      {form.sizeGuideHeaders.map((h, i) => (
                        <th key={i} className="p-1">
                          <div className="flex items-center gap-1">
                            <input value={h} onChange={e => updateSizeGuideHeader(i, e.target.value)} className="w-full px-1 py-0.5 bg-transparent text-xs border-b border-border focus:outline-none" />
                            {form.sizeGuideHeaders.length > 1 && <button onClick={() => removeSizeGuideColumn(i)} className="text-sale text-[10px]">×</button>}
                          </div>
                        </th>
                      ))}
                      <th className="p-1 w-6"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.sizeGuideRows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci} className="p-1 border-t border-border">
                            <input value={cell} onChange={e => updateSizeGuideCell(ri, ci, e.target.value)} className="w-full px-1 py-0.5 bg-muted rounded text-xs focus:outline-none" />
                          </td>
                        ))}
                        <td className="p-1 border-t border-border">
                          <button onClick={() => removeSizeGuideRow(ri)} className="text-sale text-xs">×</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {form.sizeGuideRows.length === 0 && <p className="text-xs text-muted-foreground">Clique em "+ Linha" para adicionar medidas personalizadas.</p>}
          </div>

          <div className="flex justify-end mt-4">
            <button onClick={handleSave} disabled={saving || !form.name || !form.price} className="btn-gold text-xs py-2 px-6 flex items-center gap-1 disabled:opacity-50">
              <Save className="w-3 h-3" /> {saving ? "Salvando..." : editingId ? "Salvar Alterações" : "Criar Produto"}
            </button>
          </div>
        </div>
      )}

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar produto..." className="w-full pl-10 pr-4 py-2 rounded-lg bg-card text-sm font-body border border-border focus:outline-none focus:ring-2 focus:ring-gold" />
      </div>
      <div className="bg-card rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead><tr className="border-b border-border bg-muted/50"><th className="text-left p-3">Produto</th><th className="text-left p-3 hidden md:table-cell">Categoria</th><th className="text-right p-3">Preço</th><th className="text-center p-3">Estoque</th><th className="text-center p-3">Ações</th></tr></thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    {p.image ? <img src={p.image} alt="" className="w-10 h-10 rounded object-cover" /> : <div className="w-10 h-10 rounded bg-muted flex items-center justify-center"><Package className="w-4 h-4 text-muted-foreground" /></div>}
                    <span className="font-medium truncate max-w-[200px]">{p.name}</span>
                  </div>
                </td>
                <td className="p-3 hidden md:table-cell capitalize">{p.category}</td>
                <td className="p-3 text-right">{p.sale_price ? <><span className="line-through text-muted-foreground mr-1">{formatPrice(p.price)}</span><span className="text-sale">{formatPrice(p.sale_price)}</span></> : formatPrice(p.price)}</td>
                <td className="p-3 text-center"><span className={`px-2 py-0.5 rounded text-xs ${(p.stock ?? 0) === 0 ? "bg-sale/10 text-sale" : (p.stock ?? 0) <= 3 ? "bg-orange-100 text-orange-700" : "bg-gold/10 text-gold"}`}>{(p.stock ?? 0) === 0 ? "Esgotado" : p.stock ?? 0}</span></td>
                <td className="p-3 text-center flex items-center justify-center gap-1">
                  <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-gold/10 rounded text-gold"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => deleteProduct(p.id)} className="p-1.5 hover:bg-sale/10 rounded text-sale"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">Nenhum produto encontrado</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==================== CATEGORIAS ====================
function CategoriasTab() {
  const [categories, setCategories] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [emoji, setEmoji] = useState("");
  const [image, setImage] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from("categories").select("*").order("sort_order", { ascending: true });
    setCategories(data ?? []);
  }, []);

  useEffect(() => { load(); }, [load]);

  const generateSlug = (n: string) => n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const openNew = () => { setName(""); setSlug(""); setEmoji(""); setImage(""); setSortOrder(categories.length); setEditingId(null); setShowForm(true); };

  const openEdit = (c: any) => {
    setName(c.name); setSlug(c.slug); setEmoji(c.emoji || ""); setImage(c.image || ""); setSortOrder(c.sort_order ?? 0);
    setEditingId(c.id); setShowForm(true);
  };

  const uploadCategoryImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `categories/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await supabase.storage.from("product-images").upload(path, file);
    if (!error && data) {
      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(data.path);
      return urlData.publicUrl;
    }
    return null;
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    const payload = { name, slug: slug || generateSlug(name), emoji, image, sort_order: sortOrder };
    if (editingId) {
      await supabase.from("categories").update(payload).eq("id", editingId);
      toast.success("Categoria atualizada!");
    } else {
      await supabase.from("categories").insert(payload);
      toast.success("Categoria criada!");
    }
    setSaving(false); setShowForm(false); load();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Excluir esta categoria?")) return;
    await supabase.from("categories").delete().eq("id", id);
    setCategories(prev => prev.filter(c => c.id !== id));
    toast.success("Categoria excluída!");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl">Categorias ({categories.length})</h2>
        <button onClick={openNew} className="btn-gold text-xs py-2 px-3 flex items-center gap-1"><Plus className="w-3 h-3" /> Nova Categoria</button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl p-5 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg">{editingId ? "Editar Categoria" : "Nova Categoria"}</h3>
            <button onClick={() => setShowForm(false)}><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Nome</label>
                <input value={name} onChange={e => { setName(e.target.value); if (!editingId) setSlug(generateSlug(e.target.value)); }} placeholder="Ex: Feminino" className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
              </div>
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Slug (URL)</label>
                <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="feminino" className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
              </div>
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Emoji (opcional)</label>
                <input value={emoji} onChange={e => setEmoji(e.target.value)} placeholder="👗" className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
              </div>
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Ordem de exibição</label>
                <input type="number" value={sortOrder} onChange={e => setSortOrder(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Foto de capa</label>
                <div className="flex gap-2">
                  <input value={image} onChange={e => setImage(e.target.value)} placeholder="URL da imagem" className="flex-1 px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
                  <label className="btn-outline-dark text-xs py-2 px-3 cursor-pointer flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const url = await uploadCategoryImage(file);
                      if (url) { setImage(url); toast.success("Imagem enviada!"); }
                    }} />
                  </label>
                </div>
                {image && <img src={image} alt="" className="w-full max-h-32 rounded-lg object-cover mt-2" />}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={handleSave} disabled={saving || !name.trim()} className="btn-gold text-xs py-2 px-6 flex items-center gap-1 disabled:opacity-50">
              <Save className="w-3 h-3" /> {saving ? "Salvando..." : editingId ? "Salvar" : "Criar Categoria"}
            </button>
          </div>
        </div>
      )}

      <div className="bg-card rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead><tr className="border-b border-border bg-muted/50"><th className="text-left p-3">Categoria</th><th className="text-center p-3">Slug</th><th className="text-center p-3">Ordem</th><th className="text-center p-3">Ações</th></tr></thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    {c.image ? <img src={c.image} alt="" className="w-10 h-10 rounded object-cover" /> : <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-lg">{c.emoji || "📁"}</div>}
                    <span className="font-medium">{c.name}</span>
                  </div>
                </td>
                <td className="p-3 text-center text-muted-foreground">{c.slug}</td>
                <td className="p-3 text-center">{c.sort_order ?? 0}</td>
                <td className="p-3 text-center flex items-center justify-center gap-1">
                  <button onClick={() => openEdit(c)} className="p-1.5 hover:bg-gold/10 rounded text-gold"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => deleteCategory(c.id)} className="p-1.5 hover:bg-sale/10 rounded text-sale"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">Nenhuma categoria cadastrada</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==================== PEDIDOS ====================
function PedidosTab() {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("orders").select("*").order("created_at", { ascending: false }).then(({ data }) => setOrders(data ?? []));
  }, []);

  const statusColors: Record<string, string> = {
    recebido: "bg-blue-100 text-blue-700", confirmado: "bg-gold/10 text-gold",
    separando: "bg-orange-100 text-orange-700", enviado: "bg-purple-100 text-purple-700",
    entregue: "bg-green-100 text-green-700",
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    toast.success("Status atualizado!");
  };

  return (
    <div>
      <h2 className="font-heading text-xl mb-6">Pedidos</h2>
      <div className="space-y-4">
        {orders.map(o => (
          <div key={o.id} className="bg-card rounded-xl p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <span className="font-body text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString("pt-BR")}</span>
                <h3 className="font-body font-medium">{o.customer_name || "Sem nome"}</h3>
                <p className="font-body text-xs text-muted-foreground">{o.customer_phone}</p>
              </div>
              <div className="text-right">
                <span className="font-heading text-lg">{formatPrice(Number(o.total))}</span>
                <div className="mt-1">
                  <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)} className={`text-xs font-body px-2 py-1 rounded border-none ${statusColors[o.status] ?? ""}`}>
                    <option value="recebido">Recebido</option>
                    <option value="confirmado">Confirmado</option>
                    <option value="separando">Separando</option>
                    <option value="enviado">Enviado</option>
                    <option value="entregue">Entregue</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
        {orders.length === 0 && <p className="text-center text-muted-foreground font-body py-12">Nenhum pedido recebido ainda</p>}
      </div>
    </div>
  );
}

// ==================== ESTOQUE ====================
function EstoqueTab() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("products").select("*").order("stock", { ascending: true }).then(({ data }) => setProducts(data ?? []));
  }, []);

  const updateStock = async (id: string, stock: number) => {
    await supabase.from("products").update({ stock }).eq("id", id);
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock } : p));
  };

  return (
    <div>
      <h2 className="font-heading text-xl mb-6">Estoque</h2>
      <div className="bg-card rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead><tr className="border-b border-border bg-muted/50"><th className="text-left p-3">Produto</th><th className="text-center p-3">Estoque</th><th className="text-center p-3">Status</th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className={`border-b border-border/50 ${(p.stock ?? 0) <= 2 ? "bg-sale/5" : ""}`}>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3 text-center">
                  <input type="number" value={p.stock ?? 0} onChange={e => updateStock(p.id, parseInt(e.target.value) || 0)} className="w-16 text-center px-2 py-1 rounded bg-muted border border-border text-sm" min={0} />
                </td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-xs ${(p.stock ?? 0) === 0 ? "bg-sale/10 text-sale" : (p.stock ?? 0) <= 2 ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                    {(p.stock ?? 0) === 0 ? "Esgotado" : (p.stock ?? 0) <= 2 ? "Baixo" : "OK"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==================== LEADS ====================
function LeadsTab() {
  const [leads, setLeads] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("leads").select("*").order("created_at", { ascending: false }).then(({ data }) => setLeads(data ?? []));
  }, []);

  const exportCSV = () => {
    const csv = "Telefone,Data\n" + leads.map(l => `${l.phone},${new Date(l.created_at).toLocaleDateString("pt-BR")}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "leads-alba-modas.csv"; a.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl">Leads ({leads.length})</h2>
        <button onClick={exportCSV} className="btn-gold text-xs py-2 px-3 flex items-center gap-1"><Download className="w-3 h-3" /> Exportar CSV</button>
      </div>
      <div className="bg-card rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead><tr className="border-b border-border bg-muted/50"><th className="text-left p-3">WhatsApp</th><th className="text-left p-3">Data</th></tr></thead>
          <tbody>
            {leads.map(l => (
              <tr key={l.id} className="border-b border-border/50">
                <td className="p-3">{l.phone}</td>
                <td className="p-3 text-muted-foreground">{new Date(l.created_at).toLocaleDateString("pt-BR")}</td>
              </tr>
            ))}
            {leads.length === 0 && <tr><td colSpan={2} className="p-8 text-center text-muted-foreground">Nenhum lead capturado ainda</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==================== CUPONS ====================
function CuponsTab() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: "", discount_type: "percent", discount_value: 10, usage_limit: 100 });

  useEffect(() => {
    supabase.from("coupons").select("*").order("created_at", { ascending: false }).then(({ data }) => setCoupons(data ?? []));
  }, []);

  const createCoupon = async () => {
    const { data } = await supabase.from("coupons").insert({
      code: form.code.toUpperCase(), discount_type: form.discount_type,
      discount_value: form.discount_value, usage_limit: form.usage_limit, active: true,
    }).select().single();
    if (data) setCoupons(prev => [data, ...prev]);
    setShowForm(false);
    setForm({ code: "", discount_type: "percent", discount_value: 10, usage_limit: 100 });
    toast.success("Cupom criado!");
  };

  const toggleCoupon = async (id: string, active: boolean) => {
    await supabase.from("coupons").update({ active: !active }).eq("id", id);
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, active: !active } : c));
  };

  const deleteCoupon = async (id: string) => {
    await supabase.from("coupons").delete().eq("id", id);
    setCoupons(prev => prev.filter(c => c.id !== id));
    toast.success("Cupom excluído!");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl">Cupons</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-gold text-xs py-2 px-3 flex items-center gap-1"><Plus className="w-3 h-3" /> Novo Cupom</button>
      </div>
      {showForm && (
        <div className="bg-card rounded-xl p-5 shadow-sm mb-6 space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} placeholder="Código (ex: ALBA10)" className="px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
            <select value={form.discount_type} onChange={e => setForm(f => ({ ...f, discount_type: e.target.value }))} className="px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border">
              <option value="percent">Porcentagem (%)</option>
              <option value="fixed">Valor fixo (R$)</option>
            </select>
            <input type="number" value={form.discount_value} onChange={e => setForm(f => ({ ...f, discount_value: Number(e.target.value) }))} placeholder="Valor" className="px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
            <input type="number" value={form.usage_limit} onChange={e => setForm(f => ({ ...f, usage_limit: Number(e.target.value) }))} placeholder="Limite de uso" className="px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
          </div>
          <button onClick={createCoupon} className="btn-gold text-xs py-2 px-4">Criar Cupom</button>
        </div>
      )}
      <div className="bg-card rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead><tr className="border-b border-border bg-muted/50"><th className="text-left p-3">Código</th><th className="text-center p-3">Desconto</th><th className="text-center p-3">Uso</th><th className="text-center p-3">Status</th><th className="text-center p-3">Ações</th></tr></thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c.id} className="border-b border-border/50">
                <td className="p-3 font-mono font-bold">{c.code}</td>
                <td className="p-3 text-center">{c.discount_type === "percent" ? `${c.discount_value}%` : formatPrice(Number(c.discount_value))}</td>
                <td className="p-3 text-center">{c.usage_count ?? 0}/{c.usage_limit ?? "∞"}</td>
                <td className="p-3 text-center">
                  <button onClick={() => toggleCoupon(c.id, c.active)} className={`px-2 py-0.5 rounded text-xs ${c.active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                    {c.active ? "Ativo" : "Inativo"}
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button onClick={() => deleteCoupon(c.id)} className="p-1.5 hover:bg-sale/10 rounded text-sale"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">Nenhum cupom criado</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==================== CONFIGURAÇÕES DO SITE ====================
function ConfiguracoesTab() {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem("alba-site-settings");
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch { return defaultSettings; }
  });

  const save = () => {
    localStorage.setItem("alba-site-settings", JSON.stringify(settings));
    // Dispatch storage event for same-tab listeners
    window.dispatchEvent(new StorageEvent("storage", { key: "alba-site-settings", newValue: JSON.stringify(settings) }));
    toast.success("Configurações salvas!");
  };

  return (
    <div>
      <h2 className="font-heading text-xl mb-6">Configurações do Site</h2>

      <div className="space-y-6">
        <div className="bg-card rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-heading text-lg">Banner Principal (Hero)</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-body text-muted-foreground mb-1">Imagem de fundo do banner</label>
              {settings.heroImage && (
                <img src={settings.heroImage} alt="Banner preview" className="w-full max-h-40 object-cover rounded-lg mb-2" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const ext = file.name.split(".").pop();
                  const path = `banner/hero-${Date.now()}.${ext}`;
                  const { error } = await supabase.storage.from("product-images").upload(path, file, { upsert: true });
                  if (error) { toast.error("Erro ao enviar imagem"); return; }
                  const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(path);
                  setSettings(s => ({ ...s, heroImage: publicUrl }));
                  toast.success("Imagem do banner enviada!");
                }}
                className="w-full text-sm font-body"
              />
              {settings.heroImage && (
                <button type="button" onClick={() => setSettings(s => ({ ...s, heroImage: "" }))} className="text-xs text-sale font-body mt-1">Remover imagem (usar padrão)</button>
              )}
            </div>
            <div>
              <label className="block text-xs font-body text-muted-foreground mb-1">Título principal</label>
              <input value={settings.heroText} onChange={e => setSettings(s => ({ ...s, heroText: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
            </div>
            <div>
              <label className="block text-xs font-body text-muted-foreground mb-1">Subtítulo</label>
              <input value={settings.heroSubtext} onChange={e => setSettings(s => ({ ...s, heroSubtext: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-heading text-lg">Barra de Anúncio</h3>
          <input value={settings.announcementText} onChange={e => setSettings(s => ({ ...s, announcementText: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-muted text-sm font-body border border-border" />
        </div>

        <div className="bg-card rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-heading text-lg">Visibilidade das Seções</h3>
          <div className="space-y-3">
            {[
              { key: "novidades" as const, label: "Novidades" },
              { key: "bestSellers" as const, label: "Mais Vendidos" },
              { key: "testimonials" as const, label: "Depoimentos" },
              { key: "instagram" as const, label: "Instagram" },
              { key: "quemSomos" as const, label: "Quem Somos (preview)" },
            ].map(item => (
              <label key={item.key} className="flex items-center gap-3 text-sm font-body">
                <input
                  type="checkbox"
                  checked={settings.sectionsVisible[item.key]}
                  onChange={e => setSettings(s => ({
                    ...s,
                    sectionsVisible: { ...s.sectionsVisible, [item.key]: e.target.checked }
                  }))}
                  className="rounded accent-gold"
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        <button onClick={save} className="btn-gold flex items-center gap-2">
          <Save className="w-4 h-4" /> Salvar Configurações
        </button>
      </div>
    </div>
  );
}
