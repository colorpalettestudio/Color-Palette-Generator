import { Button } from '@/components/ui/button';

interface HeroProps {
  sourceImage?: string | null;
  onClearSourceImage?: () => void;
}

export default function Hero({ sourceImage, onClearSourceImage }: HeroProps) {
  return (
    <section className="pt-12 pb-8 text-center">
      <div className="max-w-5xl mx-auto px-4 relative">
        <div className="inline-block px-4 py-1.5 rounded-full bg-muted text-sm font-medium mb-6">
          Free, Instant & No Sign-Up Needed
        </div>
        
        {sourceImage && onClearSourceImage && (
          <div className="absolute top-0 right-4 max-w-[140px]">
            <div className="bg-card border border-card-border rounded-lg p-2 shadow-lg">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-medium text-muted-foreground">
                  From your image
                </p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onClearSourceImage}
                  className="h-5 w-5 p-0 text-xs"
                  data-testid="button-clear-source-image"
                >
                  ×
                </Button>
              </div>
              <img
                src={sourceImage}
                alt="Source for palette generation"
                className="w-full h-auto rounded-md max-h-24 object-cover"
                data-testid="img-source"
              />
            </div>
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
          Free Color Palette <span className="rainbow-text rainbow-text-animated">Generator</span> - Create, Lock & Export Custom Color Schemes
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Generate random color palettes instantly. Lock your favorite colors, shuffle new combinations, and export professional color schemes for design projects.
        </p>
      </div>
    </section>
  );
}
