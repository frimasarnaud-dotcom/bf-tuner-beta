import React, { useState } from 'react';

// --- ICONS (Styled) ---

const IconMotor = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="3"></circle>
    <line x1="12" y1="2" x2="12" y2="22"></line>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const IconChip = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
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

const IconFile = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const IconCopy = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const IconCheck = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const IconAlert = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const IconZap = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const IconExternalLink = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const IconInfo = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const IconCpu = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
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

const IconTerminal = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

// --- TYPES & CONSTANTS ---

type FrameType = 'tinywhoop' | 'toothpick' | 'micro' | 'freestyle' | 'bando' | 'cinewhoop' | 'longrange';
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
  tinywhoop: "Tinywhoop (65-75mm)",
  toothpick: "2.5\" Toothpick",
  micro: "Micro 3-4\"",
  freestyle: "5\" Freestyle (Clean)",
  bando: "5\" Bando (Heavy)",
  cinewhoop: "Cinewhoop",
  longrange: "7\" Long Range"
};

// --- LOGIC ENGINE ---

const calculatePhysics = (specs: DroneSpecs, fileAnalysis?: { noiseFreq: number, noiseMagnitude: number }): TuneResult => {
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
      master = 1.4; 
      pdBalance = 1.0; 
      dTermFilter = 1.0; 
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
      master = 1.0; 
      pdBalance = 0.9; 
      dTermFilter = 1.3; 
      iTermBoost = 5; 
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
  let styleNote = "";
  if (specs.pilotStyle === 'aggressive') {
    master *= 1.05; 
    pdBalance *= 1.05; 
    dTermFilter *= 0.95; 
    ffStrength *= 1.1; 
    styleNote = "AGGRESSIVE";
  } else {
    master *= 0.95; 
    pdBalance *= 0.95; 
    dTermFilter *= 1.1; 
    iTermBoost += 10; 
    styleNote = "SMOOTH/SECURE";
  }

  // 4. RPM Based Corrections
  if (realisticRPM > 45000) {
    dTermFilter *= 0.8; 
  } else if (realisticRPM < 25000) {
    dTermFilter *= 1.2; 
  }

  // 5. Blackbox Simulation Logic
  let analysisNote = "";
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
      analysisNote = "ANALYSE BB: Signal propre. Filtres optimisés pour la latence.";
    }
  } else {
    notchHz = Math.floor(realisticRPM / 60); 
    notchCutoff = Math.floor(notchHz * 0.7);
  }

  // 6. Generate CLI
  const pPitch = Math.floor(46 * master * pdBalance);
  const iPitch = Math.floor(85 * master) + iTermBoost;
  const dPitch = Math.floor(30 * master / pdBalance);
  
  const pRoll = Math.floor(42 * master * pdBalance);
  const iRoll = Math.floor(80 * master) + iTermBoost;
  const dRoll = Math.floor(27 * master / pdBalance);

  // Dynamic filter multipliers
  const dynLpfMin = Math.floor(realisticRPM / 60 / 4); 
  const dynLpfMax = Math.floor(realisticRPM / 60);

  // VERSION HANDLING
  const isV45 = specs.bfVersion === '4.5';
  let versionCommands = "";
  
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

# Filter Strategy: ${dTermFilter > 1.2 ? "HIGH PROTECTION" : dTermFilter < 0.9 ? "PERFORMANCE (Low Latency)" : "STANDARD"}
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
    filterStrategy: dTermFilter > 1.2 ? "Forte (Safe)" : dTermFilter < 0.9 ? "Légère (Agro)" : "Standard",
    cliOutput: cli,
    analysisNote,
    firmwareNote: isV45 ? "Syntaxe optimisée BF 4.5 (Sag Comp + FF Smoother)" : "Syntaxe Standard BF 4.3/4.4"
  };
};


// --- UI COMPONENTS (Internal) ---

const InputGroup = ({ label, icon: Icon, children }: { label: string, icon: any, children: React.ReactNode }) => (
  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 backdrop-blur-sm hover:border-slate-700 transition-colors duration-300">
    <h2 className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
      <Icon className="w-4 h-4" /> {label}
    </h2>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const StyledInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input 
    {...props}
    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 focus:outline-none transition-all font-mono"
  />
);

