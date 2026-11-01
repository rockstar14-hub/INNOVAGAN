import React, { useState } from 'react';
import { 
  Sprout, 
  Droplets, 
  SunMedium, 
  Ship, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Activity, 
  ShieldCheck, 
  X,
  Gauge,
  Sparkles,
  Zap
} from 'lucide-react';

interface EcosystemStep {
  id: number;
  title: string;
  tagline: string;
  shortDesc: string;
  badge: string;
  icon: React.ElementType;
  image: string;
  fincaDetails: {
    kpi: string;
    kpiLabel: string;
    explanation: string;
    fincaEquipment: string[];
    benefit: string;
  };
}

export const EcosystemSection: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<EcosystemStep | null>(null);

  const steps: EcosystemStep[] = [
    {
      id: 1,
      title: 'Paso 1: Nutrición con Forraje Verde Hidropónico (FVH)',
      tagline: 'Superalimento fresco producido 365 días al año',
      shortDesc: 'Cultivamos maíz y cebada forrajera en bandejas verticales sin tierra. En solo 8 días obtenemos un forraje jugoso con 19% de proteína cruda, reduciendo hasta un 85% el consumo de agua.',
      badge: 'Nutrición In-Situ',
      icon: Sprout,
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=800&q=80',
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
      title: 'Paso 2: Fertirriego Automatizado por Sensores',
      tagline: 'Cada gota cuenta: agua y biol orgánico en la raíz',
      shortDesc: 'Sondas de humedad TDR miden en tiempo real la sed del suelo. Cuando la pradera lo necesita, el sistema riega con agua enriquecida con biofertilizante de nuestro propio compost.',
      badge: 'Agua & Biol Circular',
      icon: Droplets,
      image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80',
      fincaDetails: {
        kpi: '-80% Desperdicio Hídrico',
        kpiLabel: 'Eficiencia radicular',
        explanation: 'Eliminamos la intuición y el riego por inundación. Sensores TDR/capacitivos enterrados a 15 y 30 cm de profundidad miden la humedad volumétrica real. Cuando el suelo baja del 26%, las electroválvulas solares se activan solas inyectando lixiviados biol ricos en microorganismos benéficos.',
        fincaEquipment: [
          'Sondas TDR dieléctricas de precisión radicular',
          'Electroválvulas solares de bajo consumo energético',
          'Dosificadores Venturi para biofertilizante circular',
          'Controlador inteligente con enlace a app móvil'
        ],
        benefit: 'Mantiene las pasturas siempre verdes y nutricionales sin quemar el suelo con fertilizantes químicos.'
      }
    },
    {
      id: 3,
      title: 'Paso 3: Pastoreo Rotacional con Cercas Solares',
      tagline: 'Método Voisin: máxima fotosíntesis y confort animal',
      shortDesc: 'Dividimos la finca en cuarteles intensivos energizados por paneles solares. Los animales rotan cada 1-2 días comiendo el pasto en su punto óptimo, mientras el resto del suelo descansa y se regenera.',
      badge: 'Manejo Regenerativo',
      icon: SunMedium,
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
      fincaDetails: {
        kpi: '4.5 cabezas / ha',
        kpiLabel: 'Capacidad de carga vs 1.0 trad.',
        explanation: 'Al concentrar el pastoreo en franjas pequeñas y permitir descansos de 30 a 35 días, las raíces crecen profundas acumulando carbono en el suelo. Las cercas eléctricas solares de alto voltaje (8 kV) educan al animal sin causarle estrés, complementadas con árboles silvopastoriles para sombra natural.',
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
      title: 'Paso 4: Trazabilidad Total & Exportación en Pie',
      tagline: 'De la pradera colombiana a los puertos del mundo',
      shortDesc: 'Cada novillo lleva un microchip RFID oficial ICA. Monitoreamos su curva de crecimiento hasta los 500 kg y gestionamos cuarentenas y logística portuaria directa a Oriente Medio y el Caribe.',
      badge: 'Calidad Certificada',
      icon: Ship,
      image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
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

  return (
    <section id="ecosistema" className="py-20 bg-stone-950 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-950/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>El Ecosistema Productivo INNOVAGAN</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            ¿Cómo logramos ganancias de peso récord cuidando el planeta?
          </h2>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Reemplazamos la ganadería extensiva tradicional por un <strong>circuito biológico y tecnológico cerrado</strong>. 
            Descubre paso a paso cómo transformamos agua, sol y genética en carne de altísima eficiencia.
          </p>
        </div>

        {/* 4 Interactive Commercial Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.id}
                className="group rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-emerald-600/70 p-7 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-emerald-950/30 hover:-translate-y-1"
              >
                <div className="space-y-5">
                  {/* Step Image with Overlay Badge */}
                  <div className="relative h-52 rounded-2xl overflow-hidden bg-stone-950">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent"></div>

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-stone-950/90 text-emerald-300 border border-emerald-700/60 text-xs font-bold backdrop-blur-md">
                        {step.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5 text-white">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500 text-stone-950 flex items-center justify-center font-black shrink-0">
                        <Icon className="w-5 h-5 text-stone-950" />
                      </div>
                      <span className="font-bold text-sm text-stone-200">
                        {step.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Text Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-stone-300 text-sm leading-relaxed">
                      {step.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-6 mt-6 border-t border-stone-800/80 flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-medium">
                    Eficiencia Comprobada en Campo
                  </span>
                  <button
                    onClick={() => setSelectedStep(step)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-stone-950 border border-emerald-700/50 hover:border-emerald-500 transition-all"
                  >
                    <span>Ver cómo funciona en finca</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Impact Banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-stone-900 to-emerald-950/60 border border-emerald-800/60 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-lg font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Un modelo protegido contra las sequías y el cambio climático</span>
            </h4>
            <p className="text-stone-300 text-sm max-w-2xl">
              Mientras la ganadería convencional detiene su engorde en verano por falta de pastos, 
              INNOVAGAN mantiene una tasa de crecimiento constante de <strong>1.2 kg/día</strong> los 365 días del año.
            </p>
          </div>

          <a 
            href="#catalogo"
            className="shrink-0 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition hover:scale-105"
          >
            Conocer Lotes Disponibles
          </a>
        </div>

      </div>

      {/* Modal: "Ver cómo funciona en finca" */}
      {selectedStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-700 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Image Header */}
            <div className="relative h-56 overflow-hidden">
              <img 
                src={selectedStep.image} 
                alt={selectedStep.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>

              <button
                onClick={() => setSelectedStep(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-300 hover:text-white border border-stone-800 transition z-10"
                aria-label="Cerrar ventana explicativa"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-stone-950 text-xs font-extrabold uppercase">
                  {selectedStep.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {selectedStep.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              
              {/* Highlight KPI Card */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-emerald-900/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 block">{selectedStep.fincaDetails.kpiLabel}</span>
                  <span className="text-2xl font-black font-mono text-emerald-400">{selectedStep.fincaDetails.kpi}</span>
                </div>
                <div className="text-right max-w-xs text-xs text-stone-300">
                  {selectedStep.tagline}
                </div>
              </div>

              {/* In Finca Explanation */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Operación Real en Finca:
                </h4>
                <p className="text-stone-300 text-sm leading-relaxed">
                  {selectedStep.fincaDetails.explanation}
                </p>
              </div>

              {/* Finca Equipment Checklist */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Equipamiento e Infraestructura Implementada:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedStep.fincaDetails.fincaEquipment.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commercial Benefit Callout */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-200">
                <strong className="text-white block font-bold mb-1">Impacto Comercial para el Comprador:</strong>
                {selectedStep.fincaDetails.benefit}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-5 bg-stone-950 border-t border-stone-800 flex justify-end gap-3">
              <button
                onClick={() => setSelectedStep(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 transition"
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
