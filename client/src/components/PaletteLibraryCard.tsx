interface PaletteLibraryCardProps {
  name: string;
  colors: string[];
  onClick: () => void;
}

export default function PaletteLibraryCard({ name, colors, onClick }: PaletteLibraryCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-card border border-card-border rounded-xl overflow-hidden cursor-pointer hover-elevate active-elevate-2 transition-all"
      data-testid={`palette-card-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex h-24">
        {colors.map((color, index) => (
          <div
            key={index}
            className="flex-1"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="p-4 text-center">
        <p className="font-medium">{name}</p>
      </div>
    </div>
  );
}
