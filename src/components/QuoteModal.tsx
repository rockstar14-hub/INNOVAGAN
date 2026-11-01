import React, { useState } from 'react';
import { CattleBatch } from '../types/cattle';
import { 
  X, 
  CheckCircle2, 
  Send
} from 'lucide-react';

interface QuoteModalProps {
  batch: CattleBatch | null;
  currency: 'COP' | 'USD';
  onClose: () => void;
  onOpenAdvisorWithText: (text: string) => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  batch,
  currency,
  onClose,
  onOpenAdvisorWithText,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('Córdoba / Valle del Sinú');
  const [marketType, setMarketType] = useState(batch?.destination || 'Exportación Oriente Medio');
  const [headsCount, setHeadsCount] = useState<number>(batch ? batch.heads : 80);
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `INV-COT-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefCode(code);
    setSubmitted(true);
  };

  const avgWeight = batch ? batch.currentAvgWeight : 450;
  const priceKgCOP = batch ? batch.pricePerKgCOP : 9950;
  const priceKgUSD = batch ? batch.pricePerKgUSD : 2.55;

  const totalKg = headsCount * avgWeight;
  const totalAmountCOP = totalKg * priceKgCOP;
  const totalAmountUSD = totalKg * priceKgUSD;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-emerald-100 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 bg-emerald-50/80 border-b border-emerald-100 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider block">
              Atención Comercial Directa
            </span>
            <h3 className="text-xl font-black text-slate-900">
              {batch ? `Cotizar ${batch.name}` : 'Solicitar Cotización de Ganado'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition shadow-xs"
            aria-label="Cerrar modal de cotización"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-700 shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                Código: {refCode}
              </span>
              <h4 className="text-2xl font-black text-slate-900">
                ¡Cotización Generada Exitosamente!
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Estimado(a) <strong className="text-slate-900">{fullName}</strong>, nuestro equipo comercial se comunicará a tu WhatsApp (<strong className="text-slate-900">{phone}</strong>) con la proforma formal y certificados sanitarios ICA.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-slate-700 space-y-2 max-w-sm mx-auto text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Volumen Estimado:</span>
                <span className="font-bold text-slate-900">{headsCount} cabezas (~{totalKg.toLocaleString()} kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Proyectado:</span>
                <span className="font-mono font-bold text-emerald-900">
                  {currency === 'COP' ? `COP $${totalAmountCOP.toLocaleString()}` : `USD $${Math.round(totalAmountUSD).toLocaleString()}`}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md shadow-emerald-600/20"
              >
                Volver a la Página Principal
              </button>
            </div>
          </div>
        ) : (
          /* Simplified Commercial Inquiry Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nombre Completo / Razón Social *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej. Hacienda El Trapiche / Juan Gómez"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-xs transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+57 310 123 4567"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-xs transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contacto@empresa.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-xs transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mercado Destino
                </label>
                <select
                  value={marketType}
                  onChange={(e) => setMarketType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-emerald-500 shadow-xs"
                >
                  <option value="Exportación Oriente Medio">Exportación Oriente Medio (Jordania/Egipto)</option>
                  <option value="Exportación Caribe">Exportación Caribe (Líbano/Islas)</option>
                  <option value="Cebadores Nacionales (Colombia)">Ceba Nacional (Frigoríficos Colombia)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Ubicación de Entrega
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-emerald-500 shadow-xs"
                >
                  <option value="Puerto de Barranquilla (FOB)">Puerto de Barranquilla (FOB Buque)</option>
                  <option value="Puerto de Cartagena (FOB)">Puerto de Cartagena (FOB Buque)</option>
                  <option value="Córdoba / Valle del Sinú">En Báscula Finca (Córdoba / Sinú)</option>
                  <option value="Magdalena Medio">En Báscula Finca (Magdalena Medio)</option>
                  <option value="Meta / Llanos">En Báscula Finca (Llanos Orientales)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Cantidad de Cabezas Estimadas
                </label>
                <input
                  type="number"
                  min="10"
                  max="1000"
                  value={headsCount}
                  onChange={(e) => setHeadsCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-mono focus:outline-none focus:border-emerald-500 shadow-xs transition"
                />
              </div>
            </div>

            {/* Instant Price Indicator */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">
                  Valor Estimado del Lote ({totalKg.toLocaleString()} kg):
                </span>
                <span className="text-xl font-black font-mono text-emerald-950">
                  {currency === 'COP'
                    ? `COP $${totalAmountCOP.toLocaleString()}`
                    : `USD $${Math.round(totalAmountUSD).toLocaleString()}`}
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-900 bg-emerald-100 font-bold px-2.5 py-1 rounded-lg border border-emerald-200">
                100% Microchips ICA
              </span>
            </div>

            {/* Submit Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition shadow-xs"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all hover:scale-105 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Solicitar Proforma Comercial</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
