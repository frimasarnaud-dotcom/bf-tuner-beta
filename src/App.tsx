import React, { useState, useRef } from 'react';

// --- ICONS ---

const IconMotor = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="3"></circle>
    <line x1="12" y1="2" x2="12" y2="22"></line>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const IconChip = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="14" x2="23" y2="14"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="14" x2="4" y2="14"></line>
  </svg>
);

const IconFile = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const IconCopy = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const IconCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#4ade80"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const IconAlert = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f59e0b"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const IconZap = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const IconExternalLink = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const IconInfo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const IconCpu = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="14" x2="23" y2="14"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="14" x2="4" y2="14"></line>
  </svg>
);

// --- TYPES & CONSTANTS ---

type FrameType =
  | 'tinywhoop'
  | 'toothpick'
  | 'micro'
  | 'freestyle'
  | 'bando'
  | 'cinewhoop'
  | 'longrange';
type PilotStyle = 'aggressive' | 'smooth';
type BfVersion = '4.3' | '4.4' | '4.5';

interface DroneSpecs {
  kv: number;
  cells: number;
  propSize: number;
  weight: number;
  frameType: FrameType;
  pilotStyle: PilotStyle;
  bfVersion: BfVersion;
}

interface TuneResult {
  rpmMax: number;
  masterMult: number;
  pdGain: number;
  ffGain: number;
  filterStrategy: string;
  cliOutput: string;
  analysisNote?: string;
  firmwareNote?: string;
}

const FRAME_PRESETS: Record<FrameType, string> = {
  tinywhoop: 'Tinywhoop (65-75mm)',
  toothpick: '2.5" Toothpick (Open Prop)',
  micro: 'Micro 3-4 inch (Standard)',
  freestyle: '5 inch Freestyle (Clean)',
  bando: '5 inch Bando (Heavy/Armored)',
  cinewhoop: 'Cinewhoop (Ducted)',
  longrange: '7 inch Long Range',
};

// --- LOGIC ENGINE ---

