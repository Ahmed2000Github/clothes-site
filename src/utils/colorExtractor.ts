import { useCallback } from "react";


interface RGB {
  r: number
  g: number
  b: number
}

export function useColorExtractor() {
  const extractDominantColor = useCallback(
    (imageUrl: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject(new Error("Could not get canvas context"));
            return;
          }

          // Set canvas size to image size
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw image on canvas
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Get image data
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // Sample pixels (every 10th pixel for performance)
          const colorMap = new Map<string, number>();
          const sampleRate = 10;

          for (let i = 0; i < data.length; i += 4 * sampleRate) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Skip transparent pixels and very dark/light pixels
            if (data[i + 3] < 128) continue;
            if (r + g + b < 30 || r + g + b > 750) continue; // Skip near black/white

            // Group similar colors by quantizing
            const quantizedR = Math.floor(r / 10) * 10;
            const quantizedG = Math.floor(g / 10) * 10;
            const quantizedB = Math.floor(b / 10) * 10;
            const colorKey = `${quantizedR},${quantizedG},${quantizedB}`;

            colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
          }

          // Find the most frequent color
          let maxCount = 0;
          let dominantColor = "220,189,48"; // Default fallback color

          colorMap.forEach((count, colorKey) => {
            if (count > maxCount) {
              maxCount = count;
              dominantColor = colorKey;
            }
          });

          // Convert to hex with transparency
          const [r, g, b] = dominantColor.split(",").map(Number);
          const hexColor = rgbToHex(r, g, b) + "88"; // Add transparency
          resolve(hexColor);
        };

        img.onerror = () => {
          reject(new Error("Failed to load image"));
        };

        img.src = imageUrl;
      });
    },
    []
  );

  return { extractDominantColor };
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}
