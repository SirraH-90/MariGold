import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ChevronRight, Truck, Home, MapPin, Phone, User, Wallet } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, cartTotal, generateOrderRef } from '@/utils/helpers';
import { wilayas, BRAND } from '@/data/store';

type DeliveryType = 'home' | 'desk';

interface FormState {
  fullName: string;
  phone: string;
  wilayaCode: string;
  commune: string;
  address: string;
  deliveryType: DeliveryType;
  notes: string;
}

const initialForm: FormState = {
  fullName: '',
  phone: '',
  wilayaCode: '',
  commune: '',
  address: '',
  deliveryType: 'home',
  notes: '',
};

export function CheckoutPage() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [orderRef, setOrderRef] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const subtotal = cartTotal(items);

  const selectedWilaya = useMemo(
    () => wilayas.find((w) => w.code === form.wilayaCode),
    [form.wilayaCode]
  );

  const deliveryFee = useMemo(() => {
    if (!selectedWilaya) return 0;
    return form.deliveryType === 'home' ? selectedWilaya.homeFee : selectedWilaya.deskFee;
  }, [selectedWilaya, form.deliveryType]);

  const total = subtotal + deliveryFee;

  const availableDeliveryTypes: DeliveryType[] = useMemo(() => {
    if (!selectedWilaya) return [];
    const types: DeliveryType[] = [];
    if (selectedWilaya.homeDelivery) types.push('home');
    if (selectedWilaya.deskDelivery) types.push('desk');
    return types;
  }, [selectedWilaya]);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = 'Veuillez saisir votre nom complet.';
    if (!form.phone.trim()) {
      next.phone = 'Veuillez saisir votre numéro de téléphone.';
    } else if (!/^0?[5-7]\d{8}$/.test(form.phone.replace(/\s/g, ''))) {
      next.phone = 'Numéro invalide. Format: 05/06/07 XX XX XX XX.';
    }
    if (!form.wilayaCode) next.wilayaCode = 'Veuillez sélectionner votre wilaya.';
    if (!form.commune.trim()) next.commune = 'Veuillez saisir votre commune.';
    if (form.deliveryType === 'home' && !form.address.trim()) {
      next.address = 'Veuillez saisir votre adresse de livraison.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || items.length === 0) return;

    const ref = generateOrderRef();
    setOrderRef(ref);
    setSubmitted(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  // Success state
  if (submitted) {
    return (
      <div className="bg-ivory min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full bg-white rounded-3xl p-8 lg:p-10 shadow-md text-center animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          <h1 className="font-serif text-3xl text-brown mb-3">Commande confirmée !</h1>
          <p className="text-brown-light mb-2">
            Merci {form.fullName.split(' ')[0]}, votre commande a bien été enregistrée.
          </p>
          <div className="bg-beige-light/60 rounded-xl p-4 my-6">
            <p className="text-sm text-brown-light">Référence de commande</p>
            <p className="font-serif text-2xl text-gold font-semibold tracking-wide">{orderRef}</p>
          </div>
          <p className="text-sm text-brown-light/70 mb-6">
            Nous vous contacterons au {form.phone} pour confirmer la livraison. Le paiement se fera en cash à la réception.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-medium text-white hover:bg-gold-dark transition-colors"
            >
              Retour à l'accueil
            </Link>
            <Link
              to="/boutique"
              className="inline-flex items-center justify-center rounded-full border border-gold px-6 py-3 text-sm font-medium text-gold hover:bg-gold hover:text-white transition-colors"
            >
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="bg-ivory min-h-[60vh] flex items-center justify-center px-4 text-center">
        <div>
          <h1 className="font-serif text-3xl text-brown mb-3">Votre panier est vide</h1>
          <p className="text-brown-light mb-6">Ajoutez des produits avant de passer commande.</p>
          <Link
            to="/boutique"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium text-white hover:bg-gold-dark transition-colors"
          >
            Découvrir la boutique
          </Link>
        </div>
      </div>
    );
  }

  const inputClass = (key: keyof FormState) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-brown placeholder:text-brown-light/50 focus:outline-none transition-colors ${
      errors[key] ? 'border-rose-dark focus:border-rose-dark' : 'border-beige focus:border-gold'
    }`;

  return (
    <div className="bg-ivory min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-beige/40">
        <div className="container-mg py-3">
          <nav className="flex items-center gap-1.5 text-xs text-brown-light/70">
            <Link to="/" className="hover:text-gold transition-colors">Accueil</Link>
            <ChevronRight size={14} />
            <Link to="/panier" className="hover:text-gold transition-colors">Panier</Link>
            <ChevronRight size={14} />
            <span className="text-brown">Commande</span>
          </nav>
        </div>
      </div>

      <div className="container-mg py-8 lg:py-12">
        <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-brown mb-8">Finaliser ma commande</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Form fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact info */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-serif text-xl text-brown mb-4 flex items-center gap-2">
                <User size={20} className="text-gold" /> Informations de contact
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-brown mb-1.5">Nom complet *</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Ex: Amina Benali"
                    className={inputClass('fullName')}
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-rose-dark">{errors.fullName}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-brown mb-1.5">Téléphone *</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-light/50" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="Ex: 05 55 12 34 56"
                      className={`${inputClass('phone')} pl-10`}
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-xs text-rose-dark">{errors.phone}</p>}
                </div>
              </div>
            </section>

            {/* Delivery info */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-serif text-xl text-brown mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-gold" /> Adresse de livraison
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brown mb-1.5">Wilaya *</label>
                  <select
                    value={form.wilayaCode}
                    onChange={(e) => {
                      updateField('wilayaCode', e.target.value);
                      const w = wilayas.find((x) => x.code === e.target.value);
                      if (w && !w.homeDelivery && form.deliveryType === 'home') {
                        setForm((prev) => ({ ...prev, deliveryType: 'desk' }));
                      }
                    }}
                    className={inputClass('wilayaCode')}
                  >
                    <option value="">Sélectionner...</option>
                    {wilayas.map((w) => (
                      <option key={w.code} value={w.code}>
                        {w.code} — {w.name}
                      </option>
                    ))}
                  </select>
                  {errors.wilayaCode && <p className="mt-1 text-xs text-rose-dark">{errors.wilayaCode}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown mb-1.5">Commune *</label>
                  <input
                    type="text"
                    value={form.commune}
                    onChange={(e) => updateField('commune', e.target.value)}
                    placeholder="Ex: Bab El Oued"
                    className={inputClass('commune')}
                  />
                  {errors.commune && <p className="mt-1 text-xs text-rose-dark">{errors.commune}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-brown mb-1.5">Adresse complète *</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    placeholder="Rue, numéro, quartier..."
                    className={inputClass('address')}
                  />
                  {errors.address && <p className="mt-1 text-xs text-rose-dark">{errors.address}</p>}
                </div>
              </div>

              {/* Delivery type */}
              {selectedWilaya && availableDeliveryTypes.length > 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-brown mb-2">Mode de livraison</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {availableDeliveryTypes.includes('home') && (
                      <button
                        type="button"
                        onClick={() => updateField('deliveryType', 'home')}
                        className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                          form.deliveryType === 'home'
                            ? 'border-gold bg-gold/5'
                            : 'border-beige hover:border-gold/50'
                        }`}
                      >
                        <Home size={22} className={form.deliveryType === 'home' ? 'text-gold' : 'text-brown-light'} />
                        <div>
                          <p className="text-sm font-medium text-brown">Livraison à domicile</p>
                          <p className="text-xs text-brown-light mt-0.5">
                            {selectedWilaya.homeFee > 0 ? `${formatPrice(selectedWilaya.homeFee)}` : 'Gratuit'}
                          </p>
                        </div>
                      </button>
                    )}
                    {availableDeliveryTypes.includes('desk') && (
                      <button
                        type="button"
                        onClick={() => updateField('deliveryType', 'desk')}
                        className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                          form.deliveryType === 'desk'
                            ? 'border-gold bg-gold/5'
                            : 'border-beige hover:border-gold/50'
                        }`}
                      >
                        <Truck size={22} className={form.deliveryType === 'desk' ? 'text-gold' : 'text-brown-light'} />
                        <div>
                          <p className="text-sm font-medium text-brown">Point de livraison (bureau)</p>
                          <p className="text-xs text-brown-light mt-0.5">
                            {selectedWilaya.deskFee > 0 ? `${formatPrice(selectedWilaya.deskFee)}` : 'Gratuit'}
                          </p>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-brown mb-1.5">Notes (optionnel)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  rows={2}
                  placeholder="Instructions de livraison, repères, etc."
                  className={`${inputClass('notes')} resize-none`}
                />
              </div>
            </section>

            {/* Payment */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-serif text-xl text-brown mb-4 flex items-center gap-2">
                <Wallet size={20} className="text-gold" /> Mode de paiement
              </h2>
              <div className="rounded-xl border border-gold bg-gold/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brown">Cash à la livraison (COD)</p>
                    <p className="text-xs text-brown-light mt-0.5">
                      Payez en espèces à la réception de votre commande.
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-brown-light/60">
                Le paiement en ligne par carte bancaire sera bientôt disponible.
              </p>
            </section>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-serif text-xl text-brown mb-4">Votre commande</h2>

              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.colorId}`} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brown leading-tight line-clamp-2">{item.name}</p>
                      <p className="text-xs text-brown-light/70 mt-0.5">{item.colorName} · ×{item.quantity}</p>
                      <p className="text-sm text-brown mt-0.5">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm border-t border-beige/50 pt-4">
                <div className="flex justify-between text-brown-light">
                  <span>Sous-total</span>
                  <span className="font-medium text-brown">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-brown-light">
                  <span>Livraison</span>
                  <span className="font-medium text-brown">
                    {selectedWilaya ? (deliveryFee > 0 ? formatPrice(deliveryFee) : 'Gratuit') : '—'}
                  </span>
                </div>
              </div>

              <div className="border-t border-beige/50 mt-4 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-serif text-lg text-brown">Total</span>
                  <span className="font-serif text-2xl text-brown">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 text-sm font-medium text-white hover:bg-gold-dark transition-colors"
              >
                Confirmer la commande
                <Check size={18} />
              </button>

              <p className="mt-3 text-xs text-brown-light/60 text-center">
                En confirmant, vous acceptez nos conditions générales de vente.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
