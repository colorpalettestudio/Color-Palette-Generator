import { useState } from 'react';

interface PaletteLibraryCardProps {
  name: string;
  colors: string[];
  onClick: () => void;
}

export default function PaletteLibraryCard({ name, colors, onClick }: PaletteLibraryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-card border border-card-border rounded-xl overflow-hidden cursor-pointer hover-elevate active-elevate-2 transition-all group"
      data-testid={`palette-card-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="relative flex h-24">
        {colors.map((color, index) => (
          <div
            key={index}
            className="relative flex-1 transition-all"
            style={{ backgroundColor: color }}
          >
            {isHovered && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-mono font-medium px-1 py-0.5 rounded bg-white/95 text-black shadow-sm">
                  {color.toUpperCase()}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 text-center">
        <p className="font-medium">{name}</p>
      </div>
    </div>
  );
}
