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
            className="h-full flex flex-col gap-8"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tighter uppercase font-mono text-foreground">
                    Dönüşüm <span className="text-accent-pink">Tamamlandı</span>
                </h2>
                <div className="flex gap-2">
                    <button className="p-2 glass-card hover:text-accent-pink transition-colors text-foreground/60">
                        <Download size={18} />
                    </button>
                    <button className="p-2 glass-card hover:text-accent-pink transition-colors text-foreground/60">
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
                    <div className="absolute top-4 left-4 tech-mono bg-white/60 backdrop-blur px-2 py-1 rounded text-[10px] text-foreground">ORİJİNAL</div>
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute top-0 bottom-0 w-[2px] bg-accent-pink shadow-[0_0_10px_rgba(255,77,145,0.6)] z-10"
                    style={{ left: `${sliderPos}%` }}
                >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-accent-pink flex items-center justify-center shadow-lg border-2 border-white">
                        <div className="flex gap-1">
                            <div className="w-0.5 h-3 bg-white/50 rounded-full" />
                            <div className="w-0.5 h-3 bg-white/50 rounded-full" />
                        </div>
                    </div>
                </div>

                <div className="absolute top-4 right-4 tech-mono bg-accent-pink/80 backdrop-blur px-2 py-1 rounded text-[10px] text-white">TEL KAFES</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={onReset}
                    className="flex items-center justify-center gap-2 py-4 glass-card hover:bg-black/5 transition-colors tech-mono text-xs text-foreground/80"
                >
                    <RefreshCcw size={14} /> Yeni Harita Yükle
                </button>

                <button
                    className="flex items-center justify-center gap-2 py-4 bg-accent-pink hover:bg-accent-deep-pink text-white transition-all tech-mono text-xs font-bold active:scale-[0.98] shadow-md"
                >
                    Vektör Verisini İndir
                </button>
            </div>

            <div className="tech-mono text-[9px] text-foreground/20 text-center flex items-center justify-center gap-4">
                <span>İşleme Süresi: 842ms</span>
                <div className="w-1 h-1 rounded-full bg-black/10" />
                <span>Bellek Derinliği: 2.1GB</span>
                <div className="w-1 h-1 rounded-full bg-black/10" />
                <span>Kayıp Oranı: 0.002%</span>
            </div>
        </motion.div>
    );
};

export default ComparisonView;
