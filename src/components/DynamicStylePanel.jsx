import React, { useState } from 'react';
import { Upload, Sparkles, HelpCircle, Loader2 } from 'lucide-react';
import AnalysisPanel from './AnalysisPanel';

const DynamicStylePanel = ({ style, onStyleChange, analysisResults, onUpdateAnalysis }) => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const simulateAIAnalysis = (imageUrl) => {
        setIsAnalyzing(true);
        // Simulate complex AI visual extraction delay
        setTimeout(() => {
            onUpdateAnalysis({
                primaryColor: '#FF4D91',
                lineWeight: 'İnce (0.5px)',
                complexity: 'Yüksek (Detaylı)',
                glowIntensity: 'Hafif'
            });
            setIsAnalyzing(false);
        }, 1500);
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onStyleChange(reader.result);
                simulateAIAnalysis(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-accent-pink">
                        <Sparkles size={16} />
                        <h2 className="tech-mono text-xs font-bold tracking-widest">Stil Kaynağı & Öğrenme</h2>
                    </div>
                    <div className="group relative">
                        <HelpCircle size={14} className="text-foreground/20 cursor-help hover:text-accent-pink transition-colors" />
                        <div className="absolute right-0 top-full mt-2 w-56 p-3 glass-card shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-[10px] text-foreground/70">
                            Yapay zeka (PGZO Vision), yüklenen görseldeki çizgi ağırlıklarını, ana vurgu renklerini ve karmaşıklığı analiz ederek stil profilini çıkartır.
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative group aspect-[16/9] lg:aspect-[4/3] glass-card overflow-hidden neon-border flex items-center justify-center bg-foreground/[0.02]">
                {style ? (
                    <>
                        <img
                            src={style}
                            alt="Stil Referansı"
                            className={`w-full h-full object-cover transition-all duration-700 ${isAnalyzing ? 'blur-sm scale-105 opacity-50' : 'opacity-90 group-hover:opacity-100'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />

                        {isAnalyzing && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 backdrop-blur-sm bg-background/20">
                                <Loader2 size={32} className="text-accent-pink animate-spin" />
                                <span className="tech-mono text-[10px] text-foreground font-bold bg-background/80 px-3 py-1 rounded">Vizyon Modeli Analiz Ediyor...</span>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-4 text-foreground/20 p-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mb-2">
                            <Upload size={24} />
                        </div>
                        <span className="tech-mono text-[11px] font-bold text-foreground/50">Referans Görsel Yükleyin</span>
                        <span className="text-[10px] text-foreground/40 max-w-[200px]">Yapay zeka görseli tarayarak stil parametrelerini otomatik belirler.</span>
                    </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <label className="cursor-pointer flex items-center gap-2 tech-mono text-[9px] bg-accent-pink/10 hover:bg-accent-pink text-accent-pink hover:text-white px-4 py-2 rounded-lg backdrop-blur transition-all active:scale-95 border border-accent-pink/20 font-bold ml-auto shadow-sm">
                        <Upload size={12} />
                        {style ? 'Farklı Bir Stil Seç' : 'Dosya Seç'}
                        <input type="file" className="hidden" onChange={onFileChange} accept="image/*" />
                    </label>
                </div>
            </div>

            {/* Embedded Settings/Extraction Panel */}
            <AnalysisPanel results={analysisResults} onUpdate={onUpdateAnalysis} />

        </div>
    );
};

export default DynamicStylePanel;
