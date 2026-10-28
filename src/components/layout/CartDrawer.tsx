import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, cartTotal } from '@/utils/helpers';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  const total = cartTotal(items);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-brown-dark/50 backdrop-blur-sm animate-fade-in" onClick={() => setIsOpen(false)} />

      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-ivory shadow-2xl flex flex-col animate-slide-down">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-beige/40 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={22} className="text-gold" />
            <h2 className="font-serif text-xl text-brown">Panier ({items.length})</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-brown hover:text-gold transition-colors" aria-label="Fermer">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-beige-light flex items-center justify-center mb-5">
              <ShoppingBag size={32} className="text-beige-dark" />
            </div>
            <h3 className="font-serif text-xl text-brown mb-2">Votre panier est vide</h3>
            <p className="text-sm text-brown-light/65 mb-6 max-w-xs">Découvrez nos collections et trouvez le hijab parfait pour vous.</p>
            <Link
              to="/boutique"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-medium text-white hover:bg-gold-dark transition-colors"
            >
              Découvrir la boutique
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map((item) => (
                <div key={`${item.productId}-${item.colorId}`} className="flex gap-3 bg-white rounded-xl p-3 border border-beige/25">
                  <Link to={`/produit/${item.slug}`} onClick={() => setIsOpen(false)} className="flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-20 h-24 rounded-lg object-cover" />
                  </Link>
                  <div className="flex flex-col flex-1 min-w-0">
                    <Link to={`/produit/${item.slug}`} onClick={() => setIsOpen(false)}>
                      <h3 className="font-serif text-[0.95rem] text-brown hover:text-gold transition-colors leading-tight line-clamp-2">{item.name}</h3>
                    </Link>
                    <p className="text-xs text-brown-light/60 mt-0.5">Couleur: {item.colorName}</p>
                    <p className="text-sm font-medium text-brown mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center gap-1 border border-beige-dark/25 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.productId, item.colorId, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center text-brown hover:text-gold transition-colors"
                          aria-label="Diminuer"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-brown">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.colorId, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center text-brown hover:text-gold transition-colors"
                          aria-label="Augmenter"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId, item.colorId)}
                        className="text-brown-light/50 hover:text-rose-dark transition-colors"
                        aria-label="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-beige/40 px-5 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-brown-light">Sous-total</span>
                <span className="font-serif text-xl text-brown">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-brown-light/55">Livraison calculée à l'étape de paiement.</p>
              <Link
                to="/commande"
                onClick={() => setIsOpen(false)}
                className="block w-full rounded-full bg-gold py-3.5 text-center text-sm font-medium text-white hover:bg-gold-dark transition-colors"
              >
                Passer la commande
              </Link>
              <Link
                to="/panier"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center text-sm text-gold hover:text-gold-dark transition-colors"
              >
                Voir le panier
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
