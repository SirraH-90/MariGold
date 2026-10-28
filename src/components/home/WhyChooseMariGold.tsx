import { Gem, Heart, Sparkles, Gift } from 'lucide-react';

const benefits = [
  { icon: Gem, title: 'Qualité Premium', description: 'Des tissus soigneusement sélectionnés pour leur douceur, leur résistance et leur tombé impeccable.' },
  { icon: Heart, title: 'Confort Tout au Long du Jour', description: 'Des matières légères et respirantes qui vous accompagnent du matin au soir sans contrainte.' },
  { icon: Sparkles, title: 'Élégance Intemporelle', description: 'Des couleurs et des designs pensés pour traverser les saisons et sublimer chaque tenue.' },
  { icon: Gift, title: 'Emballage Soigné', description: 'Chaque commande est préparée avec amour et présentée dans un emballage élégant et durable.' },
];

export function WhyChooseMariGold() {
  return (
    <section className="py-16 lg:py-28 bg-brown text-ivory">
      <div className="container-mg">
        <div className="text-center mb-12 lg:mb-16">
          <p className="eyebrow-light">Nos Engagements</p>
          <h2 className="text-display font-serif font-semibold text-ivory mt-3">
            Pourquoi choisir MariGold ?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group flex flex-col items-center text-center p-6 lg:p-8 rounded-[1.25rem] bg-ivory/[0.04] hover:bg-ivory/[0.08] transition-all duration-400 border border-ivory/5 hover:border-gold/20"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold-light mb-5 group-hover:bg-gold group-hover:text-brown transition-all duration-400">
                <benefit.icon size={28} />
              </div>
              <h3 className="font-serif text-xl text-ivory mb-3">{benefit.title}</h3>
              <p className="text-sm text-ivory/65 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