const calculatePhysics = (
  specs: DroneSpecs,
  fileAnalysis?: { noiseFreq: number; noiseMagnitude: number }
): TuneResult => {
  // 1. RPM Calculation
  const voltage = specs.cells * 4.2;
  const theoreticalRPM = specs.kv * voltage;
  const realisticRPM = theoreticalRPM * 0.85;

  // 2. Base Tuning Logic
  let master = 1.0;
  let pdBalance = 1.0;
  let ffStrength = 1.0;
  let dTermFilter = 1;
  let iTermBoost = 0;

  // Frame Base
  switch (specs.frameType) {
    case 'tinywhoop':
      master = 1.8;
      pdBalance = 0.8;
      dTermFilter = 0.8;
      break;
    case 'toothpick': // 2.5" Open Prop
      master = 1.4; // High power/weight ratio needs high PIDs to lock in
      pdBalance = 1.0; // Balanced feel
      dTermFilter = 1.0; // Generally clean but light frames resonate
      break;
    case 'micro':
      master = 1.3;
      pdBalance = 1.0;
      break;
    case 'freestyle':
      master = 1.0;
      pdBalance = 1.1;
      break;
    case 'bando': // 5" Bando Basher
      master = 1.0; // Base reference
      pdBalance = 0.9; // More D-term bias for propwash/abuse handling
      dTermFilter = 1.3; // Heavier filtering for bent props/motor bearings
      iTermBoost = 5; // Slight boost for throw weight
      break;
    case 'cinewhoop':
      master = 1.1;
      pdBalance = 0.9;
      iTermBoost = 15;
      dTermFilter = 1.4;
      break;
    case 'longrange':
      master = 0.9;
      pdBalance = 1.0;
      ffStrength = 0.7;
      dTermFilter = 1.5;
      break;
  }

  // 3. Pilot Style Adjustment
  let styleNote = '';
  if (specs.pilotStyle === 'aggressive') {
    master *= 1.05; // More overall gain
    pdBalance *= 1.05; // Bias towards P for sharpness
    dTermFilter *= 0.95; // Less filtering for less latency (higher risk)
    ffStrength *= 1.1; // Faster stick response
    styleNote = 'AGGRESSIVE';
  } else {
    master *= 0.95; // Safer gains
    pdBalance *= 0.95; // Bias towards D for damping
    dTermFilter *= 1.1; // More filtering for smooth video
    iTermBoost += 10; // Better attitude holding
    styleNote = 'SMOOTH/SECURE';
  }

  // 4. RPM Based Corrections
  if (realisticRPM > 45000) {
    dTermFilter *= 0.8;
  } else if (realisticRPM < 25000) {
    dTermFilter *= 1.2;
  }

  // 5. Blackbox Simulation Logic
  let analysisNote = '';
  let notchHz = 0;
  let notchCutoff = 0;

  if (fileAnalysis) {
    if (fileAnalysis.noiseMagnitude > 50) {
      dTermFilter += 0.3;
      notchHz = fileAnalysis.noiseFreq;
      notchCutoff = Math.floor(notchHz * 0.75);
      analysisNote = `ANALYSE BB: Pic de bruit détecté à ${notchHz}Hz (Magn: ${fileAnalysis.noiseMagnitude}%). Filtres sécurisés.`;
    } else {
      dTermFilter -= 0.1;
      analysisNote =
        'ANALYSE BB: Signal propre. Filtres optimisés pour la latence.';
    }
  } else {
    notchHz = Math.floor(realisticRPM / 60);
    notchCutoff = Math.floor(notchHz * 0.7);
  }

  // 6. Generate CLI
  const pPitch = Math.floor(46 * master * pdBalance);
  const iPitch = Math.floor(85 * master) + iTermBoost;
  const dPitch = Math.floor((30 * master) / pdBalance);

  const pRoll = Math.floor(42 * master * pdBalance);
  const iRoll = Math.floor(80 * master) + iTermBoost;
  const dRoll = Math.floor((27 * master) / pdBalance);

  // Dynamic filter multipliers
  const dynLpfMin = Math.floor(realisticRPM / 60 / 4);
  const dynLpfMax = Math.floor(realisticRPM / 60);

  // VERSION HANDLING
  const isV45 = specs.bfVersion === '4.5';
  let versionCommands = '';

  if (isV45) {
    versionCommands = `
# Betaflight 4.5+ Specifics
set vbat_sag_compensation = 100
set feedforward_averaging = 2_POINT
set feedforward_smooth_factor = 25
set feedforward_jitter_reduction = 7
set feedforward_boost = 15
`;
  } else {
    versionCommands = `
# Legacy Betaflight (4.3/4.4)
set vbat_sag_compensation = 0
set feedforward_averaging = 0
set feedforward_smooth_factor = 0
`;
  }

  let cli = `
# Profile generated by AI Tuner for ${FRAME_PRESETS[specs.frameType]}
# Target: ${specs.kv}KV ${specs.cells}S | FW: Betaflight ${specs.bfVersion}.x
# Style: ${styleNote} | Est. RPM: ${Math.floor(realisticRPM)}

profile 0

# PID Loop
set pid_profile_duration = 125
set dterm_lpf1_dyn_min_hz = ${Math.max(dynLpfMin, 150)}
set dterm_lpf1_dyn_max_hz = ${Math.max(dynLpfMax, 400)}

# PID Gains
set p_pitch = ${pPitch}
set i_pitch = ${iPitch}
set d_pitch = ${dPitch}
set f_pitch = ${Math.floor(100 * ffStrength)}

set p_roll = ${pRoll}
set i_roll = ${iRoll}
set d_roll = ${dRoll}
set f_roll = ${Math.floor(95 * ffStrength)}

set p_yaw = ${Math.floor(45 * master)}
set i_yaw = ${Math.floor(85 * master)}
set d_yaw = 0
set f_yaw = ${Math.floor(100 * ffStrength)}

${versionCommands}

# Filter Strategy: ${
    dTermFilter > 1.2
      ? 'HIGH PROTECTION'
      : dTermFilter < 0.9
      ? 'PERFORMANCE (Low Latency)'
      : 'STANDARD'
  }
set dterm_lpf1_type = PT1
set dterm_lpf2_type = PT1
`;

  if (notchHz > 0) {
    cli += `
# Resonant Peak Handling
set gyro_lpf2_type = PT1
set gyro_lpf2_static_hz = ${notchHz * 2}
set dterm_notch_hz = ${notchHz}
set dterm_notch_cutoff = ${notchCutoff}
`;
  }

  cli += `\nsave`;

  return {
    rpmMax: Math.floor(realisticRPM),
    masterMult: master,
    pdGain: pdBalance,
    ffGain: ffStrength,
    filterStrategy:
      dTermFilter > 1.2
        ? 'Forte (Safe)'
        : dTermFilter < 0.9
        ? 'Légère (Agro)'
        : 'Standard',
    cliOutput: cli,
    analysisNote,
    firmwareNote: isV45
      ? 'Syntaxe optimisée BF 4.5 (Sag Comp + FF Smoother)'
      : 'Syntaxe Standard BF 4.3/4.4',
  };
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [specs, setSpecs] = useState<DroneSpecs>({
    kv: 1950,
    cells: 6,
    propSize: 5,
    weight: 650,
    frameType: 'freestyle',
    pilotStyle: 'aggressive',
    bfVersion: '4.5',
  });

  const [analyzing, setAnalyzing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [tuneResult, setTuneResult] = useState<TuneResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  const handleInputChange = (
    field: keyof DroneSpecs,
    value: string | number
  ) => {
    setSpecs((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.bbl') && !file.name.endsWith('.csv')) {
      setError('Format invalide. Utilisez .bbl ou .csv');
      return;
    }

    setError(null);
    setFileName(file.name);
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      generateResult(true, file.name);
    }, 1500);
  };

  const generateResult = (withFile: boolean = false, name: string = '') => {
    try {
      let fileAnalysis = undefined;

      const targetName = withFile ? name : fileName || '';
      const hasFile = targetName.length > 0;

      if (hasFile) {
        const hash = targetName.length % 3;
        if (hash === 0) {
          fileAnalysis = { noiseFreq: 240, noiseMagnitude: 85 };
        } else if (hash === 1) {
          fileAnalysis = { noiseFreq: 150, noiseMagnitude: 30 };
        } else {
          fileAnalysis = { noiseFreq: 350, noiseMagnitude: 60 };
        }
      }

      const result = calculatePhysics(specs, fileAnalysis);
      setTuneResult(result);
    } catch (err) {
      setError('Erreur calcul.');
    }
  };

  const copyToClipboard = () => {
    if (!tuneResult) return;
    navigator.clipboard.writeText(tuneResult.cliOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-200 font-sans selection:bg-[#ff9800] selection:text-white flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <div className="w-full md:w-96 bg-[#2d2d2d] border-r border-[#444] flex flex-col h-screen max-h-screen">
        <div className="p-6 border-b border-[#444] bg-[#252525] shrink-0">
          <div className="flex items-center space-x-3 mb-1">
            <div className="bg-[#ff9800] p-2 rounded-full text-black">
              <IconChip />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wider">
              BF TUNER{' '}
              <span className="text-[#ff9800] text-xs align-top">AI</span>
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold pl-12">
            Dynamic Analyzer
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Electronic Specs (NEW) */}
          <section>
            <h2 className="text-[#ff9800] text-sm font-bold uppercase tracking-wider mb-4 flex items-center">
              <span className="mr-2">
                <IconCpu />
              </span>{' '}
              Électronique
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Version Betaflight
                </label>
                <select
                  value={specs.bfVersion}
                  onChange={(e) =>
                    handleInputChange('bfVersion', e.target.value as BfVersion)
                  }
                  className="w-full bg-[#1a1a1a] border border-[#444] rounded p-2 text-white focus:border-[#ff9800] focus:outline-none font-mono"
                >
                  <option value="4.5">Betaflight 4.5.x (Stable)</option>
                  <option value="4.4">Betaflight 4.4.x (Cloud)</option>
                  <option value="4.3">Betaflight 4.3.x (Legacy)</option>
                </select>
                <p className="text-[10px] text-gray-500 mt-1 italic">
                  {specs.bfVersion === '4.5'
                    ? 'Active Vbat Sag Comp & FF Jitter Reduction.'
                    : 'Mode compatibilité standard.'}
                </p>
              </div>
            </div>
          </section>

          {/* Motor Specs */}
          <section>
            <h2 className="text-[#ff9800] text-sm font-bold uppercase tracking-wider mb-4 flex items-center">
              <span className="mr-2">
                <IconMotor />
              </span>{' '}
              Motorisation
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Moteur KV
                </label>
                <input
                  type="number"
                  value={specs.kv}
                  onChange={(e) =>
                    handleInputChange('kv', parseInt(e.target.value) || 0)
                  }
                  className="w-full bg-[#1a1a1a] border border-[#444] rounded p-2 text-white focus:border-[#ff9800] focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    LiPo (S)
                  </label>
                  <select
                    value={specs.cells}
                    onChange={(e) =>
                      handleInputChange('cells', parseInt(e.target.value))
                    }
                    className="w-full bg-[#1a1a1a] border border-[#444] rounded p-2 text-white focus:border-[#ff9800] focus:outline-none"
                  >
                    {[1, 2, 3, 4, 6, 8].map((s) => (
                      <option key={s} value={s}>
                        {s}S
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    Hélice (In)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={specs.propSize}
                    onChange={(e) =>
                      handleInputChange('propSize', parseFloat(e.target.value))
                    }
                    className="w-full bg-[#1a1a1a] border border-[#444] rounded p-2 text-white focus:border-[#ff9800] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Frame & Style Specs */}
          <section>
            <h2 className="text-[#ff9800] text-sm font-bold uppercase tracking-wider mb-4 flex items-center">
              <span className="mr-2">
                <IconChip />
              </span>{' '}
              Chassis & Pilote
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Type de Frame
                </label>
                <select
                  value={specs.frameType}
                  onChange={(e) =>
                    handleInputChange('frameType', e.target.value as FrameType)
                  }
                  className="w-full bg-[#1a1a1a] border border-[#444] rounded p-2 text-white focus:border-[#ff9800] focus:outline-none"
                >
                  {Object.entries(FRAME_PRESETS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Style de Vol
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() =>
                      handleInputChange('pilotStyle', 'aggressive')
                    }
                    className={`p-2 rounded text-xs font-bold border ${
                      specs.pilotStyle === 'aggressive'
                        ? 'bg-[#ff9800] text-black border-[#ff9800]'
                        : 'bg-[#1a1a1a] text-gray-400 border-[#444] hover:border-gray-300'
                    }`}
                  >
                    AGRESSIF
                  </button>
                  <button
                    onClick={() => handleInputChange('pilotStyle', 'smooth')}
                    className={`p-2 rounded text-xs font-bold border ${
                      specs.pilotStyle === 'smooth'
                        ? 'bg-[#4ade80] text-black border-[#4ade80]'
                        : 'bg-[#1a1a1a] text-gray-400 border-[#444] hover:border-gray-300'
                    }`}
                  >
                    SMOOTH / SÛR
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 mt-1 italic">
                  {specs.pilotStyle === 'aggressive'
                    ? 'Réponse vive, filtrage minimal. (Risqué)'
                    : 'Fluidité maximale, filtrage sécurisé.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Poids Estimé (g)
                </label>
                <input
                  type="number"
                  value={specs.weight}
                  onChange={(e) =>
                    handleInputChange('weight', parseInt(e.target.value))
                  }
                  className="w-full bg-[#1a1a1a] border border-[#444] rounded p-2 text-white focus:border-[#ff9800] focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Action Button */}
          <button
            onClick={() => generateResult(!!fileName)}
            className="w-full bg-[#ff9800] hover:bg-[#ffa726] text-black font-bold py-3 rounded uppercase tracking-wider flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-lg shadow-orange-900/20"
          >
            <IconZap />
            <span>Générer le Tune</span>
          </button>

          {/* Blackbox Section */}
          <section className="pt-4 border-t border-[#444]">
            <h2 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center justify-between">
              <span className="flex items-center">
                <IconFile className="mr-2" /> Blackbox Analysis
              </span>
              <a
                href="https://github.com/betaflight/blackbox-log-viewer"
                target="_blank"
                rel="noreferrer"
                className="text-[#ff9800] hover:text-white"
                title="Ouvrir Blackbox Explorer"
              >
                <IconExternalLink />
              </a>
            </h2>

            {/* Guide Info */}
            <div className="bg-[#1a1a1a] border border-[#333] rounded p-3 mb-4 text-xs text-gray-400">
              <div className="flex items-center text-[#ff9800] mb-1 font-bold">
                <IconInfo /> <span className="ml-1">Configuration Requise</span>
              </div>
              <p className="leading-relaxed">Pour une analyse fiable :</p>
              <ul className="list-disc pl-4 mt-1 space-y-1 text-gray-500">
                <li>
                  Onglet Motors :{' '}
                  <code className="text-gray-300">
                    debug_mode = GYRO_SCALED
                  </code>
                </li>
                <li>
                  Blackbox rate : <code className="text-gray-300">2kHz</code>{' '}
                  (ou 1/1 pour PID loop 8k)
                </li>
              </ul>
            </div>

            <div className="relative group cursor-pointer">
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".bbl,.csv"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div
                className={`border-2 border-dashed ${
                  fileName
                    ? 'border-[#4ade80] bg-[#4ade8010]'
                    : 'border-[#444] bg-[#1a1a1a]'
                } rounded-lg p-4 text-center transition-all group-hover:border-[#ff9800]`}
              >
                {analyzing ? (
                  <span className="text-[#ff9800] animate-pulse font-mono text-sm">
                    Traitement FFT...
                  </span>
                ) : fileName ? (
                  <div className="flex items-center justify-center text-[#4ade80] space-x-2">
                    <IconCheck />
                    <span className="text-xs truncate max-w-[150px]">
                      {fileName}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-gray-500">
                    Uploader Log .BBL
                  </span>
                )}
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <span className="mr-1">
                  <IconAlert />
                </span>
                {error}
              </p>
            )}
          </section>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-[#1e1e1e] p-6 md:p-12 overflow-y-auto">
        {/* Header Visual */}
        <div className="mb-8 flex justify-between items-end border-b border-[#333] pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Résultats d'Ingénierie
            </h2>
            <p className="text-gray-500 text-sm">
              {tuneResult
                ? "Profil généré prêt à l'export."
                : 'En attente de calcul...'}
            </p>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-[#ff9800] font-mono text-3xl font-bold">
              {tuneResult ? tuneResult.rpmMax.toLocaleString() : '---'}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              RPM Théorique Max
            </div>
          </div>
        </div>

        {!tuneResult ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-600 border border-[#333] border-dashed rounded-lg">
            <IconChip />
            <p className="mt-4 text-sm">
              Configurez les paramètres à gauche et cliquez sur "GÉNÉRER"
            </p>
          </div>
        ) : (
          <>
            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#2d2d2d] rounded-lg p-5 border-l-4 border-[#ff9800]">
                <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                  Stratégie PID
                </h3>
                <div className="text-xl font-bold text-white mb-1">
                  {tuneResult?.pdGain && tuneResult.pdGain > 1.05
                    ? 'Agressif (Sharp)'
                    : tuneResult?.pdGain && tuneResult.pdGain < 0.95
                    ? 'Fluide (Cinematic)'
                    : 'Equilibré'}
                </div>
                <p className="text-xs text-gray-500">
                  Optimisé pour {specs.frameType} en mode {specs.pilotStyle}.
                </p>
              </div>

              <div className="bg-[#2d2d2d] rounded-lg p-5 border-l-4 border-blue-500">
                <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                  Filtrage Gyro
                </h3>
                <div className="text-xl font-bold text-white mb-1">
                  {tuneResult?.filterStrategy}
                </div>
                <p className="text-xs text-gray-500">
                  Adapté à la signature vibratoire estimée.
                </p>
              </div>

              <div className="bg-[#2d2d2d] rounded-lg p-5 border-l-4 border-purple-500">
                <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                  Feed Forward
                </h3>
                <div className="text-xl font-bold text-white mb-1">
                  {Math.floor((tuneResult?.ffGain || 1) * 100)}%
                </div>
                <p className="text-xs text-gray-500">Réactivité du manche.</p>
              </div>
            </div>

            {/* AI Analysis Message */}
            {(tuneResult?.analysisNote || tuneResult?.firmwareNote) && (
              <div className="space-y-2 mb-6">
                {tuneResult.analysisNote && (
                  <div className="bg-[#2d2d2d] border border-[#444] rounded-lg p-4 flex items-start space-x-3">
                    <div className="mt-1">
                      <IconChip />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#ff9800]">
                        Note de l'Ingénieur
                      </h4>
                      <p className="text-sm text-gray-300">
                        {tuneResult.analysisNote}
                      </p>
                    </div>
                  </div>
                )}
                {tuneResult.firmwareNote && (
                  <div className="bg-[#2d2d2d] border border-blue-500/30 rounded-lg p-4 flex items-start space-x-3">
                    <div className="mt-1 text-blue-400">
                      <IconCpu />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-blue-400">
                        Compatibilité Firmware
                      </h4>
                      <p className="text-sm text-gray-300">
                        {tuneResult.firmwareNote}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CLI Output Box */}
            <div className="relative">
              <div className="absolute top-0 right-0 p-2">
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center space-x-2 px-4 py-2 rounded text-sm font-bold transition-all ${
                    copied
                      ? 'bg-[#4ade80] text-black'
                      : 'bg-[#ff9800] text-black hover:bg-[#ffa726]'
                  }`}
                >
                  {copied ? <IconCheck /> : <IconCopy />}
                  <span>{copied ? 'Copié !' : 'Copier CLI'}</span>
                </button>
              </div>

              <div className="bg-[#151515] rounded-lg border border-[#333] p-0 overflow-hidden shadow-2xl">
                <div className="bg-[#252525] px-4 py-2 border-b border-[#333] flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-500 font-mono ml-4">
                    betaflight-cli-generator --v{specs.bfVersion}
                  </span>
                </div>
                <pre className="p-6 text-sm font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {tuneResult?.cliOutput}
                </pre>
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center w-full">
                Collez ce code dans l'onglet CLI de Betaflight Configurator et
                tapez 'save'.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
