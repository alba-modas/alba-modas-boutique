import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold font-heading text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold font-heading text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground font-body">A página que você procura não existe ou foi movida.</p>
        <div className="mt-6">
          <Link to="/" className="btn-gold">Voltar ao Início</Link>
        </div>
      </div>
    </div>
  );
}
