import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingCart, Zap, Check, AlertCircle, Truck, RotateCcw, ChevronRight, Minus, Plus, ZoomIn
} from 'lucide-react';
import { products, collections } from '@/data/store';
import { formatPrice, isVariantInStock, getRelatedProducts } from '@/utils/helpers';
import { useCart } from '@/context/CartContext';
import { StarRating } from '@/components/ui/StarRating';
import { ColorSwatch } from '@/components/ui/ColorSwatch';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';

export function ProductPage() {
  const { slug } = useParams();
  const { addToCart, setIsOpen } = useCart();
  const product = products.find((p) => p.slug === slug);

  const [selectedColorId, setSelectedColorId] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (product) {
      const firstInStock = product.colors.find((c) => isVariantInStock(product, c.id));
      setSelectedColorId(firstInStock?.id || product.colors[0]?.id || '');
      setActiveImage(0);
      setQuantity(1);
      setAdded(false);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container-mg py-20 text-center">
        <h1 className="font-serif text-3xl text-brown mb-4">Produit introuvable</h1>
        <p className="text-brown-light mb-6">Le produit que vous recherchez n'existe pas ou n'est plus disponible.</p>
        <Link to="/boutique" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-white hover:bg-gold-dark transition-colors">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  const inStock = isVariantInStock(product, selectedColorId);
  const selectedColor = product.colors.find((c) => c.id === selectedColorId);
  const related = getRelatedProducts(products, product);
  const collection = collections.find((c) => c.id === product.collectionId);

  const handleAddToCart = () => {
    if (!selectedColor || !inStock) return;
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      colorId: selectedColor.id,
      colorName: selectedColor.name,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    if (!selectedColor || !inStock) return;
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      colorId: selectedColor.id,
      colorName: selectedColor.name,
      quantity,
    });
    window.location.href = '/commande';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="bg-ivory">
      {/* Breadcrumb */}
      <div className="border-b border-beige/40">
        <div className="container-mg py-3">
          <nav className="flex items-center gap-1.5 text-xs text-brown-light/70">
            <Link to="/" className="hover:text-gold transition-colors">Accueil</Link>
            <ChevronRight size={14} />
            <Link to="/boutique" className="hover:text-gold transition-colors">Boutique</Link>
            {collection && (
              <>
                <ChevronRight size={14} />
                <Link to={`/boutique?collection=${collection.id}`} className="hover:text-gold transition-colors">{collection.name}</Link>
              </>
            )}
            <ChevronRight size={14} />
            <span className="text-brown truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-mg py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex lg:flex-col gap-2 lg:gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-shrink-0 w-16 h-20 lg:w-20 lg:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      i === activeImage ? 'border-gold' : 'border-beige-dark/20 hover:border-gold/50'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div
              className="relative flex-1 overflow-hidden rounded-2xl bg-beige-light cursor-zoom-in group"
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <div className="aspect-[4/5] relative">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-200"
                  style={zoomed ? { transform: `scale(2)`, transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
                />
                {!zoomed && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs text-brown opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={14} /> Survolez pour zoomer
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {collection && (
              <Link to={`/boutique?collection=${collection.id}`} className="text-sm font-medium tracking-wide text-gold uppercase hover:text-gold-dark transition-colors mb-2">
                {collection.name}
              </Link>
            )}

            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-brown leading-tight">{product.name}</h1>

            <div className="mt-3 flex items-center gap-3">
              <StarRating rating={product.rating} size={18} showValue />
              <span className="text-sm text-brown-light/60">({product.reviewCount} avis)</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-serif text-3xl text-brown">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-lg text-brown-light/50 line-through">{formatPrice(product.oldPrice)}</span>
              )}
            </div>

            <p className="mt-5 text-brown-light leading-relaxed">{product.description}</p>

            {/* Colors */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-brown">Couleur: <span className="text-brown-light">{selectedColor?.name}</span></p>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color) => (
                  <ColorSwatch
                    key={color.id}
                    color={color}
                    size="lg"
                    selected={color.id === selectedColorId}
                    disabled={!isVariantInStock(product, color.id)}
                    onClick={() => setSelectedColorId(color.id)}
                  />
                ))}
              </div>
            </div>

            {/* Stock status */}
            <div className="mt-4 flex items-center gap-2 text-sm">
              {inStock ? (
                <span className="flex items-center gap-1.5 text-green-700">
                  <Check size={18} /> En stock — prêt à être expédié
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-rose-dark">
                  <AlertCircle size={18} /> Rupture de stock pour cette couleur
                </span>
              )}
            </div>

            {/* Quantity + Add to cart */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center border border-beige-dark/30 rounded-full">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-12 items-center justify-center text-brown hover:text-gold transition-colors"
                  aria-label="Diminuer la quantité"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-medium text-brown">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-12 w-12 items-center justify-center text-brown hover:text-gold transition-colors"
                  aria-label="Augmenter la quantité"
                >
                  <Plus size={18} />
                </button>
              </div>
              <Button onClick={handleAddToCart} disabled={!inStock} size="lg" className="flex-1">
                {added ? <><Check size={20} /> Ajouté au panier !</> : <><ShoppingCart size={20} /> Ajouter au panier</>}
              </Button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={!inStock}
              className="mt-3 flex items-center justify-center gap-2 rounded-full border border-brown py-4 text-base font-medium text-brown hover:bg-brown hover:text-ivory transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap size={20} /> Acheter maintenant
            </button>

            {/* Details accordion */}
            <div className="mt-8 space-y-4 border-t border-beige/50 pt-6">
              <div>
                <h3 className="font-serif text-base text-brown mb-1">Matière & Composition</h3>
                <p className="text-sm text-brown-light">{product.fabric}</p>
              </div>
              <div>
                <h3 className="font-serif text-base text-brown mb-1">Dimensions</h3>
                <p className="text-sm text-brown-light">{product.dimensions}</p>
              </div>
              <div>
                <h3 className="font-serif text-base text-brown mb-1">Entretien</h3>
                <p className="text-sm text-brown-light">{product.care}</p>
              </div>
            </div>

            {/* Delivery info */}
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 rounded-xl bg-beige-light/60 p-4">
                <Truck size={20} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-brown">Livraison en Algérie</p>
                  <p className="text-xs text-brown-light mt-0.5">3 à 7 jours selon la wilaya. Cash à la livraison.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-beige-light/60 p-4">
                <RotateCcw size={20} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-brown">Retours sous 7 jours</p>
                  <p className="text-xs text-brown-light mt-0.5">Échange ou retour sur produit non utilisé.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="font-serif text-2xl lg:text-3xl text-brown mb-8 text-center">Vous aimerez aussi</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
