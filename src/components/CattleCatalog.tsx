import React, { useState, useMemo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CattleBatch } from '../types/cattle';
import { 
  MapPin, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  ShoppingBag,
  Plus,
  Minus,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const breedGalleries: Record<string, string[]> = {
  'Brahman Blanco': [
    '/images/brahman-galeria-1.jpg',
    '/images/brahman-galeria-2.jpg',
    '/images/brahman-galeria-3.jpg',
    '/images/brahman-galeria-4.jpg',
  ],
  Nelore: [
    '/images/nelore-galeria-1.jpg',
    '/images/nelore-galeria-2.jpg',
    '/images/nelore-galeria-3.jpg',
    '/images/nelore-galeria-4.jpg',
  ],
};

interface CattleCatalogProps {
  batches: CattleBatch[];
  currency: 'COP' | 'USD';
  onSelectBatch: (batch: CattleBatch) => void;
  onRequestQuote: (batch: CattleBatch) => void;
  onAddToCart?: (batch: CattleBatch, heads: number) => void;
  onOpenCart?: () => void;
}

export const CattleCatalog: React.FC<CattleCatalogProps> = ({
  batches,
  currency,
  onSelectBatch,
  onRequestQuote,
  onAddToCart,
  onOpenCart: _onOpenCart,
}) => {
  const [selectedBreed, setSelectedBreed] = useState<string>('Todas');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const sectionRef = useRef<HTMLElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  const filteredBatches = useMemo(() => {
    return batches.filter((batch) => {
      const matchesBreed = 
        selectedBreed === 'Todas' || batch.breed === selectedBreed;

      return matchesBreed;
    });
  }, [batches, selectedBreed]);

  const selectedBreedGallery = breedGalleries[selectedBreed];
  const hasSelectedBreedGallery = selectedBreed !== 'Todas' && selectedBreedGallery;
  const uniqueBreeds = Array.from(new Set(batches.map((b) => b.breed)));

  // GSAP ScrollTrigger Entrance Animation for Cattle Cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsGridRef.current) {
        const cards = cardsGridRef.current.querySelectorAll('.batch-card');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            {
              opacity: 0,
              y: 40,
              scale: 0.96,
            },
            {
              scrollTrigger: {
                trigger: cardsGridRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power3.out',
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredBatches]);

  return (
    <section id="catalogo" ref={sectionRef} className="py-20 bg-transparent border-b border-emerald-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Oferta Comercial Ganadera</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Catálogo de animales disponibles por raza
            </h2>
            <p className="text-slate-700 text-base">
              Ganado homogéneo de alta conversión alimenticia criado bajo protocolos regenerativos. 
              Disponibles para <strong className="text-emerald-900">exportación marítima</strong> y <strong className="text-emerald-900">cebadores nacionales</strong>.
            </p>
          </div>

          <div className="w-full sm:w-64 md:shrink-0">
            <select
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
              aria-label="Filtrar por Raza"
              className="w-full py-2.5 px-3 bg-white border border-emerald-200 rounded-2xl text-sm text-slate-800 focus:outline-none focus:border-emerald-500 shadow-xs"
            >
              <option value="Todas">Todas las Razas</option>
              {uniqueBreeds.map((breed) => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Commercial Cattle Grid */}
        <div
          ref={cardsGridRef}
          className={
            hasSelectedBreedGallery
              ? 'grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          }
        >
          <div className={hasSelectedBreedGallery ? 'grid grid-cols-1 gap-8' : 'contents'}>
            {filteredBatches.map((batch) => (
              <div
                key={batch.id}
                className="batch-card group rounded-3xl bg-white border border-emerald-100 hover:border-emerald-400 transition-all duration-300 shadow-xl shadow-emerald-900/5 hover:shadow-2xl hover:shadow-emerald-900/10 overflow-hidden flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Product Card Image */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={batch.imageUrl}
                    alt={batch.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-xs font-mono font-bold text-emerald-800 border border-emerald-200 shadow-xs">
                      {batch.id}
                    </span>

                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50/95 backdrop-blur-md text-xs font-bold text-emerald-800 border border-emerald-200 shadow-xs">
                      {batch.destination.includes('Oriente Medio') ? 'Exportación Oriente Medio' : batch.destination.includes('Caribe') ? 'Exportación Caribe' : 'Ceba Nacional'}
                    </span>
                  </div>

                  {/* Bottom Image Overlay */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide drop-shadow">
                      {batch.breed}
                    </span>
                    <h3 className="text-lg font-black text-white leading-tight drop-shadow">
                      {batch.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  
                  {/* Key Product Commercial Attributes */}
                  <div className="grid grid-cols-2 divide-x divide-emerald-200 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs">
                    <div className="p-3">
                      <span className="text-[11px] text-slate-500 block mb-0.5">Peso Promedio</span>
                      <span className="text-lg font-black font-mono text-slate-900">
                        {batch.averageWeightLabel ?? batch.currentAvgWeight} <span className="text-xs font-normal text-slate-500">kg</span>
                      </span>
                    </div>
                    <div className="p-3">
                      <span className="text-[11px] text-slate-500 block mb-0.5">Tamaño de lote</span>
                      <span className="text-lg font-black font-mono text-emerald-700">
                        {batch.heads} <span className="text-xs font-normal text-slate-500">cabezas</span>
                      </span>
                    </div>
                  </div>

                  {/* Location & Status Info */}
                  <div className="space-y-1.5 text-xs text-slate-600 border-t border-emerald-100 pt-3">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="line-clamp-1">{batch.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{batch.sanitaryCertification.split('-')[0]}</span>
                    </div>
                  </div>

                  {/* Price, Quantity Stepper & Cart CTA */}
                  <div className="pt-3 border-t border-emerald-100 space-y-3">
                    {/* Price per kg */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                          Precio Referencia en Pie
                        </span>
                        <span className="text-base font-black font-mono text-emerald-950">
                          {currency === 'COP'
                            ? `COP $${batch.pricePerKgCOP.toLocaleString()}/kg`
                            : `USD $${batch.pricePerKgUSD.toFixed(2)}/kg`}
                        </span>
                      </div>
                      <button
                        onClick={() => onSelectBatch(batch)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                        title="Ver detalles sanitarios y curva de crecimiento"
                      >
                        Detalles
                      </button>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 font-medium shrink-0">Cabezas:</span>
                      <div className="flex items-center rounded-xl border border-emerald-200 bg-emerald-50/60 overflow-hidden shadow-xs">
                        <button
                          onClick={() =>
                            setQuantities((prev) => ({
                              ...prev,
                              [batch.id]: Math.max(1, (prev[batch.id] ?? 1) - 1),
                            }))
                          }
                          className="w-7 h-7 flex items-center justify-center text-emerald-700 hover:bg-emerald-100 transition"
                          aria-label="Reducir cantidad"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-9 text-center text-sm font-black font-mono text-slate-900">
                          {quantities[batch.id] ?? 1}
                        </span>
                        <button
                          onClick={() =>
                            setQuantities((prev) => ({
                              ...prev,
                              [batch.id]: Math.min(batch.heads, (prev[batch.id] ?? 1) + 1),
                            }))
                          }
                          className="w-7 h-7 flex items-center justify-center text-emerald-700 hover:bg-emerald-100 transition"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">/ {batch.heads} disp.</span>
                    </div>

                    {/* Real-time subtotal */}
                    <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                      <span className="text-[10px] text-slate-500 font-medium">
                        Subtotal est.:
                      </span>
                      <span className="text-xs font-black font-mono text-emerald-900">
                        {currency === 'COP'
                          ? `COP $${((quantities[batch.id] ?? 1) * batch.currentAvgWeight * batch.pricePerKgCOP).toLocaleString()}`
                          : `USD $${((quantities[batch.id] ?? 1) * batch.currentAvgWeight * batch.pricePerKgUSD).toFixed(2)}`}
                      </span>
                    </div>

                    {/* Add to Cart CTA */}
                    <button
                      onClick={() => {
                        if (onAddToCart) {
                          onAddToCart(batch, quantities[batch.id] ?? 1);
                          setQuantities((prev) => ({ ...prev, [batch.id]: 1 }));
                        } else {
                          onRequestQuote(batch);
                        }
                      }}
                      className="w-full py-2.5 rounded-2xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Añadir al Carrito de Cotización</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
          {hasSelectedBreedGallery && (
            <div
              aria-label={`Galería de imágenes de ${selectedBreed}`}
              className="grid grid-cols-2 gap-4"
            >
              {selectedBreedGallery.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`${selectedBreed}, imagen ${index + 1}`}
                  loading="lazy"
                  className="w-full aspect-square rounded-3xl border border-emerald-100 object-cover shadow-lg shadow-emerald-900/5"
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
