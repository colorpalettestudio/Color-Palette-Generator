import PaletteLibraryCard from './PaletteLibraryCard';

interface Palette {
  name: string;
  colors: string[];
}

interface PaletteLibraryProps {
  palettes: Palette[];
  onSelectPalette: (colors: string[]) => void;
}

export default function PaletteLibrary({ palettes, onSelectPalette }: PaletteLibraryProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Browse Popular Palettes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Need inspiration? Explore curated color sets designed by The Color Palette Studio.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {palettes.map((palette) => (
            <PaletteLibraryCard
              key={palette.name}
              name={palette.name}
              colors={palette.colors}
              onClick={() => onSelectPalette(palette.colors)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
