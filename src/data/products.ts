export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  image2?: string;
  category: string;
  colors?: string[];
  sizes?: string[];
  stock?: number;
  badge?: "novo" | "promo" | "bestseller";
  description?: string;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  emoji: string;
}

export interface Testimonial {
  name: string;
  text: string;
  avatar: string;
  rating: number;
}

const u = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories: Category[] = [
  { name: "Feminino", slug: "feminino", image: u("photo-1595777457583-95e059d581b8"), emoji: "👗" },
  { name: "Masculino", slug: "masculino", image: u("photo-1617137968427-85924c800a22"), emoji: "👔" },
  { name: "Infantil", slug: "infantil", image: u("photo-1503919545889-aef636e10ad4"), emoji: "🧒" },
  { name: "Calçados", slug: "calcados", image: u("photo-1543163521-1bf539c55dd2"), emoji: "👠" },
  { name: "Perfumes & Hidratantes", slug: "perfumes", image: u("photo-1541643600914-78b084683601"), emoji: "🌸" },
  { name: "Acessórios", slug: "acessorios", image: u("photo-1515562141589-67f0d24ad2f5"), emoji: "💍" },
];

export const novidades: Product[] = [
  { id: "n1", slug: "blusa-social-branca-renda", name: "Blusa Social Branca com Renda", price: 49.9, image: u("photo-1564257631407-4deb1f99d992"), category: "feminino", badge: "novo", sizes: ["PP","P","M","G","GG"], colors: ["Branco"], stock: 12 },
  { id: "n2", slug: "vestido-longo-floral", name: "Vestido Longo Floral", price: 89.9, salePrice: 69.9, image: u("photo-1572804013309-59a88b7e92f1"), category: "feminino", badge: "promo", sizes: ["P","M","G","GG"], colors: ["Floral"], stock: 5 },
  { id: "n3", slug: "blazer-masculino-social", name: "Blazer Masculino Social", price: 119.9, image: u("photo-1594938298603-c8148c4dae35"), category: "masculino", badge: "novo", sizes: ["P","M","G","GG"], colors: ["Marinho"], stock: 8 },
  { id: "n4", slug: "vestido-infantil-florido", name: "Vestido Infantil Florido", price: 39.9, image: u("photo-1518831959646-742c3a14ebf7"), category: "infantil", badge: "novo", sizes: ["2","4","6","8"], colors: ["Rosa"], stock: 15 },
  { id: "n5", slug: "lenco-estampado-floral", name: "Lenço Estampado Floral", price: 19.9, image: u("photo-1606107557195-0e29a4b5b4aa"), category: "acessorios", sizes: ["Único"], colors: ["Floral"], stock: 20 },
  { id: "n6", slug: "cardigan-trico-off-white", name: "Cardigan Tricô Off White", price: 59.9, salePrice: 44.9, image: u("photo-1434389677669-e08b4cda3a20"), category: "feminino", badge: "promo", sizes: ["P","M","G"], colors: ["Off White"], stock: 3 },
  { id: "n7", slug: "conjunto-infantil-festa", name: "Conjunto Infantil para Festa", price: 49.9, salePrice: 39.9, image: u("photo-1519238263530-99bdd11df2ea"), category: "infantil", badge: "promo", sizes: ["2","4","6","8"], colors: ["Azul"], stock: 7 },
];

export const bestSellers: Product[] = [
  { id: "b1", slug: "vestido-midi-floral-rosa", name: "Vestido Midi Floral Rosa", price: 79.9, salePrice: 59.9, image: u("photo-1596783074918-c84cb06531ca"), category: "feminino", badge: "bestseller", sizes: ["P","M","G","GG"], colors: ["Rosa Floral"], stock: 4 },
  { id: "b2", slug: "saia-midi-plissada-bege", name: "Saia Midi Plissada Bege", price: 44.9, image: u("photo-1583496661160-fb5886a0aaaa"), category: "feminino", badge: "bestseller", sizes: ["PP","P","M","G"], colors: ["Bege"], stock: 10 },
  { id: "b3", slug: "conjunto-saia-blusa-rose", name: "Conjunto Saia e Blusa Rosé", price: 89.9, image: u("photo-1585487000160-6ebcfceb0d44"), category: "feminino", badge: "bestseller", sizes: ["P","M","G"], colors: ["Rosé"], stock: 6 },
  { id: "b4", slug: "colar-cruz-dourado", name: "Colar Cruz Dourado", price: 24.9, image: u("photo-1599643478518-a784e5dc4c8f"), category: "acessorios", badge: "bestseller", sizes: ["Único"], colors: ["Dourado"], stock: 25 },
  { id: "b5", slug: "cardigan-trico-bege", name: "Cardigan Tricô Bege", price: 59.9, salePrice: 44.9, image: u("photo-1576566588028-4147f3842f27"), category: "feminino", badge: "promo", sizes: ["P","M","G","GG"], colors: ["Bege"], stock: 2 },
  { id: "b6", slug: "vestido-tubinho-preto", name: "Vestido Tubinho Preto", price: 69.9, image: u("photo-1539008835657-9e8e9680c956"), category: "feminino", badge: "bestseller", sizes: ["PP","P","M","G","GG"], colors: ["Preto"], stock: 9 },
];

export const allProducts: Product[] = [...novidades, ...bestSellers];

export const testimonials: Testimonial[] = [
  { name: "Ana Clara M.", text: "Amei a qualidade, chegou rápido e a peça é linda! Já é minha loja favorita.", avatar: u("photo-1494790108377-be9c29b29330", 100), rating: 5 },
  { name: "Patrícia S.", text: "Sempre recebo elogios quando uso as roupas da Alba. Elegância e fé juntas! 🙏", avatar: u("photo-1438761681033-6461ffad8d80", 100), rating: 5 },
  { name: "Mariana L.", text: "Atendimento maravilhoso pelo WhatsApp! Me ajudaram a montar o look perfeito.", avatar: u("photo-1534528741775-53994a69daeb", 100), rating: 5 },
  { name: "Débora R.", text: "Roupas de qualidade com preço justo. O frete grátis é um diferencial! ❤️", avatar: u("photo-1531746020798-e6953c6e8e04", 100), rating: 5 },
];



export const formatPrice = (v: number) =>
  `R$${v.toFixed(2).replace(".", ",")}`;

export const WHATSAPP = "5521974190736";
export const INSTAGRAM = "@albamodas";
