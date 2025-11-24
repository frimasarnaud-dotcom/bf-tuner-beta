import React, { useState, useRef, useEffect } from 'react';

// --- TYPES ---
interface IconProps { size?: number; className?: string; children?: React.ReactNode; [key: string]: any; }
interface AnalysisReport { gyroNoise: number; noiseIntensity: number; vibrationLevel: 'CLEAN'|'NOISY'|'CRITICAL'; recommendation: string; samplesAnalyzed: number; trace: number[]; }

// --- ICONS ---
const Icon: React.FC<IconProps> = ({ children, size = 24, className = "", ...props }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>{children}</svg>);
const Upload = (p: IconProps) => (<Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></Icon>);
const Copy = (p: IconProps) => (<Icon {...p}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></Icon>);
const RotateCcw = (p: IconProps) => (<Icon {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></Icon>);
const ExternalLink = (p: IconProps) => (<Icon {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></Icon>);
const Terminal = (p: IconProps) => (<Icon {...p}><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></Icon>);
const Activity = (p: IconProps) => (<Icon {...p}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Icon>);

// --- MATRIX RAIN ENGINE (BIGGER & BOLDER) ---
const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ010101';
    const charArray = chars.split('');
    const fontSize = 20; // PLUS GROS pour visibilité
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);
    
    // Config Ghost
    const ghostText = "ARNO-FPV";
    const ghostRow = 8; 
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; // Trail un peu plus court pour clarté
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `bold ${fontSize}px monospace`;

      const startCol = Math.floor((columns - ghostText.length) / 2);

      for (let i = 0; i < drops.length; i++) {
        let text = charArray[Math.floor(Math.random() * charArray.length)];
        let isGhost = false;

        if (i >= startCol && i < startCol + ghostText.length) {
            if (drops[i] >= ghostRow && drops[i] <= ghostRow + 1 && Math.random() > 0.1) {
                text = ghostText[i - startCol];
                isGhost = true;
            }
        }

        if (isGhost) {
            ctx.fillStyle = '#FFFFFF'; 
            ctx.shadowColor = '#00FF41';
            ctx.shadowBlur = 15;
        } else {
            ctx.fillStyle = '#00FF41'; 
            ctx.shadowBlur = 0;
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 45);
    return () => { clearInterval(interval); window.removeEventListener('resize', resizeCanvas); };
  }, []);
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />;
};

// --- CSV ANALYZER ---
const analyzeCSVData = async (file: File): Promise<AnalysisReport> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            if (!text || text.length < 50) return reject("Fichier CSV invalide");
            
            const lines = text.split('\n');
            const header = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
            const gyroIndex = header.findIndex(h => h.includes('gyroADC[0]') || h.toLowerCase().includes('roll'));
            
            const traceData: number[] = [];
            let noiseSum = 0;
            let count = 0;

            for(let i=1; i<Math.min(lines.length, 600); i+=3) {
                const row = lines[i].split(',');
                if(gyroIndex !== -1 && row[gyroIndex]) {
                    const val = parseFloat(row[gyroIndex]);
                    if(!isNaN(val)) {
                        traceData.push(val);
                        noiseSum += Math.abs(val);
                        count++;
                    }
                }
            }
            const intensity = Math.min(100, Math.floor((count > 0 ? noiseSum / count : 0) / 10));
            resolve({
                gyroNoise: 0, noiseIntensity: intensity,
                vibrationLevel: intensity > 60 ? 'CRITICAL' : intensity > 30 ? 'NOISY' : 'CLEAN',
                recommendation: intensity > 30 ? "FILTRAGE RENFORCÉ NÉCESSAIRE" : "VOL SAIN - FILTRAGE STANDARD",
                samplesAnalyzed: count, trace: traceData
            });
        };
        reader.readAsText(file.slice(0, 1024*1024));
    });
};

