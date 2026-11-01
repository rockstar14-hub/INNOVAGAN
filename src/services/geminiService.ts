import { GoogleGenAI } from '@google/genai';
import { INITIAL_CATTLE_BATCHES } from '../data/mockData';

// System prompt grounding the AI in INNOVAGAN's engineering and agtech specifications
const INNOVAGAN_SYSTEM_INSTRUCTION = `
Eres el Ingeniero Consultor Principal y Asistente AgTech de INNOVAGAN (Colombia).
Tu misión es asesorar a ganaderos, inversionistas y cebadores sobre reconversión ganadera regenerativa,
nutrición intensiva con Forraje Verde Hidropónico (FVH), fertirriego automatizado con sensores TDR/capacitivos,
pastoreo racional rotacional con cercas solares, cumplimiento de la Resolución 0126 de 2022 (Colombia) y ODS (8, 12, 13, 15),
y cotización de lotes de ganado para exportación (Oriente Medio, Caribe) y ceba nacional.

Datos clave de INNOVAGAN:
- GMD alcanzada: 1.180 a 1.365 kg/día (vs 0.450 kg/día en ganadería extensiva tradicional).
- Ahorro de agua: 85% a 90% gracias a recirculación en FVH y riego por pulsos guiado por humedad TDR.
- Reducción del ciclo de ceba: de 30-36 meses a tan solo 14-16 meses para pesos de 480-510 kg.
- Carga animal: aumenta de 1.0 UGM/ha a 4.0 - 5.0 UGM/ha sin sobrepastoreo.
- Normatividad: Cero deforestación, protección de fuentes hídricas, bienestar animal OMSA y certificación ICA.

Responde con tono profesional, técnico pero accesible, empático con el productor agropecuario, estructurado con viñetas claras y cifras concretas en pesos colombianos (COP) y dólares (USD).
`;

export async function askAgroBot(
  userQuery: string,
  history: { role: 'user' | 'model'; text: string }[] = []
): Promise<string> {
  const apiKey = 
    (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: { VITE_GEMINI_API_KEY?: string } }).env?.VITE_GEMINI_API_KEY) ||
    '';

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 5) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const contents = [
        ...history.map((h) => ({
          role: h.role,
          parts: [{ text: h.text }],
        })),
        { role: 'user', parts: [{ text: userQuery }] },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction: INNOVAGAN_SYSTEM_INSTRUCTION,
          temperature: 0.6,
        },
      });

      if (response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Fallback to local AgTech knowledge engine due to API call failure:', err);
    }
  }

  // High-fidelity domain knowledge engine
  return generateDomainAgTechResponse(userQuery);
}

