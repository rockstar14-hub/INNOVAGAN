import React, { useState, useEffect } from 'react';
import { IoTSensor, SolenoidValve, FvhChamberStatus, SolarFenceStatus } from '../types/cattle';
import { 
  Activity, 
  Droplets, 
  Gauge, 
  Sun, 
  BatteryCharging, 
  Power, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Sliders, 
  Zap, 
  Thermometer, 
  Sprout, 
  Clock, 
  ShieldCheck,
  Waves,
  Play,
  RotateCcw
} from 'lucide-react';

interface IoTMonitoringProps {
  sensors: IoTSensor[];
  valves: SolenoidValve[];
  fvhStatus: FvhChamberStatus;
  solarFence: SolarFenceStatus;
  onUpdateSensorMoisture: (sensorId: string, newMoisture: number) => void;
  onToggleValveState: (valveId: string) => void;
  onToggleValveMode: (valveId: string) => void;
  onTriggerFvhMisting: () => void;
  onSimulateWeather: (type: 'DROUGHT' | 'RAIN' | 'OPTIMAL') => void;
}

export const IoTMonitoring: React.FC<IoTMonitoringProps> = ({
  sensors,
  valves,
  fvhStatus,
  solarFence,
  onUpdateSensorMoisture,
  onToggleValveState,
  onToggleValveMode,
  onTriggerFvhMisting,
  onSimulateWeather,
}) => {
  const [selectedSensorId, setSelectedSensorId] = useState<string>(sensors[0]?.id || '');
  const [isSimulating, setIsSimulating] = useState(false);
  const [liveLog, setLiveLog] = useState<{ id: string; time: string; text: string; type: 'info' | 'warn' | 'success' }[]>([
    { id: '1', time: '19:01:14', text: 'Sonda TDR Potrero B3 detectó VWC en 24.8% (< 26.0% umbral). Electroválvula EV-02 activada en modo AUTO.', type: 'warn' },
    { id: '2', time: '19:00:45', text: 'Nebulización ultrasónica Cámara FVH-01 completada con éxito (Pulso 45 seg).', type: 'success' },
    { id: '3', time: '18:58:20', text: 'Cerca solar Voisin reporta 8.4 kV en Potrero 4. Sin fugas a tierra.', type: 'info' },
  ]);

  // Periodic heartbeat animation
  const [pulseTick, setPulseTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseTick((t) => (t + 1) % 100);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const selectedSensor = sensors.find((s) => s.id === selectedSensorId) || sensors[0];

  // Helper for quick telemetry simulation
  const handleSimulate = (type: 'DROUGHT' | 'RAIN' | 'OPTIMAL') => {
    setIsSimulating(true);
    onSimulateWeather(type);
    const now = new Date().toLocaleTimeString('es-CO');

    if (type === 'DROUGHT') {
      setLiveLog((prev) => [
        { id: Date.now().toString(), time: now, text: 'Simulación de estrés hídrico iniciada. Humedad en suelo bajando progresivamente.', type: 'warn' },
        ...prev.slice(0, 5),
      ]);
    } else if (type === 'RAIN') {
      setLiveLog((prev) => [
        { id: Date.now().toString(), time: now, text: 'Simulación de precipitación/riego activada. Recarga de perfil radicular en proceso.', type: 'success' },
        ...prev.slice(0, 5),
      ]);
    } else {
      setLiveLog((prev) => [
        { id: Date.now().toString(), time: now, text: 'Parámetros TDR restablecidos a nivel de capacidad de campo óptima.', type: 'info' },
        ...prev.slice(0, 5),
      ]);
    }

    setTimeout(() => setIsSimulating(false), 800);
  };

  return (
    <div className="space-y-6">
      {/* Header and Telemetry Status Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Módulo 2: Monitoreo IoT, Sondas TDR & Fertirriego en Tiempo Real</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Control de Riego de Precisión & Telemetría de Pasturas
          </h2>
          <p className="text-stone-400 text-sm mt-1 max-w-2xl">
            Monitoreo en tiempo real de <strong>Contenido Volumétrico de Agua (VWC)</strong> mediante 
            sondas TDR dieléctricas, automatización de <strong>electroválvulas de fertirriego orgánico</strong> y 
            microclima en cámara de <strong>Forraje Verde Hidropónico (FVH)</strong>.
          </p>
        </div>

        {/* Quick Simulation Controller Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleSimulate('DROUGHT')}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-950/80 hover:bg-amber-900/80 text-amber-300 border border-amber-700/60 transition"
            title="Simular caída de humedad en suelo"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Simular Estrés Hídrico</span>
          </button>

          <button
            onClick={() => handleSimulate('RAIN')}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-950/80 hover:bg-sky-900/80 text-sky-300 border border-sky-700/60 transition"
            title="Simular riego abundante"
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Simular Riego/Lluvia</span>
          </button>

          <button
            onClick={() => handleSimulate('OPTIMAL')}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 transition"
            title="Restablecer a valores óptimos"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Óptimo</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sensors + Valves */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: TDR Soil Moisture & Climate Sensors HUD */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Gauge className="w-5 h-5 text-emerald-400" />
              <span>Sondas TDR & Sensores de Pasturas</span>
            </h3>
            <span className="text-xs text-stone-400 font-mono">
              Frecuencia de muestreo: 10 seg
            </span>
          </div>

          {/* Sensors Card List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sensors.map((sensor) => {
              const isSelected = sensor.id === selectedSensorId;
              const isWarning = sensor.status === 'ALERTA_DEFICIT';
              const isFvh = sensor.type === 'FVH_CLIMATE';
              const isCompost = sensor.type === 'COMPOST_THERMO';

              return (
                <div
                  key={sensor.id}
                  onClick={() => setSelectedSensorId(sensor.id)}
                  className={`cursor-pointer rounded-2xl p-4 transition-all border ${
                    isSelected
                      ? 'bg-stone-900/90 border-emerald-500 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/40'
                      : 'bg-stone-900/60 border-stone-800 hover:border-stone-700 hover:bg-stone-900/80'
                  }`}
                >
                  {/* Top line: Name & Status Pill */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-mono text-stone-400 uppercase block">
                        {sensor.id} • {sensor.location}
                      </span>
                      <h4 className="text-sm font-bold text-white line-clamp-1">
                        {sensor.name}
                      </h4>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase shrink-0 ${
                      sensor.status === 'OPTIMO'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                        : sensor.status === 'ALERTA_DEFICIT'
                        ? 'bg-amber-950/90 text-amber-300 border-amber-600 animate-pulse'
                        : 'bg-sky-950/80 text-sky-300 border-sky-700/60'
                    }`}>
                      {sensor.status === 'ALERTA_DEFICIT' ? 'Déficit Hídrico' : sensor.status}
                    </span>
                  </div>

                  {/* Main Metric Value: VWC Moisture */}
                  <div className="my-3 p-3 rounded-xl bg-stone-950/80 border border-stone-800/80">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-stone-400">
                        {isFvh ? 'Humedad Relativa' : isCompost ? 'Humedad Compost' : 'Humedad Suelo (VWC)'}
                      </span>
                      <span className="text-xs font-mono text-stone-500">
                        Rango: {sensor.targetMinMoisture}% - {sensor.targetMaxMoisture}%
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className={`text-2xl font-black font-mono ${
                        isWarning ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {sensor.moistureVWC.toFixed(1)}%
                      </span>
                      <span className="text-xs text-stone-400">
                        {isWarning ? '⚠ Por debajo de umbral mín.' : '✓ Rango óptimo radicular'}
                      </span>
                    </div>

                    {/* Visual Moisture Bar */}
                    <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden mt-2 relative">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isWarning
                            ? 'bg-amber-500'
                            : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(10, sensor.moistureVWC))}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Auxiliary Metrics: Temp, EC & Battery */}
                  <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
                    <div className="flex items-center gap-1 text-stone-300">
                      <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                      <span>{sensor.temperatureC.toFixed(1)}°C</span>
                    </div>
                    <div className="flex items-center gap-1 text-stone-300">
                      <Waves className="w-3.5 h-3.5 text-amber-400" />
                      <span>{sensor.electricalConductivityEC.toFixed(2)} dS/m</span>
                    </div>
                    <div className="flex items-center gap-1 text-stone-300">
                      <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{sensor.batteryLevel}% (Solar)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Calibration & Detail of Selected Sensor */}
          {selectedSensor && (
            <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  Calibrador Rápido / Prueba de Sonda: <strong className="text-emerald-400">{selectedSensor.name}</strong>
                </span>
                <span className="text-[11px] text-stone-500 font-mono">
                  {selectedSensor.lastPing}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-stone-300">
                  <span>Ajustar lectura de humedad para pruebas de estrés / saturación:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {selectedSensor.moistureVWC.toFixed(1)}% VWC
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="0.5"
                  value={selectedSensor.moistureVWC}
                  onChange={(e) => onUpdateSensorMoisture(selectedSensor.id, parseFloat(e.target.value))}
                  aria-label="Ajustar lectura de humedad de sonda TDR"
                  className="w-full accent-emerald-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500">
                  <span>15% (Estrés Severo)</span>
                  <span className="text-amber-400">26% (Umbral Encendido Válvula)</span>
                  <span className="text-emerald-400">38% (Capacidad Campo)</span>
                  <span>60% (Saturación)</span>
                </div>
              </div>
            </div>
          )}

          {/* Live IoT Event Feed */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-2 font-mono">
              <span className="flex items-center gap-1.5 text-stone-300 font-bold">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Registro de Eventos y Telemetría en Vivo
              </span>
              <span>Buffer circular</span>
            </div>
            <div className="space-y-2 max-h-36 overflow-y-auto text-xs font-mono">
              {liveLog.map((log) => (
                <div key={log.id} className="flex items-start gap-2 text-stone-300 border-b border-stone-900 pb-1.5">
                  <span className="text-stone-500 text-[10px] shrink-0 pt-0.5">[{log.time}]</span>
                  <span className={log.type === 'warn' ? 'text-amber-300' : log.type === 'success' ? 'text-emerald-300' : 'text-stone-300'}>
                    {log.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Solenoid Valves & FVH Microclimate Control */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Electroválvulas Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Power className="w-5 h-5 text-sky-400" />
                <span>Estado de Electroválvulas</span>
              </h3>
              <span className="text-xs text-emerald-400 font-mono">
                {valves.filter((v) => v.state === 'OPEN').length} Abiertas / {valves.length} Total
              </span>
            </div>

            <div className="space-y-3">
              {valves.map((valve) => {
                const isOpen = valve.state === 'OPEN';
                const isAuto = valve.mode === 'AUTO';

                return (
                  <div
                    key={valve.id}
                    className={`rounded-2xl p-4 border transition-all ${
                      isOpen
                        ? 'bg-stone-900/95 border-sky-500/80 shadow-lg shadow-sky-950/20'
                        : 'bg-stone-900/60 border-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-sky-400 bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-800/60">
                            {valve.id}
                          </span>
                          <h4 className="text-sm font-bold text-white">
                            {valve.name}
                          </h4>
                        </div>
                        <span className="text-[11px] text-stone-400 block mt-0.5">
                          Sensor Enlazado: <strong className="text-stone-300">{valve.linkedSensorId}</strong> • Sector: {valve.sector}
                        </span>
                      </div>

                      {/* Manual/Auto Toggle Pill */}
                      <button
                        onClick={() => onToggleValveMode(valve.id)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-md border transition uppercase ${
                          isAuto
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                            : 'bg-amber-950/80 text-amber-300 border-amber-700/60'
                        }`}
                        title="Alternar entre modo Automático por TDR y Control Manual"
                      >
                        Modo: {valve.mode}
                      </button>
                    </div>

                    {/* Operational Telemetry Line */}
                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-stone-950/80 border border-stone-800/80 text-xs mb-3">
                      <div>
                        <span className="text-[10px] text-stone-500 block">Caudal</span>
                        <span className="font-mono font-bold text-white">
                          {valve.flowRateLpm.toFixed(1)} <span className="text-[10px] font-normal text-stone-400">L/min</span>
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 block">Presión</span>
                        <span className="font-mono font-bold text-white">
                          {valve.pressureBar.toFixed(1)} <span className="text-[10px] font-normal text-stone-400">bar</span>
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 block">Biofertilizante</span>
                        <span className="font-mono font-bold text-amber-300">
                          {valve.biofertDoseMlPerM3} <span className="text-[10px] font-normal text-stone-400">ml/m³</span>
                        </span>
                      </div>
                    </div>

                    {/* Action Switch & State Bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-sky-400 animate-ping' : 'bg-stone-600'}`}></span>
                        <span className="text-xs font-semibold text-stone-200">
                          {isOpen ? (
                            <span className="text-sky-400">Regando activamente...</span>
                          ) : (
                            <span className="text-stone-400">Válvula cerrada</span>
                          )}
                        </span>
                      </div>

                      <button
                        onClick={() => onToggleValveState(valve.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                          isOpen
                            ? 'bg-rose-500 hover:bg-rose-600 text-white'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950'
                        }`}
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>{isOpen ? 'Cerrar Válvula' : 'Abrir Válvula'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FVH Germination Chamber Module Card */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-stone-900/90 to-emerald-950/40 border border-emerald-800/60 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-extrabold text-white">
                  Cámara Vertical FVH (Forraje Verde Hidropónico)
                </h4>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/60">
                Día {fvhStatus.currentCycleDay} de 8
              </span>
            </div>

            <p className="text-xs text-stone-300">
              Producción continua de biomasa fresca para sustituir concentrados comerciales y reducir huella hídrica.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                <span className="text-[10px] text-stone-400 block">Producción Diaria</span>
                <span className="text-lg font-black font-mono text-emerald-400">
                  {fvhStatus.dailyOutputKg.toLocaleString()} <span className="text-xs font-normal text-stone-300">kg/día</span>
                </span>
                <span className="text-[10px] text-stone-400 block mt-0.5">
                  Proteína Cruda: <strong>{fvhStatus.crudeProteinPercent}%</strong>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                <span className="text-[10px] text-stone-400 block">Microclima Cámara</span>
                <span className="text-lg font-black font-mono text-white">
                  {fvhStatus.temperatureC}°C <span className="text-xs font-normal text-stone-400">/ {fvhStatus.relativeHumidity}% HR</span>
                </span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">
                  {fvhStatus.mistingActive ? 'Nebulización Activa' : 'En Reposo'}
                </span>
              </div>
            </div>

            {/* Manual Misting Trigger Button */}
            <button
              onClick={onTriggerFvhMisting}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-700/60 transition"
            >
              <Droplets className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ejecutar Pulso Manual de Nebulización (45s)</span>
            </button>
          </div>

          {/* Solar Fence (Pastoreo Voisin) Telemetry Card */}
          <div className="rounded-2xl p-4 bg-stone-900/80 border border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Cerca Eléctrica Solar Inteligente (Pastoreo Voisin)
                </h4>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                ÓPTIMO
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] text-stone-500 block">Voltaje Cerca</span>
                <span className="text-base font-bold font-mono text-amber-400">
                  {solarFence.voltageKV.toFixed(1)} kV
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] text-stone-500 block">Potrero Activo</span>
                <span className="text-xs font-bold text-white line-clamp-1">
                  {solarFence.activePaddock.split(' ')[0]} {solarFence.activePaddock.split(' ')[1]}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] text-stone-500 block">Descanso Pasto</span>
                <span className="text-base font-bold font-mono text-emerald-400">
                  {solarFence.restDaysPasture} días
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
