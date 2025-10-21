import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';

interface HeroProps {
  onShuffle: () => void;
}

export default function Hero({ onShuffle }: HeroProps) {
  return (
    <section className="pt-16 pb-8 text-center">
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
        
        <Button 
          size="lg"
          className="text-lg px-8 py-6 h-auto"
          onClick={onShuffle}
          data-testid="button-shuffle"
        >
          <Shuffle className="w-5 h-5 mr-2" />
          Shuffle Palette
        </Button>
      </div>
    </section>
  );
}
