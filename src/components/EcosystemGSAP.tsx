import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sprout, 
  Droplets, 
  SunMedium, 
  Ship, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface EcosystemStep {
  id: number;
  shortTitle: string;
  title: string;
  tagline: string;
  shortDesc: string;
  badge: string;
  icon: React.ElementType;
  image: string;
  metrics: { label: string; value: string }[];
  fincaDetails: {
    kpi: string;
    kpiLabel: string;
    explanation: string;
    fincaEquipment: string[];
    benefit: string;
  };
}

export const EcosystemGSAP: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<EcosystemStep | null>(null);
  const [activeTab, setActiveTab] = useState<number>(1);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const interactiveViewRef = useRef<HTMLDivElement>(null);

  const steps: EcosystemStep[] = [
    {
      id: 1,
      shortTitle: 'FVH Hidropónico',
      title: 'Paso 1: Nutrición con Forraje Verde Hidropónico (FVH)',
      tagline: 'Superalimento fresco producido 365 días al año',
      shortDesc: 'Cultivamos maíz y cebada forrajera en bandejas verticales sin tierra. En solo 8 días obtenemos un forraje jugoso con 19% de proteína cruda, reduciendo hasta un 85% el consumo de agua.',
      badge: 'Nutrición In-Situ',
      icon: Sprout,
      image: '/images/fvh-modulo.png',
      metrics: [
        { label: 'Proteína Cruda', value: '19.2%' },
        { label: 'Conversión', value: '1 kg → 8.2 kg' },
        { label: 'Ahorro Hídrico', value: '-85%' }
      ],
      fincaDetails: {
        kpi: '1 kg semilla = 8.2 kg forraje',
        kpiLabel: 'Conversión en 8 días',
        explanation: 'En las cámaras de germinación verticales de nuestras fincas en Córdoba y Magdalena Medio, producimos biomasa forrajera de altísima digestibilidad (>84%). Al no depender de las lluvias, nuestros bovinos nunca sufren la desnutrición típica de las épocas de sequía tropical.',
        fincaEquipment: [
          'Módulos verticales en bandejas de grado alimenticio',
          'Nebulización automatizada por microaspersores',
          'Agua 100% recirculada con filtrado biológico',
          'Cero pesticidas y cero agroquímicos'
        ],
        benefit: 'Garantiza oferta continua de proteína fresca digestible y reduce la muerte de ganado por sequía a 0%.'
      }
    },
    {
      id: 2,
      shortTitle: 'Fertirriego IoT',
      title: 'Paso 2: Fertirriego Automatizado por Sensores',
      tagline: 'Cada gota cuenta: agua y biol orgánico en la raíz',
      shortDesc: 'Sondas de humedad TDR miden en tiempo real la sed del suelo. Cuando la pradera lo necesita, el sistema riega con agua enriquecida con biofertilizante de nuestro propio compost circular.',
      badge: 'Agua & Biol Circular',
      icon: Droplets,
      // Praderas verdes con riego agrícola
      image: '/images/riego-modulo.png',
      metrics: [
        { label: 'Desperdicio Hídrico', value: '-80%' },
        { label: 'Sondas TDR', value: '15 & 30 cm' },
        { label: 'Nutrición Biol', value: '100% Orgánica' }
      ],
      fincaDetails: {
        kpi: '-80% Desperdicio Hídrico',
        kpiLabel: 'Eficiencia radicular',
        explanation: 'Eliminamos la intuición y el riego por inundación. Sensores TDR/capacitivos enterrados a 15 y 30 cm de profundidad miden la humedad volumétrica real. Cuando el suelo baja del 26%, las electroválvulas solares se activan inyectando lixiviados biol ricos en microorganismos benéficos.',
        fincaEquipment: [
          'Sondas TDR dieléctricas de precisión radicular',
          'Electroválvulas solares de bajo consumo energético',
          'Dosificadores Venturi para biofertilizante circular',
          'Controlador inteligente con enlace a telemetría móvil'
        ],
        benefit: 'Mantiene las pasturas siempre verdes y nutricionales sin quemar el suelo con fertilizantes químicos.'
      }
    },
    {
      id: 3,
      shortTitle: 'Cerca Solar & Voisin',
      title: 'Paso 3: Pastoreo Rotacional con Cercas Solares',
      tagline: 'Método Voisin: máxima fotosíntesis y confort animal',
      shortDesc: 'Dividimos la finca en cuarteles intensivos energizados por paneles solares. Los animales rotan cada 1-2 días comiendo el pasto en su punto óptimo, mientras el suelo descansa y captura carbono.',
      badge: 'Manejo Regenerativo',
      icon: SunMedium,
      image: '/images/cerca-solar.jpg',
      metrics: [
        { label: 'Carga Animal', value: '4.5 cabezas/ha' },
        { label: 'Voltaje Solar', value: '8.0 kV Litio' },
        { label: 'Descanso Pasto', value: '30-35 días' }
      ],
      fincaDetails: {
        kpi: '4.5 cabezas / ha',
        kpiLabel: 'Capacidad de carga vs 1.0 trad.',
        explanation: 'Realizamos pastoreo controlado en potreros pequeños con rotación cada 5 días, así las raíces de las pasturas crecen profundo acumulando carbono en el suelo y teniendo una tasa de recuperación mayor. Las cercas eléctricas solares educan a los animales sin causarles estrés y nuestro sistema Silvopastoril no solo aporta bienestar animal, también contribuye con reforestación y cuidado de las fuentes hídricas.',
        fincaEquipment: [
          'Energizadores solares con baterías de litio',
          'Divisiones flexibles de alambre galvanizado',
          'Bebederos móviles de bajo consumo en cada franja',
          'Corredores de árboles de Leucaena y Botón de Oro'
        ],
        benefit: 'Multiplica por 4.5 veces los animales que puedes alimentar por hectárea sin talar un solo metro de bosque.'
      }
    },
    {
      id: 4,
      shortTitle: 'Trazabilidad RFID',
      title: 'Paso 4: Trazabilidad Total RFID & Exportación en Pie',
      tagline: 'De la pradera colombiana a los puertos del mundo',
      shortDesc: 'Cada novillo lleva un microchip RFID oficial ICA. Monitoreamos su curva de crecimiento hasta los 500 kg y gestionamos cuarentenas y logística portuaria directa a Oriente Medio y el Caribe.',
      badge: 'Calidad Certificada',
      icon: Ship,
      // Ganado cárnico con identificación / caravana ganadera
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
      metrics: [
        { label: 'Microchip RFID', value: '100% Oficial' },
        { label: 'Peso Objetivo', value: '500 kg' },
        { label: 'Certificación', value: 'Halal / ICA' }
      ],
      fincaDetails: {
        kpi: '100% Chips RFID',
        kpiLabel: 'Trazabilidad individual ICA',
        explanation: 'Cumplimos rigurosamente los protocolos sanitarios de la OMSA y la Resolución 0126 de 2022 de ganadería sostenible. Concentramos los lotes en predios de pre-embarque cercanos a Barranquilla y Cartagena, garantizando adaptación nutricional previa para un viaje marítimo con cero bajas.',
        fincaEquipment: [
          'Caravanas RFID SINIGAN de lectura instantánea',
          'Básculas electrónicas con pesaje digital sin maltrato',
          'Certificaciones sanitarias de Hato Libre de Aftosa y Brucelosis',
          'Logística marítima especializada con protocolo Halal'
        ],
        benefit: 'Compradores internacionales y cebadores nacionales reciben animales con peso uniforme y sanidad intachable.'
      }
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 35,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      if (progressLineRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { width: '0%' },
          {
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 80%',
              end: 'bottom 40%',
              scrub: 0.5,
            },
            width: '100%',
            ease: 'none',
          }
        );
      }

      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll('.ecosystem-card');
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 45,
            scale: 0.96,
          },
          {
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.16,
            ease: 'power3.out',
          }
        );
      }

      if (bannerRef.current) {
        gsap.from(bannerRef.current, {
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 30,
          scale: 0.98,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (interactiveViewRef.current) {
      gsap.fromTo(
        interactiveViewRef.current,
        { opacity: 0, y: 15, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  const currentActiveStep = steps.find((s) => s.id === activeTab) || steps[0];
  const CurrentIcon = currentActiveStep.icon;

  return (
    <section 
      id="ecosistema" 
      ref={sectionRef} 
      className="py-24 bg-transparent relative overflow-hidden border-b border-emerald-100/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Ecosistema Regenerativo de Precisión
          </h2>

          <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
            Reemplazamos la ganadería extensiva tradicional por un <strong className="text-emerald-800">circuito biológico y tecnológico cerrado</strong> en 4 etapas sincronizadas.
          </p>

          {/* Step Sequence Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {steps.map((st) => {
              const IconComponent = st.icon;
              const isActive = activeTab === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setActiveTab(st.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                      : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-emerald-50 border border-emerald-100 shadow-xs'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[11px] font-black ${
                    isActive ? 'bg-white text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {st.id}
                  </span>
                  <IconComponent className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{st.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="relative max-w-4xl mx-auto hidden md:block">
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden border border-emerald-100">
            <div 
              ref={progressLineRef} 
              className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-lime-500 rounded-full w-0"
            ></div>
          </div>
          <div className="flex justify-between items-center -mt-3.5 px-2">
            {steps.map((s) => (
              <div 
                key={s.id} 
                onClick={() => setActiveTab(s.id)}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black cursor-pointer transition-all duration-300 border-2 ${
                  activeTab >= s.id
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/40 scale-110'
                    : 'bg-white text-slate-500 border-slate-300'
                }`}
              >
                {s.id}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Feature Spotlight for Active Tab */}
        <div 
          ref={interactiveViewRef}
          className="rounded-3xl bg-white/95 border border-emerald-100 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-emerald-900/5 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Media Column (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 shadow-xl border border-emerald-100 group">
                <img 
                  src={currentActiveStep.image} 
                  alt={currentActiveStep.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                
                {/* Badge Top */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 shadow-xs">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>Módulo 0{currentActiveStep.id}</span>
                  </span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="font-extrabold text-sm drop-shadow">
                    {currentActiveStep.tagline}
                  </span>
                </div>
              </div>
            </div>

            {/* Description & Metrics Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold">
                  <CurrentIcon className="w-4 h-4 text-emerald-700" />
                  <span>{currentActiveStep.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {currentActiveStep.title}
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {currentActiveStep.shortDesc}
                </p>
              </div>

              {/* Real-time KPI cards */}
              <div className="grid grid-cols-3 gap-3">
                {currentActiveStep.metrics.map((metric, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                    <span className="text-slate-600 text-[11px] block truncate font-medium">{metric.label}</span>
                    <span className="text-lg sm:text-xl font-black font-mono text-emerald-900 block mt-0.5">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setSelectedStep(currentActiveStep)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
                >
                  <span>Ver cómo funciona en finca</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Monitoreo 24/7 con trazabilidad digital</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 4 Cards Grid with GSAP Stagger Reveal */}
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            const isSelected = activeTab === step.id;

            return (
              <div
                key={step.id}
                onClick={() => setActiveTab(step.id)}
                className={`ecosystem-card group cursor-pointer rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl relative overflow-hidden ${
                  isSelected
                    ? 'bg-white border-2 border-emerald-600 shadow-emerald-900/10 -translate-y-2 ring-4 ring-emerald-50'
                    : 'bg-white/95 border border-emerald-100 hover:border-emerald-400 hover:-translate-y-1 shadow-emerald-900/5'
                }`}
              >
                {/* Card Top Icon & Badge */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-colors ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'bg-emerald-50 group-hover:bg-emerald-100 text-emerald-700'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-2xl font-black font-mono text-slate-300 group-hover:text-emerald-500/60 transition-colors">
                      0{step.id}
                    </span>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative h-36 rounded-2xl overflow-hidden bg-slate-100">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2 left-3 right-3 text-[11px] font-bold text-white truncate drop-shadow">
                      {step.badge}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-1.5">
                    <h4 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                      {step.shortTitle}
                    </h4>
                    <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                      {step.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="pt-4 mt-4 border-t border-emerald-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-emerald-800 font-bold">
                    {step.metrics[0].value}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStep(step);
                    }}
                    className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-bold text-[11px]"
                  >
                    <span>Ficha técnica</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Impact Banner */}
        <div 
          ref={bannerRef}
          className="rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white border border-emerald-700 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="space-y-1">
            <h4 className="text-lg font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
              <span>Un modelo protegido contra las sequías y el cambio climático</span>
            </h4>
            <p className="text-emerald-100/90 text-sm max-w-2xl">
              Mientras la ganadería convencional detiene su engorde en verano por falta de pastos, 
              INNOVAGAN mantiene una tasa de crecimiento constante de <strong className="text-white">+1.2 kg/día</strong> los 365 días del año.
            </p>
          </div>

          <a 
            href="#catalogo"
            className="shrink-0 px-6 py-3 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-black text-sm shadow-lg transition hover:scale-105"
          >
            Conocer Lotes Disponibles
          </a>
        </div>

      </div>

      {/* Modal: "Ver cómo funciona en finca" */}
      {selectedStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-emerald-100 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Image Header */}
            <div className="relative h-56 overflow-hidden bg-slate-100">
              <img 
                src={selectedStep.image} 
                alt={selectedStep.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

              <button
                onClick={() => setSelectedStep(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 border border-slate-200 transition z-10 shadow-sm"
                aria-label="Cerrar ventana explicativa"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-extrabold uppercase shadow-sm">
                  {selectedStep.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1 drop-shadow">
                  {selectedStep.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              
              {/* Highlight KPI Card */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-600 block font-medium">{selectedStep.fincaDetails.kpiLabel}</span>
                  <span className="text-2xl font-black font-mono text-emerald-950">{selectedStep.fincaDetails.kpi}</span>
                </div>
                <div className="text-right max-w-xs text-xs text-slate-700 font-semibold">
                  {selectedStep.tagline}
                </div>
              </div>

              {/* In Finca Explanation */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Operación Real en Finca:
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {selectedStep.fincaDetails.explanation}
                </p>
              </div>

              {/* Finca Equipment Checklist */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Equipamiento e Infraestructura Implementada:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedStep.fincaDetails.fincaEquipment.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commercial Benefit Callout */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                <strong className="text-emerald-950 block font-bold mb-1">Impacto Comercial para el Comprador:</strong>
                {selectedStep.fincaDetails.benefit}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedStep(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition"
              >
                Entendido
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
