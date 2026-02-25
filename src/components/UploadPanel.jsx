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
            className="h-full flex flex-col justify-center items-center gap-10"
        >
            <div className="text-center space-y-3">
                <h2 className="text-4xl font-bold tracking-tighter text-foreground">
                    Giriş <span className="text-accent-pink">Kaynağı</span>
                </h2>
                <p className="text-foreground/40 tech-mono text-xs">3D Geometri Verisi Bekleniyor</p>
            </div>

            <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                className="relative group w-full max-w-xl aspect-square glass-card flex flex-col items-center justify-center gap-6 cursor-pointer border-dashed border-2 border-black/5 hover:border-accent-pink/30 hover:bg-accent-pink/[0.01] transition-all duration-500 overflow-hidden shadow-sm"
            >
                {/* Animated Corner Ornaments */}
                {[
                    'top-0 left-0 border-t-2 border-l-2',
                    'top-0 right-0 border-t-2 border-r-2',
                    'bottom-0 left-0 border-b-2 border-l-2',
                    'bottom-0 right-0 border-b-2 border-r-2',
                ].map((style, i) => (
                    <div key={i} className={`absolute w-8 h-8 ${style} border-black/5 group-hover:border-accent-pink/50 transition-all duration-300`} />
                ))}

                <div className="relative">
                    <Upload className="relative z-10 text-black/10 group-hover:text-accent-pink group-hover:scale-110 transition-all duration-300" size={64} />
                </div>

                <div className="text-center space-y-1 px-8">
                    <p className="text-lg font-medium text-foreground/70 group-hover:text-foreground transition-colors">
                        3D Harita görselinizi buraya sürükleyin
                    </p>
                    <p className="text-sm text-foreground/30 tech-mono">
                        veya cihazınızdan dosya seçin
                    </p>
                </div>

                <div className="flex gap-8 mt-4 invisible group-hover:visible animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center gap-2 text-[10px] tech-mono text-foreground/40">
                        <MapIcon size={12} /> JPG / PNG
                    </div>
                    <div className="flex items-center gap-2 text-[10px] tech-mono text-foreground/40">
                        <Database size={12} /> MAX 20MB
                    </div>
                </div>

                <input type="file" className="hidden" onChange={onFileChange} accept="image/*" />
            </label>

            <div className="p-4 bg-accent-cyan/5 border border-accent-cyan/10 rounded-xl flex items-start gap-3 max-w-md">
                <Info size={16} className="text-accent-cyan shrink-0 mt-0.5" />
                <p className="text-[11px] text-foreground/60 leading-normal">
                    <span className="font-bold text-accent-cyan uppercase">Nasıl Çalışır?</span> Yapay zekamız, yüklediğiniz haritadaki binaları, yolları ve topografyayı analiz ederek bunları belirlediğiniz tel kafes stiline dönüştürür.
                </p>
            </div>
        </motion.div>
    );
};

export default UploadPanel;
