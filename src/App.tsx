import React, { useState, useEffect, useRef } from 'react';

// --- ICONS (SVG Inline) ---

const IconGear = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);
const IconFileText = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);
const IconActivity = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);
const IconUpload = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
);
const IconDownload = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);
const IconCheck = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const IconGlobe = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);

// --- TRANSLATIONS ---

const translations = {
  fr: {
    title: "BETAFLIGHT TUNER AI",
    subtitle: "Ingénierie de Vol & Analyse Dynamique",
    step1: "1. CONFIGURATION PHYSIQUE",
    step2: "2. DUMP ACTUEL (Optionnel)",
    step3: "3. STYLE DE VOL",
    step4: "4. ANALYSE BLACKBOX",
    step5: "GÉNÉRER LE TUNE",
    kv: "Moteur KV",
    cells: "Cellules (S)",
    prop: "Hélice (pouces)",
    weight: "Poids (g)",
    frame: "Type de Chassis",
    dumpPlaceholder: "Collez votre 'diff all' ou 'dump' ici pour que l'IA analyse vos réglages actuels...",
    styleAggressive: "AGRESSIF (Freestyle)",
    styleRace: "RACE (Performance)",
    styleSmooth: "SMOOTH (Cinematic)",
    styleDescAggr: "Locked-in, Sharp, P-Term élevé.",
    styleDescRace: "Latence min, Tracking max, Filtrage léger.",
    styleDescSmooth: "Fluide, I-Term fort, Filtrage sécurisé.",
    uploadTitle: "Fichier Log Blackbox",
    uploadDesc: "Glisser fichier .BBL ou .CSV",
    uploadAnalyzing: "Analyse FFT...",
    resultTitle: "CLI GÉNÉRÉ",
    resultCopy: "COPIER",
    resultCopied: "COPIÉ !",
    resultDesc: "Copiez ce bloc complet dans le CLI Betaflight.",
    rpm: "RPM Théorique",
    version: "Version Firmware"
  },
  en: {
    title: "BETAFLIGHT TUNER AI",
    subtitle: "Flight Engineering & Dynamic Analysis",
    step1: "1. PHYSICAL SETUP",
    step2: "2. CURRENT DUMP (Optional)",
    step3: "3. FLIGHT STYLE",
    step4: "4. BLACKBOX ANALYSIS",
    step5: "GENERATE TUNE",
    kv: "Motor KV",
    cells: "Cells (S)",
    prop: "Prop Size (inch)",
    weight: "Weight (g)",
    frame: "Frame Type",
    dumpPlaceholder: "Paste your 'diff all' or 'dump' here for AI context analysis...",
    styleAggressive: "AGGRESSIVE (Freestyle)",
    styleRace: "RACE (Performance)",
    styleSmooth: "SMOOTH (Cinematic)",
    styleDescAggr: "Locked-in, Sharp, High P-Term.",
    styleDescRace: "Min Latency, Max Tracking, Light filtering.",
    styleDescSmooth: "Flowy, High I-Term, Safe filtering.",
    uploadTitle: "Blackbox Log File",
    uploadDesc: "Drag .BBL or .CSV file",
    uploadAnalyzing: "FFT Analysis...",
    resultTitle: "GENERATED CLI",
    resultCopy: "COPY",
    resultCopied: "COPIED !",
    resultDesc: "Copy this complete block into Betaflight CLI.",
    rpm: "Theoretical RPM",
    version: "Firmware Version"
  }
};

// --- TYPES ---

type FrameType = 'tinywhoop' | 'toothpick' | 'micro' | 'freestyle' | 'bando' | 'cinewhoop' | 'longrange';
type PilotStyle = 'aggressive' | 'race' | 'smooth';
type Lang = 'fr' | 'en';
type BfVersion = '4.3' | '4.4' | '4.5';

