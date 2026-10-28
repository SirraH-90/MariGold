import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search, PackageSearch } from 'lucide-react';
import { products, collections } from '@/data/store';
import type { Product } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';
import { QuickView } from '@/components/ui/QuickView';

const fabricCategories = ['Chiffon', 'Jersey', 'Modal', 'Satin', 'Soie', 'Coton', 'Lin', 'Polyester', 'Bambou', 'Métal'];
const allColors = [
  { id: 'ivory', name: 'Ivoire', hex: '#FFF9F2' },
  { id: 'beige', name: 'Beige', hex: '#E8D8C3' },
  { id: 'gold', name: 'Or', hex: '#C6A15B' },
  { id: 'rose', name: 'Rose Poussière', hex: '#D8B4AE' },
  { id: 'brown', name: 'Marron', hex: '#45352E' },
  { id: 'black', name: 'Noir', hex: '#2D231E' },
  { id: 'navy', name: 'Bleu Marine', hex: '#2A3A4A' },
  { id: 'sage', name: 'Vert Sauge', hex: '#9BA89A' },
  { id: 'mocha', name: 'Mocha', hex: '#A08068' },
  { id: 'champagne', name: 'Champagne', hex: '#E8D5B0' },
  { id: 'white', name: 'Blanc', hex: '#FCFCFC' },
];

