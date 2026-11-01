import React, { useState } from 'react';
import { DynamicBackground } from './components/DynamicBackground';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { EcosystemGSAP } from './components/EcosystemGSAP';
import { CattleCatalog } from './components/CattleCatalog';
import { ServicesSection } from './components/ServicesSection';
import { SustainabilityCompliance } from './components/SustainabilityCompliance';
import { FloatingAgroBot } from './components/FloatingAgroBot';
import { BatchModal } from './components/BatchModal';
import { QuoteModal } from './components/QuoteModal';
import { CartDrawer } from './components/CartDrawer';

import { INITIAL_CATTLE_BATCHES } from './data/mockData';
import { CattleBatch, CartItem } from './types/cattle';

import { 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Globe2, 
  ShieldCheck,
  Award
} from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState<'COP' | 'USD'>('COP');
  const [batches] = useState<CattleBatch[]>(INITIAL_CATTLE_BATCHES);

  // Modals state
  const [selectedBatchForModal, setSelectedBatchForModal] = useState<CattleBatch | null>(null);
  const [selectedBatchForQuote, setSelectedBatchForQuote] = useState<CattleBatch | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Floating Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [externalChatQuery, setExternalChatQuery] = useState<string>('');

  // ─── Cart State ─────────────────────────────────────────────────────────────
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (batch: CattleBatch, heads: number) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.batch.id === batch.id);
      if (existing) {
        return prev.map((i) =>
          i.batch.id === batch.id ? { ...i, heads: Math.min(i.heads + heads, i.batch.heads) } : i
        );
      }
      return [...prev, { batch, heads: Math.max(1, Math.min(heads, batch.heads)) }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (batchId: string, heads: number) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.batch.id === batchId ? { ...i, heads: Math.max(1, Math.min(heads, i.batch.heads)) } : i
      )
    );
  };

  const removeFromCart = (batchId: string) => {
    setCartItems((prev) => prev.filter((i) => i.batch.id !== batchId));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, i) => acc + i.heads, 0);
  // ────────────────────────────────────────────────────────────────────────────

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAdvisorWithParams = (query: string) => {
    setExternalChatQuery(query);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-600 selection:text-white scroll-smooth relative">
      
      {/* Dynamic Parallax Background with GSAP ScrollTrigger */}
      <DynamicBackground />

      {/* 1. Header Navigation */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
        onOpenQuoteModal={() => {
          setSelectedBatchForQuote(null);
          setIsQuoteModalOpen(true);
        }}
      />

      <main className="relative z-10 flex-1">
        {/* 2. Hero Section (Bienvenida Impactante) */}
        <HeroBanner
          onExploreCatalog={() => scrollToSection('catalogo')}
          onExploreServices={() => scrollToSection('servicios')}
        />

        {/* 3. El Ecosistema INNOVAGAN (4 Pasos Interactivos con Animación GSAP + ScrollTrigger) */}
        <EcosystemGSAP />

        {/* 4. Catálogo Comercial de Ganado con botón directo [Cotizar este Lote] */}
        <CattleCatalog
          batches={batches}
          currency={currency}
          onSelectBatch={(batch) => setSelectedBatchForModal(batch)}
          onRequestQuote={(batch) => {
            setSelectedBatchForQuote(batch);
            setIsQuoteModalOpen(true);
          }}
          onAddToCart={addToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 5. Servicios técnicos y regenerativos */}
        <ServicesSection />

        {/* 6. Sostenibilidad, Resolución 0126 de 2022 y ODS */}
        <section id="sostenibilidad" className="py-20 bg-emerald-50/40 border-b border-emerald-100/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SustainabilityCompliance />
          </div>
        </section>
      </main>

      {/* 7. Corporate & Commercial Footer */}
      <footer className="bg-emerald-950 text-emerald-100/80 text-xs py-14 border-t border-emerald-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1: Brand & Purpose */}
            <div className="space-y-3">
              <div className="flex items-center">
                {/* Isotipo circular con nuevo icono */}
                <img
                  src="/images/logo-icon.svg"
                  alt="INNOVAGAN"
                  className="w-10 h-10 object-contain -mr-1 -mt-2.5"
                />

                {/* Texto de marca adaptado para fondo oscuro */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black tracking-tight text-white leading-none">
                      INNO<span className="text-emerald-400">VAGAN</span>
                    </span>

                    <span className="bg-emerald-950 text-emerald-300 text-xs font-bold px-2 py-0.5 rounded-md border border-emerald-700">
                      AGTECH
                    </span>
                  </div>

                  <span className="text-xs text-emerald-100/70 font-medium tracking-wide mt-1">
                    Ganadería Bovina Regenerativa
                  </span>
                </div>
              </div>
              <p className="text-emerald-100/90 leading-relaxed text-xs">
                Empresa colombiana de producción bovina regenerativa de alta eficiencia y consultoría AgTech. Carne premium con nutrición hidropónica y cero deforestación.
              </p>
              <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Resolución 0126 de 2022 Activa</span>
              </div>
            </div>

            {/* Col 2: Hubs y Fincas */}
            <div className="space-y-2">
              <h5 className="font-extrabold text-white uppercase tracking-wider text-xs">
                Centros Productivos
              </h5>
              <ul className="space-y-2 text-emerald-100/90">
                <li className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Montería, Valle del Sinú (Córdoba) - Hato Élite</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Puerto Berrío (Magdalena Medio) - Engorde FVH</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Puertos de Barranquilla y Cartagena - Cuarentena Exportación</span>
                </li>
              </ul>
            </div>

            {/* Col 3: Mercados Objetivo */}
            <div className="space-y-2">
              <h5 className="font-extrabold text-white uppercase tracking-wider text-xs">
                Mercados Atendidos
              </h5>
              <ul className="space-y-1.5 text-emerald-100/90">
                <li>• Exportación en pie a Oriente Medio (Jordania, Egipto, Líbano)</li>
                <li>• Exportación a mercados insulares del Caribe</li>
                <li>• Suministro continuo a cebadores y frigoríficos en Colombia</li>
                <li>• Consultoría técnica en reconversión a ganadería regenerativa</li>
              </ul>
            </div>

            {/* Col 4: Contacto Comercial */}
            <div className="space-y-2">
              <h5 className="font-extrabold text-white uppercase tracking-wider text-xs">
                Contacto Comercial
              </h5>
              <div className="space-y-2 text-emerald-100/90">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>comercial@innovagan.com.co</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+57 310 445 2890 / +57 (604) 789-2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-3.5 h-3.5 text-teal-300" />
                  <span>innovagan.com.co • Bogotá, Colombia</span>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-emerald-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-300/80">
            <div>
              © 2026 INNOVAGAN SAS. Ganadería Bovina Regenerativa & Transformación Digital AgTech.
            </div>
            <div className="flex items-center gap-3">
              <span>Certificado Sanitario ICA</span>
              <span>•</span>
              <span>Protocolo Halal & Bienestar OMSA</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 8. Floating Asesor Virtual AgroBot (Margen Inferior Derecho) */}
      <FloatingAgroBot
        externalQuery={externalChatQuery}
        onClearExternalQuery={() => setExternalChatQuery('')}
        isOpen={isChatOpen}
        setIsOpen={setIsChatOpen}
        onAddToCartFromBot={addToCart}
        batches={batches}
      />

      {/* Modal: Ficha Detallada del Lote Bovino */}
      <BatchModal
        batch={selectedBatchForModal}
        currency={currency}
        onClose={() => setSelectedBatchForModal(null)}
        onRequestQuote={(batch) => {
          setSelectedBatchForModal(null);
          setSelectedBatchForQuote(batch);
          setIsQuoteModalOpen(true);
        }}
      />

      {/* Modal: Formulario Comercial de Cotización */}
      {isQuoteModalOpen && (
        <QuoteModal
          batch={selectedBatchForQuote}
          currency={currency}
          onClose={() => {
            setIsQuoteModalOpen(false);
            setSelectedBatchForQuote(null);
          }}
          onOpenAdvisorWithText={(text) => {
            setIsQuoteModalOpen(false);
            setSelectedBatchForQuote(null);
            handleOpenAdvisorWithParams(text);
          }}
        />
      )}

      {/* Cart Drawer – Cotización Flexible (desde 1 cabeza) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onOpenAdvisorWithText={(text) => {
          setIsCartOpen(false);
          handleOpenAdvisorWithParams(text);
        }}
      />

    </div>
  );
}
