import { useState, useRef, useEffect } from 'react';
import tinycolor from 'tinycolor2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Hero from '@/components/Hero';
import ColorCard from '@/components/ColorCard';
import PaletteToolbar from '@/components/PaletteToolbar';
import AdPlaceholder from '@/components/AdPlaceholder';
import PaletteLibrary from '@/components/PaletteLibrary';
import EducationSection from '@/components/EducationSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ImageColorExtractor from '@/components/ImageColorExtractor';
import BaseColorGenerator from '@/components/BaseColorGenerator';
import { useToast } from '@/hooks/use-toast';
import { PRESET_PALETTES } from '@/lib/palettes';

const MIN_COLORS = 3;
const MAX_COLORS = 8;

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
    const newPalette = palette.map((item) =>
      item.isLocked ? item : { ...item, color: generateRandomColor() }
    );
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

  const handleClear = () => {
    const newPalette = generateInitialPalette(5);
    updatePalette(newPalette);
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

  const handleSavePalette = () => {
    try {
      const savedPalettes = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
      const newPalette = {
        id: Date.now(),
        colors: palette.map((p) => p.color),
        timestamp: new Date().toISOString(),
      };
      savedPalettes.push(newPalette);
      localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));

      toast({
        title: "Saved!",
        description: "Palette saved to browser storage.",
      });
    } catch (err) {
      console.error('Save failed:', err);
      toast({
        title: "Error",
        description: "Failed to save palette.",
        variant: "destructive",
      });
    }
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast({
      title: "Palette Loaded!",
      description: "Selected palette loaded into generator.",
    });
  };

  const handleColorsExtracted = (colors: string[]) => {
    const newPalette = colors.map((color) => ({ color, isLocked: false }));
    updatePalette(newPalette);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast({
      title: "Colors Extracted!",
      description: "Dominant colors from your image loaded into generator.",
    });
  };

  const handlePaletteGenerated = (colors: string[]) => {
    const newPalette = colors.map((color) => ({ color, isLocked: false }));
    updatePalette(newPalette);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast({
      title: "Palette Generated!",
      description: "Harmonious color palette created from your base color.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AdPlaceholder />
      
      <Hero
        onShuffle={handleShuffle}
        onAddColor={handleAddColor}
        onClear={handleClear}
        canAddMore={palette.length < MAX_COLORS}
      />

      <section className="py-12">
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

          <PaletteToolbar
            onExportPNG={handleExportPNG}
            onExportPDF={handleExportPDF}
            onSave={handleSavePalette}
            onViewLibrary={handleViewLibrary}
          />
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Advanced Generation</h2>
            <p className="text-muted-foreground">
              Extract colors from images or generate harmonious palettes from a base color
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <ImageColorExtractor onColorsExtracted={handleColorsExtracted} />
            <BaseColorGenerator onPaletteGenerated={handlePaletteGenerated} />
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
  );
}
