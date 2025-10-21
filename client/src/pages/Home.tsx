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
import { useToast } from '@/hooks/use-toast';

const MIN_COLORS = 3;
const MAX_COLORS = 8;

const PRESET_PALETTES = [
  { name: "Warm Neutrals", colors: ['#D4A574', '#C69C6D', '#B8936A', '#AA8A67', '#9C8164'] },
  { name: "Coastal Dawn", colors: ['#FFE5B4', '#FFDAB9', '#FFB6C1', '#DDA0DD', '#B0C4DE'] },
  { name: "Retro Candy", colors: ['#FF6B9D', '#C44569', '#FEA47F', '#F97F51', '#F8B500'] },
  { name: "Fresh Citrus", colors: ['#FFD93D', '#6BCF7F', '#4D96FF', '#A8E6CF', '#FFB6B9'] },
  { name: "Bold & Modern", colors: ['#2D3142', '#4F5D75', '#BFC0C0', '#FFFFFF', '#EF8354'] },
  { name: "Ocean Breeze", colors: ['#05668D', '#028090', '#00A896', '#02C39A', '#F0F3BD'] },
  { name: "Sunset Glow", colors: ['#F72585', '#B5179E', '#7209B7', '#560BAD', '#480CA8'] },
  { name: "Forest Deep", colors: ['#2D6A4F', '#40916C', '#52B788', '#74C69D', '#95D5B2'] },
  { name: "Desert Sand", colors: ['#E6C79C', '#D4A574', '#C08552', '#A86F3D', '#8B5A2B'] },
  { name: "Night Sky", colors: ['#0D1B2A', '#1B263B', '#415A77', '#778DA9', '#E0E1DD'] },
  { name: "Autumn Leaves", colors: ['#9B2226', '#AE2012', '#BB3E03', '#CA6702', '#EE9B00'] },
  { name: "Tropical Paradise", colors: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'] },
  { name: "Minimalist Gray", colors: ['#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA', '#ADB5BD'] },
  { name: "Pastel Dream", colors: ['#FFD6FF', '#E7C6FF', '#C8B6FF', '#B8C0FF', '#BBD0FF'] },
  { name: "Earth Tones", colors: ['#8D5524', '#C68642', '#E0AC69', '#F1C27D', '#FFDBAC'] },
  { name: "Neon Nights", colors: ['#FF006E', '#8338EC', '#3A86FF', '#06FFA5', '#FFBE0B'] },
  { name: "Monochrome", colors: ['#000000', '#404040', '#808080', '#C0C0C0', '#FFFFFF'] },
  { name: "Vintage Rose", colors: ['#FADCD9', '#F8AFA6', '#F79489', '#E8505B', '#C9184A'] },
  { name: "Arctic Ice", colors: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5'] },
  { name: "Spring Garden", colors: ['#FFCBF2', '#F3C4FB', '#ECBCFD', '#E5B3FE', '#DDA9FF'] },
];

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
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleShuffle = () => {
    setPalette((prev) =>
      prev.map((item) =>
        item.isLocked ? item : { ...item, color: generateRandomColor() }
      )
    );
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        handleShuffle();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleAddColor = () => {
    if (palette.length < MAX_COLORS) {
      setPalette((prev) => [...prev, { color: generateRandomColor(), isLocked: false }]);
    }
  };

  const handleClear = () => {
    setPalette(generateInitialPalette(5));
  };

  const handleToggleLock = (index: number) => {
    setPalette((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isLocked: !item.isLocked } : item
      )
    );
  };

  const handleRemoveColor = (index: number) => {
    if (palette.length > MIN_COLORS) {
      setPalette((prev) => prev.filter((_, i) => i !== index));
    }
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
    setPalette(colors.map((color) => ({ color, isLocked: false })));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast({
      title: "Palette Loaded!",
      description: "Selected palette loaded into generator.",
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

      <AdPlaceholder />

      <div id="palette-library">
        <PaletteLibrary
          palettes={PRESET_PALETTES}
          onSelectPalette={handleSelectPalette}
        />
      </div>

      <EducationSection />

      <FAQ />

      <AdPlaceholder />

      <Footer />
    </div>
  );
}