// --- GRAPH VISUALIZER ---
const TraceGraph: React.FC<{ data: number[] }> = ({ data }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const cvs = canvasRef.current;
        if (!cvs || !data.length) return;
        const ctx = cvs.getContext('2d');
        if (!ctx) return;
        
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        
        // Grid
        ctx.strokeStyle = '#003300';
        ctx.beginPath();
        for(let i=0; i<cvs.width; i+=40) { ctx.moveTo(i,0); ctx.lineTo(i,cvs.height); }
        ctx.stroke();

        // Trace Line
        ctx.strokeStyle = '#00FF41';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const max = Math.max(...data.map(Math.abs), 20);
        const mid = cvs.height/2;
        const scale = (mid-10)/max;
        const step = cvs.width/data.length;
        
        data.forEach((v, i) => {
            const x = i * step;
            const y = mid - (v * scale);
            i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        });
        ctx.stroke();
    }, [data]);
    return <canvas ref={canvasRef} width={600} height={150} className="w-full h-full border border-[#00FF41] bg-black" />;
};

// --- MAIN COMPONENT ---
const FPVTuner: React.FC = () => {
  const [dump, setDump] = useState('');
  const [detectedBF, setDetectedBF] = useState('...');
  const [frameType, setFrameType] = useState('5_FREESTYLE');
  const [motorKv, setMotorKv] = useState('');
  const [propSize, setPropSize] = useState('');
  const [csvFile, setCsvFile] = useState<File|null>(null);
  const [analysis, setAnalysis] = useState<AnalysisReport|null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cliOutput, setCliOutput] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const m = dump.match(/# Betaflight \S+ (\d+\.\d+)/i);
    setDetectedBF(m ? m[1] : (dump.length > 20 ? 'DETECTED' : '...'));
  }, [dump]);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.[0]) {
        setCsvFile(e.target.files[0]);
        setIsAnalyzing(true);
        try { setAnalysis(await analyzeCSVData(e.target.files[0])); }
        catch(err) { alert("Fichier invalide"); }
        finally { setIsAnalyzing(false); }
    }
  };

  const generate = () => {
    const ts = new Date().toLocaleTimeString();
    let out = `# ARNO-FPV TUNER V2.9\n# DATE: ${ts}\n# BF VERSION: ${detectedBF}\n# HARDWARE: ${frameType} | ${motorKv}KV | ${propSize}"\n\n`;
    
    if(analysis) {
        out += `# ANALYSIS REPORT: ${analysis.vibrationLevel} (${analysis.noiseIntensity}% Noise)\n`;
        if(analysis.vibrationLevel === 'CRITICAL') out += `set dyn_notch_count = 3\nset dyn_notch_q = 250\nset dterm_lpf1_static_hz = 60\nset gyro_lpf1_static_hz = 250\n`;
        else if(analysis.vibrationLevel === 'NOISY') out += `set dyn_notch_count = 1\nset dterm_lpf1_static_hz = 90\n`;
        else out += `set dyn_notch_count = 1\nset dterm_lpf1_static_hz = 150\nset gyro_lpf1_static_hz = 0\n`;
    } else {
        out += `# PRESET MODE (NO BLACKBOX DATA)\nset vbat_sag_compensation = 0\n`;
    }
    
    if(Number(motorKv) > 2000) out += `set vbat_sag_compensation = 100\n`;
    
    out += `\nsave`;
    setCliOutput(out);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  // --- STYLES MODULAIRES ---
  const green = "text-[#00FF41]";
  // Le cadre principal : bordure verte épaisse, fond noir semi-transparent
  const moduleBox = "relative bg-black/90 border-2 border-[#00FF41] shadow-[0_0_15px_rgba(0,255,65,0.2)] p-6 mb-10 z-10 backdrop-blur-sm";
  // Le titre du module : incrusté sur la bordure en haut
  const moduleTitle = "absolute -top-4 left-4 bg-[#00FF41] text-black font-black text-sm px-4 py-1 uppercase tracking-widest border border-black";

  return (
    <>
      <MatrixRain />
      <div className="min-h-screen font-mono p-4 md:p-8 text-[#00FF41] relative z-10 selection:bg-[#00FF41] selection:text-black">
        
        <header className="text-center mb-16 relative z-20 mt-8">
          <h1 className="text-6xl md:text-8xl font-black mb-2 tracking-tighter drop-shadow-[0_0_10px_#00FF41]">FPV TUNER</h1>
          <div className="text-sm font-bold border border-[#00FF41] inline-block px-4 py-1 bg-black">V2.9 [GHOST_ARCHITECT] :: ARNO-FPV</div>
        </header>

        <main className="max-w-4xl mx-auto">
            
            {/* --- MODULE 1: DUMP / SOURCE --- */}
            <div className={moduleBox}>
                <div className={moduleTitle}>1 :: SOURCE CODE</div>
                <div className="mt-2 space-y-4">
                    <p className="text-sm font-bold opacity-80 flex items-center gap-2">
                        <Terminal size={16}/> Collez votre "dump all" ou "diff all" ici :
                    </p>
                    <textarea 
                        value={dump}
                        onChange={(e) => setDump(e.target.value)}
                        className="w-full h-32 bg-black border border-[#00FF41]/50 p-4 text-xs text-[#00FF41] focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_10px_#00FF41] transition-all resize-none placeholder-green-900"
                        placeholder="> PASTE DUMP HERE TO AUTO-DETECT CONFIGURATION..."
                    />
                    <div className="flex justify-end">
                         <span className="text-xs font-bold border border-[#00FF41] px-2 py-1 bg-[#002200]">
                            DETECTED: {detectedBF}
                         </span>
                    </div>
                </div>
            </div>

            {/* --- MODULE 2: HARDWARE --- */}
            <div className={moduleBox}>
                <div className={moduleTitle}>2 :: DRONE HARDWARE</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2">
                    <div className="space-y-2">
                        <label className="text-xs font-bold bg-[#00FF41] text-black px-1">FRAME TYPE</label>
                        <select value={frameType} onChange={(e)=>setFrameType(e.target.value)} className="w-full bg-black border border-[#00FF41] p-3 text-sm focus:outline-none hover:bg-[#001100] cursor-pointer">
                            <option value="5_FREESTYLE">5" FREESTYLE (Standard)</option>
                            <option value="5_RACING">5" RACING (Lightweight)</option>
                            <option value="CINELIFTER">CINELIFTER (X-Class)</option>
                            <option value="TINY_WHOOP_65">TINY WHOOP (65mm)</option>
                            <option value="TINY_WHOOP_75">TINY WHOOP (75mm)</option>
                            <option value="3_INCH">3 INCH / TOOTHPICK</option>
                            <option value="7_LONGRANGE">7" LONG RANGE</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold bg-[#00FF41] text-black px-1">KV MOTEUR</label>
                        <input type="number" value={motorKv} onChange={(e)=>setMotorKv(e.target.value)} className="w-full bg-black border border-[#00FF41] p-3 text-sm focus:outline-none placeholder-green-900" placeholder="ex: 1750"/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold bg-[#00FF41] text-black px-1">HÉLICE (Size)</label>
                        <input type="text" value={propSize} onChange={(e)=>setPropSize(e.target.value)} className="w-full bg-black border border-[#00FF41] p-3 text-sm focus:outline-none placeholder-green-900" placeholder="ex: 5.1"/>
                    </div>
                </div>
            </div>

            {/* --- MODULE 3: BLACKBOX DATA CENTER --- */}
            <div className={moduleBox}>
                <div className={moduleTitle}>3 :: DATA CENTER (Optional)</div>
                <div className="flex flex-col md:flex-row gap-8 mt-2">
                    
                    {/* INSTRUCTIONS */}
                    <div className="flex-1 space-y-4 border-r border-[#00FF41]/30 pr-4">
                        <div className="bg-[#001100] p-3 border border-[#00FF41]/50">
                            <h3 className="font-bold text-sm mb-2 underline decoration-[#00FF41]">COMMENT OBTENIR LE CSV ?</h3>
                            <ol className="text-xs space-y-2 list-decimal list-inside opacity-90">
                                <li>Branchez le drone en USB.</li>
                                <li>Ouvrez l'application <strong>Blackbox Explorer</strong>.</li>
                                <li>Ouvrez votre fichier de log (.bbl).</li>
                                <li>Cliquez sur <strong>"Export CSV"</strong>.</li>
                            </ol>
                        </div>
                        <a href="https://blackbox.betaflight.com/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full border border-[#00FF41] py-2 text-xs font-bold hover:bg-[#00FF41] hover:text-black transition-colors uppercase">
                            <ExternalLink size={14}/> Accéder à BB Explorer Web
                        </a>
                    </div>

                    {/* UPLOAD ZONE */}
                    <div className="flex-1">
                         <div className={`h-full border-2 border-dashed ${analysis ? 'border-[#00FF41] bg-[#001100]' : 'border-[#00FF41]/30 hover:border-[#00FF41]'} transition-all relative flex flex-col items-center justify-center group cursor-pointer min-h-[140px]`}>
                            <input type="file" accept=".csv" onChange={onFile} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            {isAnalyzing ? (
                                <div className="animate-spin h-8 w-8 border-4 border-b-0 border-[#00FF41] rounded-full"></div>
                            ) : analysis ? (
                                <div className="text-center">
                                    <div className="text-3xl font-black mb-1">{analysis.noiseIntensity}%</div>
                                    <div className="text-xs uppercase tracking-widest bg-[#00FF41] text-black px-2">NOISE DETECTED</div>
                                </div>
                            ) : (
                                <>
                                    <Upload size={32} className="opacity-50 group-hover:opacity-100 mb-2 transition-opacity" />
                                    <span className="text-xs font-bold text-center">GLISSEZ VOTRE FICHIER<br/>CSV ICI</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODULE 4: VISUALIZATION (Apparait si Data) --- */}
            {analysis && (
                <div className={`${moduleBox} animate-in fade-in zoom-in-95 duration-500`}>
                    <div className={moduleTitle}>4 :: SIGNAL VISUALIZER</div>
                    <div className="mt-4">
                        <div className="flex justify-between items-end mb-2 text-xs">
                            <span className="font-bold bg-[#00FF41] text-black px-2">GYRO ROLL RAW DATA</span>
                            <span className={analysis.vibrationLevel === 'CRITICAL' ? 'text-red-500 font-bold blink' : 'text-[#00FF41]'}>STATUS: {analysis.vibrationLevel}</span>
                        </div>
                        <div className="h-40 w-full bg-black border border-[#00FF41]">
                            <TraceGraph data={analysis.trace} />
                        </div>
                        <div className="mt-2 text-xs text-center border-t border-[#00FF41]/30 pt-2 opacity-80">
                            {analysis.recommendation}
                        </div>
                    </div>
                </div>
            )}

            {/* --- MODULE 5: ACTION --- */}
            <div className="mb-10">
                <button onClick={generate} className="w-full bg-[#00FF41] text-black font-black text-2xl py-6 hover:bg-white hover:scale-[1.01] transition-all shadow-[0_0_25px_#00FF41] active:scale-[0.99] uppercase tracking-widest clip-path-polygon">
                    INITIALIZE COMPILATION
                </button>
            </div>

            {/* --- MODULE 6: OUTPUT TERMINAL --- */}
            <div ref={resultRef} className="pb-20">
                {cliOutput && (
                    <div className={`${moduleBox} border-4`}>
                        <div className={moduleTitle}>6 :: TERMINAL OUTPUT</div>
                        <div className="mt-4 relative">
                            <textarea readOnly value={cliOutput} className="w-full h-80 bg-[#050505] text-[#00FF41] p-6 text-sm font-mono border border-[#00FF41]/50 focus:outline-none resize-none shadow-inner" />
                            <div className="absolute bottom-6 right-6 flex gap-3">
                                <button onClick={() => {navigator.clipboard.writeText(cliOutput); alert('COPIED TO CLIPBOARD');}} className="bg-[#00FF41] text-black px-4 py-2 text-xs font-bold hover:bg-white hover:scale-105 transition-all flex items-center gap-2 uppercase">
                                    <Copy size={16}/> Copy
                                </button>
                                <button onClick={() => {setCliOutput(''); setAnalysis(null); setDump(''); setCsvFile(null);}} className="bg-red-600 text-black px-4 py-2 text-xs font-bold hover:bg-red-500 hover:scale-105 transition-all flex items-center gap-2 uppercase">
                                    <RotateCcw size={16}/> System Reset
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </main>
        
        <footer className="text-center text-[10px] opacity-40 pb-4">[ARNO-FPV ENGINEERING] SYSTEM_READY</footer>
      </div>
    </>
  );
};

export default FPVTuner;