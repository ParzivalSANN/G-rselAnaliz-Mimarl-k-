import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Map as MapIcon, Database, Info } from 'lucide-react';

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
            className="h-full flex flex-col justify-center items-center gap-10 max-w-2xl mx-auto"
        >
            <div className="text-center space-y-3">
                <h2 className="text-4xl font-bold tracking-tighter text-[var(--fg-color)]">
                    Giriş <span className="text-[var(--accent-pink)]">Kaynağı</span>
                </h2>
                <p className="text-[var(--fg-color)]/40 tech-mono text-xs">3D Geometri Verisi Bekleniyor</p>
            </div>

            <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                className="relative group w-full aspect-[4/3] glass-card flex flex-col items-center justify-center gap-6 cursor-pointer border-dashed border-2 border-[var(--fg-color)]/10 hover:border-[var(--accent-pink)]/50 hover:bg-[var(--accent-pink)]/[0.02] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-[var(--neon-shadow)]"
            >
                {/* Animated Corner Ornaments */}
                {[
                    'top-0 left-0 border-t-2 border-l-2',
                    'top-0 right-0 border-t-2 border-r-2',
                    'bottom-0 left-0 border-b-2 border-l-2',
                    'bottom-0 right-0 border-b-2 border-r-2',
                ].map((style, i) => (
                    <div key={i} className={`absolute w-8 h-8 ${style} border-[var(--fg-color)]/10 group-hover:border-[var(--accent-pink)]/50 transition-all duration-300`} />
                ))}

                <div className="relative">
                    <Upload className="relative z-10 text-[var(--fg-color)]/10 group-hover:text-[var(--accent-pink)] group-hover:scale-110 transition-all duration-300" size={64} />
                </div>

                <div className="text-center space-y-1 px-8">
                    <p className="text-lg font-medium text-[var(--fg-color)]/70 group-hover:text-[var(--fg-color)] transition-colors">
                        3D Harita görselinizi buraya sürükleyin
                    </p>
                    <p className="text-sm text-[var(--fg-color)]/30 tech-mono">
                        veya cihazınızdan dosya seçin
                    </p>
                </div>

                <div className="flex gap-8 mt-4 invisible group-hover:visible animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center gap-2 text-[10px] tech-mono text-[var(--fg-color)]/40">
                        <MapIcon size={12} /> JPG / PNG
                    </div>
                    <div className="flex items-center gap-2 text-[10px] tech-mono text-[var(--fg-color)]/40">
                        <Database size={12} /> MAX 20MB
                    </div>
                </div>

                <input type="file" className="hidden" onChange={onFileChange} accept="image/*" />
            </label>

            <div className="p-4 bg-[var(--accent-cyan)]/5 border border-[var(--accent-cyan)]/10 rounded-xl flex items-start gap-3 w-full">
                <Info size={16} className="text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[var(--fg-color)]/60 leading-normal">
                    <span className="font-bold text-[var(--accent-cyan)] uppercase">Nasıl Çalışır?</span> Referans stildeki analiz verileri kullanılarak, yüklediğiniz haritadaki binalar, yollar ve topografya tel kafes profiline projekte edilir.
                </p>
            </div>
        </motion.div>
    );
};

export default UploadPanel;
