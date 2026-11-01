import React, { useState } from 'react';
import {
  CheckCircle2,
  Fence,
  Leaf,
  MapPin,
  Sprout,
  Waves,
  Wheat,
  X,
} from 'lucide-react';

const services = [
  { name: 'Producción de forrajes', icon: Wheat, image: '/images/fvh-modulo.png' },
  { name: 'Planificación de rotaciones', icon: Leaf, image: '/images/rotacion-potreros.png' },
  { name: 'Diseño de sistema de riego', icon: Waves, image: '/images/riego-modulo.png' },
  { name: 'Montaje de cercados eléctricos solares', icon: Fence, image: '/images/cerca-solar.jpg' },
  { name: 'Sistemas Silvopastoriles', icon: Leaf, image: '/images/silvopastoril.jpg' },
  { name: 'Sistemas de ramoneo', icon: Sprout, image: '/images/ramoneo.jpg' },
];

interface ServiceRequest {
  fullName: string;
  location: string;
  phone: string;
  email: string;
}

const emptyRequest: ServiceRequest = {
  fullName: '',
  location: '',
  phone: '',
  email: '',
};

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [request, setRequest] = useState<ServiceRequest>(emptyRequest);
  const [submitted, setSubmitted] = useState(false);

  const closeModal = () => {
    setSelectedService(null);
    setRequest(emptyRequest);
    setSubmitted(false);
  };

  return (
    <section id="servicios" className="py-20 bg-transparent border-b border-emerald-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Soluciones para tu finca
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Nuestros Servicios
          </h2>
          <p className="text-slate-700">
            Acompañamiento y soluciones regenerativas adaptadas a las necesidades de tu operación.
            Selecciona un servicio para solicitar una cotización.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ name, icon: Icon, image }) => (
            <button
              key={name}
              type="button"
              onClick={() => setSelectedService(name)}
              className="group overflow-hidden rounded-3xl bg-white/90 border border-emerald-100 text-left shadow-lg shadow-emerald-900/5 transition hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <div className="relative h-44 overflow-hidden bg-emerald-50">
                {image ? (
                  <img
                    src={image}
                    alt={`Referencia de ${name}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
                    <Icon className="h-12 w-12 text-emerald-600/70" aria-hidden="true" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 to-transparent" />
              </div>
              <div className="flex min-h-20 items-center justify-between gap-3 p-5">
                <h3 className="font-bold text-slate-900">{name}</h3>
                <span className="shrink-0 text-sm font-bold text-emerald-700">Cotizar</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-request-title"
            className="relative my-8 w-full max-w-lg rounded-3xl border border-emerald-100 bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Cerrar solicitud de cotización"
              className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="space-y-4 py-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                <h2 id="service-request-title" className="text-xl font-black text-slate-900">
                  Solicitud recibida
                </h2>
                <p className="text-slate-700">
                  Gracias por confiar en nosotros, un asesor de INNOVAGAN se comunicará contigo.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Solicitud de servicio
                </span>
                <h2 id="service-request-title" className="mt-1 pr-8 text-2xl font-black text-slate-900">
                  {selectedService}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Déjanos tus datos y nuestro equipo se pondrá en contacto contigo.
                </p>

                <form
                  className="mt-6 space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <label className="block space-y-1.5 text-sm font-semibold text-slate-700">
                    <span>Nombre completo</span>
                    <input
                      required
                      autoComplete="name"
                      value={request.fullName}
                      onChange={(event) => setRequest({ ...request, fullName: event.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    />
                  </label>
                  <label className="block space-y-1.5 text-sm font-semibold text-slate-700">
                    <span>Región / Ubicación a donde va el servicio</span>
                    <span className="relative block">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        required
                        autoComplete="address-level2"
                        value={request.location}
                        onChange={(event) => setRequest({ ...request, location: event.target.value })}
                        className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3.5 font-normal focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                      />
                    </span>
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block space-y-1.5 text-sm font-semibold text-slate-700">
                      <span>Teléfono</span>
                      <input
                        required
                        type="tel"
                        autoComplete="tel"
                        value={request.phone}
                        onChange={(event) => setRequest({ ...request, phone: event.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                      />
                    </label>
                    <label className="block space-y-1.5 text-sm font-semibold text-slate-700">
                      <span>Correo electrónico</span>
                      <input
                        required
                        type="email"
                        autoComplete="email"
                        value={request.email}
                        onChange={(event) => setRequest({ ...request, email: event.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                      />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-600 px-5 py-3 font-extrabold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-500"
                  >
                    Solicitar cotización
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
