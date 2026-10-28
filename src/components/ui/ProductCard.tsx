import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Check } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice, isVariantInStock } from '@/utils/helpers';
import { useCart } from '@/context/CartContext';
import { StarRating } from './StarRating';
import { ColorSwatch } from './ColorSwatch';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedColorId, setSelectedColorId] = useState(
    product.colors.find((c) => isVariantInStock(product, c.id))?.id || product.colors[0]?.id
  );
  const [added, setAdded] = useState(false);

  const inStock = isVariantInStock(product, selectedColorId);
  const selectedColor = product.colors.find((c) => c.id === selectedColorId);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedColor || !inStock) return;
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      colorId: selectedColor.id,
      colorName: selectedColor.name,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[1.25rem] bg-white transition-all duration-500 hover:shadow-[0_12px_40px_-12px_rgba(69,53,46,0.18)] border border-beige/30 hover:border-gold/30">
      <Link to={`/produit/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-beige-light">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-brown px-3 py-1 text-[11px] font-medium text-ivory tracking-wide">Nouveau</span>
          )}
          {product.oldPrice && (
            <span className="rounded-full bg-rose-dark px-3 py-1 text-[11px] font-medium text-white tracking-wide">
              −{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Quick view button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brown opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 hover:bg-white hover:scale-105"
            aria-label="Aperçu rapide"
          >
            <Eye size={18} />
          </button>
        )}

        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-ivory/50 flex items-center justify-center">
            <span className="rounded-full bg-brown-dark/80 px-4 py-2 text-xs font-medium text-ivory tracking-wide">
              Rupture de stock
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link to={`/produit/${product.slug}`}>
          <h3 className="font-serif text-[1.05rem] lg:text-lg text-brown leading-snug hover:text-gold transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-center gap-1.5">
          <StarRating rating={product.rating} size={13} />
          <span className="text-[11px] text-brown-light/50">({product.reviewCount})</span>
        </div>

        {/* Color swatches */}
        <div className="mt-3 flex items-center gap-1.5">
          {product.colors.slice(0, 5).map((color) => (
            <ColorSwatch
              key={color.id}
              color={color}
              size="sm"
              selected={color.id === selectedColorId}
              disabled={!isVariantInStock(product, color.id)}
              onClick={() => setSelectedColorId(color.id)}
              ariaLabel={color.name}
            />
          ))}
          {product.colors.length > 5 && (
            <span className="text-[11px] text-brown-light/50 ml-0.5">+{product.colors.length - 5}</span>
          )}
        </div>

        <div className="mt-3.5 flex items-baseline gap-2">
          <span className="font-serif text-lg text-brown">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-brown-light/40 line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>

        <div className="mt-auto pt-4">
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition-all duration-300 ${
              added
                ? 'bg-green-700 text-white'
                : inStock
                ? 'border border-gold text-gold hover:bg-gold hover:text-white'
                : 'border border-beige-dark text-beige-dark cursor-not-allowed'
            }`}
          >
            {added ? (
              <><Check size={16} /> Ajouté !</>
            ) : (
              <><ShoppingCart size={16} /> {inStock ? 'Ajouter au panier' : 'Indisponible'}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
