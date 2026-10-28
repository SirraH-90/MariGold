import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function BrandStory() {
  return (
    <section className="py-16 lg:py-28 bg-ivory overflow-hidden">
      <div className="container-mg">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden rounded-[1.25rem]">
                <img
                  src="https://images.pexels.com/photos/8058054/pexels-photo-8058054.jpeg?auto=compress&cs=tinysrgb&h=900&w=700"
                  alt="Femme portant un hijab MariGold"
                  loading="lazy"
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-[900ms] ease-out"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden rounded-[1.25rem] mt-8 lg:mt-12">
                <img
                  src="https://images.pexels.com/photos/8063385/pexels-photo-8063385.jpeg?auto=compress&cs=tinysrgb&h=900&w=700"
                  alt="Détail d'un hijab MariGold"
                  loading="lazy"
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-[900ms] ease-out"
                />
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute top-0 right-0 lg:right-8 flex items-center gap-2.5 rounded-full bg-white px-5 py-3 shadow-[0_8px_30px_-8px_rgba(69,53,46,0.25)]">
              <span className="font-serif text-2xl text-gold font-semibold">100%</span>
              <span className="text-[11px] text-brown-light leading-tight tracking-wide uppercase">Tissus<br />premium</span>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="eyebrow">Notre Histoire</p>
            <h2 className="text-display font-serif font-semibold text-brown mt-3 mb-6">
              Plus qu'un hijab.<br />Un ressenti.
            </h2>
            <div className="space-y-4 text-brown-light leading-[1.8]">
              <p>
                MariGold est née d'une conviction simple: la modestie n'est pas une contrainte,
                c'est une élégance. Chaque hijab que nous créons est pensé pour vous accompagner
                dans tous les moments de votre vie, du matin au soir, avec une douceur et un confort
                qui ne font jamais de compromis.
              </p>
              <p>
                Nous sélectionnons les plus belles matières, testons chaque tissu pour sa résistance
                et sa douceur, et choisissons des couleurs qui subliment tous les teints. Parce que
                mériter votre confiance commence par la qualité de ce que nous vous offrons.
              </p>
              <p>
                Au-delà du tissu, MariGold célèbre la confiance en soi, la sérénité et la beauté
                d'être authentiquement soi. C'est notre promesse, pli après pli.
              </p>
            </div>
            <Link
              to="/a-propos"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-gold px-8 py-4 text-base font-medium text-gold hover:bg-gold hover:text-white transition-all duration-300 group"
            >
              Notre histoire
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
