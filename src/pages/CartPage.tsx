import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, cartTotal } from '@/utils/helpers';

export function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();
  const subtotal = cartTotal(items);

  if (items.length === 0) {
    return (
      <div className="bg-ivory min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 rounded-full bg-beige-light flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={36} className="text-beige-dark" />
          </div>
          <h1 className="font-serif text-3xl text-brown mb-3">Votre panier est vide</h1>
          <p className="text-brown-light mb-8 max-w-md mx-auto">
            Découvrez nos collections de hijabs et accessoires, et trouvez les pièces qui vous correspondent.
          </p>
          <Link
            to="/boutique"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium text-white hover:bg-gold-dark transition-colors"
          >
            Découvrir la boutique
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-beige/40">
        <div className="container-mg py-3">
          <nav className="flex items-center gap-1.5 text-xs text-brown-light/70">
            <Link to="/" className="hover:text-gold transition-colors">Accueil</Link>
            <ChevronRight size={14} />
            <span className="text-brown">Panier</span>
          </nav>
        </div>
      </div>

      <div className="container-mg py-8 lg:py-12">
        <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-brown mb-8">Mon Panier</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.colorId}`}
                className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm"
              >
                <Link to={`/produit/${item.slug}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl object-cover"
                  />
                </Link>

                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link to={`/produit/${item.slug}`}>
                      <h3 className="font-serif text-lg text-brown hover:text-gold transition-colors leading-tight">
                        {item.name}
                      </h3>
                    </Link>
                    <button
                      onClick={() => removeFromCart(item.productId, item.colorId)}
                      className="flex-shrink-0 text-brown-light/50 hover:text-rose-dark transition-colors p-1"
                      aria-label="Supprimer du panier"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <p className="text-sm text-brown-light/70 mt-1">Couleur: {item.colorName}</p>
                  <p className="text-sm font-medium text-brown mt-1">{formatPrice(item.price)}</p>

                  <div className="flex items-center justify-between mt-auto pt-3">
                    <div className="flex items-center border border-beige-dark/30 rounded-full">
                      <button
                        onClick={() => updateQuantity(item.productId, item.colorId, item.quantity - 1)}
                        className="flex h-9 w-9 items-center justify-center text-brown hover:text-gold transition-colors"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center text-sm font-medium text-brown">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.colorId, item.quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center text-brown hover:text-gold transition-colors"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="text-sm font-medium text-brown">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-2">
              <Link
                to="/boutique"
                className="text-sm text-gold hover:text-gold-dark transition-colors"
              >
                ← Continuer mes achats
              </Link>
              <button
                onClick={clearCart}
                className="text-sm text-brown-light/60 hover:text-rose-dark transition-colors"
              >
                Vider le panier
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-serif text-xl text-brown mb-4">Récapitulatif</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-brown-light">
                  <span>Sous-total ({items.length} article{items.length > 1 ? 's' : ''})</span>
                  <span className="font-medium text-brown">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-brown-light">
                  <span>Livraison</span>
                  <span>Calculée à l'étape suivante</span>
                </div>
              </div>

              <div className="border-t border-beige/50 mt-4 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-serif text-lg text-brown">Total</span>
                  <span className="font-serif text-2xl text-brown">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <Link
                to="/commande"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 text-sm font-medium text-white hover:bg-gold-dark transition-colors"
              >
                Passer la commande
                <ArrowRight size={18} />
              </Link>

              <p className="mt-3 text-xs text-brown-light/60 text-center">
                Paiement cash à la livraison disponible
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
