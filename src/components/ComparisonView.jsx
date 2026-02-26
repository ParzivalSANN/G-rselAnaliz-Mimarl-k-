import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Download, Share2 } from 'lucide-react';

const ComparisonView = ({ original, processed, onReset }) => {
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef(null);

    const handleMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const position = ((x - rect.left) / rect.width) * 100;
        setSliderPos(Math.min(Math.max(position, 0), 100));
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full flex flex-col gap-8 max-w-3xl mx-auto w-full"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tighter uppercase font-mono text-[var(--fg-color)]">
                    Dönüşüm <span className="text-[var(--accent-pink)]">Tamamlandı</span>
                </h2>
                <div className="flex gap-2">
                    <button className="p-2 glass-card hover:text-[var(--accent-pink)] transition-colors text-[var(--fg-color)]/60">
                        <Download size={18} />
                    </button>
                    <button className="p-2 glass-card hover:text-[var(--accent-pink)] transition-colors text-[var(--fg-color)]/60">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>

            <div
                ref={containerRef}
                onMouseMove={handleMove}
                onTouchMove={handleMove}
                className="relative flex-1 rounded-2xl overflow-hidden glass-card neon-border cursor-col-resize select-none border-0 shadow-lg"
            >
                {/* After (Processed) Image */}
                <div className="absolute inset-0">
                    <img src={processed} alt="Sonuç" className="w-full h-full object-cover" />
                </div>

                {/* Before (Original) Image */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                >
                    <img src={original} alt="Orijinal" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 tech-mono bg-[var(--bg-color)]/80 backdrop-blur px-2 py-1 rounded text-[10px] text-[var(--fg-color)]">ORİJİNAL</div>
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute top-0 bottom-0 w-[2px] bg-[var(--accent-pink)] z-10"
                    style={{ left: `${sliderPos}%`, filter: "drop-shadow(var(--neon-shadow))" }}
                >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--accent-pink)] flex items-center justify-center shadow-lg border-2 border-[var(--bg-color)]">
                        <div className="flex gap-1">
                            <div className="w-0.5 h-3 bg-white/50 rounded-full" />
                            <div className="w-0.5 h-3 bg-white/50 rounded-full" />
                        </div>
                    </div>
                </div>

                <div className="absolute top-4 right-4 tech-mono bg-[var(--accent-pink)]/90 backdrop-blur px-2 py-1 rounded text-[10px] text-white">TEL KAFES</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={onReset}
                    className="flex items-center justify-center gap-2 py-4 glass-card hover:bg-[var(--fg-color)]/5 transition-colors tech-mono text-xs text-[var(--fg-color)]/80"
                >
                    <RefreshCcw size={14} /> Yeni Harita Yükle
                </button>

                <button
                    className="flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-deep-pink)] text-white transition-all tech-mono text-xs font-bold active:scale-[0.98] shadow-md hover:shadow-lg rounded-xl"
                >
                    Vektör Verisini İndir
                </button>
            </div>

            <div className="tech-mono text-[9px] text-[var(--fg-color)]/40 text-center flex items-center justify-center gap-4">
                <span>İşleme Süresi: 1250ms</span>
                <div className="w-1 h-1 rounded-full bg-[var(--fg-color)]/20" />
                <span>Kalite Skoru: %98.4</span>
                <div className="w-1 h-1 rounded-full bg-[var(--fg-color)]/20" />
                <span>Kayıp Oranı: 0.002%</span>
            </div>
        </motion.div>
    );
};

export default ComparisonView;
