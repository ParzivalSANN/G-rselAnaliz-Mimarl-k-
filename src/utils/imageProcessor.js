export const generateWireframe = async (imageSrc, isDark, config) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";

        img.onload = () => {
            try {
                const MAX_SIZE = 1200;
                let width = img.width;
                let height = img.height;

                if (width > MAX_SIZE || height > MAX_SIZE) {
                    const ratio = Math.min(MAX_SIZE / width, MAX_SIZE / height);
                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d", { willReadFrequently: true });

                ctx.drawImage(img, 0, 0, width, height);

                const imageData = ctx.getImageData(0, 0, width, height);
                const data = imageData.data;

                const outputData = ctx.createImageData(width, height);
                const out = outputData.data;

                const gray = new Float32Array(width * height);
                for (let i = 0; i < width * height; i++) {
                    gray[i] = data[i * 4] * 0.299 + data[i * 4 + 1] * 0.587 + data[i * 4 + 2] * 0.114;
                }

                let hex = config?.primaryColor || (isDark ? "#FF4D91" : "#FF4D91");
                hex = hex.replace("#", "");
                if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
                const rC = parseInt(hex.substring(0, 2), 16) || 255;
                const gC = parseInt(hex.substring(2, 4), 16) || 77;
                const bC = parseInt(hex.substring(4, 6), 16) || 145;

                // Background Colors
                const bgR = isDark ? 10 : 252;
                const bgG = isDark ? 10 : 252;
                const bgB = isDark ? 10 : 252;

                let threshold = 30;
                if (config?.complexity?.includes("Düşük")) threshold = 50;
                if (config?.complexity?.includes("Yüksek")) threshold = 15;

                if (config?.lineWeight?.includes("İnce")) threshold += 10;
                if (config?.lineWeight?.includes("Kalın")) threshold -= 10;

                threshold = Math.max(5, Math.min(threshold, 80));

                const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
                const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

                for (let y = 1; y < height - 1; y++) {
                    for (let x = 1; x < width - 1; x++) {
                        let pixelX = 0;
                        let pixelY = 0;

                        for (let ky = -1; ky <= 1; ky++) {
                            for (let kx = -1; kx <= 1; kx++) {
                                const val = gray[(y + ky) * width + (x + kx)];
                                const weightX = sobelX[(ky + 1) * 3 + (kx + 1)];
                                const weightY = sobelY[(ky + 1) * 3 + (kx + 1)];
                                pixelX += val * weightX;
                                pixelY += val * weightY;
                            }
                        }

                        const magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
                        const idx = (y * width + x) * 4;

                        if (magnitude > threshold) {
                            const edgeStrength = Math.min((magnitude - threshold) / 50, 1);
                            out[idx] = bgR + (rC - bgR) * edgeStrength;
                            out[idx + 1] = bgG + (gC - bgG) * edgeStrength;
                            out[idx + 2] = bgB + (bC - bgB) * edgeStrength;
                            out[idx + 3] = 255;
                        } else {
                            const luma = gray[y * width + x] / 255;
                            const blend = isDark ? (luma * 15) : (255 - ((1 - luma) * 15));

                            out[idx] = isDark ? bgR + blend : blend;
                            out[idx + 1] = isDark ? bgG + blend : blend;
                            out[idx + 2] = isDark ? bgB + blend : blend;
                            out[idx + 3] = 255;
                        }
                    }
                }

                for (let x = 0; x < width; x++) {
                    for (let y of [0, height - 1]) {
                        const i = (y * width + x) * 4;
                        out[i] = bgR; out[i + 1] = bgG; out[i + 2] = bgB; out[i + 3] = 255;
                    }
                }
                for (let y = 0; y < height; y++) {
                    for (let x of [0, width - 1]) {
                        const i = (y * width + x) * 4;
                        out[i] = bgR; out[i + 1] = bgG; out[i + 2] = bgB; out[i + 3] = 255;
                    }
                }

                ctx.putImageData(outputData, 0, 0);

                if (config?.glowIntensity && config.glowIntensity !== "Yok") {
                    ctx.globalCompositeOperation = isDark ? "screen" : "multiply";
                    ctx.filter = config.glowIntensity === "Yoğun Neon" ? (isDark ? "blur(4px) brightness(1.2)" : "blur(3px)") : "blur(1px)";
                    ctx.drawImage(canvas, 0, 0);
                    ctx.filter = "none";
                    ctx.globalCompositeOperation = "source-over";
                }

                resolve(canvas.toDataURL("image/jpeg", 0.92));
            } catch (err) {
                reject(new Error("Görüntü işlenirken bir hata oluştu: " + err.message));
            }
        };

        img.onerror = () => reject(new Error("Görsel yüklenemedi. Lütfen geçerli bir resim seçin."));
        img.src = imageSrc;
    });
};
