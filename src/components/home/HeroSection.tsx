import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/40242003/pexels-photo-40242003.jpeg?auto=compress&cs=tinysrgb&h=1400&w=1200"
          alt="Femme portant un hijab élégant MariGold"
          className="h-full w-full object-cover object-[center_25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/70 via-brown-dark/15 to-brown-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full pb-12 pt-28 sm:pb-16 lg:pb-24">
        <div className="container-mg">
          <div className="max-w-2xl animate-fade-in-up">
            <p className="eyebrow-light mb-5 text-gold-light">
              Modest Fashion — Algérie
            </p>
            <h1 className="text-hero font-serif font-semibold text-ivory leading-[1.02] mb-6">
              L'élégance<br />dans chaque pli.
            </h1>
            <p className="text-lg lg:text-xl text-ivory/85 leading-relaxed mb-10 max-w-md font-light">
              Découvrez des hijabs qui célèbrent votre beauté, votre confort et votre individualité.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/boutique"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-medium text-white hover:bg-gold-dark transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                Voir la collection
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/a-propos"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/40 bg-ivory/5 backdrop-blur-sm px-8 py-4 text-base font-medium text-ivory hover:bg-ivory hover:text-brown transition-all duration-300"
              >
                Découvrir MariGold
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-fade-in">
        <span className="text-xs text-ivory/50 tracking-widest uppercase">Défiler</span>
        <div className="w-px h-10 bg-gradient-to-b from-ivory/50 to-transparent" />
      </div>
    </section>
  );
}
