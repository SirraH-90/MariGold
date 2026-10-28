import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="bg-ivory min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-serif text-8xl lg:text-9xl font-semibold text-gold/30">404</p>
        <h1 className="font-serif text-3xl text-brown mt-4 mb-3">Page introuvable</h1>
        <p className="text-brown-light mb-8 max-w-md mx-auto">
          La page que vous cherchez n'existe pas ou a été déplacée. Retournons à l'élégance.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium text-white hover:bg-gold-dark transition-colors group"
        >
          <Home size={18} />
          Retour à l'accueil
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
