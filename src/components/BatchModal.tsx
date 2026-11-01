import React from 'react';
import { CattleBatch } from '../types/cattle';
import { 
  X, 
  TrendingUp, 
  Radio, 
  MapPin, 
  Layers, 
  Scale, 
  CheckCircle2, 
  ChevronRight
} from 'lucide-react';

interface BatchModalProps {
  batch: CattleBatch | null;
  currency: 'COP' | 'USD';
  onClose: () => void;
  onRequestQuote: (batch: CattleBatch) => void;
}

export const BatchModal: React.FC<BatchModalProps> = ({
  batch,
  currency,
  onClose,
  onRequestQuote,
}) => {
  if (!batch) return null;

  const history = batch.growthHistory;
  const maxWeight = Math.max(...history.map((h) => Math.max(h.weight, h.conventionalWeight, h.target))) + 30;
  const minWeight = Math.min(...history.map((h) => Math.min(h.weight, h.conventionalWeight))) - 20;

  const chartHeight = 160;
  const chartWidth = 500;
  const paddingX = 35;
  const paddingY = 20;
  const innerW = chartWidth - paddingX * 2;
  const innerH = chartHeight - paddingY * 2;

  const getX = (index: number) => paddingX + (index / (history.length - 1)) * innerW;
  const getY = (w: number) => chartHeight - paddingY - ((w - minWeight) / (maxWeight - minWeight)) * innerH;

  const innovaganPoints = history.map((h, i) => `${getX(i)},${getY(h.weight)}`).join(' ');
  const conventionalPoints = history.map((h, i) => `${getX(i)},${getY(h.conventionalWeight)}`).join(' ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-emerald-100 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Top Header with Close Button */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100">
          <img
            src={batch.imageUrl}
            alt={batch.name}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-transparent"></div>

          <button
            onClick={onClose}
            aria-label="Cerrar ventana de detalles del lote"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 border border-slate-200 transition z-10 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-emerald-800 bg-white/95 px-2 py-0.5 rounded shadow-xs">
                  {batch.id}
                </span>
                <span className="text-xs font-bold text-emerald-300 drop-shadow">
                  {batch.breed}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow">
                {batch.name}
              </h3>
              <p className="text-xs text-slate-200 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                <span>{batch.location}</span>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] text-slate-300 block uppercase tracking-wider font-medium">
                Precio Referencia en Pie:
              </span>
              <span className="text-2xl font-black font-mono text-emerald-300 drop-shadow">
                {currency === 'COP'
                  ? `COP $${batch.pricePerKgCOP.toLocaleString()}/kg`
                  : `USD $${batch.pricePerKgUSD.toFixed(2)}/kg`}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[calc(85vh-14rem)] overflow-y-auto">
          
          {/* Key Metrics Quick Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">GMD Verificada</span>
              <span className="text-xl font-black font-mono text-emerald-900">
                {batch.gmd.toFixed(3)} <span className="text-xs font-normal text-slate-500">kg/d</span>
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                +{(((batch.gmd - batch.conventionalGmd) / batch.conventionalGmd) * 100).toFixed(0)}% vs tradicional
              </span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">Peso Actual / Meta</span>
              <span className="text-xl font-black font-mono text-slate-900">
                {batch.currentAvgWeight} <span className="text-xs font-normal text-slate-500">/ 350 kg</span>
              </span>
              <span className="text-[10px] text-slate-600 block mt-0.5">
                Inventario: {batch.heads} cabezas
              </span>
            </div>

          </div>

          {/* Interactive Growth Curve Comparison (SVG Chart) */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-emerald-100 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Curva de Ganancia de Peso: INNOVAGAN (Verde) vs Convencional (Gris)</span>
                </h4>
                <p className="text-xs text-slate-600">
                  Progreso semanal real con dieta 45% FVH y pastoreo Voisin vs ceba extensiva tradicional.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-3 h-1 bg-emerald-600 rounded-full inline-block"></span>
                  INNOVAGAN (1.28 kg/d)
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-3 h-1 bg-slate-400 rounded-full inline-block"></span>
                  Tradicional (0.45 kg/d)
                </span>
              </div>
            </div>

            {/* SVG Canvas */}
            <div className="overflow-x-auto">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-44 text-xs font-mono">
                {[250, 350, 450, 500].map((w) => {
                  const y = getY(w);
                  return (
                    <g key={w}>
                      <line x1={paddingX} y1={y} x2={chartWidth - paddingX} y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                      <text x={paddingX - 6} y={y + 3} fill="#94a3b8" textAnchor="end" fontSize="9">{w}kg</text>
                    </g>
                  );
                })}

                <polyline
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  points={conventionalPoints}
                />

                <polyline
                  fill="none"
                  stroke="#059669"
                  strokeWidth="3.5"
                  points={innovaganPoints}
                />

                {history.map((h, i) => {
                  const cx = getX(i);
                  const cy = getY(h.weight);
                  return (
                    <g key={i}>
                      <circle cx={cx} cy={cy} r="4.5" fill="#059669" stroke="#ffffff" strokeWidth="2" />
                      <text x={cx} y={chartHeight - 4} fill="#64748b" textAnchor="middle" fontSize="9">
                        {h.week}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Biometrics & Carcass Quality Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                <span>Biometría & Calidad Carnicera</span>
              </h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Edad del Hato:</span>
                  <span className="font-bold text-slate-900">{batch.specs.ageMonths} meses</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Frame Score:</span>
                  <span className="font-bold text-slate-900">{batch.specs.frameScore}</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Espesor Grasa:</span>
                  <span className="font-bold text-emerald-800">{batch.specs.fatThicknessMm} mm</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Área Ojo de Lomo:</span>
                  <span className="font-bold text-emerald-800">{batch.specs.ribEyeAreaCm2} cm²</span>
                </div>
              </div>
            </div>

            {/* RFID & Official Sanitary Passport */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-600" />
                <span>Trazabilidad Oficial & Vacunación</span>
              </h5>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="text-slate-500">Rango Chips RFID:</span>
                  <span className="font-mono text-emerald-800 font-bold">{batch.rfidChipTagRange}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="text-slate-500">Código Registro ICA:</span>
                  <span className="font-mono text-slate-900 font-bold">{batch.icaCode}</span>
                </div>
                <div className="pt-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1 font-semibold">
                    Esquema Vacunal Aplicado:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {batch.vaccines.map((v, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 text-[11px] flex items-center gap-1 shadow-xs">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diet Formulation Detail */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-2">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>Fórmula Nutricional del Lote</span>
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              {batch.dietDescription}. Implementado bajo el modelo <strong className="text-slate-900">{batch.grazingSystem}</strong> con suplementación diaria de sales bioactivadas y minerales orgánicos.
            </p>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            Aptitud comercial: <strong className="text-emerald-800">{batch.destination}</strong> • Fecha estimada embarque: <strong>{batch.estimatedShipmentDate}</strong>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition shadow-xs"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestQuote(batch);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-1.5"
            >
              <span>Solicitar Cotización Formal</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
