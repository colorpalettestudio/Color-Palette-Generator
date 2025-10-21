import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useToast } from '@/hooks/use-toast';

interface ImageColorExtractorProps {
  onColorsExtracted: (colors: string[]) => void;
}

export default function ImageColorExtractor({ onColorsExtracted }: ImageColorExtractorProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const extractColorsFromImage = (image: HTMLImageElement, colorCount: number = 5): string[] => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return [];

    // Resize image for faster processing
    const maxSize = 200;
    const scale = Math.min(maxSize / image.width, maxSize / image.height);
    canvas.width = image.width * scale;
    canvas.height = image.height * scale;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Sample pixels (every 10th pixel to speed up)
    const colors: { r: number; g: number; b: number; count: number }[] = [];
    
    for (let i = 0; i < pixels.length; i += 40) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];

      // Skip transparent pixels
      if (a < 128) continue;

      // Skip very light or very dark pixels
      const brightness = (r + g + b) / 3;
      if (brightness > 240 || brightness < 15) continue;

      colors.push({ r, g, b, count: 1 });
    }

    // Simple color clustering - group similar colors
    const clusters: { r: number; g: number; b: number; count: number }[] = [];
    const threshold = 40;

    colors.forEach((color) => {
      let merged = false;
      for (const cluster of clusters) {
        const distance = Math.sqrt(
          Math.pow(color.r - cluster.r, 2) +
          Math.pow(color.g - cluster.g, 2) +
          Math.pow(color.b - cluster.b, 2)
        );

        if (distance < threshold) {
          // Merge into existing cluster
          cluster.r = Math.round((cluster.r * cluster.count + color.r) / (cluster.count + 1));
          cluster.g = Math.round((cluster.g * cluster.count + color.g) / (cluster.count + 1));
          cluster.b = Math.round((cluster.b * cluster.count + color.b) / (cluster.count + 1));
          cluster.count++;
          merged = true;
          break;
        }
      }

      if (!merged) {
        clusters.push({ ...color });
      }
    });

    // Sort by popularity and get top colors
    clusters.sort((a, b) => b.count - a.count);
    const topColors = clusters.slice(0, colorCount);

    // Convert to hex
    return topColors.map((c) => {
      const r = c.r.toString(16).padStart(2, '0');
      const g = c.g.toString(16).padStart(2, '0');
      const b = c.b.toString(16).padStart(2, '0');
      return `#${r}${g}${b}`;
    });
  };

  const processImage = (file: File) => {
    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const colors = extractColorsFromImage(img, 5);
        
        // Ensure we have at least 3 colors (minimum palette size)
        if (colors.length < 3) {
          setIsProcessing(false);
          toast({
            title: "Not Enough Colors",
            description: "This image doesn't have enough distinct colors. Try another image.",
            variant: "destructive",
          });
          return;
        }
        
        onColorsExtracted(colors);
        setPreviewUrl(e.target?.result as string);
        setIsProcessing(false);
      };
      img.onerror = () => {
        setIsProcessing(false);
      };
      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      setIsProcessing(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClear = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Generate from Image
        </CardTitle>
        <CardDescription>
          Upload an image to extract its dominant colors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging ? 'border-primary bg-primary/5' : 'border-border'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          data-testid="image-drop-zone"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            data-testid="input-image-file"
          />

          {previewUrl ? (
            <div className="space-y-4">
              <img
                src={previewUrl}
                alt="Uploaded preview"
                className="max-h-32 mx-auto rounded-md transition-shadow hover:shadow-lg"
                data-testid="img-preview"
              />
              <div className="flex gap-2 justify-center">
                <Button
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  data-testid="button-upload-another"
                >
                  Upload Another
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleClear}
                  disabled={isProcessing}
                  data-testid="button-clear-image"
                >
                  Clear
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <Upload className="w-12 h-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Drop an image here</p>
                <p className="text-xs text-muted-foreground">or</p>
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                data-testid="button-browse-files"
              >
                {isProcessing ? 'Processing...' : 'Browse Files'}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
