import React from 'react';
import { 
  TrendingUp, 
  Droplet, 
  Leaf, 
  ArrowRight, 
  Sprout, 
  Sparkles, 
  ShieldCheck, 
  Globe2,
  ShoppingBag
} from 'lucide-react';

interface HeroBannerProps {
  onExploreCatalog: () => void;
  onExploreServices: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreCatalog,
  onExploreServices,
}) => {
  return (
    <section className="relative overflow-hidden bg-transparent pt-16 pb-20 md:pt-24 md:pb-28 border-b border-emerald-100/80">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpeg')" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-white/55" />

      {/* Soft Ambient Radial Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-200/25 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Storytelling Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-bold tracking-wide shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Modelo AgTech de Alta Eficiencia • Colombia</span>
            </div>

            {/* Main Header */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Ganadería Bovina Regenerativa: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-600">Carne de Alta Eficiencia y Cero Deforestación</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-700 leading-relaxed max-w-2xl font-normal">
              Producimos ganado de engorde superior con <strong className="text-emerald-900">Forraje Verde Hidropónico (FVH)</strong> y exportamos a mercados internacionales.
            </p>

            {/* 2 Main Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#catalogo"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreCatalog();
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Ver Lotes de Ganado</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#servicios"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreServices();
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold bg-white hover:bg-emerald-50 text-slate-800 border border-emerald-200 hover:border-emerald-400 shadow-md shadow-emerald-900/5 transition-all hover:scale-105 cursor-pointer"
              >
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>Nuestros Servicios</span>
              </a>
            </div>

            {/* Colombian Trust & Regulatory Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Resolución 0126 de 2022 (MinAgricultura)
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Globe2 className="w-4 h-4 text-teal-600" />
                Exportación en Pie a Oriente Medio & Caribe
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="flex items-center gap-1.5 font-medium bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-emerald-800">
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Compra individual desde 1 res · Lotes de exportación
              </span>
            </div>

          </div>

          {/* Right Hero Visual Card with the 3 Friendly Metrics */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white/40 border border-white/50 p-6 sm:p-8 shadow-2xl shadow-emerald-900/10 backdrop-blur-md">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-emerald-100 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold block">
                    Impacto Comprobado
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    Estándar de Rendimiento INNOVAGAN
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <Leaf className="w-5 h-5" />
                </div>
              </div>

              {/* 3 Friendly Metrics */}
              <div className="space-y-4">
                
                {/* Metric 1: +1.2 kg/día de ganancia de peso */}
                <div className="p-4 rounded-2xl bg-white/60 border border-emerald-100/90 flex items-center gap-4 hover:border-emerald-300 transition">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300/60 flex items-center justify-center text-emerald-700 shrink-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black font-mono text-slate-900">
                      +1.2 <span className="text-sm font-semibold text-emerald-700">kg/día</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong className="text-slate-900">Ganancia de peso diaria</strong> (+180% vs 0.45 kg tradicional).
                    </p>
                  </div>
                </div>

                {/* Metric 2: 80% ahorro de agua */}
                <div className="p-4 rounded-2xl bg-white/60 border border-sky-100 flex items-center gap-4 hover:border-sky-300 transition">
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
                    <Droplet className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black font-mono text-slate-900">
                      80% <span className="text-sm font-semibold text-sky-700">ahorro</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong className="text-slate-900">Ahorro de agua</strong> con Forraje Hidropónico y riego de precisión.
                    </p>
                  </div>
                </div>

                {/* Metric 3: Carne con huella de carbono reducida */}
                <div className="p-4 rounded-2xl bg-white/60 border border-emerald-100/90 flex items-center gap-4 hover:border-emerald-300 transition">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300/60 flex items-center justify-center text-emerald-700 shrink-0">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-slate-900">
                      Huella Reducida
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong className="text-slate-900">Carne con huella reducida</strong> y cero deforestación.
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom Card Annotation */}
              <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center justify-between text-xs text-slate-500">
                <span>Régimen FVH + Pasturas Voisin</span>
                <span className="text-emerald-700 font-bold font-mono">100% Trazable RFID</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
