import { useState, useRef, useEffect } from 'react';
import tinycolor from 'tinycolor2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Hero from '@/components/Hero';
import ColorCard from '@/components/ColorCard';
import AppToolbar from '@/components/AppToolbar';
import AdPlaceholder from '@/components/AdPlaceholder';
import PaletteLibrary from '@/components/PaletteLibrary';
import EducationSection from '@/components/EducationSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PRESET_PALETTES } from '@/lib/palettes';

const MIN_COLORS = 3;
const MAX_COLORS = 10;

interface ColorState {
  color: string;
  isLocked: boolean;
}

const generateRandomColor = (): string => {
  return tinycolor.random().toHexString();
};

const generateInitialPalette = (count: number): ColorState[] => {
  return Array.from({ length: count }, () => ({
    color: generateRandomColor(),
    isLocked: false,
  }));
};

export default function Home() {
  const [palette, setPalette] = useState<ColorState[]>(generateInitialPalette(5));
  const [history, setHistory] = useState<ColorState[][]>([generateInitialPalette(5)]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [imageColorPool, setImageColorPool] = useState<string[]>([]);
  const paletteRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const updatePalette = (newPalette: ColorState[]) => {
    setPalette(newPalette);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newPalette);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setPalette(history[newIndex]);
      toast({
        title: "Undone",
        description: "Reverted to previous palette state.",
      });
    }
  };

  const handleShuffle = () => {
    const newPalette = palette.map((item) => {
      if (item.isLocked) return item;
      
      // If we have image colors, pick randomly from them
      if (imageColorPool.length > 0) {
        const randomImageColor = imageColorPool[Math.floor(Math.random() * imageColorPool.length)];
        return { ...item, color: randomImageColor };
      }
      
      // Otherwise, generate random color
      return { ...item, color: generateRandomColor() };
    });
    updatePalette(newPalette);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        handleShuffle();
      }
      
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [historyIndex, history, palette]);

  useEffect(() => {
    const selectedPalette = localStorage.getItem('selectedPalette');
    if (selectedPalette) {
      try {
        const colors = JSON.parse(selectedPalette);
        const newPalette = colors.map((color: string) => ({ color, isLocked: false }));
        updatePalette(newPalette);
        localStorage.removeItem('selectedPalette');
        toast({
          title: "Palette Loaded!",
          description: "Selected palette loaded into generator.",
        });
      } catch (err) {
        console.error('Failed to load selected palette:', err);
      }
    }
  }, []);

  const handleAddColor = () => {
    if (palette.length < MAX_COLORS) {
      const newPalette = [...palette, { color: generateRandomColor(), isLocked: false }];
      updatePalette(newPalette);
    }
  };


  const handleToggleLock = (index: number) => {
    const newPalette = palette.map((item, i) =>
      i === index ? { ...item, isLocked: !item.isLocked } : item
    );
    updatePalette(newPalette);
  };

  const handleRemoveColor = (index: number) => {
    if (palette.length > MIN_COLORS) {
      const newPalette = palette.filter((_, i) => i !== index);
      updatePalette(newPalette);
    }
  };

  const handleColorChange = (index: number, newColor: string) => {
    const newPalette = palette.map((item, i) => 
      (i === index ? { ...item, color: newColor } : item)
    );
    updatePalette(newPalette);
  };

  const handleCopyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      toast({
        title: "Copied!",
        description: `${color.toUpperCase()} copied to clipboard.`,
      });
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newPalette = [...palette];
    const draggedItem = newPalette[draggedIndex];
    newPalette.splice(draggedIndex, 1);
    newPalette.splice(index, 0, draggedItem);

    setPalette(newPalette);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleExportPNG = async () => {
    if (!paletteRef.current) return;

    try {
      const canvas = await html2canvas(paletteRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });

      // Add watermark with background for visibility
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const text = 'Generated with Color Palette Studio';
        ctx.font = '12px Arial';
        const textWidth = ctx.measureText(text).width;
        const padding = 6;
        const x = canvas.width - textWidth - padding * 2;
        const y = canvas.height - 20;
        
        // Semi-transparent background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(x - padding, y - 2, textWidth + padding * 2, 16);
        
        // Text
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.textAlign = 'left';
        ctx.fillText(text, x, y + 10);
      }

      const link = document.createElement('a');
      link.download = 'color-palette.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: "Success!",
        description: "Palette exported as PNG.",
      });
    } catch (err) {
      console.error('Export PNG failed:', err);
      toast({
        title: "Error",
        description: "Failed to export PNG.",
        variant: "destructive",
      });
    }
  };

  const handleExportPDF = async () => {
    if (!paletteRef.current) return;

    try {
      const canvas = await html2canvas(paletteRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });

      // Add watermark with background for visibility
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const text = 'Generated with Color Palette Studio';
        ctx.font = '12px Arial';
        const textWidth = ctx.measureText(text).width;
        const padding = 6;
        const x = canvas.width - textWidth - padding * 2;
        const y = canvas.height - 20;
        
        // Semi-transparent background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(x - padding, y - 2, textWidth + padding * 2, 16);
        
        // Text
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.textAlign = 'left';
        ctx.fillText(text, x, y + 10);
      }

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('color-palette.pdf');

      toast({
        title: "Success!",
        description: "Palette exported as PDF.",
      });
    } catch (err) {
      console.error('Export PDF failed:', err);
      toast({
        title: "Error",
        description: "Failed to export PDF.",
        variant: "destructive",
      });
    }
  };

  const handleExportSVG = () => {
    try {
      const colors = palette.map((p) => p.color);
      const swatchWidth = 100;
      const swatchHeight = 100;
      const width = colors.length * swatchWidth;
      const height = swatchHeight;

      let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;

      colors.forEach((color, index) => {
        svg += `
  <rect x="${index * swatchWidth}" y="0" width="${swatchWidth}" height="${swatchHeight}" fill="${color}"/>
  <text x="${index * swatchWidth + swatchWidth / 2}" y="${swatchHeight / 2 + 5}" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="${getContrastColor(color)}">${color.toUpperCase()}</text>`;
      });

      svg += '\n</svg>';

      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'color-palette.svg';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Success!",
        description: "Palette exported as SVG.",
      });
    } catch (err) {
      console.error('Export SVG failed:', err);
      toast({
        title: "Error",
        description: "Failed to export SVG.",
        variant: "destructive",
      });
    }
  };

  const handleExportAdobeSwatches = () => {
    try {
      const colors = palette.map((p) => p.color);
      
      // Create a simple ACO format (Adobe Color Swatch)
      // This is a simplified version - creates a text file that can be used
      const acoContent = colors.map((color, index) => {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return `Color ${index + 1}: RGB(${r}, ${g}, ${b}) ${color.toUpperCase()}`;
      }).join('\n');

      const blob = new Blob([acoContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'color-palette.aco.txt';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Success!",
        description: "Adobe swatches exported.",
      });
    } catch (err) {
      console.error('Export Adobe Swatches failed:', err);
      toast({
        title: "Error",
        description: "Failed to export Adobe swatches.",
        variant: "destructive",
      });
    }
  };

  const handleExportStudioCode = () => {
    try {
      const colors = palette.map((p) => p.color);
      const colorNames = colors.map((hex) => ({
        hex: hex,
        name: ""
      }));

      const params = new URLSearchParams({
        dataStyleName: '"style16"',
        numColorNamePairs: colors.length.toString(),
        colorNames: JSON.stringify(colorNames),
        colorCombinationCheckboxes: JSON.stringify(new Array(16).fill(false)),
        selectedCombinations: JSON.stringify([])
      });

      const studioCodeUrl = `studiocode?${params.toString()}`;

      navigator.clipboard.writeText(studioCodeUrl);

      toast({
        title: "Copied!",
        description: "Studio Code URL copied to clipboard.",
      });
    } catch (err) {
      console.error('Export Studio Code failed:', err);
      toast({
        title: "Error",
        description: "Failed to export Studio Code URL.",
        variant: "destructive",
      });
    }
  };

  const getContrastColor = (hexColor: string): string => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  const handleViewLibrary = () => {
    const librarySection = document.getElementById('palette-library');
    if (librarySection) {
      librarySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPalette = (colors: string[]) => {
    const newPalette = colors.map((color) => ({ color, isLocked: false }));
    updatePalette(newPalette);
    
    // Clear image color pool when loading a preset palette
    setImageColorPool([]);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleColorsExtracted = (colors: string[], colorPool?: string[]) => {
    const newPalette = colors.map((color) => ({ color, isLocked: false }));
    updatePalette(newPalette);
    
    // Store the color pool for shuffling
    if (colorPool && colorPool.length > 0) {
      setImageColorPool(colorPool);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast({
      title: "Colors Extracted!",
      description: "Dominant colors from your image loaded. Shuffle to explore more colors from this image.",
    });
  };


  return (
    <>
      <AppToolbar
        onAddColor={handleAddColor}
        onViewLibrary={handleViewLibrary}
        onExportPNG={handleExportPNG}
        onExportPDF={handleExportPDF}
        onExportSVG={handleExportSVG}
        onExportAdobeSwatches={handleExportAdobeSwatches}
        onExportStudioCode={handleExportStudioCode}
        onColorsExtracted={handleColorsExtracted}
        onShuffle={handleShuffle}
        canAddMore={palette.length < MAX_COLORS}
      />
      
      <div className="min-h-screen bg-background mr-24">
        <AdPlaceholder />
        
        <Hero />

      <section className="pt-4 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div 
            ref={paletteRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8"
            data-testid="palette-grid"
          >
            {palette.map((item, index) => (
              <ColorCard
                key={index}
                color={item.color}
                isLocked={item.isLocked}
                onToggleLock={() => handleToggleLock(index)}
                onRemove={() => handleRemoveColor(index)}
                canRemove={palette.length > MIN_COLORS}
                onCopy={handleCopyColor}
                onColorChange={(newColor) => handleColorChange(index, newColor)}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                isDragging={draggedIndex === index}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <Button 
              size="lg"
              className="text-lg px-8 py-6 h-auto"
              onClick={handleShuffle}
              data-testid="button-shuffle"
            >
              <Shuffle className="w-5 h-5 mr-2" />
              Shuffle Palette
            </Button>
          </div>
        </div>
      </section>

      <AdPlaceholder />

      <div id="palette-library">
        <PaletteLibrary
          palettes={PRESET_PALETTES.slice(0, 12)}
          onSelectPalette={handleSelectPalette}
          showViewMore={true}
        />
      </div>

      <EducationSection />

      <FAQ />

      <AdPlaceholder />

      <Footer />
      </div>
    </>
  );
}
