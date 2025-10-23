import { Palette } from 'lucide-react';
import logoColorful from '@assets/logo-colorful_1761235081073.png';

interface ExportPaletteViewProps {
  colors: string[];
}

export default function ExportPaletteView({ colors }: ExportPaletteViewProps) {
  const today = new Date().toLocaleDateString('en-US', { 
    month: '2-digit', 
    day: '2-digit', 
    year: 'numeric' 
  });

  return (
    <div 
      className="bg-white p-12" 
      style={{ width: '1200px', minHeight: '800px' }}
      data-testid="export-palette-view"
    >
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Palette className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Color Palette</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          {colors.length} colors • Generated {today}
        </p>
      </div>

      {/* Color Grid */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        {colors.map((color, index) => (
          <div 
            key={index} 
            className="bg-white border border-border rounded-lg overflow-hidden shadow-sm"
            data-testid={`export-color-${index}`}
          >
            {/* Color Swatch */}
            <div 
              className="w-full h-48" 
              style={{ backgroundColor: color }}
            />
            
            {/* Color Info */}
            <div className="p-4 bg-background">
              <p className="text-xl font-bold text-foreground font-mono">
                {color.toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center pt-8 border-t border-border gap-3">
        <img 
          src={logoColorful} 
          alt="Color Palette Studio" 
          className="h-12"
          style={{ height: '48px' }}
        />
        <p className="text-muted-foreground text-base">
          https://thecolorpalettestudio.com/
        </p>
      </div>
    </div>
  );
}
