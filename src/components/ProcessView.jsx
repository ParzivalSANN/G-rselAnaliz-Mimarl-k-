import React from 'react';
import { motion } from 'framer-motion';

const ProcessView = ({ analysisConfig }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center gap-12 w-full max-w-md mx-auto">
            <div className="relative w-48 h-48">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-[var(--accent-pink)]/20 rounded-full"
                />

                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-4 bg-[var(--accent-pink)]/10 rounded-full blur-xl"
                />

                <svg className="w-full h-full -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r="80"
                        className="stroke-[var(--fg-color)]/5"
                        strokeWidth="4"
                        fill="transparent"
                    />
                    <motion.circle
                        cx="96"
                        cy="96"
                        r="80"
                        className="stroke-[var(--accent-pink)]"
                        style={{ filter: "drop-shadow(var(--neon-shadow))" }}
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray="502.4"
                        initial={{ strokeDashoffset: 502.4 }}
                        animate={{ strokeDashoffset: [502.4, 100, 502.4] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-xs tech-mono text-[var(--accent-pink)] font-bold"
                        >
                            İŞLENİYOR
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold tech-mono tracking-tighter text-[var(--fg-color)]">Geometri Modelleniyor</h3>
                <p className="text-[var(--fg-color)]/40 text-sm max-w-xs tech-mono leading-relaxed mx-auto">
                    3D veriler, analiz edilen stil profiline (PGZO_Vision_v3) uygun olarak yeniden oluşturuluyor...
                </p>
            </div>

            {analysisConfig && (
                <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 text-[9px] tech-mono text-center opacity-60">
                    <div className="p-2 border border-[var(--fg-color)]/10 rounded">
                        RENK: <span style={{ color: analysisConfig.primaryColor }}>{analysisConfig.primaryColor}</span>
                    </div>
                    <div className="p-2 border border-[var(--fg-color)]/10 rounded">
                        ÇİZGİ: {analysisConfig.lineWeight.split(' ')[0]}
                    </div>
                    <div className="p-2 border border-[var(--fg-color)]/10 rounded">
                        GLOW: {analysisConfig.glowIntensity}
                    </div>
                    <div className="p-2 border border-[var(--fg-color)]/10 rounded">
                        DETAY: {analysisConfig.complexity.split(' ')[0]}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-3 gap-8 w-full">
                {['VERTİSLER', 'KENARLAR', 'DOKULAR'].map((step, i) => (
                    <div key={i} className="space-y-2">
                        <div className="h-1 bg-[var(--fg-color)]/5 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ width: ['0%', '100%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                                className="h-full bg-[var(--accent-cyan)]"
                            />
                        </div>
                        <div className="tech-mono text-[8px] text-[var(--fg-color)]/40 text-center">{step}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProcessView;
