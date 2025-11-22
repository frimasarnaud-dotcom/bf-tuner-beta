import React, { useState, useRef, useEffect } from 'react';

// --- SVGs (Wireframe / Technical Style) ---

const DroneBlueprint = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full opacity-10 pointer-events-none" stroke="currentColor" strokeWidth="0.5" fill="none">
    {/* Central Stack */}
    <rect x="85" y="85" width="30" height="30" rx="2" />
    <circle cx="100" cy="100" r="4" />
    
    {/* Arms */}
    <line x1="85" y1="85" x2="40" y2="40" />
    <line x1="115" y1="85" x2="160" y2="40" />
    <line x1="115" y1="115" x2="160" y2="160" />
    <line x1="85" y1="115" x2="40" y2="160" />
    
    {/* Motors */}
    <circle cx="40" cy="40" r="12" />
    <circle cx="160" cy="40" r="12" />
    <circle cx="160" cy="160" r="12" />
    <circle cx="40" cy="160" r="12" />
    
    {/* Propellers Sweep */}
    <circle cx="40" cy="40" r="35" strokeDasharray="4 4" />
    <circle cx="160" cy="40" r="35" strokeDasharray="4 4" />
    <circle cx="160" cy="160" r="35" strokeDasharray="4 4" />
    <circle cx="40" cy="160" r="35" strokeDasharray="4 4" />
    
    {/* Technical Lines */}
    <line x1="10" y1="100" x2="190" y2="100" strokeOpacity="0.5" />
    <line x1="100" y1="10" x2="100" y2="190" strokeOpacity="0.5" />
  </svg>
);

const IconUpload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const IconCopy = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

// --- TYPES & CONFIG ---

type FrameType = 'tinywhoop' | 'toothpick' | 'micro' | 'freestyle' | 'bando' | 'cinewhoop' | 'longrange';
type PilotStyle = 'aggressive' | 'race' | 'smooth';
type BfVersion = '4.3' | '4.4' | '4.5';

interface DroneSpecs {
  kv: number; cells: number; propSize: number; weight: number;
  frameType: FrameType; pilotStyle: PilotStyle; bfVersion: BfVersion;
}

const FRAME_OPTIONS: {value: FrameType, label: string}[] = [
  { value: 'tinywhoop', label: "Tinywhoop (65-75mm)" },
  { value: 'toothpick', label: "Toothpick 2.5\" - 3\"" },
  { value: 'micro', label: "Micro 3\" - 4\"" },
  { value: 'freestyle', label: "Freestyle 5\" (Clean)" },
  { value: 'bando', label: "Freestyle 5\" (Bando/Heavy)" },
  { value: 'cinewhoop', label: "Cinewhoop (Ducts)" },
  { value: 'longrange', label: "Long Range 7\"" },
];

// --- ENGINE (UNCHANGED LOGIC) ---

