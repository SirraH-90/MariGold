import { Link } from 'react-router-dom';
import { Gem, Heart, Sparkles, Leaf, ArrowRight, Quote } from 'lucide-react';
import { BRAND } from '@/data/store';
import { testimonials } from '@/data/store';
import { StarRating } from '@/components/ui/StarRating';

const values = [
  { icon: Gem, title: 'Qualité sans compromis', text: 'Nous sélectionnons rigoureusement chaque tissu pour sa douceur, sa durabilité et son tombé. Rien n\'est laissé au hasard.' },
  { icon: Heart, title: 'Confort avant tout', text: 'Un hijab se porte des heures durant. Nous concevons des pièces légères, respirantes et agréables sur la peau.' },
  { icon: Sparkles, title: 'Élégance intemporelle', text: 'Nos couleurs et nos designs traversent les modes. Nous créons des pièces que vous garderez des années.' },
  { icon: Leaf, title: 'Respect et responsabilité', text: 'Nous travaillons avec des fournisseurs responsables et limitons notre impact environnemental à chaque étape.' },
];

export function AboutPage() {
  return (
    <div className="bg-ivory">
      {/* Hero */}
      <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/8058054/pexels-photo-8058054.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400"
          alt="MariGold — à propos"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-brown-dark/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-sm font-medium tracking-[0.2em] text-gold-light uppercase mb-3">Notre Histoire</span>
          <h1 className="font-serif text-4xl lg:text-6xl text-ivory font-semibold">MariGold</h1>
          <p className="text-ivory/80 mt-4 max-w-xl text-lg">Plus qu\'une marque de hijabs. Une célébration de la femme.</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="container-mg">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="text-sm font-medium tracking-[0.2em] text-gold uppercase">L'origine</span>
              <h2 className="text-display font-serif font-semibold text-brown mt-3 mb-6">
                Née d'une passion pour la beauté discrète
              </h2>
              <div className="space-y-4 text-brown-light leading-relaxed">
                <p>
                  MariGold est née en Algérie d'une conviction simple et profonde: la modestie
                  n'est pas une contrainte, c'est une élégance. Nous avons voulu créer une marque
                  qui célèbre les femmes qui choisissent le hijab, non par obligation, mais par
                  amour de cette beauté sereine et authentique.
                </p>
                <p>
                  Le nom MariGold s'inspire de la fleur de souci (marigold en anglais), symbole de
                  lumière dorée et de chaleur. Comme cette fleur, nous voulons apporter une touche
                  d'or à votre quotidien, à travers des hijabs qui vous ressemblent.
                </p>
                <p>
                  Chaque pièce de notre collection est pensée, testée et choisie avec soin. Nous
                  travaillons avec des matières nobles — chiffon, jersey, modal, soie — pour vous
                  offrir un confort et une élégance qui durent dans le temps.
                </p>
              </div>
              <Link
                to="/boutique"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-medium text-white hover:bg-gold-dark transition-colors group"
              >
                Découvrir nos collections
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                <img
                  src="https://images.pexels.com/photos/40242003/pexels-photo-40242003.jpeg?auto=compress&cs=tinysrgb&h=900&w=700"
                  alt="Femme en hijab"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden rounded-2xl mt-8">
                <img
                  src="https://images.pexels.com/photos/32091744/pexels-photo-32091744.jpeg?auto=compress&cs=tinysrgb&h=900&w=700"
                  alt="Portrait en hijab"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-brown text-ivory">
        <div className="container-mg">
          <div className="text-center mb-12">
            <span className="text-sm font-medium tracking-[0.2em] text-gold-light uppercase">Nos Valeurs</span>
            <h2 className="text-display font-serif font-semibold text-ivory mt-3">Ce qui nous guide</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold-light mx-auto mb-5">
                  <v.icon size={28} />
                </div>
                <h3 className="font-serif text-xl text-ivory mb-3">{v.title}</h3>
                <p className="text-sm text-ivory/70 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="container-mg">
          <div className="text-center mb-12">
            <span className="text-sm font-medium tracking-[0.2em] text-gold uppercase">Elles nous font confiance</span>
            <h2 className="text-display font-serif font-semibold text-brown mt-3">La parole à nos clientes</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="relative flex flex-col rounded-2xl bg-beige-light/50 p-6">
                <Quote size={28} className="text-gold/30 mb-3" />
                <StarRating rating={t.rating} size={16} className="mb-3" />
                <p className="text-sm text-brown-light leading-relaxed flex-1 italic">« {t.text} »</p>
                <div className="mt-4 pt-4 border-t border-beige-dark/20">
                  <p className="font-serif text-base text-brown">{t.name}</p>
                  <p className="text-xs text-brown-light/60">{t.location}</p>
                </div>
                {t.isDemo && (
                  <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wider text-brown-light/40 bg-beige-light px-2 py-1 rounded-full">
                    Démo
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-beige-light/50">
        <div className="container-mg text-center">
          <h2 className="text-display font-serif font-semibold text-brown mb-4">Rejoignez l'aventure MariGold</h2>
          <p className="text-brown-light mb-8 max-w-xl mx-auto">
            Découvrez des hijabs pensés pour vous, et trouvez celui qui deviendra votre essentiel.
          </p>
          <Link
            to="/boutique"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-medium text-white hover:bg-gold-dark transition-colors"
          >
            Voir la boutique
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
