import React from 'react';
import { Layers, Info } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="h-16 border-b border-black/5 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md z-40">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-accent-pink to-accent-deep-pink flex items-center justify-center shadow-md">
                    <Layers size={18} className="text-white" />
                </div>
                <h1 className="tech-mono text-[11px] font-bold text-foreground tracking-[0.2em] flex flex-col">
                    <span className="text-accent-pink leading-none">EGZO</span>
                    <span className="text-[9px] text-foreground/60 leading-none mt-0.5">MİMARLIK</span>
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="tech-mono text-[9px] text-foreground/40">Model: TelKafes-v2</span>
                </div>
                <div className="h-4 w-[1px] bg-black/5" />
                <div className="group relative">
                    <button className="flex items-center gap-2 tech-mono text-[9px] text-foreground/60 hover:text-accent-pink transition-colors">
                        <Info size={12} /> Bilgi Paneli
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-64 p-4 glass-card shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-[11px] text-foreground/80 leading-relaxed border-accent-pink/20 border-t-2">
                        <p className="font-bold text-accent-pink mb-1">EGZO MIMARLIK AI</p>
                        3D harita verilerinizi analiz eder ve belirlediğiniz mimari tel kafes stiline dönüştürür. Mimari sunumlar ve teknik çizimler için tasarlanmıştır.
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
