import { Link } from 'react-router-dom';
import { User, Lock, ShoppingBag, Package, Heart } from 'lucide-react';

export function AccountPage() {
  return (
    <div className="bg-ivory min-h-[70vh]">
      <div className="container-mg py-12 lg:py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-beige-light flex items-center justify-center mx-auto mb-6">
            <User size={36} className="text-beige-dark" />
          </div>
          <h1 className="font-serif text-3xl text-brown mb-3">Mon compte</h1>
          <p className="text-brown-light mb-8">
            L'espace client sera bientôt disponible. Vous pourrez y suivre vos commandes, gérer vos favoris et profiter d'offres exclusives.
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-sm text-left mb-6">
            <h2 className="font-serif text-lg text-brown mb-4">Bientôt disponible</h2>
            <ul className="space-y-3 text-sm text-brown-light">
              <li className="flex items-center gap-3">
                <Package size={18} className="text-gold" /> Suivi et historique des commandes
              </li>
              <li className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-gold" /> Réassort et produits favoris
              </li>
              <li className="flex items-center gap-3">
                <Heart size={18} className="text-gold" /> Liste de souhaits
              </li>
              <li className="flex items-center gap-3">
                <Lock size={18} className="text-gold" /> Gestion sécurisée de vos informations
              </li>
            </ul>
          </div>

          <div className="bg-beige-light/50 rounded-xl p-4 mb-6">
            <p className="text-xs text-brown-light/70">
              <strong className="text-brown">Mode démo</strong> — Cette page est un aperçu. La création de compte et l'authentification seront activées une fois la base de données connectée.
            </p>
          </div>

          <Link
            to="/boutique"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium text-white hover:bg-gold-dark transition-colors"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
}
