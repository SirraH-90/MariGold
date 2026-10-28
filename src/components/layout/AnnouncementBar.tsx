import { useState, useEffect } from 'react';
import { Sparkles, Truck, Gift } from 'lucide-react';

const messages = [
  { icon: Sparkles, text: 'Découvrez votre élégance au quotidien.' },
  { icon: Truck, text: 'Livraison gratuite à partir de 5 000 DZD.' },
  { icon: Gift, text: '−10% sur votre première commande avec le code MARI10.' },
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const Msg = messages[index];

  return (
    <div className="bg-brown-dark text-ivory py-2.5 overflow-hidden">
      <div className="container-mg flex items-center justify-center">
        <div key={index} className="flex items-center gap-2 text-xs sm:text-sm tracking-wide animate-fade-in">
          <Msg.icon size={14} className="text-gold-light flex-shrink-0" />
          <span>{Msg.text}</span>
        </div>
      </div>
    </div>
  );
}
