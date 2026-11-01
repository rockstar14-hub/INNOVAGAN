import React, { useState } from 'react';
import { 
  Coins, 
  DollarSign, 
  Menu, 
  X, 
  PhoneCall,
  ShoppingBag
} from 'lucide-react';

interface NavbarProps {
  currency: 'COP' | 'USD';
  setCurrency: (c: 'COP' | 'USD') => void;
  onOpenQuoteModal: () => void;
  onOpenCart?: () => void;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  setCurrency,
  onOpenQuoteModal,
  onOpenCart,
  cartCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#ecosistema', label: 'El Ecosistema' },
    { href: '#catalogo', label: 'Catálogo de Lotes' },
    { href: '#servicios', label: 'Nuestros Servicios' },
    { href: '#sostenibilidad', label: 'Sostenibilidad & ODS' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/90 backdrop-blur-md shadow-sm">
      
      {/* Top micro-announcement bar */}
      <div className="bg-emerald-50/90 border-b border-emerald-100/80 px-4 py-1.5 text-xs text-emerald-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Ganadería Sostenible Certificada • Venta desde 1 cabeza • Cero Deforestación</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrency(currency === 'COP' ? 'USD' : 'COP')}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white hover:bg-emerald-100/60 text-emerald-900 border border-emerald-200 transition shadow-xs text-xs font-semibold"
              title="Cambiar divisa"
            >
              {currency === 'COP' ? (
                <>
                  <Coins className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Moneda: <strong>COP ($)</strong></span>
                </>
              ) : (
                <>
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Currency: <strong>USD ($)</strong></span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <a href="#" className="group">
            <div className="flex items-center">
              {/* Isotipo alineado perfectamente con el texto */}
              <img
                src="/images/logo-icon.svg"
                alt="INNOVAGAN"
                className="w-10 h-10 object-contain -mr-1 -mt-2.5"
              />

              {/* Texto de marca + subtítulo */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">
                    INNO<span className="text-emerald-600">VAGAN</span>
                  </span>

                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-md border border-emerald-300">
                    AGTECH
                  </span>
                </div>

                <span className="text-xs text-slate-500 font-medium tracking-wide mt-1">
                  Ganadería Bovina Regenerativa
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            
            {/* Shopping Cart / Quotation Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-all hover:scale-105 shadow-xs"
              title="Ver orden de cotización"
              aria-label="Abrir carrito de cotización"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline font-bold">Carrito</span>
              {cartCount > 0 ? (
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono font-bold text-[10px] flex items-center justify-center animate-pulse shadow-sm">
                  {cartCount}
                </span>
              ) : null}
            </button>

            {/* Direct Quote Modal Button */}
            <div className="hidden sm:block">
              <button
                onClick={onOpenQuoteModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/25 transition-all hover:scale-105"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contacto Directo</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-emerald-100 bg-white/95 backdrop-blur-md px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCart) onOpenCart();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              <span>Ver Carrito de Cotización ({cartCount} cabezas)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-extrabold bg-emerald-600 text-white shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Cotizar con Asesor</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
