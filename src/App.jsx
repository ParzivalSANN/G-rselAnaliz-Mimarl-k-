import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Info } from 'lucide-react';
import Navbar from './components/Navbar';
import DynamicStylePanel from './components/DynamicStylePanel';
import UploadPanel from './components/UploadPanel';
import ProcessView from './components/ProcessView';
import ComparisonView from './components/ComparisonView';

const App = () => {
  // Theme State
  const [isDark, setIsDark] = useState(false);

  // App State
  const [sourceImage, setSourceImage] = useState(null);
  const [referenceStyle, setReferenceStyle] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null); // AI Extracted Details

  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState(null);

  // Theme Toggle Logic
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

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
          analysisConfig: analysisResults // Send user-edited config
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
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--bg-color)] text-[var(--fg-color)] transition-colors duration-300">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <main className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[var(--fg-color)]/5">
        {/* Left Panel: Reference Style & AI Analysis */}
        <section className="flex-[0.8] overflow-y-auto overflow-x-hidden p-6 md:p-12 relative">
          <DynamicStylePanel
            style={referenceStyle}
            onStyleChange={(s) => {
              setReferenceStyle(s);
              setError(null);
            }}
            analysisResults={analysisResults}
            onUpdateAnalysis={setAnalysisResults}
          />
        </section>

        {/* Right Panel: Upload / Process / Result */}
        <section className="flex-[1.2] overflow-y-auto overflow-x-hidden p-6 md:p-12 bg-black/[0.01] dark:bg-white/[0.01]">
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
                className="h-full flex flex-col justify-center gap-8 max-w-2xl mx-auto w-full"
              >
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tech-mono text-[var(--accent-pink)] tracking-tighter">Girişi Onayla</h2>
                  <div className="aspect-[16/9] glass-card overflow-hidden shadow-lg border-[var(--accent-pink)]/30 border-2 neon-border">
                    <img src={sourceImage} alt="Giriş" className="w-full h-full object-cover" />
                  </div>
                </div>

                <button
                  onClick={handleTransform}
                  className="group relative w-full px-8 py-5 bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-deep-pink)] text-white overflow-hidden rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[var(--neon-shadow)] border border-white/20"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-2 text-sm">
                    Dönüştürmeyi Başlat <Zap size={18} className="animate-pulse" />
                  </span>
                </button>

                <button onClick={handleReset} className="text-center text-[var(--fg-color)]/40 hover:text-[var(--accent-pink)] transition-colors tech-mono text-[10px]">
                  Farklı bir harita görseli seçmek istiyorum
                </button>
              </motion.div>
            )}

            {isProcessing && (
              <ProcessView key="processing" analysisConfig={analysisResults} />
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
              className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl text-red-600 dark:text-red-400 text-[11px] flex items-center gap-2 tech-mono max-w-2xl mx-auto"
            >
              <Info size={14} className="shrink-0" /> {error}
            </motion.div>
          )}
        </section>
      </main>

      {/* System Footer Bar */}
      <div className="absolute bottom-4 left-4 z-50 pointer-events-none opacity-20 hidden md:block select-none mix-blend-difference">
        <div className="tech-mono text-[9px] space-y-1 text-white">
          <div>Sistem: PGZO_MİMARLIK_AI</div>
          <div>Mod: {isDark ? 'GECE_GÖRÜŞÜ' : 'GÜNDÜZ_GÖRÜŞÜ'}</div>
          <div>Bağlantı: GÜVENLİ</div>
        </div>
      </div>
    </div>
  );
};

export default App;
