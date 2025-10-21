import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PaletteLibraryCard from '@/components/PaletteLibraryCard';
import Footer from '@/components/Footer';
import { PRESET_PALETTES } from '@/lib/palettes';
import { useToast } from '@/hooks/use-toast';

export default function Palettes() {
  const { toast } = useToast();

  const handleSelectPalette = (colors: string[]) => {
    localStorage.setItem('selectedPalette', JSON.stringify(colors));
    window.location.href = '/';
    toast({
      title: "Palette Selected!",
      description: "Redirecting to generator...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Generator
            </Button>
          </Link>
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">
              All <span className="rainbow-text rainbow-text-animated">Color</span> Palettes
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our complete collection of {PRESET_PALETTES.length} curated color palettes. Click any palette to load it into the generator.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {PRESET_PALETTES.map((palette) => (
              <PaletteLibraryCard
                key={palette.name}
                name={palette.name}
                colors={palette.colors}
                onClick={() => handleSelectPalette(palette.colors)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
