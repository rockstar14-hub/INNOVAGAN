export type Breed = 
  | 'Brahman Blanco'
  | 'Nelore'
  | 'Brahman Blanco Élite' 
  | 'Brangus F1 Tropical' 
  | 'Nelore Tropical Plus' 
  | 'Angus x Cebú F1 Regenerativo';

export type DestinationMarket = 
  | 'Exportación Oriente Medio' 
  | 'Exportación Caribe' 
  | 'Cebadores Nacionales (Colombia)' 
  | 'Todos';

export type BatchStatus = 
  | 'Disponible' 
  | 'En Engorde Final' 
  | 'Pre-reservado Exportación' 
  | 'Listo para Embarque';

export interface CattleBatch {
  id: string;
  name: string;
  breed: Breed;
  heads: number;
  currentAvgWeight: number; // in kg
  averageWeightLabel?: string;
  targetWeight: number; // in kg
  initialWeight: number; // in kg
  gmd: number; // Ganancia Media Diaria in kg/day (e.g. 1.28)
  conventionalGmd: number; // Reference traditional GMD (e.g. 0.45)
  dietDescription: string;
  fvhPercentage: number; // % in diet
  grazingSystem: string;
  location: string;
  destination: DestinationMarket;
  status: BatchStatus;
  feedConversionRatio: number; // e.g. 6.2
  rfidChipTagRange: string;
  sanitaryCertification: string;
  icaCode: string;
  vaccines: string[];
  daysInFeedlot: number;
  estimatedShipmentDate: string;
  pricePerKgCOP: number;
  pricePerKgUSD: number;
  waterSavingsPercent: number;
  imageUrl: string;
  growthHistory: { week: string; weight: number; target: number; conventionalWeight: number }[];
  specs: {
    ageMonths: number;
    frameScore: string;
    fatThicknessMm: number;
    ribEyeAreaCm2: number;
  };
}

export interface IoTSensor {
  id: string;
  name: string;
  location: string;
  type: 'TDR_SOIL' | 'CAPACITIVE' | 'FVH_CLIMATE' | 'COMPOST_THERMO';
  moistureVWC: number; // % Volumetric Water Content
  targetMinMoisture: number;
  targetMaxMoisture: number;
  temperatureC: number;
  electricalConductivityEC: number; // dS/m
  batteryLevel: number; // %
  solarCharging: boolean;
  status: 'OPTIMO' | 'ALERTA_DEFICIT' | 'ALERTA_SATURACION' | 'DESCONECTADO';
  lastPing: string;
}

export interface SolenoidValve {
  id: string;
  name: string;
  sector: string;
  state: 'OPEN' | 'CLOSED';
  mode: 'AUTO' | 'MANUAL';
  flowRateLpm: number; // liters per minute
  pressureBar: number;
  linkedSensorId: string;
  dailyWaterUsageM3: number;
  biofertDoseMlPerM3: number;
}

export interface FvhChamberStatus {
  chamberId: string;
  name: string;
  currentCycleDay: number; // Day 1 to 8
  totalCapacityTrays: number;
  dailyOutputKg: number;
  temperatureC: number;
  relativeHumidity: number;
  mistingActive: boolean;
  photoperiodHours: number;
  seedVariety: string; // "Maíz Híbrido No-GMO" | "Cebada Forrajera"
  crudeProteinPercent: number; // e.g. 18.5%
}

export interface SolarFenceStatus {
  fenceId: string;
  name: string;
  voltageKV: number; // e.g. 8.4 kV
  targetMinKV: number;
  batteryVolt: number;
  solarWatts: number;
  paddocksSecured: number;
  activePaddock: string;
  restDaysPasture: number;
  status: 'OPTIMAL' | 'LOW_VOLTAGE' | 'FAULT';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string; payload?: unknown }[];
  lotReference?: string;
}

export interface RoiSimulationParams {
  hectares: number;
  heads: number;
  currentGMD: number; // kg/day
  currentCycleMonths: number;
  targetMarket: 'NACIONAL' | 'EXPORTACION';
  fvhAdoptionLevel: number; // %
  automatedFertirrigation: boolean;
  rotationalSolarFence: boolean;
}

export interface CartItem {
  batch: CattleBatch;
  heads: number;
}
