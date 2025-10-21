import { Heart } from 'lucide-react';

interface PaletteLibraryCardProps {
  name: string;
  colors: string[];
  onClick: () => void;
  likeCount?: number;
  isLiked?: boolean;
  onLike?: (e: React.MouseEvent) => void;
}

export default function PaletteLibraryCard({ name, colors, onClick, likeCount = 0, isLiked = false, onLike }: PaletteLibraryCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-card border border-card-border rounded-xl overflow-hidden cursor-pointer hover-elevate active-elevate-2 transition-all group"
      data-testid={`palette-card-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="relative flex h-24">
        {colors.map((color, index) => (
          <div
            key={index}
            className="relative flex-1 transition-all"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="font-medium flex-1 text-left">{name}</p>
          {onLike && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike(e);
              }}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid={`button-like-${name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Heart 
                className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
              />
              <span>{likeCount}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
