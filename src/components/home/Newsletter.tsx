import { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Veuillez saisir votre adresse email.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Veuillez saisir une adresse email valide.');
      return;
    }

    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-16 lg:py-24 bg-ivory">
      <div className="container-mg">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-beige via-beige-light to-beige-dark/25 px-6 py-14 lg:px-16 lg:py-20">
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gold/8" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-rose/8" />

          <div className="relative max-w-lg mx-auto text-center">
            <div className="flex justify-center mb-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Mail size={26} />
              </div>
            </div>
            <p className="eyebrow mb-3">Newsletter</p>
            <h2 className="text-display font-serif font-semibold text-brown mb-4">
              Un petit clin d'or<br />dans votre boîte mail.
            </h2>
            <p className="text-brown-light mb-8 leading-relaxed">
              Abonnez-vous pour découvrir nos nouvelles collections, des inspirations de style et des offres exclusives.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-2 rounded-full bg-green-50 text-green-700 px-6 py-4 animate-scale-in">
                <Check size={20} />
                <span className="font-medium">Merci ! Vous êtes bien inscrite.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="flex-1 rounded-full border border-beige-dark/40 bg-white px-5 py-3.5 text-sm text-brown placeholder:text-brown-light/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
                  aria-label="Adresse email"
                />
                <button
                  type="submit"
                  className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-white hover:bg-gold-dark transition-colors whitespace-nowrap"
                >
                  S'abonner
                </button>
              </form>
            )}
            {error && <p className="mt-3 text-sm text-rose-dark">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
