import { useState } from 'react';
import tinycolor from 'tinycolor2';
import { Palette, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BaseColorGeneratorProps {
  onPaletteGenerated: (colors: string[]) => void;
}

type HarmonyMode = 'analogous' | 'complementary' | 'triadic' | 'tetradic' | 'split-complementary' | 'monochromatic';

export default function BaseColorGenerator({ onPaletteGenerated }: BaseColorGeneratorProps) {
  const [baseColor, setBaseColor] = useState('#3A86FF');
  const [hexInput, setHexInput] = useState('#3A86FF');
  const [harmonyMode, setHarmonyMode] = useState<HarmonyMode>('analogous');

  const generatePalette = () => {
    const color = tinycolor(baseColor);
    let colors: string[] = [];

    switch (harmonyMode) {
      case 'analogous':
        colors = color.analogous(5).map((c) => c.toHexString());
        break;

      case 'complementary':
        const complement = color.complement();
        colors = [
          color.toHexString(),
          color.clone().lighten(10).toHexString(),
          complement.toHexString(),
          complement.clone().lighten(10).toHexString(),
          color.clone().darken(10).toHexString(),
        ];
        break;

      case 'triadic':
        const triad = color.triad();
        colors = [
          triad[0].toHexString(),
          triad[1].toHexString(),
          triad[2].toHexString(),
          triad[0].clone().lighten(15).toHexString(),
          triad[1].clone().darken(10).toHexString(),
        ];
        break;

      case 'tetradic':
        const tetrad = color.tetrad();
        colors = tetrad.slice(0, 5).map((c) => c.toHexString());
        break;

      case 'split-complementary':
        const splitComp = color.splitcomplement();
        colors = [
          splitComp[0].toHexString(),
          splitComp[1].toHexString(),
          splitComp[2].toHexString(),
          splitComp[0].clone().lighten(15).toHexString(),
          splitComp[1].clone().darken(10).toHexString(),
        ];
        break;

      case 'monochromatic':
        const base = color.toHsl();
        colors = [
          tinycolor({ h: base.h, s: base.s, l: 0.85 }).toHexString(), // Tint
          tinycolor({ h: base.h, s: base.s, l: 0.65 }).toHexString(),
          color.toHexString(), // Base
          tinycolor({ h: base.h, s: base.s, l: 0.35 }).toHexString(),
          tinycolor({ h: base.h, s: base.s, l: 0.20 }).toHexString(), // Shade
        ];
        break;
    }

    onPaletteGenerated(colors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Generate from Base Color
        </CardTitle>
        <CardDescription>
          Pick a color and generate harmonious companions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="base-color">Base Color</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                id="base-color"
                type="color"
                value={baseColor}
                onChange={(e) => {
                  setBaseColor(e.target.value);
                  setHexInput(e.target.value.toUpperCase());
                }}
                className="w-full h-10 rounded-md cursor-pointer border border-border"
                data-testid="input-base-color"
              />
            </div>
            <input
              type="text"
              value={hexInput}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                // Allow typing any partial value
                if (value.startsWith('#') && value.length <= 7) {
                  setHexInput(value);
                }
              }}
              onBlur={(e) => {
                const value = e.target.value;
                // Validate and commit on blur
                if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                  setBaseColor(value);
                } else {
                  // Reset to last valid color
                  setHexInput(baseColor.toUpperCase());
                }
              }}
              className="w-24 h-10 px-3 rounded-md border border-border text-sm font-mono text-center"
              placeholder="#RRGGBB"
              data-testid="input-base-color-hex"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="harmony-mode">Color Harmony</Label>
          <Select
            value={harmonyMode}
            onValueChange={(value) => setHarmonyMode(value as HarmonyMode)}
          >
            <SelectTrigger id="harmony-mode" data-testid="select-harmony-mode">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="analogous">Analogous</SelectItem>
              <SelectItem value="complementary">Complementary</SelectItem>
              <SelectItem value="triadic">Triadic</SelectItem>
              <SelectItem value="tetradic">Tetradic</SelectItem>
              <SelectItem value="split-complementary">Split-Complementary</SelectItem>
              <SelectItem value="monochromatic">Monochromatic</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {harmonyMode === 'analogous' && 'Colors adjacent on the color wheel'}
            {harmonyMode === 'complementary' && 'Colors opposite on the color wheel'}
            {harmonyMode === 'triadic' && 'Three colors evenly spaced'}
            {harmonyMode === 'tetradic' && 'Four colors in two complementary pairs'}
            {harmonyMode === 'split-complementary' && 'Base color plus two adjacent to its complement'}
            {harmonyMode === 'monochromatic' && 'Variations of a single hue'}
          </p>
          <p className="text-xs text-muted-foreground italic">
            Try analogous, complementary, or triadic for different moods
          </p>
        </div>

        <Button
          onClick={generatePalette}
          className="w-full"
          data-testid="button-generate-harmony"
        >
          <Palette className="w-4 h-4 mr-2" />
          Generate Palette
        </Button>
      </CardContent>
    </Card>
  );
}
