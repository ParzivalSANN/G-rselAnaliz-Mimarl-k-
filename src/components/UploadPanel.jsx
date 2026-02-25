import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Map as MapIcon, Database } from 'lucide-react';

const UploadPanel = ({ onUpload }) => {
    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpload(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpload(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col justify-center items-center gap-10"
        >
            <div className="text-center space-y-3">
                <h2 className="text-4xl font-bold tracking-tighter text-white">
                    Input <span className="text-accent-pink">Source</span>
                </h2>
                <p className="text-white/40 tech-mono text-xs">Awaiting 3D Geometry Data</p>
            </div>

            <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                className="relative group w-full max-w-xl aspect-square glass-card flex flex-col items-center justify-center gap-6 cursor-pointer border-dashed border-2 hover:border-accent-pink/50 transition-all duration-500 overflow-hidden"
            >
                <div className="absolute inset-0 bg-accent-pink/0 group-hover:bg-accent-pink/[0.03] transition-colors" />

                {/* Animated Corner Ornaments */}
                {[
                    'top-0 left-0 border-t-2 border-l-2',
                    'top-0 right-0 border-t-2 border-r-2',
                    'bottom-0 left-0 border-b-2 border-l-2',
                    'bottom-0 right-0 border-b-2 border-r-2',
                ].map((style, i) => (
                    <div key={i} className={`absolute w-8 h-8 ${style} border-white/5 group-hover:border-accent-pink/50 transition-all duration-300`} />
                ))}

                <div className="relative">
                    <div className="absolute inset-0 bg-accent-pink blur-3xl opacity-0 group-hover:opacity-20 transition-opacity" />
                    <Upload className="relative z-10 text-white/20 group-hover:text-accent-pink group-hover:scale-110 transition-all duration-300" size={64} />
                </div>

                <div className="text-center space-y-1">
                    <p className="text-lg font-medium text-white/80 group-hover:text-white transition-colors">
                        Drop your 3D Map image here
                    </p>
                    <p className="text-sm text-white/30 tech-mono">
                        or click to browse local storage
                    </p>
                </div>

                <div className="flex gap-8 mt-4 invisible group-hover:visible animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center gap-2 text-[10px] tech-mono text-white/40">
                        <MapIcon size={12} /> JPG / PNG
                    </div>
                    <div className="flex items-center gap-2 text-[10px] tech-mono text-white/40">
                        <Database size={12} /> UP TO 20MB
                    </div>
                </div>

                <input type="file" className="hidden" onChange={onFileChange} accept="image/*" />
            </label>

            <div className="flex items-center gap-4 text-white/20">
                <div className="h-[1px] w-12 bg-current" />
                <span className="tech-mono text-[10px]">Ready for Injection</span>
                <div className="h-[1px] w-12 bg-current" />
            </div>
        </motion.div>
    );
};

export default UploadPanel;