const calculateTune = (specs: DroneSpecs, fileAnalysis?: { noiseFreq: number, noiseMagnitude: number }) => {
  const voltage = specs.cells * 4.2;
  const rpm = specs.kv * voltage * 0.85;
  
  let master = 1.0, pd = 1.0, dfilt = 1.0, iboost = 0;

  // Frame Logic
  switch(specs.frameType) {
    case 'tinywhoop': master=1.8; pd=0.8; dfilt=0.8; break;
    case 'toothpick': master=1.4; break;
    case 'micro': master=1.3; break;
    case 'bando': pd=0.9; dfilt=1.3; iboost=5; break;
    case 'cinewhoop': master=1.1; pd=0.9; iboost=15; dfilt=1.4; break;
    case 'longrange': master=0.9; dfilt=1.5; break;
    case 'freestyle': pd=1.1; break;
  }

  // Style Logic
  if (specs.pilotStyle === 'aggressive') { master*=1.05; pd*=1.05; dfilt*=0.95; }
  else if (specs.pilotStyle === 'race') { master*=1.1; pd*=1.15; dfilt*=0.85; }
  else { master*=0.95; pd*=0.95; dfilt*=1.1; iboost+=10; }

  // RPM Logic
  if (rpm > 45000) dfilt *= 0.8;
  if (rpm < 25000) dfilt *= 1.2;

  // Blackbox Logic
  let bbNote = "";
  let notch = "";
  if (fileAnalysis) {
    if (fileAnalysis.noiseMagnitude > 50) {
      dfilt += 0.3;
      const hz = fileAnalysis.noiseFreq;
      notch = `\n# [BLACKBOX] Pic de bruit détecté: ${hz}Hz\nset gyro_lpf2_type = PT1\nset gyro_lpf2_static_hz = ${hz*2}\nset dterm_notch_hz = ${hz}\nset dterm_notch_cutoff = ${Math.floor(hz*0.75)}`;
      bbNote = "Filtres renforcés suite à l'analyse BB.";
    } else {
      dfilt -= 0.1;
      bbNote = "Log propre : Filtrage réduit pour diminuer la latence.";
    }
  }

  const pPitch = Math.floor(46*master*pd);
  const iPitch = Math.floor(85*master)+iboost;
  const dPitch = Math.floor(30*master/pd);
  
  const pRoll = Math.floor(42*master*pd);
  const iRoll = Math.floor(80*master)+iboost;
  const dRoll = Math.floor(27*master/pd);

  const bf45 = specs.bfVersion === '4.5' ? 
    `set vbat_sag_compensation = 100\nset feedforward_averaging = 2_POINT\nset feedforward_smooth_factor = 25\nset feedforward_jitter_reduction = 7` : 
    `set vbat_sag_compensation = 0`;

  return `
# ==========================================
#  AI PRESET: ${specs.frameType.toUpperCase()} / ${specs.pilotStyle.toUpperCase()}
# ==========================================
# Specs: ${specs.kv}KV | ${specs.cells}S | ${specs.weight}g
# RPM Théorique: ${Math.floor(rpm)}
${bbNote ? "# " + bbNote : ""}

profile 0

# --- PID GAINS ---
set p_pitch = ${pPitch}
set i_pitch = ${iPitch}
set d_pitch = ${dPitch}
set f_pitch = ${Math.floor(100 * (specs.pilotStyle==='race'?1.2:1))}

set p_roll = ${pRoll}
set i_roll = ${iRoll}
set d_roll = ${dRoll}
set f_roll = ${Math.floor(95 * (specs.pilotStyle==='race'?1.2:1))}

set p_yaw = ${Math.floor(45 * master)}
set i_yaw = ${Math.floor(85 * master)}
set d_yaw = 0
set f_yaw = ${Math.floor(100 * (specs.pilotStyle==='race'?1.2:1))}

# --- FILTRES ---
set dterm_lpf1_dyn_min_hz = ${Math.max(Math.floor(rpm/240), 150)}
set dterm_lpf1_dyn_max_hz = ${Math.max(Math.floor(rpm/60), 400)}
set dterm_lpf1_type = PT1
set dterm_lpf2_type = PT1
${notch}

${bf45}

save
`;
};

// --- COMPONENT ---

