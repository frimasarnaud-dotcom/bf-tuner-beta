import React, { useState, useRef, useEffect } from 'react';

// --- INTERFACES & TYPES ---
interface IconProps {
  size?: number;
  className?: string;
  children?: React.ReactNode;
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

interface AnalysisReport {
  gyroNoise: number;
  noiseIntensity: number; // 0 à 100
  vibrationLevel: 'CLEAN' | 'NOISY' | 'CRITICAL';
  recommendation: string;
  samplesAnalyzed: number;
  trace: number[]; // VRAIES DONNÉES DU CSV
}

// --- ICONES SVG (Style Matrix) ---
const Icon: React.FC<IconProps> = ({ children, size = 24, className = "", ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={className} {...props}
  >
    {children}
  </svg>
);

const Upload = (p: IconProps) => (<Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></Icon>);
const Copy = (p: IconProps) => (<Icon {...p}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></Icon>);
const RotateCcw = (p: IconProps) => (<Icon {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></Icon>);
const Cpu = (p: IconProps) => (<Icon {...p}><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></Icon>);
const Activity = (p: IconProps) => (<Icon {...p}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></Icon>);
const Zap = (p: IconProps) => (<Icon {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></Icon>);
const Wind = (p: IconProps) => (<Icon {...p}><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" /></Icon>);
const Settings = (p: IconProps) => (<Icon {...p}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></Icon>);
const Search = (p: IconProps) => (<Icon {...p}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></Icon>);
const CheckCircle = (p: IconProps) => (<Icon {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></Icon>);
const FileText = (p: IconProps) => (<Icon {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></Icon>);

// --- MOTEUR D'ANALYSE CSV (AVEC EXTRACTION DE TRACE) ---
const analyzeCSVData = async (file: File): Promise<AnalysisReport> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const sampleSize = 2 * 1024 * 1024; 
        const blob = file.slice(0, sampleSize);

        reader.onload = (e) => {
            const text = e.target?.result as string;
            if (!text) return reject("Fichier vide");

            const lines = text.split('\n');
            if (lines.length < 10) return reject("Fichier CSV invalide");

            // Détection colonnes
            const header = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
            const gyroIndex0 = header.findIndex(h => h.includes('gyroADC[0]') || h.toLowerCase().includes('roll'));
            
            let noiseSum = 0;
            let sampleCount = 0;
            const step = 2; // Plus précis pour le graphique
            const traceData: number[] = [];

            // Extraction des données réelles pour le graphique (max 300 points)
            for (let i = 1; i < Math.min(lines.length, 600); i += step) {
                const row = lines[i].split(',');
                if (gyroIndex0 !== -1 && row[gyroIndex0]) {
                    const val = parseFloat(row[gyroIndex0]);
                    if (!isNaN(val)) {
                        traceData.push(val); // On garde la valeur brute (positive/négative)
                        noiseSum += Math.abs(val);
                        sampleCount++;
                    }
                }
            }

            const avgActivity = sampleCount > 0 ? noiseSum / sampleCount : 0;
            let vibeLevel: 'CLEAN' | 'NOISY' | 'CRITICAL' = 'CLEAN';
            let rec = "LOG SAIN. FILTRAGE STANDARD.";

            if (avgActivity > 800) {
                vibeLevel = 'CRITICAL';
                rec = "BRUIT EXTRÊME DÉTECTÉ. FILTRES MAXIMAUX REQUIS.";
            } else if (avgActivity > 400) {
                vibeLevel = 'NOISY';
                rec = "BRUIT MODÉRÉ. AUGMENTER FILTRAGE DYNAMIQUE.";
            }

            setTimeout(() => {
                resolve({
                    gyroNoise: 0, 
                    noiseIntensity: Math.min(100, Math.floor(avgActivity / 10)),
                    vibrationLevel: vibeLevel,
                    recommendation: rec,
                    samplesAnalyzed: sampleCount,
                    trace: traceData // Le tableau de données pour le graphique
                });
            }, 800);
        };
        reader.readAsText(blob);
    });
};

// --- COMPOSANT GRAPH (CANVAS) ---
const TraceGraph: React.FC<{ data: number[] }> = ({ data }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !data.length) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Reset
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid (Matrix style)
        ctx.strokeStyle = '#003300';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(let x=0; x<canvas.width; x+=20) { ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); }
        for(let y=0; y<canvas.height; y+=20) { ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); }
        ctx.stroke();

        // Trace
        ctx.strokeStyle = '#00FF41'; // Matrix Green
        ctx.lineWidth = 2;
        ctx.beginPath();

        const maxVal = Math.max(...data.map(Math.abs), 100); // Scale auto
        const centerY = canvas.height / 2;
        const scaleY = (canvas.height / 2) / (maxVal * 1.2);
        const stepX = canvas.width / data.length;

        data.forEach((val, i) => {
            const x = i * stepX;
            const y = centerY - (val * scaleY);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

    }, [data]);

    return <canvas ref={canvasRef} width={600} height={150} className="w-full h-full border border-[#00FF41] bg-black" />;
};

// --- COMPOSANT PRINCIPAL ---
const FPVTuner: React.FC = () => {
  const [config, setConfig] = useState<ConfigState>({
    bfVersion: '4.5',
    motorKv: '1950',
    lipo: '6S',
    frame: '5pouces',
    propSize: '5.1',
    weight: '650'
  });

  const [flightStyle, setFlightStyle] = useState<string>('FREESTYLE');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cliOutput, setCliOutput] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // --- STYLES MATRIX ---
  const matrixGreen = "text-[#00FF41]";
  const matrixBorder = "border-[#00FF41]";
  const bgBlack = "bg-black";
  
