import React from 'react';
import { Layers, Info, Moon, Sun } from 'lucide-react';

const Navbar = ({ isDark, toggleTheme }) => {
    return (
        <nav className="h-16 border-b border-foreground/5 flex items-center justify-between px-8 bg-background/80 backdrop-blur-md z-40 transition-colors duration-400">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-accent-pink to-accent-deep-pink flex items-center justify-center shadow-md">
                    <Layers size={18} className="text-white" />
                </div>
                <h1 className="tech-mono text-[11px] font-bold text-foreground tracking-[0.2em] flex flex-col">
                    <span className="text-accent-pink leading-none">egzo</span>
                    <span className="text-[9px] text-foreground/60 leading-none mt-0.5">MİMARLIK</span>
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="tech-mono text-[9px] text-foreground/40 hidden md:block">Motor: egzo_Vision_v3</span>
                </div>
                <div className="h-4 w-[1px] bg-foreground/10 hidden md:block" />

                {/* Toggle Theme */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-foreground/5 text-foreground/60 hover:text-accent-pink transition-all active:scale-90"
                    title={isDark ? "Gündüz Moduna Geç" : "Gece Moduna Geç"}
                >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>

                <div className="group relative">
                    <button className="flex items-center gap-2 tech-mono text-[9px] text-foreground/60 hover:text-accent-pink transition-colors">
                        <Info size={14} /> <span className="hidden md:block">Bilgi Paneli</span>
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-72 p-4 glass-card shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-[11px] text-foreground/80 leading-relaxed border-accent-pink/20 border-t-2">
                        <p className="font-bold text-accent-pink mb-2 text-sm">egzo MİMARLIK AI</p>
                        <p className="mb-2">Gelişmiş vizyon modelimiz, referans görsellerinizdeki mimari detayları (çizgi kalınlığı, renk, karmaşıklık) <strong>otomatik analiz eder</strong>.</p>
                        <p>Bu analizi dilediğiniz gibi düzenleyebilir ve kendi 3D haritalarınızı kusursuz tel kafes sunumlarına dönüştürebilirsiniz.</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
