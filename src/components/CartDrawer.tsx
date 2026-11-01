import React, { useState } from 'react';
import { CartItem } from '../types/cattle';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  PhoneCall, 
  Send, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Scale, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'COP' | 'USD';
  onUpdateQuantity: (batchId: string, heads: number) => void;
  onRemoveItem: (batchId: string) => void;
  onClearCart: () => void;
  onOpenAdvisorWithText: (text: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenAdvisorWithText,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryRegion, setDeliveryRegion] = useState('Puerto de Barranquilla (FOB Buque)');
  const [isSuccess, setIsSuccess] = useState(false);
  const [proformaCode, setProformaCode] = useState('');

  if (!isOpen) return null;

  // Real-time financial calculations
  const totalHeads = items.reduce((acc, item) => acc + item.heads, 0);
  
  const totalWeightKg = items.reduce(
    (acc, item) => acc + item.heads * item.batch.currentAvgWeight,
    0
  );

  const totalAmountCOP = items.reduce((acc, item) => {
    const itemWeight = item.heads * item.batch.currentAvgWeight;
    return acc + itemWeight * item.batch.pricePerKgCOP;
  }, 0);

  const totalAmountUSD = items.reduce((acc, item) => {
    const itemWeight = item.heads * item.batch.currentAvgWeight;
    return acc + itemWeight * item.batch.pricePerKgUSD;
  }, 0);

  const generateProformaText = () => {
    const itemsList = items
      .map(
        (it) =>
          `• ${it.heads} cabeza(s) de ${it.batch.name} (${it.batch.breed}) - Peso est: ${it.batch.currentAvgWeight} kg/res - Subtotal: ${
            currency === 'COP'
              ? `COP $${(it.heads * it.batch.currentAvgWeight * it.batch.pricePerKgCOP).toLocaleString()}`
              : `USD $${(it.heads * it.batch.currentAvgWeight * it.batch.pricePerKgUSD).toFixed(2)}`
          }`
      )
      .join('\n');

    return `*SOLICITUD DE COTIZACIÓN - INNOVAGAN SAS*
Código: ${proformaCode || 'INV-PROFORMA-WEB'}
Cliente: ${fullName || 'Productor / Inversionista'}
WhatsApp: ${phone || 'No especificado'}
Entrega: ${deliveryRegion}

*RESUMEN DEL PEDIDO:*
${itemsList}

*TOTALES PROYECTADOS:*
- Total Cabezas: ${totalHeads}
- Biomasa Bruta: ${totalWeightKg.toLocaleString()} kg
- Valor Estimado: ${
      currency === 'COP'
        ? `COP $${totalAmountCOP.toLocaleString()}`
        : `USD $${totalAmountUSD.toFixed(2)}`
    }

Certificación: 100% Caravanas RFID SINIGAN / Resolución 0126 de 2022.`;
  };

  const handleCompleteOrder = (method: 'whatsapp' | 'email') => {
    const code = `INV-PRO-${Math.floor(100000 + Math.random() * 900000)}`;
    setProformaCode(code);
    setIsSuccess(true);

    const proformaText = generateProformaText();

    if (method === 'whatsapp') {
      const waUrl = `https://wa.me/573104452890?text=${encodeURIComponent(proformaText)}`;
      window.open(waUrl, '_blank');
    } else {
      const mailtoUrl = `mailto:comercial@innovagan.com.co?subject=${encodeURIComponent(
        `Cotización Ganadera INNOVAGAN - ${code}`
      )}&body=${encodeURIComponent(proformaText)}`;
      window.location.href = mailtoUrl;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-sm overflow-hidden animate-in fade-in duration-200">
      
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-lg h-full bg-white border-l border-emerald-100 shadow-2xl flex flex-col z-10 overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-5 bg-emerald-50/90 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <span>Cotización de Ganado</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                  {totalHeads} {totalHeads === 1 ? 'cabeza' : 'cabezas'}
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Selección flexible a partir de 1 cabeza individual
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition shadow-xs"
            aria-label="Cerrar carrito de cotización"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {items.length === 0 ? (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 text-slate-500">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h4 className="text-lg font-bold text-slate-900">Tu cotización está vacía</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Explora nuestro catálogo de lotes bovinos y añade desde <strong>1 cabeza de ganado</strong> en adelante para ver el cálculo financiero en tiempo real.
                </p>
              </div>
              <button
  onClick={() => {
    onClose();
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  }}
  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
>
  Ver Lotes Disponibles
</button>
            </div>
          ) : isSuccess ? (
            /* Success confirmation */
            <div className="text-center p-6 space-y-4 my-auto">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-700 shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                  {proformaCode}
                </span>
                <h4 className="text-xl font-black text-slate-900">
                  ¡Orden de Cotización Lista!
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                  Hemos generado tu proforma comercial. Puedes enviarla directamente a nuestro equipo por WhatsApp o Correo para coordinar pesaje e inspección ICA.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Cabezas Totales:</span>
                  <span className="font-bold text-slate-900">{totalHeads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Peso Total Bruto:</span>
                  <span className="font-bold text-slate-900">{totalWeightKg.toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between border-t border-emerald-200 pt-1.5">
                  <span className="text-slate-700 font-bold">Total Proforma:</span>
                  <span className="font-mono font-black text-emerald-900 text-sm">
                    {currency === 'COP'
                      ? `COP $${totalAmountCOP.toLocaleString()}`
                      : `USD $${totalAmountUSD.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleCompleteOrder('whatsapp')}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Reenviar a WhatsApp (+57 310 445 2890)</span>
                </button>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setIsCheckingOut(false);
                    onClearCart();
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                >
                  Finalizar y Volver al Catálogo
                </button>
              </div>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form Screen */
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCompleteOrder('whatsapp');
              }}
              className="space-y-4 animate-in fade-in duration-150"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h4 className="text-sm font-extrabold text-slate-900">
                  Datos de Contacto para la Proforma
                </h4>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-emerald-700 hover:underline font-bold"
                >
                  Volver al listado
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nombre Completo / Empresa *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej. Juan Valderrama / Ganadera El Sinú"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Teléfono WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+57 310 445 2890"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Correo Electrónico (Opcional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="compras@agropecuaria.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Punto de Entrega / Destino
                </label>
                <select
                  value={deliveryRegion}
                  onChange={(e) => setDeliveryRegion(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500 shadow-xs"
                >
                  <option value="Puerto de Barranquilla (FOB Buque)">Puerto de Barranquilla (FOB Buque Exportación)</option>
                  <option value="Puerto de Cartagena (FOB Buque)">Puerto de Cartagena (FOB Buque Exportación)</option>
                  <option value="Hacienda El Porvenir (Montería, Córdoba)">En Báscula Finca - Montería (Valle del Sinú)</option>
                  <option value="Agropecuaria San Jerónimo (Puerto Berrío, Magdalena Medio)">En Báscula Finca - Puerto Berrío (Magdalena Medio)</option>
                  <option value="Rancho La Esmeralda (Villavicencio, Meta)">En Báscula Finca - Villavicencio (Llanos)</option>
                  <option value="Despacho a otra finca nacional (1+ cabezas)">Despacho Nacional con Guía ICA (Desde 1 cabeza)</option>
                </select>
              </div>

              <div className="pt-3 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/25 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Orden a WhatsApp Directo</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCompleteOrder('email')}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <span>Generar Proforma por Correo</span>
                </button>
              </div>
            </form>
          ) : (
            /* Items List with Live Financial Calculation */
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-200">
                <span>Reses seleccionadas ({items.length} lotes)</span>
                <button
                  onClick={onClearCart}
                  className="text-rose-600 hover:underline font-semibold text-[11px]"
                >
                  Vaciar carrito
                </button>
              </div>

              {items.map(({ batch, heads }) => {
                const itemTotalKg = heads * batch.currentAvgWeight;
                const itemSubtotalCOP = itemTotalKg * batch.pricePerKgCOP;
                const itemSubtotalUSD = itemTotalKg * batch.pricePerKgUSD;

                return (
                  <div
                    key={batch.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs hover:border-emerald-200 transition"
                  >
                    {/* Item Top Info */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-3">
                        <img
                          src={batch.imageUrl}
                          alt={batch.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                            {batch.id}
                          </span>
                          <h5 className="text-xs font-bold text-slate-900 leading-tight">
                            {batch.name}
                          </h5>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="truncate max-w-[180px]">{batch.location}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(batch.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Eliminar del pedido"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity Picker & Real-Time Math */}
                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                      
                      {/* Quantity buttons (starting from 1) */}
                      <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(batch.id, Math.max(1, heads - 1))}
                          className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
                          title="Restar 1 cabeza"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-mono font-black text-slate-900 text-xs">
                          {heads}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(batch.id, heads + 1)}
                          className="w-6 h-6 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center justify-center transition"
                          title="Sumar 1 cabeza"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Calculations */}
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block">
                          {heads} {heads === 1 ? 'res' : 'reses'} × {batch.currentAvgWeight} kg (~{itemTotalKg.toLocaleString()} kg)
                        </span>
                        <span className="font-mono font-black text-emerald-900 text-sm">
                          {currency === 'COP'
                            ? `COP $${itemSubtotalCOP.toLocaleString()}`
                            : `USD $${itemSubtotalUSD.toFixed(2)}`}
                        </span>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Drawer Bottom Financial Summary & CTA */}
        {items.length > 0 && !isSuccess && !isCheckingOut && (
          <div className="p-5 bg-white border-t border-emerald-100 space-y-4 shadow-lg">
            
            {/* Live Financial Breakdown */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Cabezas Seleccionadas:</span>
                <span className="font-bold text-slate-900 font-mono">{totalHeads} reses</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Biomasa Total Estimada:</span>
                <span className="font-bold text-slate-900 font-mono">{totalWeightKg.toLocaleString()} kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Certificaciones Incluidas:</span>
                <span className="font-bold text-emerald-800">100% RFID ICA + Res. 0126</span>
              </div>

              <div className="border-t border-emerald-200 pt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                    Subtotal Acumulado
                  </span>
                  <span className="text-lg font-black font-mono text-emerald-950">
                    {currency === 'COP'
                      ? `COP $${totalAmountCOP.toLocaleString()}`
                      : `USD $${totalAmountUSD.toFixed(2)}`}
                  </span>
                </div>
                <div className="text-right text-[10px] text-slate-500">
                  Precios en pie según báscula
                </div>
              </div>
            </div>

            {/* Complete Order Primary Button */}
            <div className="space-y-2">
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Completar Orden de Cotización</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const summaryText = `Hola AgroBot, tengo en mi carrito de cotización ${totalHeads} cabezas de ganado (${totalWeightKg.toLocaleString()} kg totales) con un valor proyectado de ${
                    currency === 'COP' ? `COP $${totalAmountCOP.toLocaleString()}` : `USD $${totalAmountUSD.toFixed(2)}`
                  }. ¿Qué recomendaciones me das para transporte y cuarentena?`;
                  onClose();
                  onOpenAdvisorWithText(summaryText);
                }}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 text-emerald-800 border border-emerald-200 font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Analizar este pedido con AgroBot</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
