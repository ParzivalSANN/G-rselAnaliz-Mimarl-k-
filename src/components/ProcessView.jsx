import React from 'react';
import { motion } from 'framer-motion';

const ProcessView = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center gap-12">
            <div className="relative w-48 h-48">
                {/* Rapidly rotating outer ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-accent-pink/20 rounded-full"
                />

                {/* Pulsing glow ring */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-4 bg-accent-pink/10 rounded-full blur-xl"
                />

                {/* Inner progress ring */}
                <svg className="w-full h-full -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r="80"
                        className="stroke-white/5"
                        strokeWidth="4"
                        fill="transparent"
                    />
                    <motion.circle
                        cx="96"
                        cy="96"
                        r="80"
                        className="stroke-accent-pink shadow-[0_0_15px_rgba(243,18,51,0.5)]"
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
                            className="text-xs tech-mono text-accent-pink font-bold"
                        >
                            ANALYZING
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold tech-mono tracking-tighter">Transforming Geometry</h3>
                <p className="text-white/40 text-sm max-w-xs tech-mono leading-relaxed">
                    AI is extracting features from reference style and re-projecting 3D coordinates into technical wireframes...
                </p>
            </div>

            <div className="grid grid-cols-3 gap-8 w-full max-w-sm">
                {['VERTICES', 'EDGES', 'TEXTURES'].map((step, i) => (
                    <div key={i} className="space-y-2">
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ width: ['0%', '100%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                                className="h-full bg-accent-cyan"
                            />
                        </div>
                        <div className="tech-mono text-[8px] text-white/30 text-center">{step}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProcessView;
