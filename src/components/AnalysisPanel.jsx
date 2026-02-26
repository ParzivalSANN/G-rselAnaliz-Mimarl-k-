import React from 'react';
import { motion } from 'framer-motion';
import { Settings2, AlertTriangle, CheckCircle2 } from 'lucide-react';

const AnalysisPanel = ({ results, onUpdate }) => {
    if (!results) return null;

    const handleChange = (key, value) => {
        onUpdate({ ...results, [key]: value });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-4"
        >
            <div className="flex items-center justify-between border-b border-foreground/5 pb-2">
                <h3 className="tech-mono text-[10px] text-accent-cyan flex items-center gap-2">
                    <Settings2 size={12} /> AI STİL ANALİZ SONUÇLARI
                </h3>
                <span className="text-[9px] text-green-500/80 flex items-center gap-1 tech-mono">
                    <CheckCircle2 size={10} /> ANALİZ TAMAMLANDI
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="tech-mono text-[9px] text-foreground/50">Ana Vurgu Rengi (Hex)</label>
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={results.primaryColor}
                            onChange={(e) => handleChange('primaryColor', e.target.value)}
                            className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                        />
                        <input
                            type="text"
                            value={results.primaryColor}
                            onChange={(e) => handleChange('primaryColor', e.target.value)}
                            className="flex-1 bg-foreground/5 border border-foreground/10 rounded px-2 tech-mono text-[10px] text-foreground focus:border-accent-pink outline-none transition-colors"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="tech-mono text-[9px] text-foreground/50">Çizgi Kalınlığı (Line Weight)</label>
                    <select
                        value={results.lineWeight}
                        onChange={(e) => handleChange('lineWeight', e.target.value)}
                        className="w-full h-8 bg-foreground/5 border border-foreground/10 rounded px-2 tech-mono text-[10px] text-foreground focus:border-accent-pink outline-none transition-colors"
                    >
                        <option value="İnce (0.5px)">İnce (0.5px)</option>
                        <option value="Standart (1.0px)">Standart (1.0px)</option>
                        <option value="Kalın (2.0px)">Kalın (2.0px)</option>
                        <option value="Dinamik (Değişken)">Dinamik (Değişken)</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="tech-mono text-[9px] text-foreground/50">Geometri Karmaşıklığı</label>
                    <select
                        value={results.complexity}
                        onChange={(e) => handleChange('complexity', e.target.value)}
                        className="w-full h-8 bg-foreground/5 border border-foreground/10 rounded px-2 tech-mono text-[10px] text-foreground focus:border-accent-pink outline-none transition-colors"
                    >
                        <option value="Düşük (Minimal)">Düşük (Minimal)</option>
                        <option value="Orta (Dengeli)">Orta (Dengeli)</option>
                        <option value="Yüksek (Detaylı)">Yüksek (Detaylı)</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="tech-mono text-[9px] text-foreground/50">Glow (Işıma) Etkisi</label>
                    <select
                        value={results.glowIntensity}
                        onChange={(e) => handleChange('glowIntensity', e.target.value)}
                        className="w-full h-8 bg-foreground/5 border border-foreground/10 rounded px-2 tech-mono text-[10px] text-foreground focus:border-accent-pink outline-none transition-colors"
                    >
                        <option value="Yok">Yok</option>
                        <option value="Hafif">Hafif</option>
                        <option value="Yoğun Neon">Yoğun Neon</option>
                    </select>
                </div>
            </div>

            <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg flex gap-3 text-foreground/70 text-[10px]">
                <AlertTriangle size={14} className="text-blue-500 shrink-0 mt-0.5" />
                <p>
                    Yukarıdaki değerler yüklediğiniz referans görselden <strong className="text-blue-500 font-normal">Yapay Zeka</strong> tarafından otomatik çıkarılmıştır. Hatalı olduğunu düşünüyorsanız değerleri manuel olarak değiştirebilirsiniz. Bu ayarlar dönüştürme işleminde doğrudan kullanılacaktır.
                </p>
            </div>
        </motion.div>
    );
};

export default AnalysisPanel;
