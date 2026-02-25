import React from 'react';
import { motion } from 'framer-motion';
import { Info, Upload, Sparkles, HelpCircle } from 'lucide-react';

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
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-accent-pink">
                        <Sparkles size={16} />
                        <h2 className="tech-mono text-xs font-bold tracking-widest">Dinamik Stil Referansı</h2>
                    </div>
                    <div className="group relative">
                        <HelpCircle size={16} className="text-foreground/20 cursor-help hover:text-accent-pink transition-colors" />
                        <div className="absolute right-0 top-full mt-2 w-56 p-3 glass-card shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-[10px] text-foreground/70">
                            Bu bölüme yüklediğiniz görselin çizgisel yapısı, kalınlıkları ve renkleri analiz edilerek haritanıza uygulanır.
                        </div>
                    </div>
                </div>
                <p className="text-foreground/60 text-sm leading-relaxed max-w-md">
                    Yapay zekamız, bu referans görselin geometrik desenlerini ve renk paletini analiz ederek giriş verilerinize uygular.
                </p>
            </div>

            <div className="relative group aspect-[4/3] glass-card overflow-hidden neon-border flex items-center justify-center bg-black/[0.02]">
                {style ? (
                    <>
                        <img
                            src={style}
                            alt="Stil Referansı"
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-4 text-foreground/20">
                        <Upload size={48} />
                        <span className="tech-mono text-[10px]">Referans Görsel Yükleyin</span>
                    </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 tech-mono text-[9px] text-foreground/50">
                        {style && <div className="w-2 h-2 rounded-full bg-accent-pink animate-pulse" />}
                        {style ? 'Stil Belirteçleri Analiz Ediliyor...' : 'Awaiting Reference'}
                    </div>

                    <label className="cursor-pointer flex items-center gap-2 tech-mono text-[9px] bg-accent-pink/10 group-hover:bg-accent-pink/20 text-accent-pink px-3 py-1.5 rounded backdrop-blur transition-all active:scale-95 border border-accent-pink/20">
                        <Upload size={10} />
                        {style ? 'Stili Değiştir' : 'Stil Yükle'}
                        <input type="file" className="hidden" onChange={onFileChange} accept="image/*" />
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: 'Karmaşıklık', value: style ? 'Yüksek' : '---' },
                    { label: 'Çizgi Tipi', value: style ? 'Teknik' : '---' },
                    { label: 'Palet', value: style ? 'Özel' : '---' },
                    { label: 'Motor', value: 'EGZO_Neural' }
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-4 border-black/5 space-y-1">
                        <div className="tech-mono text-[8px] text-foreground/30 uppercase">{stat.label}</div>
                        <div className="tech-mono text-[10px] text-foreground/80 font-bold">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="mt-auto p-4 bg-accent-pink/5 border border-accent-pink/10 rounded-xl flex gap-3 italic">
                <Info size={16} className="text-accent-pink shrink-0" />
                <p className="text-[10px] text-foreground/60 leading-normal">
                    <span className="font-bold text-accent-pink uppercase not-italic">İpucu:</span> En iyi sonuçlar için kontrastı yüksek teknik çizimler veya mimari tel kafes görselleri kullanın.
                </p>
            </div>
        </div>
    );
};

export default DynamicStylePanel;
