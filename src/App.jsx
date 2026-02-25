import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ArrowRight, RefreshCcw, Layers, Zap, Info } from 'lucide-react';
import Navbar from './components/Navbar';
import DynamicStylePanel from './components/DynamicStylePanel';
import UploadPanel from './components/UploadPanel';
import ProcessView from './components/ProcessView';
import ComparisonView from './components/ComparisonView';

const App = () => {
  const [sourceImage, setSourceImage] = useState(null);
  const [referenceStyle, setReferenceStyle] = useState('/assets/style-reference.png');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState(null);

  const handleTransform = async () => {
    if (!sourceImage || !referenceStyle) return;

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
        throw new Error('Transformation failed. Please try again.');
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
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Navbar />

      <main className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10">
        {/* Left Panel: Reference Style */}
        <section className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12">
          <DynamicStylePanel
            style={referenceStyle}
            onStyleChange={setReferenceStyle}
          />
        </section>

        {/* Right Panel: Upload / Process / Result */}
        <section className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 bg-white/[0.02]">
          <AnimatePresence mode="wait">
            {!sourceImage && !isProcessing && !resultImage && (
              <UploadPanel onUpload={setSourceImage} />
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
                  <h2 className="text-3xl font-bold tech-mono text-accent-cyan tracking-tighter">Confirm Input</h2>
                  <div className="aspect-video glass-card overflow-hidden">
                    <img src={sourceImage} alt="Input" className="w-full h-full object-cover" />
                  </div>
                </div>

                <button
                  onClick={handleTransform}
                  className="group relative px-8 py-4 bg-accent-pink overflow-hidden rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    Start Transformation <Zap size={18} />
                  </span>
                </button>

                <button onClick={handleReset} className="text-white/40 hover:text-white transition-colors tech-mono">
                  Actually, choose another image
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
              className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2"
            >
              <Info size={16} /> {error}
            </motion.div>
          )}
        </section>
      </main>

      <div className="absolute bottom-4 left-4 z-50 pointer-events-none opacity-20 hidden md:block">
        <div className="tech-mono text-[10px] space-y-1">
          <div>System: ARCHITECT_AI_v1.0.4</div>
          <div>Core: MCP_GEOMETRY_ENGINE</div>
          <div>Status: READY</div>
        </div>
      </div>
    </div>
  );
};

export default App;