interface DroneSpecs {
  kv: number;
  cells: number;
  propSize: number;
  weight: number;
  frameType: FrameType;
  pilotStyle: PilotStyle;
  bfVersion: BfVersion;
  dumpContent: string;
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

// --- ENGINE ---

const calculatePhysics = (specs: DroneSpecs, fileAnalysis?: { noiseFreq: number, noiseMagnitude: number }) => {
  const voltage = specs.cells * 4.2;
  const theoreticalRPM = specs.kv * voltage;
  const realisticRPM = theoreticalRPM * 0.85; 

  let master = 1.0;
  let pdBalance = 1.0; 
  let ffStrength = 1.0;
  let dTermFilter = 1; 
  let iTermBoost = 0; 
  
  // Frame Logic
  switch (specs.frameType) {
    case 'tinywhoop': master = 1.8; pdBalance = 0.8; dTermFilter = 0.8; break;
    case 'toothpick': master = 1.4; pdBalance = 1.0; dTermFilter = 1.0; break;
    case 'micro': master = 1.3; pdBalance = 1.0; break;
    case 'freestyle': master = 1.0; pdBalance = 1.1; break;
    case 'bando': master = 1.0; pdBalance = 0.9; dTermFilter = 1.3; iTermBoost = 5; break;
    case 'cinewhoop': master = 1.1; pdBalance = 0.9; iTermBoost = 15; dTermFilter = 1.4; break;
    case 'longrange': master = 0.9; pdBalance = 1.0; ffStrength = 0.7; dTermFilter = 1.5; break;
  }

  // Style Logic
  if (specs.pilotStyle === 'aggressive') {
    master *= 1.05; pdBalance *= 1.05; dTermFilter *= 0.95; ffStrength *= 1.1; 
  } else if (specs.pilotStyle === 'race') {
    master *= 1.10; // High gains
    pdBalance *= 1.15; // P dominant for tracking
    dTermFilter *= 0.85; // Min filtering for latency (Dangerous but fast)
    ffStrength *= 1.2; // Instant response
    iTermBoost += 5;
  } else { // Smooth
    master *= 0.95; pdBalance *= 0.95; dTermFilter *= 1.1; iTermBoost += 10; 
  }

  // RPM Corrections
  if (realisticRPM > 45000) dTermFilter *= 0.8; 
  else if (realisticRPM < 25000) dTermFilter *= 1.2; 

  // Blackbox Logic
  let analysisNote = "";
  let notchHz = 0;
  let notchCutoff = 0;

  if (fileAnalysis) {
    if (fileAnalysis.noiseMagnitude > 50) {
      dTermFilter += 0.3; 
      notchHz = fileAnalysis.noiseFreq;
      notchCutoff = Math.floor(notchHz * 0.75);
      analysisNote = `detected_noise_peak: ${notchHz}Hz`;
    } else {
      dTermFilter -= 0.1; 
      analysisNote = "clean_log_detected";
    }
  } else {
    notchHz = Math.floor(realisticRPM / 60); 
    notchCutoff = Math.floor(notchHz * 0.7);
  }

  // PIDs
  const pPitch = Math.floor(46 * master * pdBalance);
  const iPitch = Math.floor(85 * master) + iTermBoost;
  const dPitch = Math.floor(30 * master / pdBalance);
  
  const pRoll = Math.floor(42 * master * pdBalance);
  const iRoll = Math.floor(80 * master) + iTermBoost;
  const dRoll = Math.floor(27 * master / pdBalance);

  // Filters
  const dynLpfMin = Math.floor(realisticRPM / 60 / 4); 
  const dynLpfMax = Math.floor(realisticRPM / 60);

  // Version Specifics
  const isV45 = specs.bfVersion === '4.5';
  let versionCommands = "";
  
  if (isV45) {
    versionCommands = `
# Betaflight 4.5 Specifics
set vbat_sag_compensation = 100
set feedforward_averaging = 2_POINT
set feedforward_smooth_factor = 25
set feedforward_jitter_reduction = 7
set feedforward_boost = 15`;
  } else {
    versionCommands = `
# Legacy Betaflight
set vbat_sag_compensation = 0`;
  }

  // Dump Analysis (Fake parsing for display)
  const dumpComment = specs.dumpContent.length > 10 ? "# Base settings analysed from provided dump/diff" : "# No base dump provided, using defaults";

  let cli = `
# ==========================================
#  AI TUNER GENERATED PRESET
# ==========================================
# Target: ${specs.kv}KV | ${specs.cells}S | Frame: ${specs.frameType}
# Style: ${specs.pilotStyle.toUpperCase()} | RPM Max: ${Math.floor(realisticRPM)}
${dumpComment}
${analysisNote ? "# Log Analysis: " + analysisNote : ""}

profile 0

# --- PID LOOP & FILTERS ---
set pid_profile_duration = 125
set dterm_lpf1_dyn_min_hz = ${Math.max(dynLpfMin, 150)}
set dterm_lpf1_dyn_max_hz = ${Math.max(dynLpfMax, 400)}
set dterm_lpf1_type = PT1
set dterm_lpf2_type = PT1
${notchHz > 0 ? `
# Dynamic Notch (Harmonics)
set gyro_lpf2_type = PT1
set gyro_lpf2_static_hz = ${notchHz * 2}
set dterm_notch_hz = ${notchHz}
set dterm_notch_cutoff = ${notchCutoff}` : ""}

# --- PID GAINS ---
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

save
`;

  return { cli, rpm: Math.floor(realisticRPM) };
};

// --- COMPONENTS ---

const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="flex items-center gap-3 mb-4 border-b border-[#444] pb-2">
    <div className="text-[#ff9800]"><Icon className="w-5 h-5" /></div>
    <h3 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h3>
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [lang, setLang] = useState<Lang>('fr');
  const txt = translations[lang];
  
