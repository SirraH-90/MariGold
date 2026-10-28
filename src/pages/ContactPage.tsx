import { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, MessageCircle, ChevronDown, Send, Check } from 'lucide-react';
import { BRAND, faqs } from '@/data/store';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const validate = (): boolean => {
    const next: Partial<Record<string, string>> = {};
    if (!form.name.trim()) next.name = 'Veuillez saisir votre nom.';
    if (!form.email.trim()) {
      next.email = 'Veuillez saisir votre email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Adresse email invalide.';
    }
    if (!form.subject.trim()) next.subject = 'Veuillez saisir un sujet.';
    if (!form.message.trim()) {
      next.message = 'Veuillez saisir votre message.';
    } else if (form.message.trim().length < 10) {
      next.message = 'Votre message est trop court.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  const inputClass = (key: string) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-brown placeholder:text-brown-light/50 focus:outline-none transition-colors ${
      errors[key] ? 'border-rose-dark focus:border-rose-dark' : 'border-beige focus:border-gold'
    }`;

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <div className="bg-beige-light/50 py-12 lg:py-16">
        <div className="container-mg text-center">
          <span className="text-sm font-medium tracking-[0.2em] text-gold uppercase">Contact</span>
          <h1 className="text-display font-serif font-semibold text-brown mt-2">Parlons ensemble</h1>
          <p className="text-brown-light mt-3 max-w-xl mx-auto">
            Une question, un conseil de style, ou simplement envie d'échanger ? Nous sommes à votre écoute.
          </p>
        </div>
      </div>

      <div className="container-mg py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact info + actions */}
          <div>
            <h2 className="font-serif text-2xl text-brown mb-6">Nos coordonnées</h2>

            <div className="space-y-4 mb-8">
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-beige-light text-gold group-hover:bg-gold group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-brown-light">Email</p>
                  <p className="text-sm font-medium text-brown group-hover:text-gold transition-colors">{BRAND.email}</p>
                </div>
              </a>
              <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-beige-light text-gold group-hover:bg-gold group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-brown-light">Téléphone</p>
                  <p className="text-sm font-medium text-brown group-hover:text-gold transition-colors">{BRAND.phone}</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-beige-light text-gold">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-brown-light">Adresse</p>
                  <p className="text-sm font-medium text-brown">{BRAND.address}</p>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <h3 className="font-serif text-lg text-brown mb-4">Contact rapide</h3>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${BRAND.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 transition-colors"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold px-6 py-3 text-sm font-medium text-gold hover:bg-gold hover:text-white transition-colors"
              >
                <Instagram size={18} />
                {BRAND.instagramHandle}
              </a>
            </div>

            {/* FAQs */}
            <div className="mt-12">
              <h3 className="font-serif text-2xl text-brown mb-4">Questions fréquentes</h3>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="rounded-xl bg-white border border-beige/50 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between gap-2 px-5 py-4 text-left"
                      aria-expanded={openFaq === i}
                    >
                      <span className="text-sm font-medium text-brown">{faq.q}</span>
                      <ChevronDown
                        size={18}
                        className={`flex-shrink-0 text-gold transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 text-sm text-brown-light leading-relaxed animate-slide-down">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
              <h2 className="font-serif text-2xl text-brown mb-6">Envoyez-nous un message</h2>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                    <Check size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-serif text-xl text-brown mb-2">Message envoyé !</h3>
                  <p className="text-sm text-brown-light">Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brown mb-1.5">Nom complet *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: undefined }); }}
                      placeholder="Votre nom"
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="mt-1 text-xs text-rose-dark">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown mb-1.5">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: undefined }); }}
                      placeholder="votre@email.com"
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-dark">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown mb-1.5">Sujet *</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => { setForm({ ...form, subject: e.target.value }); if (errors.subject) setErrors({ ...errors, subject: undefined }); }}
                      placeholder="Objet de votre message"
                      className={inputClass('subject')}
                    />
                    {errors.subject && <p className="mt-1 text-xs text-rose-dark">{errors.subject}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown mb-1.5">Message *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => { setForm({ ...form, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: undefined }); }}
                      rows={5}
                      placeholder="Votre message..."
                      className={`${inputClass('message')} resize-none`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-rose-dark">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 text-sm font-medium text-white hover:bg-gold-dark transition-colors"
                  >
                    <Send size={18} />
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
