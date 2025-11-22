import React, { useState } from 'react';

// --- ILLUSTRATION TECHNIQUE (SVG) ---
const DroneBlueprint = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.07] pointer-events-none" stroke="currentColor" strokeWidth="1" fill="none">
    {/* Central Stack & Body */}
    <rect x="170" y="170" width="60" height="60" rx="4" strokeWidth="2" />
    <circle cx="200" cy="200" r="10" />
    <path d="M200 170 V130 M200 230 V270 M170 200 H130 M230 200 H270" strokeDasharray="4 4" />
    
    {/* Arms X Pattern */}
    <line x1="170" y1="170" x2="80" y2="80" strokeWidth="2" />
    <line x1="230" y1="170" x2="320" y2="80" strokeWidth="2" />
    <line x1="230" y1="230" x2="320" y2="320" strokeWidth="2" />
    <line x1="170" y1="230" x2="80" y2="320" strokeWidth="2" />
    
    {/* Motors */}
    <circle cx="80" cy="80" r="25" strokeWidth="2" />
    <circle cx="320" cy="80" r="25" strokeWidth="2" />
    <circle cx="320" cy="320" r="25" strokeWidth="2" />
    <circle cx="80" cy="320" r="25" strokeWidth="2" />
    
    {/* Propeller Swing Circles */}
    <circle cx="80" cy="80" r="70" strokeDasharray="2 4" opacity="0.5" />
    <circle cx="320" cy="80" r="70" strokeDasharray="2 4" opacity="0.5" />
    <circle cx="320" cy="320" r="70" strokeDasharray="2 4" opacity="0.5" />
    <circle cx="80" cy="320" r="70" strokeDasharray="2 4" opacity="0.5" />

    {/* Data Lines */}
    <path d="M350 80 H380 M350 320 H380" strokeOpacity="0.5" />
    <text x="385" y="85" fontSize="10" fill="currentColor" opacity="0.5" stroke="none">M2 (CCW)</text>
    <text x="385" y="325" fontSize="10" fill="currentColor" opacity="0.5" stroke="none">M4 (CW)</text>
  </svg>
);

// --- ICONS ---
const IconUpload = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconZap = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;

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
  { value: 'bando', label: "Freestyle 5\" (Bando/Lourd)" },
  { value: 'cinewhoop', label: "Cinewhoop (Ducts)" },
  { value: 'longrange', label: "Long Range 7\"" },
];