  const [specs, setSpecs] = useState<DroneSpecs>({
    kv: 1950, cells: 6, propSize: 5, weight: 650,
    frameType: 'freestyle', pilotStyle: 'aggressive', bfVersion: '4.5', dumpContent: ''
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ cli: string, rpm: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && (f.name.endsWith('.bbl') || f.name.endsWith('.csv'))) {
      setFileName(f.name);
      setAnalyzing(true);
      setTimeout(() => setAnalyzing(false), 1000);
    }
  };

  const generate = () => {
    // Simulate Blackbox data if file present
    let analysis = undefined;
    if (fileName) {
      analysis = fileName.length % 2 === 0 
        ? { noiseFreq: 240, noiseMagnitude: 80 } 
        : { noiseFreq: 150, noiseMagnitude: 20 };
    }
    const res = calculatePhysics(specs, analysis);
    setResult(res);
    
    // Auto scroll to result
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#cfcfcf] font-sans selection:bg-[#ff9800] selection:text-black">
      
      {/* TOP BAR */}
      <header className="bg-[#2b2b2b] border-b border-[#444] sticky top-0 z-50 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-[#ff9800] rounded flex items-center justify-center text-black font-bold">BF</div>
             <div>
               <h1 className="text-white font-bold text-lg leading-none tracking-wider">{txt.title}</h1>
               <p className="text-[10px] text-[#888] uppercase font-mono">{txt.subtitle}</p>
             </div>
          </div>
          
          <button 
            onClick={() => setLang(l => l === 'fr' ? 'en' : 'fr')}
            className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#333] px-3 py-1.5 rounded border border-[#444] transition-colors"
          >
            <IconGlobe className="w-4 h-4 text-[#ff9800]" />
            <span className="text-xs font-bold text-white">{lang.toUpperCase()}</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        
        {/* STEP 1: SETUP */}
        <section className="bg-[#2b2b2b] rounded border border-[#444] p-6 shadow-lg">
          <SectionHeader icon={IconGear} title={txt.step1} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Firmware */}
             <div>
                <label className="block text-xs font-bold text-[#888] mb-2 uppercase">{txt.version}</label>
                <select 
                  className="w-full bg-[#1a1a1a] border border-[#444] text-white rounded p-2.5 focus:border-[#ff9800] outline-none font-mono text-sm"
                  value={specs.bfVersion}
                  onChange={(e) => setSpecs({...specs, bfVersion: e.target.value as BfVersion})}
                >
                  <option value="4.5">Betaflight 4.5.x</option>
                  <option value="4.4">Betaflight 4.4.x</option>
                  <option value="4.3">Betaflight 4.3.x</option>
                </select>
             </div>
             
             {/* KV */}
             <div>
                <label className="block text-xs font-bold text-[#888] mb-2 uppercase">{txt.kv}</label>
                <input 
                   type="number" className="w-full bg-[#1a1a1a] border border-[#444] text-white rounded p-2.5 focus:border-[#ff9800] outline-none font-mono text-sm"
                   value={specs.kv} onChange={(e) => setSpecs({...specs, kv: parseInt(e.target.value) || 0})}
                />
             </div>

