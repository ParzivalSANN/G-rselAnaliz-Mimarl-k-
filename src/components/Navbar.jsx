import React from 'react';
import { Layers } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md z-40">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-accent-pink to-accent-red flex items-center justify-center shadow-[0_0_15px_rgba(243,18,51,0.4)]">
                    <Layers size={18} className="text-white" />
                </div>
                <h1 className="tech-mono text-[11px] font-bold text-white tracking-[0.3em]">
                    Architect <span className="text-accent-pink">AI</span>
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="tech-mono text-[9px] text-white/40">Model: Wireframe-v2</span>
                </div>
                <div className="h-4 w-[1px] bg-white/10" />
                <button className="tech-mono text-[9px] text-white/60 hover:text-accent-pink transition-colors">
                    Documentation
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
