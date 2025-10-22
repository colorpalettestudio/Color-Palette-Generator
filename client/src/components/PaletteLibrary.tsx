import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PaletteLibraryCard from './PaletteLibraryCard';
import { useQuery } from '@tanstack/react-query';

interface Palette {
  name: string;
  colors: string[];
}

interface PaletteLibraryProps {
  palettes: Palette[];
  onSelectPalette: (colors: string[]) => void;
  showViewMore?: boolean;
  limit?: number;
}

interface PaletteLike {
  id: string;
  paletteName: string;
  likeCount: number;
}

type SortOption = 'popular' | 'alphabetical' | 'newest';

export default function PaletteLibrary({ palettes, onSelectPalette, showViewMore = false, limit }: PaletteLibraryProps) {
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
    const sorted = [...palettes];
    
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
  }, [palettes, sortBy, likesMap]);

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Browse Popular Palettes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Need inspiration? Explore curated color sets designed by The Color Palette Studio.
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {(limit ? sortedPalettes.slice(0, limit) : sortedPalettes).map((palette) => (
            <PaletteLibraryCard
              key={palette.name}
              name={palette.name}
              colors={palette.colors}
              onClick={() => onSelectPalette(palette.colors)}
            />
          ))}
        </div>

        {showViewMore && (
          <div className="text-center">
            <Link href="/palettes">
              <Button size="lg" variant="outline" data-testid="button-view-more">
                View All Palettes
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