type SortOption = 'popularity' | 'newest' | 'price-asc' | 'price-desc';

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  const searchQuery = searchParams.get('q') || '';
  const selectedCollection = searchParams.get('collection') || '';
  const sortOption = (searchParams.get('sort') as SortOption) || 'popularity';
  const selectedFabrics = searchParams.get('fabrics')?.split(',').filter(Boolean) || [];
  const selectedColors = searchParams.get('colors')?.split(',').filter(Boolean) || [];
  const maxPrice = Number(searchParams.get('maxPrice')) || 6000;
  const inStockOnly = searchParams.get('inStock') === 'true';

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
    setVisibleCount(9);
  };

  const toggleArrayParam = (key: string, value: string) => {
    const current = searchParams.get(key)?.split(',').filter(Boolean) || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateParam(key, next.join(','));
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabricCategory.toLowerCase().includes(q) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q))
      );
    }

    if (selectedCollection) {
      result = result.filter((p) => p.collectionId === selectedCollection);
    }

    if (selectedFabrics.length > 0) {
      result = result.filter((p) => selectedFabrics.includes(p.fabricCategory));
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => selectedColors.includes(c.id)));
    }

    if (maxPrice < 6000) {
      result = result.filter((p) => p.price <= maxPrice);
    }

    if (inStockOnly) {
      result = result.filter((p) => p.variants.some((v) => v.inStock));
    }

    switch (sortOption) {
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort((a, b) => b.popularity - a.popularity);
    }

    return result;
  }, [searchQuery, selectedCollection, selectedFabrics, selectedColors, maxPrice, inStockOnly, sortOption]);

  useEffect(() => {
    setVisibleCount(9);
  }, [searchQuery, selectedCollection, sortOption]);

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasActiveFilters = selectedFabrics.length > 0 || selectedColors.length > 0 || maxPrice < 6000 || inStockOnly || selectedCollection || searchQuery;

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Collections */}
      <div>
        <h3 className="font-serif text-lg text-brown mb-3">Collections</h3>
        <div className="space-y-2">
          <button
            onClick={() => updateParam('collection', '')}
            className={`block w-full text-left text-sm py-1.5 transition-colors ${!selectedCollection ? 'text-gold font-medium' : 'text-brown-light hover:text-brown'}`}
          >
            Toutes les collections
          </button>
          {collections.map((c) => (
            <button
              key={c.id}
              onClick={() => updateParam('collection', c.id)}
              className={`block w-full text-left text-sm py-1.5 transition-colors ${selectedCollection === c.id ? 'text-gold font-medium' : 'text-brown-light hover:text-brown'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-serif text-lg text-brown mb-3">Prix maximum</h3>
        <input
          type="range"
          min="500"
          max="6000"
          step="100"
          value={maxPrice}
          onChange={(e) => updateParam('maxPrice', e.target.value)}
          className="w-full accent-gold"
        />
        <div className="flex justify-between text-xs text-brown-light mt-1">
          <span>500 DZD</span>
          <span className="font-medium text-brown">{maxPrice} DZD</span>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-serif text-lg text-brown mb-3">Couleurs</h3>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => (
            <button
              key={color.id}
              onClick={() => toggleArrayParam('colors', color.id)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs border transition-all ${
                selectedColors.includes(color.id)
                  ? 'border-gold bg-gold/10 text-brown'
                  : 'border-beige-dark/30 text-brown-light hover:border-gold/50'
              }`}
            >
              <span className="w-3 h-3 rounded-full border border-beige-dark/20" style={{ backgroundColor: color.hex }} />
              {color.name}
            </button>
          ))}
        </div>
      </div>

      {/* Fabric */}
      <div>
        <h3 className="font-serif text-lg text-brown mb-3">Matière</h3>
        <div className="space-y-1.5">
          {fabricCategories.map((fabric) => {
            const count = products.filter((p) => p.fabricCategory === fabric).length;
            if (count === 0) return null;
            return (
              <label key={fabric} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedFabrics.includes(fabric)}
                  onChange={() => toggleArrayParam('fabrics', fabric)}
                  className="w-4 h-4 rounded accent-gold"
                />
                <span className={`text-sm ${selectedFabrics.includes(fabric) ? 'text-gold font-medium' : 'text-brown-light group-hover:text-brown'}`}>
                  {fabric} ({count})
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-serif text-lg text-brown mb-3">Disponibilité</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => updateParam('inStock', e.target.checked ? 'true' : '')}
            className="w-4 h-4 rounded accent-gold"
          />
          <span className="text-sm text-brown-light">En stock uniquement</span>
        </label>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="flex items-center gap-1.5 text-sm text-rose-dark hover:text-rose-dark/80 transition-colors"
        >
          <X size={16} /> Effacer tous les filtres
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-ivory min-h-screen">
      {/* Page header */}
      <div className="bg-beige-light/40 py-12 lg:py-16 border-b border-beige/30">
        <div className="container-mg text-center">
          <p className="eyebrow">Boutique</p>
          <h1 className="text-display font-serif font-semibold text-brown mt-3">
            {selectedCollection
              ? collections.find((c) => c.id === selectedCollection)?.name
              : 'Nos Hijabs & Accessoires'}
          </h1>
          <p className="text-brown-light mt-3 max-w-xl mx-auto leading-relaxed">
            {searchQuery ? `Résultats pour « ${searchQuery} »` : 'Explorez notre collection complète de hijabs et accessoires.'}
          </p>
        </div>
      </div>

      <div className="container-mg py-8">
        {/* Search + sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-light/50" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => updateParam('q', e.target.value)}
              placeholder="Rechercher..."
              className="w-full rounded-full border border-beige bg-white pl-11 pr-4 py-3 text-sm text-brown placeholder:text-brown-light/50 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <select
            value={sortOption}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="rounded-full border border-beige bg-white px-4 py-3 text-sm text-brown focus:outline-none focus:border-gold transition-colors cursor-pointer"
          >
            <option value="popularity">Tri: Popularité</option>
            <option value="newest">Tri: Nouveautés</option>
            <option value="price-asc">Tri: Prix croissant</option>
            <option value="price-desc">Tri: Prix décroissant</option>
          </select>
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden flex items-center justify-center gap-2 rounded-full border border-beige bg-white px-4 py-3 text-sm text-brown"
          >
            <SlidersHorizontal size={18} /> Filtres
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <FilterContent />
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-brown-light mb-4">
              {filtered.length} produit{filtered.length > 1 ? 's' : ''}
            </p>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <PackageSearch size={48} className="text-beige-dark mb-4" />
                <h3 className="font-serif text-2xl text-brown mb-2">Aucun produit trouvé</h3>
                <p className="text-brown-light/70 mb-6">Essayez de modifier vos filtres ou votre recherche.</p>
                <button
                  onClick={clearAllFilters}
                  className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-white hover:bg-gold-dark transition-colors"
                >
                  Réinitialiser
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
                  ))}
                </div>

                {visibleCount < filtered.length && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="inline-flex items-center justify-center rounded-full border border-gold px-8 py-3.5 text-sm font-medium text-gold hover:bg-gold hover:text-white transition-colors"
                    >
                      Voir plus de produits
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-brown-dark/50 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85%] bg-ivory shadow-2xl overflow-y-auto animate-slide-down">
            <div className="flex items-center justify-between border-b border-beige/50 px-5 py-4 sticky top-0 bg-ivory z-10">
              <h2 className="font-serif text-xl text-brown">Filtres</h2>
              <button onClick={() => setShowFilters(false)} className="text-brown hover:text-gold" aria-label="Fermer">
                <X size={24} />
              </button>
            </div>
            <div className="p-5">
              <FilterContent />
            </div>
            <div className="p-5 border-t border-beige/50">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full rounded-full bg-gold py-3 text-sm font-medium text-white hover:bg-gold-dark transition-colors"
              >
                Voir {filtered.length} produits
              </button>
            </div>
          </div>
        </div>
      )}

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
