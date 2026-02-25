import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Info } from 'lucide-react';
import Navbar from './components/Navbar';
import DynamicStylePanel from './components/DynamicStylePanel';
import UploadPanel from './components/UploadPanel';
import ProcessView from './components/ProcessView';
import ComparisonView from './components/ComparisonView';

const App = () => {
  const [sourceImage, setSourceImage] = useState(null);
  const [referenceStyle, setReferenceStyle] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState(null);

  const handleTransform = async () => {
    if (!sourceImage) {
      setError("Lütfen önce bir 3D harita görseli yükleyin.");
      return;
    }
    if (!referenceStyle) {
      setError("Lütfen önce bir stil referansı yükleyin.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: sourceImage,
          reference: referenceStyle,
        }),
      });

      if (!response.ok) {
        throw new Error('Dönüştürme başarısız oldu. Lütfen tekrar deneyin.');
      }

      const data = await response.json();
      setResultImage(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSourceImage(null);
    setResultImage(null);
    setError(null);
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
      <Navbar />

      <main className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-black/5">
        {/* Left Panel: Reference Style */}
        <section className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 bg-white">
          <DynamicStylePanel
            style={referenceStyle}
            onStyleChange={(s) => {
              setReferenceStyle(s);
              setError(null);
            }}
          />
        </section>

        {/* Right Panel: Upload / Process / Result */}
        <section className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 bg-black/[0.01]">
          <AnimatePresence mode="wait">
            {!sourceImage && !isProcessing && !resultImage && (
              <UploadPanel onUpload={(s) => {
                setSourceImage(s);
                setError(null);
              }} />
            )}

            {sourceImage && !isProcessing && !resultImage && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full flex flex-col justify-center gap-8"
              >
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tech-mono text-accent-pink tracking-tighter">Girişi Onayla</h2>
                  <div className="aspect-video glass-card overflow-hidden shadow-lg border-2 border-accent-pink/20">
                    <img src={sourceImage} alt="Giriş" className="w-full h-full object-cover" />
                  </div>
                </div>

                <button
                  onClick={handleTransform}
                  className="group relative px-8 py-4 bg-accent-pink text-white overflow-hidden rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_20px_rgba(255,77,145,0.4)]"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    Dönüştürmeyi Başlat <Zap size={18} />
                  </span>
                </button>

                <button onClick={handleReset} className="text-foreground/30 hover:text-accent-pink transition-colors tech-mono text-[10px]">
                  Farklı bir görsel seçmek istiyorum
                </button>
              </motion.div>
            )}

            {isProcessing && (
              <ProcessView key="processing" />
            )}

            {resultImage && (
              <ComparisonView
                key="result"
                original={sourceImage}
                processed={resultImage}
                onReset={handleReset}
              />
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-500 text-[11px] flex items-center gap-2 tech-mono"
            >
              <Info size={14} /> {error}
            </motion.div>
          )}
        </section>
      </main>

      <div className="absolute bottom-4 left-4 z-50 pointer-events-none opacity-20 hidden md:block">
        <div className="tech-mono text-[9px] space-y-1 text-foreground">
          <div>Sistem: EGZO_GEN_v1.0</div>
          <div>Motor: MİMARİ_TEL_KAFES</div>
          <div>Durum: HAZIR</div>
        </div>
      </div>
    </div>
  );
};

export default App;
