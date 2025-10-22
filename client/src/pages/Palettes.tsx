import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PaletteLibraryCard from '@/components/PaletteLibraryCard';
import Footer from '@/components/Footer';
import { PRESET_PALETTES } from '@/lib/palettes';
import { useToast } from '@/hooks/use-toast';
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

interface PaletteLike {
  id: string;
  paletteName: string;
  likeCount: number;
}

type SortOption = 'popular' | 'alphabetical' | 'newest';

export default function Palettes() {
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const { data: paletteLikes = [] } = useQuery<PaletteLike[]>({
    queryKey: ['/api/palette-likes'],
  });

  const likesMap = useMemo(() => {
    return paletteLikes.reduce((acc, like) => {
      acc[like.paletteName] = like.likeCount;
      return acc;
    }, {} as Record<string, number>);
  }, [paletteLikes]);

  const sortedPalettes = useMemo(() => {
    const sorted = [...PRESET_PALETTES];
    
    switch (sortBy) {
      case 'popular':
        return sorted.sort((a, b) => {
          const likesA = likesMap[a.name] || 0;
          const likesB = likesMap[b.name] || 0;
          return likesB - likesA;
        });
      case 'alphabetical':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return sorted.reverse();
      default:
        return sorted;
    }
  }, [sortBy, likesMap]);

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

          <div className="flex justify-end mb-6">
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-48" data-testid="select-sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Loved</SelectItem>
                <SelectItem value="alphabetical">A-Z</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedPalettes.map((palette) => (
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
