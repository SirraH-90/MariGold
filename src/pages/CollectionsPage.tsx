import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { collections, products } from '@/data/store';
import { formatPrice } from '@/utils/helpers';

export function CollectionsPage() {
  const { slug } = useParams();
  const activeCollection = slug ? collections.find((c) => c.slug === slug) : null;

  if (activeCollection) {
    const collectionProducts = products.filter((p) => p.collectionId === activeCollection.id);

    return (
      <div className="bg-ivory min-h-screen">
        <div className="relative h-[300px] lg:h-[400px] overflow-hidden">
          <img src={activeCollection.image} alt={activeCollection.name} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-brown-dark/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="font-serif text-3xl lg:text-5xl text-ivory font-semibold">{activeCollection.name}</h1>
            <p className="text-ivory/80 mt-3 max-w-lg">{activeCollection.description}</p>
          </div>
        </div>

        <div className="container-mg py-10">
          <Link to="/collections" className="text-sm text-gold hover:text-gold-dark transition-colors mb-6 inline-block">
            ← Toutes les collections
          </Link>

          {collectionProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-brown-light">Aucun produit dans cette collection pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {collectionProducts.map((product) => (
                <Link key={product.id} to={`/produit/${product.slug}`} className="group">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-beige-light">
                    <img src={product.images[0]} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h3 className="font-serif text-lg text-brown mt-3 group-hover:text-gold transition-colors">{product.name}</h3>
                  <p className="text-sm text-brown-light">{formatPrice(product.price)}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-beige-light/50 py-10 lg:py-14">
        <div className="container-mg text-center">
          <span className="text-sm font-medium tracking-[0.2em] text-gold uppercase">Collections</span>
          <h1 className="text-display font-serif font-semibold text-brown mt-2">Nos Collections</h1>
          <p className="text-brown-light mt-2 max-w-xl mx-auto">Explorez nos univers, du quotidien aux occasions les plus précieuses.</p>
        </div>
      </div>

      <div className="container-mg py-10 lg:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {collections.map((collection) => {
            const count = products.filter((p) => p.collectionId === collection.id).length;
            return (
              <Link
                key={collection.id}
                to={`/collections/${collection.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[16/10]"
              >
                <img src={collection.image} alt={collection.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/70 via-brown-dark/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  <h2 className="font-serif text-2xl lg:text-3xl text-ivory mb-2">{collection.name}</h2>
                  <p className="text-ivory/80 text-sm mb-3 max-w-md">{collection.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-gold-light group-hover:gap-3 transition-all">
                    {count} produit{count > 1 ? 's' : ''} <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