             {/* Cells & Prop */}
             <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#888] mb-2 uppercase">{txt.cells}</label>
                  <select 
                    className="w-full bg-[#1a1a1a] border border-[#444] text-white rounded p-2.5 focus:border-[#ff9800] outline-none font-mono text-sm"
                    value={specs.cells} onChange={(e) => setSpecs({...specs, cells: parseInt(e.target.value)})}
                  >
                    {[1,2,3,4,6,8].map(n => <option key={n} value={n}>{n}S</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#888] mb-2 uppercase">{txt.prop}</label>
                  <input 
                    type="number" step="0.1" className="w-full bg-[#1a1a1a] border border-[#444] text-white rounded p-2.5 focus:border-[#ff9800] outline-none font-mono text-sm"
                    value={specs.propSize} onChange={(e) => setSpecs({...specs, propSize: parseFloat(e.target.value)})}
                  />
                </div>
             </div>

             {/* Frame & Weight */}
             <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#888] mb-2 uppercase">{txt.frame}</label>
                  <select 
                    className="w-full bg-[#1a1a1a] border border-[#444] text-white rounded p-2.5 focus:border-[#ff9800] outline-none font-mono text-sm"
                    value={specs.frameType} onChange={(e) => setSpecs({...specs, frameType: e.target.value as FrameType})}
                  >
                    {Object.entries(FRAME_PRESETS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#888] mb-2 uppercase">{txt.weight}</label>
                  <input 
                    type="number" className="w-full bg-[#1a1a1a] border border-[#444] text-white rounded p-2.5 focus:border-[#ff9800] outline-none font-mono text-sm"
                    value={specs.weight} onChange={(e) => setSpecs({...specs, weight: parseInt(e.target.value)})}
                  />
                </div>
             </div>
          </div>
        </section>

        {/* STEP 2: DUMP (Textarea) */}
        <section className="bg-[#2b2b2b] rounded border border-[#444] p-6 shadow-lg">
          <SectionHeader icon={IconFileText} title={txt.step2} />
          <textarea 
            className="w-full h-24 bg-[#1a1a1a] border border-[#444] rounded p-3 text-xs font-mono text-slate-400 focus:border-[#ff9800] outline-none resize-none"
            placeholder={txt.dumpPlaceholder}
            value={specs.dumpContent}
            onChange={(e) => setSpecs({...specs, dumpContent: e.target.value})}
          />
        </section>

        {/* STEP 3: STYLE */}
        <section className="bg-[#2b2b2b] rounded border border-[#444] p-6 shadow-lg">
          <SectionHeader icon={IconActivity} title={txt.step3} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {[
               { id: 'aggressive', label: txt.styleAggressive, desc: txt.styleDescAggr, color: 'border-orange-500' },
               { id: 'race', label: txt.styleRace, desc: txt.styleDescRace, color: 'border-red-500' },
               { id: 'smooth', label: txt.styleSmooth, desc: txt.styleDescSmooth, color: 'border-emerald-500' },
             ].map((style) => (
               <button
                 key={style.id}
                 onClick={() => setSpecs({...specs, pilotStyle: style.id as PilotStyle})}
                 className={`p-4 rounded border-2 text-left transition-all ${specs.pilotStyle === style.id ? `${style.color} bg-[#333]` : 'border-[#444] bg-[#1a1a1a] hover:border-[#666]'}`}
               >
                 <div className={`font-bold text-sm mb-1 ${specs.pilotStyle === style.id ? 'text-white' : 'text-[#aaa]'}`}>{style.label}</div>
                 <div className="text-[10px] text-[#666]">{style.desc}</div>
               </button>
             ))}
          </div>
        </section>

        {/* STEP 4: BLACKBOX */}
        <section className="bg-[#2b2b2b] rounded border border-[#444] p-6 shadow-lg">
          <SectionHeader icon={IconUpload} title={txt.step4} />
          <div className="relative border-2 border-dashed border-[#444] bg-[#1a1a1a] rounded p-6 flex flex-col items-center justify-center group hover:border-[#666] transition-colors">
            <input type="file" accept=".bbl,.csv" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
            {analyzing ? (
              <div className="text-[#ff9800] animate-pulse font-mono text-sm">{txt.uploadAnalyzing}</div>
            ) : fileName ? (
              <div className="flex items-center gap-2 text-emerald-500">
                <IconCheck className="w-5 h-5" />
                <span className="font-mono font-bold">{fileName}</span>
              </div>
            ) : (
              <>
                <div className="text-[#888] font-bold mb-1">{txt.uploadTitle}</div>
                <div className="text-[10px] text-[#555] uppercase">{txt.uploadDesc}</div>
              </>
            )}
          </div>
        </section>

        {/* ACTION */}
        <button 
          onClick={generate}
          className="w-full bg-[#ff9800] hover:bg-[#ffa726] text-black font-bold text-lg py-4 rounded shadow-xl transition-transform active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <IconDownload className="w-6 h-6" /> {txt.step5}
        </button>

        {/* RESULT */}
        {result && (
          <div ref={resultRef} className="animate-in slide-in-from-bottom-10 fade-in duration-500 pt-8">
             <div className="bg-[#1a1a1a] border border-[#ff9800] rounded overflow-hidden shadow-2xl">
               <div className="bg-[#ff9800] px-4 py-2 flex justify-between items-center">
                 <div className="text-black font-bold flex items-center gap-2">
                   <IconFileText className="w-4 h-4" /> {txt.resultTitle}
                 </div>
                 <div className="text-[10px] font-mono text-black bg-white/20 px-2 py-0.5 rounded">
                   {txt.rpm}: {result.rpm}
                 </div>
               </div>
               <div className="p-0 relative group">
                 <textarea 
                   readOnly 
                   value={result.cli}
                   className="w-full h-96 bg-[#000] text-emerald-500 font-mono text-xs p-4 outline-none resize-none"
                 />
                 <button 
                   onClick={() => { navigator.clipboard.writeText(result.cli); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                   className={`absolute top-4 right-4 px-4 py-2 rounded font-bold text-xs transition-colors shadow-lg ${copied ? 'bg-emerald-500 text-black' : 'bg-[#ff9800] text-black hover:bg-white'}`}
                 >
                   {copied ? txt.resultCopied : txt.resultCopy}
                 </button>
               </div>
               <div className="bg-[#222] p-2 text-center text-[10px] text-[#666]">
                 {txt.resultDesc}
               </div>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}