function generateDomainAgTechResponse(query: string): string {
  const lower = query.toLowerCase();

  // ─── 0. Calculadora en Chat: "Cotízame N [raza] de X kg" ────────────────────
  const quoteRegex =
    /(?:cot[ií]z(?:a(?:me)?)?|precio|cu[aá]nto\s+(?:cuesta|vale)|valor|cu[aá]nto\s+es)\s+(\d+)\s*(?:reses?|novillos?|vacas?|cabezas?|animales?)?\s*(?:de\s+raza\s+)?(brahman|brangus|angus|nelore|ceb[uú])?\s*(?:de\s+)?(\d+)?\s*kg?/i;
  const m = query.match(quoteRegex);
  if (m) {
    const heads = parseInt(m[1], 10) || 1;
    const breed = m[2] ? m[2].charAt(0).toUpperCase() + m[2].slice(1).toLowerCase() : 'Brahman';
    const weightKg = parseInt(m[3] || '400', 10);

    // Price references (mid-market FOB Colombia)
    const pricePerKgCOP = 10_200;
    const pricePerKgUSD = 2.62;
    const gmd = 1.28; // kg/day with FVH
    const targetWeight = 500;
    const daysToTarget = weightKg < targetWeight ? Math.ceil((targetWeight - weightKg) / gmd) : 0;
    const totalKg = heads * weightKg;
    const totalCOP = totalKg * pricePerKgCOP;
    const totalUSD = totalKg * pricePerKgUSD;
    const extraKgPerDay = heads * gmd;

    return `### 🧮 Cotización Instantánea INNOVAGAN

**${heads} cabeza(s) de ${breed}** · Peso actual promedio: **${weightKg} kg/res**

| Concepto | Valor |
|---|---|
| Peso total del lote | **${totalKg.toLocaleString('es-CO')} kg** |
| Precio ref. pie (COP) | **COP \$${pricePerKgCOP.toLocaleString('es-CO')}/kg** |
| **Total estimado (COP)** | **\$${totalCOP.toLocaleString('es-CO')}** |
| **Total estimado (USD)** | **USD \$${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}** |
| GMD con FVH | **+${gmd} kg/res/día** |
| Ganancia diaria del lote | **+${extraKgPerDay.toFixed(1)} kg/día** |
${daysToTarget > 0 ? `| Días para alcanzar 500 kg | **~${daysToTarget} días** |\n` : ''}

> ⚡ *Precio referencial FOB. Sujeto a pesaje en báscula ICA y condiciones de entrega.*

**¿Qué deseas hacer con esta cotización?**
- Agrégala al **Carrito de Cotización** desde el catálogo de lotes.
- Envíanos la proforma por **WhatsApp** o pídele más detalles al **AgroBot**.

¿Cambio de raza, peso o destino (Oriente Medio / Caribe / Nacional)?`;
  }
  // ────────────────────────────────────────────────────────────────────────────

  // 1. FVH (Forraje Verde Hidropónico)
  if (lower.includes('fvh') || lower.includes('forraje') || lower.includes('hidropon') || lower.includes('maiz') || lower.includes('germinad')) {
    return `### 🌱 Módulo Nutricional con Forraje Verde Hidropónico (FVH) - INNOVAGAN

El sistema FVH es el catalizador que permite a INNOVAGAN romper la barrera de 1.250 kg/día de Ganancia Media Diaria (GMD):

1. **Parámetros de Rendimiento:**
   - **Tasa de Conversión de Semilla:** 1 kg de maíz o cebada seleccionada produce de **7.8 a 8.5 kg de biomasa fresca** lista para consumo en solo **8 días de ciclo**.
   - **Calidad Nutricional:** Proteína Cruda (PC) del **18.5% al 20.2%** con una digestibilidad ruminal in vitro superior al **84%** (versus 48-55% de pastos tropicales lignificados en sequía).
   - **Consumo Hídrico:** Requiere solo **2 a 3 litros de agua por kg de forraje verde producido**, lo que representa un **ahorro de agua del 88%** frente al forraje convencional regado a campo abierto.

2. **Protocolo Operativo Automatizado:**
   - Desinfección de semilla con solución de hipoclorito al 1% o extracto cítrico orgánico.
   - Remojo y pregerminación de 24 horas con aireación forzada.
   - Nebulización por pulsos controlados por sensor de humedad relativa (HR mantenida al 85-90%, temperatura 21-23°C).
   - Suministro en canoa mezclado con un 55% de pastoreo rotacional y sales mineralizadas bioactivadas.

💡 *Consulta nuestros servicios de producción de forrajes y asistencia técnica para planificar tu módulo FVH.*`;
  }

  // 2. Fertirriego / Sensores TDR
  if (lower.includes('fertirriego') || lower.includes('tdr') || lower.includes('sensor') || lower.includes('valvula') || lower.includes('humedad') || lower.includes('riego')) {
    return `### 📡 Telemetría IoT y Fertirriego Automatizado con Sensores TDR

En INNOVAGAN no regamos por horario, sino por **Contenido Volumétrico de Agua (VWC)** y déficit radicular:

1. **Monitoreo con Sondas TDR (Time-Domain Reflectometry):**
   - Miden con precisión dieléctrica la humedad real del suelo a 15 cm y 35 cm de profundidad radicular.
   - Detectan simultáneamente la **Conductividad Eléctrica (EC)**, permitiendo saber la concentración de sales y nutrientes disponibles en la rizosfera.
   - **Umbral de Activación:** Las electroválvulas solares se activan en modo **AUTO** cuando el VWC cae por debajo del **26%** y cortan automáticamente al llegar a capacidad de campo (**38-40%**).

2. **Fertirriego Orgánico Circular:**
   - Inyectamos lixiviados biol enriquecidos con microorganismos de montaña y ácidos húmicos extraídos de nuestra pila de compostaje termofílica.
   - Se reduce a cero el uso de urea o fertilizantes de síntesis química, protegiendo las aguas subterráneas según la **Resolución 0126 de 2022**.

Puedes monitorear y accionar las electroválvulas en tiempo real en la pestaña **"Monitoreo IoT"**.`;
  }

  // 3. Exportación a Oriente Medio o Caribe
  if (lower.includes('export') || lower.includes('medio oriente') || lower.includes('oriente medio') || lower.includes('caribe') || lower.includes('buque') || lower.includes('puerto') || lower.includes('jordania') || lower.includes('egipto') || lower.includes('arabia')) {
    return `### 🚢 Exportación de Ganado Bovino en Pie (Oriente Medio & Caribe)

INNOVAGAN cuenta con la infraestructura técnica y los lotes pre-acondicionados para embarque marítimo directo:

1. **Requerimientos Sanitarios y Fitosanitarios Cumplidos:**
   - **ICA SINIGAN:** 100% de los animales cuentan con caravanas RFID UHF de lectura electrónica y trazabilidad total de origen libre de deforestación.
   - **Certificación Sanitaria:** Hatas libres de Fiebre Aftosa con vacunación oficial, Brucelosis bovina (100% negativos en rosa de bengala y ELISA) y Tuberculosis bovina.
   - **Cuarentena Pre-Embarque:** Concentración en predios de pre-embarque autorizados por el ICA (cercanos a puertos de Barranquilla y Cartagena) durante 21 a 30 días.

2. **Estándares Halal y Bienestar Animal OMSA:**
   - Animales adaptados al consumo de forraje seco y concentrado en comederos para evitar estrés de transición durante el viaje en buque ganadero.
   - Pesos objetivos de embarque: **480 kg a 520 kg** con conformación muscular europea/cebuina F1 (Brahman Blanco Élite y Angus F1).
   - Precio de referencia FOB: **USD $2.45 - $2.76 / kg en pie**.

*Puedes consultar el lote **LT-2026-BB-01** o **LT-2026-AC-04** en el Catálogo para ver su pasaporte sanitario y cotizar.*`;
  }

  // 4. Cotización de lotes
  if (lower.includes('cotiz') || lower.includes('precio') || lower.includes('costo') || lower.includes('comprar') || lower.includes('lote') || lower.includes('brahman') || lower.includes('brangus') || lower.includes('nelore')) {
    const lotes = INITIAL_CATTLE_BATCHES.map(
      (l) => `• **${l.name}** (${l.heads} cabezas, peso prom. ${l.currentAvgWeight} kg, GMD: ${l.gmd} kg/d) ➔ **COP $${l.pricePerKgCOP.toLocaleString()} / USD $${l.pricePerKgUSD.toFixed(2)} por kg** [Estado: ${l.status}]`
    ).join('\n');

    return `### 🐂 Cotización Instantánea de Lotes Bovinos INNOVAGAN

Disponemos actualmente de los siguientes lotes bajo protocolo de alta eficiencia:

${lotes}

**Condiciones Comerciales:**
- Pesaje en báscula electrónica certificada por el ICA con tara calibrada.
- Guías de Movilización ICA y Certificado de Exportación incluidos.
- Descuento por volumen para contratos de más de 200 cabezas mensuales.

¿Deseas que generemos una proforma formal para alguno de estos lotes? Selecciona el botón **"Cotizar Lote"** en el Catálogo.`;
  }

  // 5. Resolución 0126 de 2022 y ODS
  if (lower.includes('0126') || lower.includes('resolucion') || lower.includes('ods') || lower.includes('sostenib') || lower.includes('deforestac') || lower.includes('carbono') || lower.includes('minagricultura')) {
    return `### 📜 Cumplimiento de la Resolución 0126 de 2022 y ODS

La **Resolución 0126 de 2022** del Ministerio de Agricultura y Desarrollo Rural establece los lineamientos para la **Ganadería Bovina Sostenible** en Colombia. INNOVAGAN es pionero en su implementación:

- **Conservación y Cero Deforestación (ODS 15):** Georreferenciación catastral satelital que garantiza que el 100% de la biomasa animal producida no genera pérdida de cobertura boscosa.
- **Sistemas Silvopastoriles (ODS 13):** Densidades de más de 400 árboles fijadores de nitrógeno (Leucaena leucocephala) por hectárea, capturando **4.2 toneladas netas de CO2e/ha/año**.
- **Eficiencia Hídrica y Economía Circular (ODS 12):** Reciclaje de purines mediante compostaje microbiológico y fertirriego inteligente.
- **Dignificación Campesina (ODS 8):** Capacitación del vaquero en herramientas satelitales e IoT, con incrementos salariales y condiciones laborales seguras.

Puedes descargar el dossier de cumplimiento normativo en el módulo **"Normatividad & ODS"**.`;
  }

  // 6. Reconversión Ganadera / Cómo empezar
  if (lower.includes('reconvers') || lower.includes('como empezar') || lower.includes('asesor') || lower.includes('consultor') || lower.includes('mi finca') || lower.includes('hectarea')) {
    return `### 🚜 Ruta de Reconversión Ganadera INNOVAGAN (Paso a Paso)

Para transformar una finca tradicional de baja eficiencia en un centro ganadero regenerativo de alta rentabilidad, ejecutamos 4 etapas:

1. **Fase 1: Diagnóstico Biofísico y Topográfico (Días 1-15)**
   - Mapeo GPS, aforo de pasturas y análisis de suelos (conductividad, textura y retención de humedad).
   - Cálculo de la carga animal potencial y diseño del diseño hidráulico solar.

2. **Fase 2: Módulo FVH de Choque (Días 15-45)**
   - Instalación de estructura vertical de germinación climatizada (capacidad según cabezas a suplementar).
   - Aseguramiento de producción diaria ininterrumpida de biomasa verde digestible (18-20% proteína).

3. **Fase 3: División Rotacional Voisin & Cerca Solar (Días 45-75)**
   - Subdivisión de potreros con alambre galvanizado y energizador solar de alta potencia (>8 kV).
   - Trazado de callejones centrales y bebederos móviles para evitar compactación del suelo.

4. **Fase 4: Automatización IoT & Fertirriego TDR (Días 75-90)**
   - Colocación de sondas TDR en suelo y conexión con electroválvulas solares.
   - Monitoreo en tiempo real desde nuestra plataforma web y móvil.

**Resultado:** Reducción de costos de alimentación en un **45%** e incremento de la GMD de **0.45 kg/d a más de 1.20 kg/d** en menos de un ciclo.`;
  }

  // General default fallback
  return `### Asesoría Técnica AgTech INNOVAGAN

Gracias por tu consulta sobre ganadería regenerativa y producción de alta eficiencia. 

En INNOVAGAN integramos:
1. **Nutrición de Precisión con Forraje Verde Hidropónico (FVH):** Producción intensiva vertical que ahorra un 88% de agua y entrega 19% de proteína cruda diaria.
2. **Fertirriego Automatizado Guiado por Sensores TDR:** Riego exacto según el contenido volumétrico de agua del suelo sin desperdiciar una sola gota.
3. **Pastoreo Racional Voisin & Cercas Solares:** Maximización de fotosíntesis foliar y regeneración biológica de praderas.
4. **Comercialización & Trazabilidad RFID:** Lotes de ceba con GMD certificada (>1.25 kg/día) listos para faena nacional o buques de exportación (Oriente Medio y Caribe).

Puedes preguntarme sobre:
- ¿Cómo calcular el ahorro de agua y GMD para mi número de hectáreas?
- ¿Cuáles son los requisitos sanitarios ICA para exportar ganado a Jordania o Egipto?
- ¿Cómo opera la recirculación de agua en la cámara de germinación FVH?
- Cotización y disponibilidad del lote Brahman Blanco o Brangus F1.`;
}
