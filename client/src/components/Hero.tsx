import { Button } from '@/components/ui/button';
import { Shuffle, Plus, Library } from 'lucide-react';

interface HeroProps {
  onShuffle: () => void;
  onAddColor: () => void;
  onClear: () => void;
  onViewLibrary: () => void;
  canAddMore: boolean;
}

export default function Hero({ onShuffle, onAddColor, onClear, onViewLibrary, canAddMore }: HeroProps) {
  return (
    <section className="py-16 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-muted text-sm font-medium mb-6">
          Free, Fast & No Sign-Up
        </div>
        
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-4 leading-tight">
          <span className="rainbow-text rainbow-text-animated">Color</span> Palette Generator
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Shuffle random palettes, lock your favorites, and explore ready-made palettes.
        </p>
        
        <div className="flex flex-col items-center gap-4">
          {/* Primary CTA */}
          <Button 
            size="lg"
            className="text-lg px-8 py-6 h-auto"
            onClick={onShuffle}
            data-testid="button-shuffle"
          >
            <Shuffle className="w-5 h-5 mr-2" />
            Shuffle Palette
          </Button>
          
          {/* Secondary Actions */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onAddColor}
              disabled={!canAddMore}
              data-testid="button-add-color"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Color
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onViewLibrary}
              data-testid="button-view-library-hero"
            >
              <Library className="w-4 h-4 mr-2" />
              View Library
            </Button>
          </div>
          
          <button 
            onClick={onClear}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
            data-testid="button-clear"
          >
            Clear All
          </button>
        </div>
      </div>
    </section>
  );
}
