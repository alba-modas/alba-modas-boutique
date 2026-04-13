import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Cross } from "lucide-react";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos — Alba Modas e Acessórios" },
      { name: "description", content: "Conheça a história da Alba Modas e Acessórios. Moda evangélica com fé, qualidade e elegância." },
      { property: "og:title", content: "Quem Somos — Alba Modas e Acessórios" },
      { property: "og:description", content: "Conheça a história da Alba Modas e Acessórios." },
    ],
  }),
  component: QuemSomosPage,
});

function QuemSomosPage() {
  const values = [
    { emoji: "✝️", title: "Fé", text: "Nossa fé nos guia em tudo o que fazemos." },
    { emoji: "⭐", title: "Qualidade", text: "Peças selecionadas com carinho e atenção." },
    { emoji: "👨‍👩‍👧‍👦", title: "Família", text: "Moda para toda a família reunida." },
    { emoji: "✨", title: "Elegância", text: "Vista-se com graça e sofisticação." },
  ];

  return (
    <>
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1920&q=80"
          alt="Alba Modas loja"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl text-background">Quem Somos</h1>
            <p className="font-body text-background/80 mt-3">Fé, elegância e praticidade</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="font-heading text-2xl md:text-3xl mb-6">Nossa História</h2>
        <p className="font-body text-muted-foreground leading-relaxed">
          A Alba Modas e Acessórios nasceu do desejo de unir fé, elegância e praticidade para a mulher cristã moderna.
          Acreditamos que vestir-se bem é uma forma de honrar a Deus e expressar quem somos.
          Cada peça é selecionada com carinho, pensando em oferecer qualidade, conforto e estilo para toda a família.
        </p>
        <p className="font-body text-muted-foreground leading-relaxed mt-4">
          Mais do que uma loja, somos uma comunidade de mulheres que se apoiam e inspiram umas às outras.
          Nosso compromisso é oferecer moda modesta e elegante a preços justos, com atendimento personalizado via WhatsApp.
        </p>
      </section>

      <section className="bg-secondary/50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl text-center mb-10">Nossos Valores</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="text-center bg-card rounded-xl p-6 shadow-sm">
                <span className="text-3xl">{v.emoji}</span>
                <h3 className="font-heading text-lg mt-3">{v.title}</h3>
                <p className="font-body text-xs text-muted-foreground mt-2">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <h2 className="font-heading text-2xl md:text-3xl mb-4">Pronta para se vestir com elegância?</h2>
        <Link to="/produtos" className="btn-gold inline-flex mt-4">Conheça nossa coleção</Link>
      </section>
    </>
  );
}
