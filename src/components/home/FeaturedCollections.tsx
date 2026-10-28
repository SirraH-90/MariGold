import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/data/store';

export function FeaturedCollections() {
  return (
    <section className="py-16 lg:py-28 bg-ivory">
      <div className="container-mg">
        <div className="text-center mb-12 lg:mb-16">
          <p className="eyebrow">Nos Collections</p>
          <h2 className="text-display font-serif font-semibold text-brown mt-3">
            Trouvez votre style
          </h2>
          <p className="text-brown-light mt-3 max-w-lg mx-auto leading-relaxed">
            Chaque collection est pensée pour un moment, une émotion, une vous.
          </p>
        </div>

        {/* First row: large + small */}
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 mb-4 sm:mb-5">
          <Link
            to={`/boutique?collection=${collections[0].id}`}
            className="group relative overflow-hidden rounded-[1.25rem] lg:col-span-2 aspect-[16/10] lg:aspect-[16/9]"
          >
            <img
              src={collections[0].image}
              alt={collections[0].name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/70 via-brown-dark/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-8">
              <h3 className="font-serif text-2xl lg:text-3xl text-ivory mb-1.5">{collections[0].name}</h3>
              <p className="text-sm text-ivory/75 line-clamp-1 mb-3 max-w-md">{collections[0].description}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-light group-hover:gap-3 transition-all duration-300">
                Explorer la collection <ArrowRight size={16} />
              </span>
            </div>
          </Link>

          <Link
            to={`/boutique?collection=${collections[1].id}`}
            className="group relative overflow-hidden rounded-[1.25rem] aspect-[16/10] lg:aspect-auto"
          >
            <img
              src={collections[1].image}
              alt={collections[1].name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/70 via-brown-dark/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6">
              <h3 className="font-serif text-xl lg:text-2xl text-ivory mb-1.5">{collections[1].name}</h3>
              <p className="text-xs text-ivory/75 line-clamp-1 mb-3">{collections[1].description}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-light group-hover:gap-3 transition-all duration-300">
                Explorer <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        </div>

        {/* Second row: three equal cards */}
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
          {collections.slice(2).map((collection) => (
            <Link
              key={collection.id}
              to={`/boutique?collection=${collection.id}`}
              className="group relative overflow-hidden rounded-[1.25rem] aspect-[4/5]"
            >
              <img
                src={collection.image}
                alt={collection.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/70 via-brown-dark/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6">
                <h3 className="font-serif text-xl lg:text-2xl text-ivory mb-1.5">{collection.name}</h3>
                <p className="text-xs text-ivory/75 line-clamp-1 mb-3">{collection.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-light group-hover:gap-3 transition-all duration-300">
                  Explorer la collection <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
