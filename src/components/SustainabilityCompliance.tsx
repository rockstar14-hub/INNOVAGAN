import React from 'react';
import { SUSTAINABILITY_PILLARS, RESOLUTION_0126_COMPLIANCE } from '../data/mockData';
import { 
  ShieldCheck, 
  Globe2, 
  CheckCircle2, 
  Award, 
  FileCheck
} from 'lucide-react';

export const SustainabilityCompliance: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-emerald-200/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Módulo 5: Marco Normativo, Resolución 0126 de 2022 & Objetivos ODS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Sostenibilidad Auditada & Ganadería Regenerativa
        </h2>
        <p className="text-slate-700 text-sm mt-1 max-w-2xl">
          En INNOVAGAN demostramos que la rentabilidad de alta eficiencia y la restauración 
          ecosistémica son inseparables. Cumplimos con los estándares más rigurosos de Colombia y el mundo.
        </p>
      </div>

      {/* Main Resolution 0126 of 2022 Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 border border-emerald-700 p-6 sm:p-8 shadow-xl text-white">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-emerald-200 text-xs font-bold backdrop-blur-sm">
            <Award className="w-4 h-4 text-emerald-300" />
            <span>Marco Legal República de Colombia</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">
            {RESOLUTION_0126_COMPLIANCE.normative}
          </h3>

          <p className="text-sm text-emerald-100/90 leading-relaxed">
            {RESOLUTION_0126_COMPLIANCE.declaration}. Establece los criterios para transformar la ganadería 
            tradicional en sistemas agroforestales, silvopastoriles y libres de deforestación, garantizando la 
            protección de cuencas hidrográficas y el bienestar animal.
          </p>
        </div>

        {/* 4 Pillars of Res. 0126 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-emerald-700/60">
          {RESOLUTION_0126_COMPLIANCE.pillars.map((pillar, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-950 bg-emerald-400 font-bold px-2 py-0.5 rounded shadow-xs">
                  {pillar.status}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              </div>
              <h4 className="text-xs font-bold text-white">
                {pillar.name}
              </h4>
              <p className="text-[11px] text-emerald-100/80 leading-normal">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainable Development Goals (ODS) Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-teal-600" />
              <span>Alineación con los Objetivos de Desarrollo Sostenible (ODS de la ONU)</span>
            </h3>
            <p className="text-xs text-slate-600">
              Impacto verificable en 4 ODS estratégicos mediante la adopción de AgTech ganadero.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SUSTAINABILITY_PILLARS.map((ods) => (
            <div
              key={ods.code}
              className="p-5 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300 transition shadow-lg shadow-emerald-900/5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center font-black text-xs font-mono text-emerald-800">
                    {ods.code}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {ods.title}
                    </h4>
                    <span className="text-[11px] font-semibold text-emerald-700">
                      {ods.badge}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {ods.description}
              </p>

              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                  Métrica de Impacto Verificado:
                </span>
                <span className="text-emerald-900 font-bold block mt-0.5">
                  {ods.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sanitary & Export Accreditations */}
      <div className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-md space-y-4">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-emerald-600" />
          <span>Sellos & Acreditaciones Sanitarias Oficiales</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">ICA SINIGAN</strong>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Sistema Nacional de Identificación, Información y Trazabilidad Animal con caravanas electrónicas RFID de radiofrecuencia ultra-alta.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">Hato Libre de Brucelosis y Aftosa</strong>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Certificación epidemiológica vigente con muestreos serológicos al 100% de los lotes de exportación y ceba.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">Bienestar Animal OMSA & Halal</strong>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Adaptación nutricional previa al embarque marítimo para evitar deshidratación y asegurar la salud ruminal en alta mar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
