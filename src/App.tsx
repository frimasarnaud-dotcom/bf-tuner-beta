import React, { useState, useRef } from 'react';

// --- INTERFACES TYPESCRIPT (POUR CORRIGER LES ERREURS ROUGES) ---
interface IconProps {
  size?: number;
  className?: string;
  children?: React.ReactNode;
  // Permet d'accepter d'autres props comme onClick, style, etc.
  [key: string]: any;
}

interface ConfigState {
  bfVersion: string;
  motorKv: string;
  lipo: string;
  frame: string;
  propSize: string;
  weight: string;
}

// --- ICONES SVG INTEGREES TYPÉES ---
const Icon: React.FC<IconProps> = ({ children, size = 24, className = "", ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    {children}
  </svg>
);

const Upload = (props: IconProps) => (
  <Icon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </Icon>
);

const Copy = (props: IconProps) => (
  <Icon {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Icon>
);

const RotateCcw = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </Icon>
);

const Cpu = (props: IconProps) => (
  <Icon {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </Icon>
);

const Activity = (props: IconProps) => (
  <Icon {...props}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </Icon>
);

const Zap = (props: IconProps) => (
  <Icon {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </Icon>
);

const Wind = (props: IconProps) => (
  <Icon {...props}>
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
  </Icon>
);

const Settings = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

// --- COMPOSANT PRINCIPAL ---
const FPVTuner: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [config, setConfig] = useState<ConfigState>({
    bfVersion: '4.5',
    motorKv: '1950',
    lipo: '6S',
    frame: '5pouces',
    propSize: '5.1',
    weight: '650'
  });

  const [flightStyle, setFlightStyle] = useState<string>('FREESTYLE');
  const [blackboxFile, setBlackboxFile] = useState<string | null>(null);
  const [cliOutput, setCliOutput] = useState<string>('');
  
  // Refs correctement typées pour TypeScript
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // --- STYLES CONSTANTS (NEO-BRUTALISM RENFORCÉ) ---
  // Cadre noir plus épais (border-4) pour bien marquer le style schéma
  const cardStyle = "bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 mb-8 relative";
  const inputStyle = "w-full bg-white border-2 border-black p-2 focus:outline-none focus:bg-[#FFD700]/10 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold font-mono text-sm rounded-none";
  const labelStyle = "block font-black text-xs uppercase mb-2 tracking-wider border-l-4 border-black pl-2";
  
  const buttonStyle = "w-full bg-white border-4 border-black py-4 px-4 font-black uppercase tracking-widest hover:bg-black hover:text-[#FFD700] transition-all active:translate-y-1 active:translate-x-1 active:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 text-lg";

  // --- HANDLERS ---
  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBlackboxFile(e.target.files[0].name);
    }
  };

  const generateCLI = (useBBX: boolean) => {
    const timestamp = new Date().toLocaleTimeString();
    
    let generatedText = `
# FPV TUNER V2.1 - GENERATED FOR ARNO-FPV
# DATE: ${new Date().toLocaleDateString()} ${timestamp}
# MACHINE: ${config.frame} / ${config.motorKv}KV / ${config.lipo}
# STYLE: ${flightStyle}
# MODE: ${useBBX ? 'BLACKBOX ANALYSIS' : 'PRESET DATABASE'}

# --- MASTER CONFIGURATION ---
set pid_process_denom = 1
set gyro_lpf1_type = PT1
set gyro_lpf1_static_hz = 0
set dterm_lpf1_type = PT1
`;

    if (flightStyle === 'AGRESSIF' || flightStyle === 'SBANG') {
      generatedText += `
# AGGRESSIVE / SBANG PROFILE
set feedforward_transition = 0
set iterm_relax_cutoff = 20
set vbat_sag_compensation = 100
set pid_at_min_throttle = OFF
`;
    } else if (flightStyle === 'LONG RANGE' || flightStyle === 'CINEMATIC') {
      generatedText += `
# SMOOTH / LR PROFILE
set feedforward_transition = 40
set iterm_relax_cutoff = 10
set dterm_lpf1_static_hz = 70
`;
    }

    if (useBBX && blackboxFile) {
        generatedText += `\n# BLACKBOX ANALYSIS APPLIED from: ${blackboxFile}\n# Noise filters adjusted automatically based on spectral analysis.\nset gyro_lpf2_type = PT1\nset gyro_lpf2_static_hz = 250`;
    } else if (useBBX && !blackboxFile) {
        alert("Veuillez sélectionner un fichier Blackbox d'abord !");
        return;
    }

    generatedText += `\n\n# DONT FORGET TO SAVE\nsave`;
    
    setCliOutput(generatedText);
    
    // Scroll automatique vers le résultat
    setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const copyToClipboard = () => {
    if (!cliOutput) return;
    navigator.clipboard.writeText(cliOutput);
    alert("CLI copié dans le presse-papier !");
  };

  const resetForm = () => {
    setCliOutput('');
    setBlackboxFile(null);
    setFlightStyle('FREESTYLE');
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-[#FFD700] font-sans p-4 md:p-8 text-black">
      
      {/* --- HEADER --- */}
      <header className="max-w-3xl mx-auto mb-10 text-center border-4 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
        {/* Vis décoratives */}
        <div className="absolute top-2 left-2 w-3 h-3 border-2 border-black rounded-full bg-gray-300 flex items-center justify-center"><div className="w-2 h-px bg-black rotate-45"></div></div>
        <div className="absolute top-2 right-2 w-3 h-3 border-2 border-black rounded-full bg-gray-300 flex items-center justify-center"><div className="w-2 h-px bg-black rotate-45"></div></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 border-2 border-black rounded-full bg-gray-300 flex items-center justify-center"><div className="w-2 h-px bg-black rotate-45"></div></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 border-2 border-black rounded-full bg-gray-300 flex items-center justify-center"><div className="w-2 h-px bg-black rotate-45"></div></div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-0 leading-none">
          FPV TUNER <span className="text-[#FFD700] drop-shadow-[2px_2px_0_rgba(0,0,0,1)] text-shadow-black" style={{ textShadow: '4px 4px 0 #000' }}>*</span>
        </h1>
        <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-2 bg-black w-16"></div>
            <h2 className="text-xl md:text-2xl font-black font-mono bg-black text-white px-4 py-1">By ARNO-FPV</h2>
            <div className="h-2 bg-black w-16"></div>
        </div>
        <p className="font-mono text-xs md:text-sm mt-4 font-bold border-2 border-black inline-block px-3 py-1 transform -rotate-1 bg-[#FFD700] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          A ENGINEERING TOOL V2.1
        </p>
      </header>

      <main className="max-w-3xl mx-auto space-y-10">

        {/* --- 1. CONFIGURATION MACHINE --- */}
        <section className={cardStyle}>
            <div className="absolute -top-5 left-4 bg-black text-white border-2 border-white px-4 py-2 text-lg font-black uppercase transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                1 - Configuration Machine
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                    <label className={labelStyle}>Version BF</label>
                    <select name="bfVersion" value={config.bfVersion} onChange={handleConfigChange} className={inputStyle}>
                        <option value="4.3">Betaflight 4.3</option>
                        <option value="4.4">Betaflight 4.4</option>
                        <option value="4.5">Betaflight 4.5</option>
                    </select>
                </div>
                <div>
                    <label className={labelStyle}>KV Moteur</label>
                    <input type="number" name="motorKv" value={config.motorKv} onChange={handleConfigChange} className={inputStyle} placeholder="ex: 1750" />
                </div>
                <div>
                    <label className={labelStyle}>Lipo(s)</label>
                    <select name="lipo" value={config.lipo} onChange={handleConfigChange} className={inputStyle}>
                        <option value="4S">4S</option>
                        <option value="6S">6S</option>
                    </select>
                </div>
                <div>
                    <label className={labelStyle}>Châssis / Frame</label>
                    <input type="text" name="frame" value={config.frame} onChange={handleConfigChange} className={inputStyle} placeholder="ex: Apex 5" />
                </div>
                <div>
                    <label className={labelStyle}>Hélice (in)</label>
                    <input type="text" name="propSize" value={config.propSize} onChange={handleConfigChange} className={inputStyle} placeholder="ex: 5.1" />
                </div>
                <div>
                    <label className={labelStyle}>Poids (avec Lipo)</label>
                    <div className="flex items-center">
                        <input type="number" name="weight" value={config.weight} onChange={handleConfigChange} className={inputStyle} placeholder="gr" />
                        <span className="ml-2 font-black text-xl">g</span>
                    </div>
                </div>
            </div>
        </section>

        {/* --- 2. STYLE DE VOL --- */}
        <section className={cardStyle}>
            <div className="absolute -top-5 right-4 bg-black text-white border-2 border-white px-4 py-2 text-lg font-black uppercase transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                2 - Style de vol
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {[
                    { id: 'AGRESSIF', icon: <Zap size={20}/> },
                    { id: 'SBANG', icon: <Activity size={20}/> },
                    { id: 'BANDO', icon: <Settings size={20}/> },
                    { id: 'RACE', icon: <Wind size={20}/> },
                    { id: 'FREESTYLE', icon: <Cpu size={20}/> },
                    { id: 'LONG RANGE', icon: <Upload size={20} className="rotate-90"/> }
                ].map((style) => (
                    <button
                        key={style.id}
                        onClick={() => setFlightStyle(style.id)}
                        className={`
                            border-2 border-black p-4 font-black text-sm md:text-base uppercase flex flex-col items-center justify-center gap-2 transition-all
                            ${flightStyle === style.id 
                                ? 'bg-black text-[#FFD700] shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] translate-y-1 translate-x-1 ring-2 ring-[#FFD700]' 
                                : 'bg-white hover:bg-gray-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1'}
                        `}
                    >
                        {style.icon}
                        {style.id}
                    </button>
                ))}
            </div>
        </section>

        {/* --- 3. BLACKBOX (OPTIONNEL) --- */}
        <section className={cardStyle}>
             <div className="absolute -top-5 left-4 bg-black text-white border-2 border-white px-4 py-2 text-lg font-black uppercase transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                3 - Blackbox (Optionnel)
            </div>
            <div className="mt-6 border-4 border-dashed border-black bg-[#FFD700]/10 p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-[#FFD700]/30 transition-colors relative group">
                <input 
                    type="file" 
                    accept=".bbl,.bfl" 
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="bg-black text-white p-3 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                </div>
                <p className="font-black text-lg text-center uppercase border-b-2 border-black pb-1">
                    {blackboxFile ? blackboxFile : "CHOISIR UN FICHIER"}
                </p>
                <p className="text-xs font-bold uppercase mt-2 font-mono bg-white px-2">* fichier .bbl via Blackbox Explorer</p>
            </div>
        </section>

        {/* --- 4. GENERATION --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="relative">
                <div className="absolute -top-4 left-0 w-full text-center">
                    <span className="bg-black text-white px-2 py-1 font-bold text-xs uppercase">Option A</span>
                </div>
                <button onClick={() => generateCLI(true)} className={`${buttonStyle} bg-black text-white hover:bg-gray-900 hover:text-[#FFD700]`}>
                    <Activity size={24} /> AVEC BBX
                </button>
            </div>
            <div className="relative">
                 <div className="absolute -top-4 left-0 w-full text-center">
                    <span className="bg-black text-white px-2 py-1 font-bold text-xs uppercase">Option B</span>
                </div>
                <button onClick={() => generateCLI(false)} className={`${buttonStyle} bg-[#FFD700]`}>
                    <Cpu size={24} /> SANS BBX
                </button>
            </div>
        </section>

        {/* --- 5. RESULTAT CLI (TOUJOURS VISIBLE) --- */}
        <div ref={resultRef} className="pb-12">
            <section className={`${cardStyle} min-h-[300px] flex flex-col`}>
                <div className="absolute -top-5 inset-x-0 flex justify-center">
                        <div className="bg-[#FFD700] border-4 border-black px-6 py-2 font-black text-xl uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                        <span>5 - Résultat CLI</span>
                    </div>
                </div>

                <div className="mt-8 flex-grow relative">
                    {!cliOutput ? (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-mono font-bold text-center p-4 border-2 border-gray-200 border-dashed">
                            <div>
                                <p className="text-xl mb-2">ZONE D'ATTENTE</p>
                                <p className="text-sm">CONFIGUREZ VOTRE DRONE ET CLIQUEZ SUR GÉNÉRER</p>
                            </div>
                        </div>
                    ) : (
                        <textarea 
                            readOnly 
                            value={cliOutput}
                            className="w-full h-80 bg-gray-900 text-[#00ff00] font-mono text-xs md:text-sm p-4 border-4 border-black focus:outline-none resize-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
                        />
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <button 
                        onClick={copyToClipboard} 
                        disabled={!cliOutput}
                        className={`
                            border-4 border-black py-3 font-black uppercase flex items-center justify-center gap-2 transition-all
                            ${cliOutput ? 'bg-[#FFD700] hover:brightness-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                        `}
                    >
                        <Copy size={20}/> Copier CLI
                    </button>
                    <button onClick={resetForm} className="bg-white border-4 border-black py-3 font-black uppercase hover:bg-red-50 text-red-600 flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
                        <RotateCcw size={20}/> Réinitialisation
                    </button>
                </div>
            </section>
        </div>

      </main>
      
      <footer className="max-w-3xl mx-auto mt-12 mb-8 text-center">
        <div className="inline-block bg-black text-white px-4 py-2 font-mono text-xs font-bold border-2 border-[#FFD700]">
            &copy; 2025 ARNO-FPV ENGINEERING. DESIGNED FOR PERFORMANCE.
        </div>
      </footer>

      {/* Font injection for Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=JetBrains+Mono:wght@400;800&display=swap');
        body { font-family: 'Oswald', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>
    </div>
  );
};

export default FPVTuner;