// --- ENGINE ---
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
      notch = `\n# [BLACKBOX] Pic de bruit détecté: ${hz}Hz (Magnitude: ${fileAnalysis.noiseMagnitude}%)\nset gyro_lpf2_type = PT1\nset gyro_lpf2_static_hz = ${hz*2}\nset dterm_notch_hz = ${hz}\nset dterm_notch_cutoff = ${Math.floor(hz*0.75)}`;
      bbNote = `Filtres renforcés (Pic ${hz}Hz détecté).`;
    } else {
      dfilt -= 0.1;
      bbNote = "Log propre : Filtrage réduit pour diminuer la latence.";
    }
  } else {
      const hz = Math.floor(rpm/60);
      notch = `\n# [ESTIMATION] Pas de Blackbox, Notch basé sur RPM théorique\nset dterm_notch_hz = ${hz}\nset dterm_notch_cutoff = ${Math.floor(hz*0.7)}`;
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
#  AI PRESET: ${specs.frameType.toUpperCase()}
# ==========================================
# Style: ${specs.pilotStyle.toUpperCase()} | Poids: ${specs.weight}g
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

# --- FILTRES DYNAMIQUES ---
set dterm_lpf1_dyn_min_hz = ${Math.max(Math.floor(rpm/240), 150)}
set dterm_lpf1_dyn_max_hz = ${Math.max(Math.floor(rpm/60), 400)}
set dterm_lpf1_type = PT1
set dterm_lpf2_type = PT1
${notch}

${bf45}

save
`;
};

// --- APP ---

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
      // Simule analyse
      setTimeout(() => {
        setAnalyzing(false);
        const hasNoise = f.name.toLowerCase().includes('noise'); 
        const analysis = hasNoise ? { noiseFreq: 220, noiseMagnitude: 65 } : { noiseFreq: 0, noiseMagnitude: 10 };
        setCli(calculateTune(specs, analysis));
      }, 1500);
    }
  };

  const generateManual = () => {
    setCli(calculateTune(specs));
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-gray-300 font-sans flex flex-col md:flex-row overflow-hidden">
      
      {/* LEFT PANEL: CONTROLS */}
      <div className="w-full md:w-[450px] flex flex-col border-r border-[#27272a] bg-[#18181b] shadow-2xl z-10">
        
        <div className="p-8 border-b border-[#27272a]">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
            <IconZap /> <span>FPV <span className="text-orange-500">TUNER</span></span>
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-mono">AI ENGINEERING TOOL v2.1</p>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          
          {/* SECTION 1 */}
          <div>
             <h2 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-4">1. Configuration Machine</h2>
             <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                   <label className="text-[10px] uppercase font-bold text-gray-500">Version Betaflight</label>
                   <select className="w-full bg-[#09090b] border border-[#27272a] rounded p-2.5 text-sm focus:border-orange-500 outline-none"
                     value={specs.bfVersion} onChange={e => setSpecs({...specs, bfVersion: e.target.value as BfVersion})}>
                     <option value="4.5">Betaflight 4.5+</option>
                     <option value="4.4">Betaflight 4.4</option>
                     <option value="4.3">Betaflight 4.3</option>
                   </select>
                </div>
                
                <div>
                   <label className="text-[10px] uppercase font-bold text-gray-500">KV Moteur</label>
                   <input type="number" className="w-full bg-[#09090b] border border-[#27272a] rounded p-2.5 text-sm focus:border-orange-500 outline-none"
                     value={specs.kv} onChange={e => setSpecs({...specs, kv: +e.target.value})} />
                </div>
                <div>
                   <label className="text-[10px] uppercase font-bold text-gray-500">LiPo (S)</label>
                   <select className="w-full bg-[#09090b] border border-[#27272a] rounded p-2.5 text-sm focus:border-orange-500 outline-none"
                     value={specs.cells} onChange={e => setSpecs({...specs, cells: +e.target.value})}>
                     {[1,2,3,4,6,8].map(s => <option key={s} value={s}>{s}S</option>)}
                   </select>
                </div>

                <div className="col-span-2">
                   <label className="text-[10px] uppercase font-bold text-gray-500">Chassis / Frame</label>
                   <select className="w-full bg-[#09090b] border border-[#27272a] rounded p-2.5 text-sm focus:border-orange-500 outline-none"
                     value={specs.frameType} onChange={e => setSpecs({...specs, frameType: e.target.value as FrameType})}>
                     {FRAME_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                   </select>
                </div>

                <div>
                   <label className="text-[10px] uppercase font-bold text-gray-500">Hélice (In)</label>
                   <input type="number" className="w-full bg-[#09090b] border border-[#27272a] rounded p-2.5 text-sm focus:border-orange-500 outline-none"
                     value={specs.propSize} onChange={e => setSpecs({...specs, propSize: +e.target.value})} />
                </div>
                <div>
                   <label className="text-[10px] uppercase font-bold text-gray-500">Poids (g)</label>
                   <input type="number" className="w-full bg-[#09090b] border border-[#27272a] rounded p-2.5 text-sm focus:border-orange-500 outline-none"
                     value={specs.weight} onChange={e => setSpecs({...specs, weight: +e.target.value})} />
                </div>
             </div>
          </div>

          {/* SECTION 2 */}
          <div>
             <h2 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-4">2. Style de Vol</h2>
             <div className="flex flex-col gap-2">
                {[
                  { id: 'aggressive', label: 'AGRESSIF', sub: 'Réactif, Sharp, Freestyle' },
                  { id: 'race', label: 'RACE', sub: 'Latence Min, Tracking Max' },
                  { id: 'smooth', label: 'SMOOTH', sub: 'Fluide, Cinématique' }
                ].map(s => (
                  <button 
                    key={s.id}
                    onClick={() => setSpecs({...specs, pilotStyle: s.id as PilotStyle})}
                    className={`flex items-center justify-between p-3 rounded border transition-all ${specs.pilotStyle === s.id ? 'bg-orange-500/10 border-orange-500 text-orange-500' : 'bg-[#09090b] border-[#27272a] hover:border-gray-600'}`}
                  >
                    <span className="font-bold text-sm">{s.label}</span>
                    <span className="text-[10px] opacity-60">{s.sub}</span>
                  </button>
                ))}
             </div>
          </div>

          {/* SECTION 3 */}
          <div>
             <h2 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-4">3. Blackbox (Optionnel)</h2>
             <div className={`relative h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all ${fileName ? 'border-emerald-500 bg-emerald-900/10' : 'border-[#27272a] bg-[#09090b] hover:border-gray-500'}`}>
                <input type="file" accept=".bbl,.csv" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
                {analyzing ? (
                  <span className="text-orange-500 font-mono text-xs animate-pulse">ANALYSE SPECTRALE...</span>
                ) : fileName ? (
                  <div className="flex items-center gap-2 text-emerald-500">
                    <IconCheck /> <span className="text-xs font-bold">{fileName}</span>
                  </div>
                ) : (
                  <>
                    <IconUpload />
                    <span className="text-[10px] font-bold text-gray-500 mt-2 uppercase">Lier un fichier .BBL</span>
                  </>
                )}
             </div>
          </div>

          {!fileName && (
            <button onClick={generateManual} className="w-full py-4 bg-[#27272a] hover:bg-[#3f3f46] text-white font-bold rounded uppercase text-sm transition-colors">
               Générer sans Blackbox
            </button>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: OUTPUT */}
      <div className="flex-1 bg-[#09090b] relative flex flex-col">
        
        {/* BLUEPRINT BACKGROUND */}
        <div className="absolute inset-0 flex items-center justify-center text-[#27272a]">
           <DroneBlueprint />
        </div>

        <div className="relative z-10 flex-1 p-8 flex flex-col">
           <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">CLI RESULT</h2>
              {cli && (
                <button 
                  onClick={() => { navigator.clipboard.writeText(cli); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className={`text-xs font-bold px-4 py-2 rounded uppercase transition-colors ${copied ? 'bg-emerald-500 text-black' : 'bg-white text-black hover:bg-gray-200'}`}
                >
                  {copied ? "Copié !" : "Copier le Code"}
                </button>
              )}
           </div>

           <div className="flex-1 bg-[#000]/50 backdrop-blur-sm border border-[#27272a] rounded-lg overflow-hidden shadow-2xl relative">
              {cli ? (
                <textarea 
                  readOnly
                  value={cli}
                  className="w-full h-full bg-transparent text-emerald-500 font-mono text-xs p-6 outline-none resize-none leading-relaxed"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                   <p className="font-bold text-sm uppercase tracking-widest">En attente de données</p>
                   <p className="text-xs mt-2 opacity-50">Complétez le formulaire à gauche.</p>
                </div>
              )}
           </div>
           
           <div className="mt-4 text-center">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                 Attention : Vérifiez la température des moteurs après le premier vol.
              </p>
           </div>
        </div>
      </div>

    </div>
  );
}