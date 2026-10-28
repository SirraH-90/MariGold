import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/store';
import type { Product } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';
import { QuickView } from '@/components/ui/QuickView';

export function BestSellers() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const bestSellers = products.filter((p) => p.isBestseller).slice(0, 6);

  return (
    <section className="py-16 lg:py-28 bg-beige-light/40">
      <div className="container-mg">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 lg:mb-14 gap-4">
          <div>
            <p className="eyebrow">Les préférées</p>
            <h2 className="text-display font-serif font-semibold text-brown mt-3">
              Nos best-sellers
            </h2>
            <p className="text-brown-light mt-2 text-sm">Les pièces les plus aimées par nos clientes.</p>
          </div>
          <Link
            to="/boutique"
            className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark transition-colors group"
          >
            Voir tout
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      </div>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
}
