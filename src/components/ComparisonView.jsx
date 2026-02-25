import React, { useState, useRef, useEffect } from 'react';
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
                <h2 className="text-3xl font-bold tracking-tighter uppercase font-mono">
                    Result <span className="text-accent-pink">Rendered</span>
                </h2>
                <div className="flex gap-2">
                    <button className="p-2 glass-card hover:text-accent-pink transition-colors">
                        <Download size={18} />
                    </button>
                    <button className="p-2 glass-card hover:text-accent-pink transition-colors">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>

            <div
                ref={containerRef}
                onMouseMove={handleMove}
                onTouchMove={handleMove}
                className="relative flex-1 rounded-2xl overflow-hidden glass-card neon-border cursor-col-resize select-none"
            >
                {/* After (Processed) Image */}
                <div className="absolute inset-0">
                    <img src={processed} alt="After" className="w-full h-full object-cover" />
                </div>

                {/* Before (Original) Image */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                >
                    <img src={original} alt="Before" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 tech-mono bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px]">ORIGINAL</div>
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute top-0 bottom-0 w-[2px] bg-accent-pink shadow-[0_0_10px_rgba(243,18,51,0.8)] z-10"
                    style={{ left: `${sliderPos}%` }}
                >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-accent-pink flex items-center justify-center shadow-lg">
                        <div className="flex gap-1">
                            <div className="w-0.5 h-3 bg-white/50 rounded-full" />
                            <div className="w-0.5 h-3 bg-white/50 rounded-full" />
                        </div>
                    </div>
                </div>

                <div className="absolute top-4 right-4 tech-mono bg-accent-pink/50 backdrop-blur px-2 py-1 rounded text-[10px]">WIREFRAME</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={onReset}
                    className="flex items-center justify-center gap-2 py-4 glass-card hover:bg-white/10 transition-colors tech-mono text-xs"
                >
                    <RefreshCcw size={14} /> Upload New Map
                </button>

                <button
                    className="flex items-center justify-center gap-2 py-4 bg-accent-pink hover:bg-accent-red transition-all tech-mono text-xs font-bold active:scale-[0.98]"
                >
                    Export Vector Data
                </button>
            </div>

            <div className="tech-mono text-[9px] text-white/20 text-center flex items-center justify-center gap-4">
                <span>Processing Time: 842ms</span>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <span>Memory Depth: 2.1GB</span>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <span>Loss Ratio: 0.002%</span>
            </div>
        </motion.div>
    );
};

export default ComparisonView;
