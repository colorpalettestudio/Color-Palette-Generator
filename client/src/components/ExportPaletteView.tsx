import { Palette } from 'lucide-react';

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
      <div className="text-center pt-8 border-t border-border">
        <p className="text-muted-foreground">
          Created by the Color Palette Studio
        </p>
      </div>
    </div>
  );
}
