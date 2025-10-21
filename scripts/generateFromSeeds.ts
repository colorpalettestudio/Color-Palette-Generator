import tinycolor from 'tinycolor2';

interface Palette {
  name: string;
  colors: string[];
}

// The 4 seed palettes from the color palette studio
const inspirationPalettes = [
  ['#eeba67', '#ffc9c1', '#9b9a8a', '#fafafa', '#c26315'], // Warm neutral
  ['#ffa3d4', '#ca217c', '#b65fd8', '#f44327', '#eca1ff'], // Vibrant pinks/purples
  ['#ac5543', '#d8b8a4', '#568389', '#596e5c', '#162652'], // Earthy muted
  ['#24269b', '#09a953', '#0478f2', '#8fd1e4', '#ff85d3'], // Cool bright
];

// Expanded name components for better variety
const adjectives = [
  'Warm', 'Cool', 'Soft', 'Bold', 'Muted', 'Bright', 'Deep', 'Light',
  'Rich', 'Pale', 'Dark', 'Gentle', 'Vivid', 'Subtle', 'Fresh', 'Dusty',
  'Golden', 'Silver', 'Rosy', 'Peachy', 'Minty', 'Smoky', 'Creamy', 'Earthy',
  'Ocean', 'Forest', 'Desert', 'Arctic', 'Tropical', 'Coastal', 'Mountain', 'Meadow',
];

const nouns = [
  'Sunset', 'Dawn', 'Dusk', 'Breeze', 'Mist', 'Sky', 'Sand', 'Stone',
  'Rose', 'Lily', 'Sage', 'Mint', 'Clay', 'Coral', 'Pearl', 'Jade',
  'Bloom', 'Petals', 'Garden', 'Grove', 'Waves', 'Tide', 'Shore', 'Bay',
  'Peak', 'Valley', 'Meadow', 'Field', 'Path', 'Trail', 'Stream', 'Lake',
  'Aurora', 'Twilight', 'Ember', 'Frost', 'Nectar', 'Honey', 'Berry', 'Petal',
];

function generateName(colors: string[]): string {
  // Analyze palette characteristics
  const avgSaturation = colors.reduce((sum, hex) => {
    return sum + tinycolor(hex).toHsl().s;
  }, 0) / colors.length;
  
  const avgLightness = colors.reduce((sum, hex) => {
    return sum + tinycolor(hex).toHsl().l;
  }, 0) / colors.length;
  
  const hasWarm = colors.some(hex => {
    const hue = tinycolor(hex).toHsl().h;
    return (hue >= 0 && hue <= 60) || (hue >= 300 && hue <= 360);
  });
  
  const hasCool = colors.some(hex => {
    const hue = tinycolor(hex).toHsl().h;
    return hue >= 180 && hue <= 300;
  });
  
  // Pick appropriate descriptors
  let validAdjectives = [...adjectives];
  
  if (avgSaturation > 0.6) {
    validAdjectives = validAdjectives.filter(a => 
      ['Bright', 'Vivid', 'Bold', 'Rich'].includes(a) || 
      !['Muted', 'Dusty', 'Pale', 'Subtle'].includes(a)
    );
  } else if (avgSaturation < 0.3) {
    validAdjectives = validAdjectives.filter(a => 
      ['Soft', 'Muted', 'Dusty', 'Pale', 'Subtle', 'Gentle'].includes(a) ||
      !['Bright', 'Vivid', 'Bold'].includes(a)
    );
  }
  
  if (avgLightness > 0.7) {
    validAdjectives = validAdjectives.filter(a => 
      ['Light', 'Pale', 'Soft', 'Gentle'].includes(a) ||
      !['Dark', 'Deep'].includes(a)
    );
  } else if (avgLightness < 0.4) {
    validAdjectives = validAdjectives.filter(a => 
      ['Dark', 'Deep', 'Rich'].includes(a) ||
      !['Light', 'Pale'].includes(a)
    );
  }
  
  if (hasWarm && !hasCool) {
    validAdjectives = validAdjectives.filter(a => 
      ['Warm', 'Golden', 'Rosy', 'Peachy'].includes(a) ||
      !['Cool', 'Arctic'].includes(a)
    );
  } else if (hasCool && !hasWarm) {
    validAdjectives = validAdjectives.filter(a => 
      ['Cool', 'Ocean', 'Arctic', 'Minty'].includes(a) ||
      !['Warm', 'Golden'].includes(a)
    );
  }
  
  const adj = validAdjectives[Math.floor(Math.random() * validAdjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return Math.random() < 0.7 ? `${adj} ${noun}` : noun;
}

function varyColor(hex: string, variation: number): string {
  const color = tinycolor(hex);
  const hsl = color.toHsl();
  
  // Apply subtle variations
  const hueShift = (Math.random() - 0.5) * 30 * variation;
  const satShift = (Math.random() - 0.5) * 0.15 * variation;
  const lightShift = (Math.random() - 0.5) * 0.12 * variation;
  
  return tinycolor({
    h: (hsl.h + hueShift + 360) % 360,
    s: Math.max(0, Math.min(1, hsl.s + satShift)),
    l: Math.max(0.1, Math.min(0.95, hsl.l + lightShift)),
  }).toHexString().toUpperCase();
}

function createVariation(seedPalette: string[], variationStrength: number): string[] {
  return seedPalette.map(color => varyColor(color, variationStrength));
}

function generatePalettes(count: number): Palette[] {
  const palettes: Palette[] = [];
  const usedNames = new Set<string>();
  
  // Calculate variations per seed
  const palettesPerSeed = Math.ceil(count / inspirationPalettes.length);
  
  for (const seed of inspirationPalettes) {
    for (let i = 0; i < palettesPerSeed; i++) {
      if (palettes.length >= count) break;
      
      // Create variation with increasing strength
      const variationStrength = 0.3 + (i / palettesPerSeed) * 0.7;
      const colors = createVariation(seed, variationStrength);
      
      // Sometimes shuffle the color order for variety
      if (Math.random() < 0.3) {
        for (let j = colors.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * (j + 1));
          [colors[j], colors[k]] = [colors[k], colors[j]];
        }
      }
      
      // Generate appropriate name
      let name = generateName(colors);
      let attempts = 0;
      while (usedNames.has(name) && attempts < 100) {
        name = generateName(colors);
        attempts++;
      }
      
      if (!usedNames.has(name)) {
        usedNames.add(name);
        palettes.push({ name, colors });
      }
    }
  }
  
  // Shuffle for variety
  for (let i = palettes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [palettes[i], palettes[j]] = [palettes[j], palettes[i]];
  }
  
  return palettes.slice(0, count);
}

// Generate 100 palettes
const palettes = generatePalettes(100);

// Output as TypeScript code
console.log('export interface Palette {');
console.log('  name: string;');
console.log('  colors: string[];');
console.log('}');
console.log('');
console.log('export const PRESET_PALETTES: Palette[] = [');
palettes.forEach((palette) => {
  const colorsStr = palette.colors.map(c => `'${c}'`).join(', ');
  console.log(`  { name: "${palette.name}", colors: [${colorsStr}] },`);
});
console.log('];');