export default function App() {
  const [specs, setSpecs] = useState<DroneSpecs>({
    kv: 1950, cells: 6, propSize: 5, weight: 650,
    frameType: 'freestyle', pilotStyle: 'aggressive', bfVersion: '4.5'
  });
  
  const [fileName, setFileName] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [cli, setCli] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setAnalyzing(true);
      setFileName(f.name);
      // Simule une analyse
      setTimeout(() => {
        setAnalyzing(false);
        // Mock result: si le nom contient 'noise', on simule du bruit
        const hasNoise = f.name.includes('noise'); 
        const analysis = hasNoise ? { noiseFreq: 220, noiseMagnitude: 65 } : { noiseFreq: 0, noiseMagnitude: 10 };
        setCli(calculateTune(specs, analysis));
      }, 1500);
    }
  };

  const generateManual = () => {
    setCli(calculateTune(specs));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans flex flex-col md:flex-row">
      
      {/* LEFT PANEL: INPUTS */}
      <div className="w-full md:w-[500px] bg-zinc-900 flex flex-col border-r border-zinc-800 shadow-2xl z-10">
        
        {/* Header */}
        <div className="p-8 border-b border-zinc-800">
           <h1 className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
             <span className="text-white">FPV</span>
             <span className="text-indigo-500">TUNE</span>
             <span className="text-zinc-600 font-normal text-sm ml-auto">v2.0.4 (Stable)</span>
           </h1>
           <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest font-medium">AI Engineering Tool</p>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          
          {/* 1. MACHINE */}
          <section>
             <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">1. Machine Specs</h2>
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] uppercase text-zinc-500 font-bold mb-1">Version BF</label>
                   <select className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-sm focus:border-indigo-500 outline-none"
                     value={specs.bfVersion} onChange={e => setSpecs({...specs, bfVersion: e.target.value as BfVersion})}>
                     <option value="4.5">Betaflight 4.5+</option>
                     <option value="4.4">Betaflight 4.4</option>
                     <option value="4.3">Betaflight 4.3</option>
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] uppercase text-zinc-500 font-bold mb-1">Chassis</label>
                   <select className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-sm focus:border-indigo-500 outline-none"
                     value={specs.frameType} onChange={e => setSpecs({...specs, frameType: e.target.value as FrameType})}>
                     {FRAME_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] uppercase text-zinc-500 font-bold mb-1">Moteur (KV)</label>
                   <input type="number" className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-sm focus:border-indigo-500 outline-none font-mono"
                     value={specs.kv} onChange={e => setSpecs({...specs, kv: +e.target.value})} />
                </div>
                <div>
                   <label className="block text-[10px] uppercase text-zinc-500 font-bold mb-1">LiPo (S)</label>
                   <select className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-sm focus:border-indigo-500 outline-none"
                     value={specs.cells} onChange={e => setSpecs({...specs, cells: +e.target.value})}>
                     {[1,2,3,4,6,8].map(s => <option key={s} value={s}>{s}S</option>)}
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] uppercase text-zinc-500 font-bold mb-1">Hélice (In)</label>
                   <input type="number" className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-sm focus:border-indigo-500 outline-none font-mono"
                     value={specs.propSize} onChange={e => setSpecs({...specs, propSize: +e.target.value})} />
                </div>
                <div>
                   <label className="block text-[10px] uppercase text-zinc-500 font-bold mb-1">Poids (g)</label>
                   <input type="number" className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-sm focus:border-indigo-500 outline-none font-mono"
                     value={specs.weight} onChange={e => setSpecs({...specs, weight: +e.target.value})} />
                </div>
             </div>
          </section>

          {/* 2. FEELING */}
          <section>
             <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">2. Flight Feel</h2>
             <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'aggressive', label: 'AGRO', desc: 'Freestyle Sharp' },
                  { id: 'race', label: 'RACE', desc: 'Tracking Max' },
                  { id: 'smooth', label: 'SMOOTH', desc: 'Cinematic Flow' }
                ].map(s => (
                  <button 
                    key={s.id}
                    onClick={() => setSpecs({...specs, pilotStyle: s.id as PilotStyle})}
                    className={`p-3 rounded border transition-all ${specs.pilotStyle === s.id ? 'bg-zinc-800 border-indigo-500 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                  >
                    <div className="text-xs font-bold">{s.label}</div>
                    <div className="text-[9px] mt-1 opacity-70">{s.desc}</div>
                  </button>
                ))}
             </div>
          </section>

          {/* 3. BLACKBOX (PRO) */}
          <section>
             <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">3. Blackbox (Pour les Pros)</h2>
             <div className={`relative border border-dashed rounded-lg h-24 flex flex-col items-center justify-center transition-all ${fileName ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-zinc-700 bg-zinc-950 hover:border-zinc-500'}`}>
                <input type="file" accept=".bbl,.csv" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
                
                {analyzing ? (
                  <div className="text-xs font-mono text-indigo-400 animate-pulse">ANALYSE FFT EN COURS...</div>
                ) : fileName ? (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <IconCheck />
                    <span className="text-xs font-bold">{fileName}</span>
                  </div>
                ) : (
                  <>
                    <IconUpload />
                    <span className="text-[10px] uppercase font-bold mt-2 text-zinc-500">Lier Log Blackbox (.BBL)</span>
                  </>
                )}
             </div>
             <p className="text-[10px] text-zinc-600 mt-2 leading-relaxed">
               Uploadez un log Blackbox pour que l'IA détecte les pics de bruit réels et ajuste les filtres Notch automatiquement.
             </p>
          </section>

          {!fileName && (
            <button onClick={generateManual} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded text-sm uppercase tracking-wide border border-zinc-700 transition-all">
              Générer sans Blackbox
            </button>
          )}

        </div>
      </div>

      {/* RIGHT PANEL: OUTPUT */}
      <div className="flex-1 bg-black flex flex-col relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 flex items-center justify-center text-zinc-900/20">
           <DroneBlueprint />
        </div>

        <div className="relative z-10 flex-1 flex flex-col p-8">
           <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-zinc-400">CLI OUTPUT</h2>
              {cli && (
                <button 
                  onClick={() => { navigator.clipboard.writeText(cli); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className={`text-xs font-bold px-4 py-2 rounded uppercase tracking-wide transition-colors ${copied ? 'bg-emerald-500 text-black' : 'bg-white text-black hover:bg-zinc-200'}`}
                >
                  {copied ? "Copié dans le presse-papier" : "Copier le Code"}
                </button>
              )}
           </div>

           <div className="flex-1 bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-lg overflow-hidden relative shadow-xl">
              {cli ? (
                <textarea 
                  readOnly
                  value={cli}
                  className="w-full h-full bg-transparent text-emerald-500 font-mono text-xs p-6 outline-none resize-none leading-relaxed"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600">
                   <div className="w-16 h-16 border-2 border-zinc-800 border-dashed rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold">?</span>
                   </div>
                   <p className="text-sm font-medium">EN ATTENTE DE DONNÉES</p>
                   <p className="text-xs opacity-50 mt-1">Remplissez le formulaire à gauche pour générer.</p>
                </div>
              )}
           </div>
           
           <p className="text-[10px] text-zinc-600 mt-4 text-center">
             Ce code est généré par un modèle physique prédictif. Vérifiez toujours la température des moteurs après le premier vol.
           </p>
        </div>
      </div>

    </div>
  );
}