  const cardStyle = `bg-black border border-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.2)] p-4 mb-8 relative`;
  const inputStyle = `w-full bg-black border border-[#00FF41] text-[#00FF41] p-2 focus:outline-none focus:bg-[#001100] transition-all font-mono text-sm rounded-none h-10 placeholder-green-900`;
  const labelStyle = `block font-bold text-xs uppercase mb-2 tracking-wider ${matrixGreen} border-l-2 border-[#00FF41] pl-2`;
  const buttonStyle = `w-full bg-black border border-[#00FF41] text-[#00FF41] py-4 px-4 font-bold uppercase tracking-widest hover:bg-[#00FF41] hover:text-black transition-all active:translate-y-1 shadow-[0_0_5px_rgba(0,255,65,0.5)] flex items-center justify-center gap-2 text-lg`;

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `> ${msg}`]);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCsvFile(file);
      setAnalysis(null);
      setLogs([]);
      setIsAnalyzing(true);
      
      addLog(`INIT SEQUENCE... CHARGEMENT ${file.name}`);
      addLog("DÉCODAGE FLUX CSV...");
      
      try {
        const result = await analyzeCSVData(file);
        setAnalysis(result);
        addLog(`DATA EXTRAITE: ${result.samplesAnalyzed} POINTS`);
        addLog(`SIGNAL GYRO: ${result.vibrationLevel}`);
      } catch (err) {
        addLog("ERREUR CRITIQUE: FICHIER CORROMPU");
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const generateCLI = (useCSV: boolean) => {
    const timestamp = new Date().toLocaleTimeString();
    let generatedText = `
# FPV TUNER V2.5 [MATRIX ENGINEER]
# DATE: ${new Date().toLocaleDateString()} ${timestamp}
# SYSTEM: ${config.frame} / ${config.motorKv}KV
# MODE: ${useCSV ? 'DATA_DRIVEN' : 'PRESET_DB'}

# --- MASTER CONFIGURATION ---
`;

    if (useCSV) {
        if (!analysis || !csvFile) {
            alert("ERREUR: INPUT MANQUANT");
            return;
        }
        
        generatedText += `
# >>> BLACKBOX ANALYSIS REPORT <<<
# SOURCE: ${csvFile.name}
# INTENSITY: ${analysis.noiseIntensity}%
# STATUS: ${analysis.vibrationLevel}
`;
        if (analysis.vibrationLevel === 'CRITICAL') {
            generatedText += `
set dyn_notch_count = 3
set dyn_notch_q = 250
set dterm_lpf1_static_hz = 60
set gyro_lpf1_static_hz = 250
`;
        } else if (analysis.vibrationLevel === 'NOISY') {
             generatedText += `
set dyn_notch_count = 1
set dyn_notch_q = 120
set dterm_lpf1_static_hz = 90
`;
        } else {
            generatedText += `
set dyn_notch_count = 1
set dyn_notch_q = 120
set dterm_lpf1_static_hz = 150
set gyro_lpf1_static_hz = 0
set gyro_lpf2_static_hz = 0
`;
        }
    } else {
        generatedText += `
# --- SAFE MODE PRESETS ---
`;
        if (config.frame.includes('Whoop')) {
             generatedText += `set dyn_notch_min_hz = 150\nset vbat_sag_compensation = 0`;
        }
    }

    if (flightStyle === 'AGRESSIF' || flightStyle === 'SBANG') {
      generatedText += `\n# PROFILE: AGGRESSIVE\nset feedforward_transition = 0\nset vbat_sag_compensation = 100`;
    }

    generatedText += `\n\nsave`;
    setCliOutput(generatedText);
    
    setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const copyToClipboard = () => {
    if (!cliOutput) return;
    navigator.clipboard.writeText(cliOutput);
    alert("COPIE TERMINÉE");
  };

  const resetForm = () => {
    setCliOutput('');
    setCsvFile(null);
    setAnalysis(null);
    setLogs([]);
    setFlightStyle('FREESTYLE');
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-black font-mono p-4 md:p-8 text-[#00FF41]">
      
      {/* HEADER */}
      <header className={`max-w-4xl mx-auto mb-10 text-center border border-[#00FF41] bg-black p-8 shadow-[0_0_20px_rgba(0,255,65,0.1)] relative overflow-hidden`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-50"></div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-0 leading-none text-white" style={{textShadow: "0 0 10px #00FF41"}}>
          FPV TUNER
        </h1>
        <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px bg-[#00FF41] w-16"></div>
            <h2 className="text-xl font-bold bg-[#00FF41] text-black px-4 py-1">ARNO-FPV</h2>
            <div className="h-px bg-[#00FF41] w-16"></div>
        </div>
        <div className="mt-4">
            <p className="text-xs font-bold border border-[#00FF41] inline-block px-3 py-1 text-[#00FF41]">
            V2.5 [MATRIX_ENGINEER]
            </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-10">

        {/* 1 - CONFIGURATION */}
        <section className={cardStyle}>
            <div className="absolute -top-3 left-4 bg-black border border-[#00FF41] px-4 py-1 text-sm font-bold uppercase text-[#00FF41]">
                1 :: SYSTEM CONFIG
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                    <label className={labelStyle}>BF Version</label>
                    <select name="bfVersion" value={config.bfVersion} onChange={handleConfigChange} className={inputStyle}>
                        <option value="4.5">Betaflight 4.5</option>
                        <option value="4.4">Betaflight 4.4</option>
                    </select>
                </div>
                <div>
                    <label className={labelStyle}>FRAME</label>
                    <select name="frame" value={config.frame} onChange={handleConfigChange} className={inputStyle}>
                        <option value="5pouces">5" Standard</option>
                        <option value="TinyWhoop65">65mm Whoop</option>
                        <option value="7pouces">7" Long Range</option>
                    </select>
                </div>
                <div>
                    <label className={labelStyle}>KV</label>
                    <select name="motorKv" value={config.motorKv} onChange={handleConfigChange} className={inputStyle}>
                        <option value="1950">1950 KV</option>
                        <option value="25000">25000 KV</option>
                        <option value="1750">1750 KV</option>
                    </select>
                </div>
                <div>
                    <label className={labelStyle}>CELLS</label>
                    <select name="lipo" value={config.lipo} onChange={handleConfigChange} className={inputStyle}>
                        <option value="6S">6S</option>
                        <option value="4S">4S</option>
                        <option value="1S">1S</option>
                    </select>
                </div>
            </div>
        </section>

        {/* 2 - STYLE */}
        <section className={cardStyle}>
            <div className="absolute -top-3 right-4 bg-black border border-[#00FF41] px-4 py-1 text-sm font-bold uppercase text-[#00FF41]">
                2 :: PILOT PROFILE
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {[
                    { id: 'AGRESSIF', icon: <Zap size={20}/> },
                    { id: 'SBANG', icon: <Activity size={20}/> },
                    { id: 'BANDO', icon: <Settings size={20}/> },
                    { id: 'RACE', icon: <Wind size={20}/> },
                    { id: 'FREESTYLE', icon: <Cpu size={20}/> },
                    { id: 'CINEMATIC', icon: <Upload size={20} className="rotate-90"/> }
                ].map((style) => (
                    <button
                        key={style.id}
                        onClick={() => setFlightStyle(style.id)}
                        className={`
                            border border-[#00FF41] p-4 font-bold text-sm uppercase flex flex-col items-center justify-center gap-2 transition-all
                            ${flightStyle === style.id 
                                ? 'bg-[#00FF41] text-black shadow-[0_0_15px_#00FF41]' 
                                : 'bg-black text-[#00FF41] hover:bg-[#001100]'}
                        `}
                    >
                        {style.icon}
                        {style.id}
                    </button>
                ))}
            </div>
        </section>

        {/* 3 - ANALYSEUR CSV */}
        <section className={cardStyle}>
             <div className="absolute -top-3 left-4 bg-black border border-[#00FF41] px-4 py-1 text-sm font-bold uppercase text-[#00FF41] flex items-center gap-2">
                <Search size={16} />
                3 :: DATA ANALYZER
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-dashed border-[#00FF41] bg-[#001100] p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[#002200] transition-colors relative h-64">
                    <input 
                        type="file" 
                        accept=".csv" 
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {isAnalyzing ? (
                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00FF41] mb-4"></div>
                    ) : (
                        <div className="text-[#00FF41] p-4 mb-4">
                            <FileText size={48} />
                        </div>
                    )}
                    <p className="font-bold text-lg text-center uppercase tracking-widest">
                        {isAnalyzing ? "DECRYPTING..." : (csvFile ? csvFile.name : "DROP CSV FILE")}
                    </p>
                </div>

                <div className="bg-black border border-[#00FF41] p-4 h-64 overflow-y-auto font-mono text-xs text-[#00FF41] shadow-[inset_0_0_20px_rgba(0,255,65,0.1)]">
                    <div className="border-b border-[#00FF41] pb-2 mb-2 flex justify-between">
                        <span className="font-bold">SYSTEM_LOGS</span>
                        <div className="w-2 h-2 bg-[#00FF41] animate-pulse"></div>
                    </div>
                    {logs.length === 0 && <span className="opacity-50">Waiting for input stream...</span>}
                    {logs.map((log, i) => (
                        <div key={i} className="mb-1 opacity-80 hover:opacity-100">
                            {log}
                        </div>
                    ))}
                    {analysis && (
                         <div className="mt-4 border-t border-[#00FF41] pt-2 text-white">
                            <p>{`>>> RESULT: ${analysis.vibrationLevel}`}</p>
                            <p>{`>>> RECOM: ${analysis.recommendation}`}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* VISUALISATION CANVAS (TRACE RÉELLE) */}
            {analysis && (
                <div className="mt-6 border border-[#00FF41] p-2 bg-black relative">
                    <div className="absolute top-2 left-2 text-[10px] bg-black border border-[#00FF41] px-1 text-[#00FF41]">
                        RAW_GYRO_ROLL_DATA
                    </div>
                    <div className="h-40 w-full">
                        <TraceGraph data={analysis.trace} />
                    </div>
                    <div className="flex justify-between text-[10px] mt-1 text-[#00FF41] opacity-70">
                        <span>T=0ms</span>
                        <span>AMPLITUDE: {analysis.noiseIntensity}%</span>
                        <span>T=End</span>
                    </div>
                </div>
            )}
        </section>

        {/* 4 - ACTIONS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <button 
                onClick={() => generateCLI(true)} 
                disabled={!analysis}
                className={`${buttonStyle} ${!analysis && 'opacity-30 cursor-not-allowed hover:bg-black hover:text-[#00FF41]'}`}
            >
                <CheckCircle size={24} /> INITIALIZE DATA TUNE
            </button>
            <button onClick={() => generateCLI(false)} className={`${buttonStyle} text-white border-white hover:bg-white`}>
                <Cpu size={24} /> STANDARD PRESET
            </button>
        </section>

        {/* 5 - OUTPUT */}
        <div ref={resultRef} className="pb-12">
            <section className={`${cardStyle} min-h-[300px] flex flex-col`}>
                <div className="absolute -top-3 left-0 w-full flex justify-center">
                        <div className="bg-[#00FF41] text-black px-6 py-1 font-bold text-lg uppercase shadow-[0_0_10px_#00FF41]">
                        5 :: TERMINAL OUTPUT
                    </div>
                </div>

                <div className="mt-8 flex-grow relative">
                    {!cliOutput ? (
                        <div className="absolute inset-0 flex items-center justify-center text-[#00FF41] opacity-30 font-bold text-center border border-dashed border-[#00FF41]">
                            <div>
                                <p className="text-xl mb-2">AWAITING GENERATION</p>
                                <p className="text-sm">SYSTEM STANDBY</p>
                            </div>
                        </div>
                    ) : (
                        <textarea 
                            readOnly 
                            value={cliOutput}
                            className="w-full h-80 bg-[#000500] text-[#00FF41] font-mono text-sm p-4 border border-[#00FF41] focus:outline-none resize-none shadow-[inset_0_0_20px_rgba(0,255,65,0.1)]"
                        />
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <button 
                        onClick={copyToClipboard} 
                        disabled={!cliOutput}
                        className={`border border-[#00FF41] py-3 font-bold uppercase flex items-center justify-center gap-2 hover:bg-[#00FF41] hover:text-black transition-all ${!cliOutput && 'opacity-50 cursor-not-allowed'}`}
                    >
                        <Copy size={20}/> COPY BUFFER
                    </button>
                    <button onClick={resetForm} className="border border-red-500 text-red-500 py-3 font-bold uppercase hover:bg-red-500 hover:text-black flex items-center justify-center gap-2 transition-all">
                        <RotateCcw size={20}/> SYSTEM RESET
                    </button>
                </div>
            </section>
        </div>

      </main>
      
      <footer className="max-w-4xl mx-auto mt-12 mb-8 text-center text-[#00FF41] opacity-50 text-xs">
         [ARNO-FPV ENGINEERING] :: SYSTEM_READY
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;800&display=swap');
        body { font-family: 'JetBrains Mono', monospace; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { bg: #000; }
        ::-webkit-scrollbar-thumb { bg: #00FF41; }
      `}</style>
    </div>
  );
};

export default FPVTuner;