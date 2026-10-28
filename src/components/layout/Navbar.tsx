import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, Home, Store, Layers, Info, Mail } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cartCount } from '@/utils/helpers';
import { BRAND } from '@/data/store';

const navLinks = [
  { label: 'Accueil', to: '/', icon: Home },
  { label: 'Boutique', to: '/boutique', icon: Store },
  { label: 'Collections', to: '/collections', icon: Layers },
  { label: 'À propos', to: '/a-propos', icon: Info },
  { label: 'Contact', to: '/contact', icon: Mail },
];

export function Navbar() {
  const { items, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/boutique?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const count = cartCount(items);
  const isActive = (path: string) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_rgba(196,161,91,0.15)]' : 'bg-ivory'
        }`}
      >
        <nav className="container-mg flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex items-center justify-center w-10 h-10 text-brown"
            aria-label="Ouvrir le menu"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-baseline gap-0.5 group">
            <span className="font-serif text-[1.65rem] lg:text-[1.9rem] font-semibold text-brown tracking-[0.02em] group-hover:text-gold transition-colors duration-300">
              Mari
            </span>
            <span className="font-serif text-[1.65rem] lg:text-[1.9rem] font-semibold text-gold tracking-[0.02em] group-hover:text-gold-dark transition-colors duration-300 italic">
              Gold
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`text-sm font-medium transition-colors relative group py-1 ${
                    isActive(link.to) ? 'text-gold' : 'text-brown hover:text-gold'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
                      isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center justify-center w-10 h-10 text-brown hover:text-gold transition-colors"
              aria-label="Rechercher"
            >
              {searchOpen ? <X size={22} /> : <Search size={21} />}
            </button>
            <Link
              to="/compte"
              className="hidden sm:flex items-center justify-center w-10 h-10 text-brown hover:text-gold transition-colors"
              aria-label="Mon compte"
            >
              <User size={21} />
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 text-brown hover:text-gold transition-colors"
              aria-label="Panier"
            >
              <ShoppingBag size={21} />
              {count > 0 && (
                <span className="absolute top-0.5 right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-white animate-scale-in">
                  {count}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-beige/40 bg-ivory animate-slide-down">
            <div className="container-mg py-4">
              <form onSubmit={handleSearch} className="flex gap-3">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un hijab, une couleur, une collection..."
                  autoFocus
                  className="flex-1 rounded-full border border-beige bg-white px-5 py-3.5 text-sm text-brown placeholder:text-brown-light/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
                />
                <button
                  type="submit"
                  className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-white hover:bg-gold-dark transition-colors"
                >
                  Rechercher
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-brown-dark/50 backdrop-blur-sm animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[82%] bg-ivory shadow-2xl flex flex-col animate-slide-down">
            <div className="flex items-center justify-between px-5 py-4 border-b border-beige/40">
              <span className="font-serif text-2xl font-semibold text-brown">
                Mari<span className="text-gold italic">Gold</span>
              </span>
              <button onClick={() => setMobileOpen(false)} className="text-brown hover:text-gold transition-colors" aria-label="Fermer">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`flex items-center gap-3 px-5 py-3.5 transition-colors ${
                        isActive(link.to)
                          ? 'bg-beige-light text-gold font-medium'
                          : 'text-brown hover:bg-beige-light/60 hover:text-gold'
                      }`}
                    >
                      <link.icon size={20} className={isActive(link.to) ? 'text-gold' : 'text-brown-light/60'} />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/compte"
                    className={`flex items-center gap-3 px-5 py-3.5 transition-colors ${
                      isActive('/compte')
                        ? 'bg-beige-light text-gold font-medium'
                        : 'text-brown hover:bg-beige-light/60 hover:text-gold'
                    }`}
                  >
                    <User size={20} className="text-brown-light/60" />
                    <span className="font-medium">Mon compte</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="border-t border-beige/40 px-5 py-4 text-sm text-brown-light space-y-1">
              <p>{BRAND.email}</p>
              <p>{BRAND.phone}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
