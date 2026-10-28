import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Check, AlertCircle } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice, isVariantInStock } from '@/utils/helpers';
import { useCart } from '@/context/CartContext';
import { Button } from './Button';
import { ColorSwatch } from './ColorSwatch';
import { StarRating } from './StarRating';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickView({ product, onClose }: QuickViewProps) {
  const { addToCart } = useCart();
  const [selectedColorId, setSelectedColorId] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      const firstInStock = product.colors.find((c) => isVariantInStock(product, c.id));
      setSelectedColorId(firstInStock?.id || product.colors[0]?.id || '');
      setActiveImage(0);
      setAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const inStock = isVariantInStock(product, selectedColorId);

  const handleAdd = () => {
    const color = product.colors.find((c) => c.id === selectedColorId);
    if (!color || !inStock) return;
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      colorId: color.id,
      colorName: color.name,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Aperçu rapide"
    >
      <div className="absolute inset-0 bg-brown-dark/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-auto rounded-[1.5rem] bg-white shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-brown hover:bg-white hover:scale-105 shadow-md transition-all"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          {/* Images */}
          <div className="relative">
            <div className="aspect-square overflow-hidden bg-beige-light">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`h-2 rounded-full transition-all ${i === activeImage ? 'w-7 bg-gold' : 'w-2 bg-white/70'}`}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col p-6 lg:p-7">
            <h2 className="font-serif text-2xl text-brown leading-tight">{product.name}</h2>

            <div className="mt-2 flex items-center gap-2">
              <StarRating rating={product.rating} size={15} showValue />
              <span className="text-sm text-brown-light/55">({product.reviewCount} avis)</span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-serif text-xl text-brown">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-sm text-brown-light/40 line-through">{formatPrice(product.oldPrice)}</span>
              )}
            </div>

            <p className="mt-4 text-sm text-brown-light leading-relaxed line-clamp-3">
              {product.description}
            </p>

            <div className="mt-5">
              <p className="text-sm font-medium text-brown mb-2.5">Couleur</p>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => {
                  const available = isVariantInStock(product, color.id);
                  return (
                    <ColorSwatch
                      key={color.id}
                      color={color}
                      selected={color.id === selectedColorId}
                      disabled={!available}
                      onClick={() => setSelectedColorId(color.id)}
                    />
                  );
                })}
              </div>
              <p className="mt-1.5 text-xs text-brown-light/65">
                {product.colors.find((c) => c.id === selectedColorId)?.name}
              </p>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm">
              {inStock ? (
                <span className="flex items-center gap-1.5 text-green-700">
                  <Check size={16} /> En stock
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-rose-dark">
                  <AlertCircle size={16} /> Rupture de stock
                </span>
              )}
            </div>

            <div className="mt-auto flex gap-3 pt-6">
              <Button onClick={handleAdd} disabled={!inStock} className={`flex-1 ${added ? '!bg-green-700' : ''}`}>
                {added ? <><Check size={18} /> Ajouté !</> : <><ShoppingCart size={18} /> Ajouter</>}
              </Button>
              <Link
                to={`/produit/${product.slug}`}
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gold px-6 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-white"
              >
                Détails
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
