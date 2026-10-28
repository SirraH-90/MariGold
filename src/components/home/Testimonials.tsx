import { Quote } from 'lucide-react';
import { testimonials } from '@/data/store';
import { StarRating } from '@/components/ui/StarRating';

export function Testimonials() {
  return (
    <section className="py-16 lg:py-28 bg-beige-light/40">
      <div className="container-mg">
        <div className="text-center mb-12 lg:mb-16">
          <p className="eyebrow">Témoignages</p>
          <h2 className="text-display font-serif font-semibold text-brown mt-3">
            Elles parlent de MariGold
          </h2>
          <p className="text-brown-light mt-3 max-w-lg mx-auto">
            Les avis de nos clientes sont notre plus belle récompense.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative flex flex-col rounded-[1.25rem] bg-white p-6 lg:p-7 border border-beige/30 hover:shadow-[0_8px_30px_-12px_rgba(69,53,46,0.12)] transition-shadow duration-300"
            >
              <Quote size={30} className="text-gold/25 mb-4" />

              <StarRating rating={testimonial.rating} size={15} className="mb-3" />

              <p className="text-sm text-brown-light leading-relaxed flex-1 italic">
                « {testimonial.text} »
              </p>

              <div className="mt-5 pt-4 border-t border-beige/40">
                <p className="font-serif text-base text-brown">{testimonial.name}</p>
                <p className="text-xs text-brown-light/55">{testimonial.location}</p>
              </div>

              {testimonial.isDemo && (
                <span className="absolute top-5 right-5 text-[9px] uppercase tracking-wider text-brown-light/35 bg-beige-light px-2 py-1 rounded-full">
                  Démo
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