const StyledSelect = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className="relative">
    <select 
      {...props}
      className="w-full appearance-none bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 focus:outline-none transition-all font-mono cursor-pointer"
    />
    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
    </div>
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider ml-1">
    {children}
  </label>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [specs, setSpecs] = useState<DroneSpecs>({
    kv: 1950,
    cells: 6,
    propSize: 5,
    weight: 650,
    frameType: 'freestyle',
    pilotStyle: 'aggressive',
    bfVersion: '4.5'
  });

  const [analyzing, setAnalyzing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [tuneResult, setTuneResult] = useState<TuneResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  const handleInputChange = (field: keyof DroneSpecs, value: string | number) => {
    setSpecs(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.bbl') && !file.name.endsWith('.csv')) {
      setError("Format invalide. Utilisez .bbl ou .csv");
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

  const generateResult = (withFile: boolean = false, name: string = "") => {
    try {
      let fileAnalysis = undefined;
      const targetName = withFile ? name : (fileName || "");
      const hasFile = targetName.length > 0;

      if (hasFile) {
        const hash = targetName.length % 3; 
        if (hash === 0) { fileAnalysis = { noiseFreq: 240, noiseMagnitude: 85 }; } 
        else if (hash === 1) { fileAnalysis = { noiseFreq: 150, noiseMagnitude: 30 }; } 
        else { fileAnalysis = { noiseFreq: 350, noiseMagnitude: 60 }; }
      }

      const result = calculatePhysics(specs, fileAnalysis);
      setTuneResult(result);
    } catch (err) {
      setError("Erreur calcul.");
    }
  };

  const copyToClipboard = () => {
    if (!tuneResult) return;
    navigator.clipboard.writeText(tuneResult.cliOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-orange-500/30 selection:text-orange-200 flex flex-col md:flex-row">
      
      {/* SIDEBAR CONTROL PANEL */}
      <div className="w-full md:w-[400px] bg-slate-950 border-r border-slate-900 flex flex-col h-auto md:h-screen z-10 shadow-2xl shadow-black">
        {/* Header */}
        <div className="p-6 border-b border-slate-900 bg-slate-950 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2.5 rounded-lg text-white shadow-lg shadow-orange-900/20">
              <IconChip className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-wider leading-none">BF TUNER <span className="text-orange-500 text-xs align-top">AI</span></h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-semibold mt-1">Engineering Tool v1.0</p>
            </div>
          </div>
        </div>

        {/* Scrollable Inputs */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          
          <InputGroup label="Firmware" icon={IconCpu}>
            <div>
              <Label>Version Betaflight</Label>
              <StyledSelect 
                value={specs.bfVersion}
                onChange={(e) => handleInputChange('bfVersion', e.target.value as BfVersion)}
              >
                <option value="4.5">Betaflight 4.5.x (Stable)</option>
                <option value="4.4">Betaflight 4.4.x (Cloud)</option>
                <option value="4.3">Betaflight 4.3.x (Legacy)</option>
              </StyledSelect>
            </div>
          </InputGroup>

          <InputGroup label="Propulsion" icon={IconMotor}>
            <div>
              <Label>Moteur KV</Label>
              <StyledInput 
                type="number" 
                value={specs.kv}
                onChange={(e) => handleInputChange('kv', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Cellules (S)</Label>
                <StyledSelect 
                  value={specs.cells}
                  onChange={(e) => handleInputChange('cells', parseInt(e.target.value))}
                >
                  {[1,2,3,4,6,8].map(s => <option key={s} value={s}>{s}S</option>)}
                </StyledSelect>
              </div>
              <div>
                <Label>Hélice (In)</Label>
                <StyledInput 
                  type="number" step="0.1"
                  value={specs.propSize}
                  onChange={(e) => handleInputChange('propSize', parseFloat(e.target.value))}
                />
              </div>
            </div>
          </InputGroup>

          <InputGroup label="Configuration" icon={IconChip}>
            <div>
              <Label>Type de Chassis</Label>
              <StyledSelect 
                value={specs.frameType}
                onChange={(e) => handleInputChange('frameType', e.target.value as FrameType)}
              >
                {Object.entries(FRAME_PRESETS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </StyledSelect>
            </div>
            
            <div>
              <Label>Style de Pilotage</Label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-lg border border-slate-800">
                <button
                  onClick={() => handleInputChange('pilotStyle', 'aggressive')}
                  className={`py-2 text-[10px] font-bold uppercase tracking-wide rounded-md transition-all ${specs.pilotStyle === 'aggressive' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Agressif
                </button>
                <button
                  onClick={() => handleInputChange('pilotStyle', 'smooth')}
                  className={`py-2 text-[10px] font-bold uppercase tracking-wide rounded-md transition-all ${specs.pilotStyle === 'smooth' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Smooth
                </button>
              </div>
            </div>

            <div>
              <Label>Poids (g)</Label>
              <StyledInput 
                type="number" 
                value={specs.weight}
                onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
              />
            </div>
          </InputGroup>

          {/* Compute Button */}
          <button 
            onClick={() => generateResult(!!fileName)}
            className="w-full group relative bg-gradient-to-r from-orange-600 to-orange-500 hover:to-orange-400 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-orange-900/30 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <IconZap className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Calculer le Tune</span>
          </button>

          {/* Blackbox Dropzone */}
          <div className="relative group">
             <div className="flex justify-between items-center mb-2">
                <Label>Blackbox (Optionnel)</Label>
                <a href="https://github.com/betaflight/blackbox-log-viewer" target="_blank" rel="noreferrer" className="text-orange-500 hover:text-orange-400 transition-colors">
                  <IconExternalLink className="w-3 h-3" />
                </a>
             </div>
            <div className={`relative border border-dashed rounded-xl p-6 text-center transition-all duration-300 ${fileName ? 'border-emerald-500/50 bg-emerald-900/10' : 'border-slate-700 bg-slate-900/30 group-hover:border-slate-500 group-hover:bg-slate-800'}`}>
              <input 
                type="file" 
                onChange={handleFileUpload}
                accept=".bbl,.csv"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {analyzing ? (
                 <div className="flex flex-col items-center text-orange-500 animate-pulse">
                    <IconZap className="w-6 h-6 mb-2" />
                    <span className="text-xs font-mono">Analyse spectrale en cours...</span>
                 </div>
              ) : fileName ? (
                <div className="flex flex-col items-center text-emerald-400">
                  <IconCheck className="w-6 h-6 mb-2" />
                  <span className="text-xs font-mono truncate max-w-[200px]">{fileName}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-slate-500">
                  <IconFile className="w-6 h-6 mb-2 group-hover:text-slate-300 transition-colors" />
                  <span className="text-[10px] uppercase font-bold">Glisser fichier .BBL</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* MAIN DISPLAY AREA */}
      <div className="flex-1 bg-slate-950 p-4 md:p-10 overflow-y-auto relative">
        
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
            {/* Top Bar */}
            <div className="flex justify-between items-end border-b border-slate-800 pb-6 mb-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Rapport d'Analyse</h2>
                <p className="text-slate-500 text-sm flex items-center gap-2">
                {tuneResult ? <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> : <span className="w-2 h-2 rounded-full bg-slate-600"></span>}
                {tuneResult ? "Profil calculé avec succès." : "En attente des données d'entrée..."}
                </p>
            </div>
            <div className="text-right hidden md:block">
                <div className="text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">
                    {tuneResult ? tuneResult.rpmMax.toLocaleString() : "00,000"}
                </div>
                <div className="text-[10px] text-orange-500 uppercase tracking-widest font-bold mt-1">RPM Théorique</div>
            </div>
            </div>

            {!tuneResult ? (
            <div className="h-[400px] border border-slate-800 border-dashed rounded-2xl flex flex-col items-center justify-center text-slate-600">
                <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center mb-6 animate-pulse">
                    <IconChip className="w-8 h-8" />
                </div>
                <p className="text-sm uppercase tracking-wider">Configurez votre drone pour démarrer</p>
            </div>
            ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl backdrop-blur-md">
                        <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-2">Feeling PID</div>
                        <div className="text-2xl font-bold text-white">
                            {tuneResult?.pdGain > 1.05 ? "Agressif" : tuneResult?.pdGain < 0.95 ? "Cinématique" : "Equilibré"}
                        </div>
                        <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500" style={{ width: `${tuneResult.pdGain * 50}%` }}></div>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl backdrop-blur-md">
                        <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-2">Filtrage</div>
                        <div className="text-2xl font-bold text-white">{tuneResult?.filterStrategy}</div>
                         <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full ${tuneResult.filterStrategy.includes("Forte") ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: '70%' }}></div>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl backdrop-blur-md">
                        <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-2">Feed Forward</div>
                        <div className="text-2xl font-bold text-white">{Math.floor((tuneResult?.ffGain || 1) * 100)}%</div>
                         <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500" style={{ width: `${tuneResult.ffGain * 80}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Intelligence Notes */}
                {(tuneResult?.analysisNote || tuneResult?.firmwareNote) && (
                <div className="grid gap-4">
                    {tuneResult.analysisNote && (
                    <div className="bg-gradient-to-r from-orange-900/20 to-transparent border-l-4 border-orange-500 p-4 rounded-r-lg flex gap-4 items-start">
                        <IconZap className="w-5 h-5 text-orange-500 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wide">Note Blackbox</h4>
                            <p className="text-sm text-slate-300 mt-1 leading-relaxed">{tuneResult.analysisNote}</p>
                        </div>
                    </div>
                    )}
                    {tuneResult.firmwareNote && (
                    <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-lg flex gap-4 items-center">
                        <IconCpu className="w-5 h-5 text-blue-400" />
                        <p className="text-sm text-slate-400">{tuneResult.firmwareNote}</p>
                    </div>
                    )}
                </div>
                )}

                {/* Terminal Output */}
                <div className="rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-[#0c0c0c]">
                    <div className="bg-[#1a1a1a] px-4 py-2 flex justify-between items-center border-b border-[#2a2a2a]">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 flex items-center gap-2">
                             <IconTerminal className="w-3 h-3" /> bash — betaflight-cli
                        </div>
                        <button 
                            onClick={copyToClipboard}
                            className={`text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wide transition-all ${copied ? 'bg-emerald-500 text-black' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                        >
                            {copied ? "Copié !" : "Copier"}
                        </button>
                    </div>
                    <div className="p-6 overflow-x-auto custom-scrollbar">
                        <pre className="font-mono text-sm leading-relaxed">
                            <code className="text-emerald-500"># Betaflight Tune Generator v1.0</code><br/>
                            <code className="text-slate-300">{tuneResult.cliOutput}</code>
                        </pre>
                    </div>
                </div>
                 <p className="text-xs text-slate-600 text-center">Copiez ce code dans l'onglet CLI de Betaflight Configurator et tapez <span className="font-mono text-slate-400">save</span>.</p>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}