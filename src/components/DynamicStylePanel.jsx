import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Info, Upload, Sparkles } from 'lucide-react';

const DynamicStylePanel = ({ style, onStyleChange }) => {
    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onStyleChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="h-full flex flex-col gap-8">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent-pink">
                    <Sparkles size={16} />
                    <h2 className="tech-mono text-xs font-bold tracking-widest">Dynamic Style Reference</h2>
                </div>
                <p className="text-white/50 text-sm leading-relaxed max-w-md">
                    Our AI analyzes the geometric patterns, line weights, and color palette of this reference image to transform your input data.
                </p>
            </div>

            <div className="relative group aspect-[4/3] glass-card overflow-hidden neon-border">
                <img
                    src={style}
                    alt="Style Reference"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 tech-mono text-[9px] text-white/60">
                        <div className="w-2 h-2 rounded-full bg-accent-pink" />
                        Analyzing active tokens...
                    </div>

                    <label className="cursor-pointer flex items-center gap-2 tech-mono text-[9px] bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded backdrop-blur transition-all active:scale-95">
                        <Upload size={10} />
                        Change Style
                        <input type="file" className="hidden" onChange={onFileChange} accept="image/*" />
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: 'Complexity', value: 'High' },
                    { label: 'Line Type', value: 'Technical' },
                    { label: 'Palette', value: 'Neon/Dark' },
                    { label: 'Engine', value: 'Neural_G1' }
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-4 border-white/5 space-y-1">
                        <div className="tech-mono text-[8px] text-white/30 uppercase">{stat.label}</div>
                        <div className="tech-mono text-[10px] text-white/80 font-bold">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="mt-auto p-4 bg-accent-cyan/5 border border-accent-cyan/20 rounded-xl flex gap-3">
                <Info size={18} className="text-accent-cyan shrink-0" />
                <p className="text-[11px] text-accent-cyan/80 leading-normal">
                    <span className="font-bold">Pro Tip:</span> For best results, use high-contrast architectural drawings or technical wireframes as style references.
                </p>
            </div>
        </div>
    );
};

export default DynamicStylePanel;
