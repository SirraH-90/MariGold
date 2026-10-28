import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin, Truck, Package, Shield, FileText } from 'lucide-react';
import { BRAND } from '@/data/store';

export function Footer() {
  return (
    <footer className="bg-brown text-ivory">
      {/* Top section */}
      <div className="container-mg py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif text-3xl font-semibold">
                Mari<span className="text-gold-light italic">Gold</span>
              </span>
            </Link>
            <p className="text-sm text-ivory/65 leading-relaxed max-w-xs">
              Des hijabs pensés pour célébrer votre beauté, votre confort et votre individualité. L'élégance dans chaque pli.
            </p>
            <div className="flex items-center gap-2.5 mt-6">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory/8 hover:bg-gold transition-all duration-300 hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory/8 hover:bg-gold transition-all duration-300 hover:scale-105"
                aria-label="WhatsApp"
              >
                <Phone size={18} />
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory/8 hover:bg-gold transition-all duration-300 hover:scale-105"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif text-lg text-gold-light mb-4">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-ivory/60 hover:text-gold-light transition-colors">Accueil</Link></li>
              <li><Link to="/boutique" className="text-ivory/60 hover:text-gold-light transition-colors">Boutique</Link></li>
              <li><Link to="/collections" className="text-ivory/60 hover:text-gold-light transition-colors">Collections</Link></li>
              <li><Link to="/a-propos" className="text-ivory/60 hover:text-gold-light transition-colors">À propos</Link></li>
              <li><Link to="/contact" className="text-ivory/60 hover:text-gold-light transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Service */}
          <div>
            <h3 className="font-serif text-lg text-gold-light mb-4">Service Client</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-ivory/60"><Truck size={15} className="text-gold-light/60" /> Livraison & Retours</li>
              <li className="flex items-center gap-2 text-ivory/60"><Package size={15} className="text-gold-light/60" /> Suivi de commande</li>
              <li className="flex items-center gap-2 text-ivory/60"><Shield size={15} className="text-gold-light/60" /> Confidentialité</li>
              <li className="flex items-center gap-2 text-ivory/60"><FileText size={15} className="text-gold-light/60" /> Conditions générales</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg text-gold-light mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-ivory/60">
                <MapPin size={15} className="text-gold-light/60 mt-0.5 flex-shrink-0" />
                {BRAND.address}
              </li>
              <li className="flex items-center gap-2 text-ivory/60">
                <Phone size={15} className="text-gold-light/60 flex-shrink-0" />
                {BRAND.phone}
              </li>
              <li className="flex items-center gap-2 text-ivory/60">
                <Mail size={15} className="text-gold-light/60 flex-shrink-0" />
                {BRAND.email}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/10">
        <div className="container-mg py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ivory/40">
          <p>© {new Date().getFullYear()} MariGold. Tous droits réservés.</p>
          <p>Conçu avec élégance en Algérie.</p>
        </div>
      </div>
    </footer>
  );
}
