import tinycolor from 'tinycolor2';

type HarmonyType = 'analogous' | 'complementary' | 'triadic' | 'split-complementary' | 'tetradic' | 'neutral' | 'bright-pop';

interface GeneratedPalette {
  name: string;
  colors: string[];
  harmony: HarmonyType;
}

// Name word lists for automatic naming
const adjectives = [
  'Soft', 'Bold', 'Deep', 'Light', 'Warm', 'Cool', 'Muted', 'Vivid', 'Dark', 'Bright',
  'Gentle', 'Rich', 'Fresh', 'Subtle', 'Dreamy', 'Crisp', 'Hazy', 'Clear', 'Dusty', 'Pure',
  'Faded', 'Sharp', 'Smooth', 'Rough', 'Elegant', 'Wild', 'Calm', 'Electric', 'Rustic', 'Modern',
  'Vintage', 'Cosmic', 'Urban', 'Natural', 'Arctic', 'Tropical', 'Desert', 'Ocean', 'Forest', 'Mountain',
  'Autumn', 'Spring', 'Summer', 'Winter', 'Mystic', 'Golden', 'Silver', 'Bronze', 'Velvet', 'Silk'
];

const nouns = [
  'Sunset', 'Dawn', 'Twilight', 'Storm', 'Breeze', 'Mist', 'Fog', 'Rain', 'Snow', 'Frost',
  'Bloom', 'Meadow', 'Garden', 'Forest', 'Ocean', 'River', 'Lake', 'Canyon', 'Peak', 'Valley',
  'Sky', 'Cloud', 'Wave', 'Sand', 'Stone', 'Clay', 'Earth', 'Fire', 'Water', 'Air',
  'Rose', 'Orchid', 'Lily', 'Jasmine', 'Lavender', 'Sage', 'Mint', 'Coral', 'Pearl', 'Jade',
  'Dream', 'Memory', 'Echo', 'Whisper', 'Harmony', 'Rhythm', 'Melody', 'Symphony', 'Journey', 'Voyage',
  'Horizon', 'Paradise', 'Oasis', 'Haven', 'Sanctuary', 'Aurora', 'Nebula', 'Galaxy', 'Cosmos', 'Stardust'
];

const compounds = [
  'Moonlight', 'Starlight', 'Sunbeam', 'Waterfall', 'Rainfall', 'Snowfall', 'Nightfall', 'Daybreak',
  'Windswept', 'Sunburst', 'Moonbeam', 'Seafoam', 'Wildflower', 'Evergreen', 'Driftwood', 'Seashell',
  'Limestone', 'Sandstone', 'Rosewood', 'Cedarwood', 'Mahogany', 'Sapphire', 'Emerald', 'Topaz'
];

function generatePaletteName(): string {
  const rand = Math.random();
  
  if (rand < 0.3) {
    // Single word (compound)
    return compounds[Math.floor(Math.random() * compounds.length)];
  } else if (rand < 0.7) {
    // Two words (adjective + noun)
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj} ${noun}`;
  } else {
    // Three words (adjective + adjective + noun or adjective + noun + noun)
    if (Math.random() < 0.5) {
      const adj1 = adjectives[Math.floor(Math.random() * adjectives.length)];
      const adj2 = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      return adj1 !== adj2 ? `${adj1} ${adj2} ${noun}` : `${adj1} ${noun}`;
    } else {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun1 = nouns[Math.floor(Math.random() * nouns.length)];
      const noun2 = nouns[Math.floor(Math.random() * nouns.length)];
      return noun1 !== noun2 ? `${adj} ${noun1} ${noun2}` : `${adj} ${noun1}`;
    }
  }
}

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function varyColor(hue: number, baseSat: number, baseLightness: number, satMin?: number, satMax?: number): string {
  // Apply variation: ±20% saturation, ±15% lightness
  let sat = baseSat + randomInRange(-20, 20);
  
  // Apply saturation constraints if provided
  if (satMin !== undefined) sat = Math.max(satMin, sat);
  if (satMax !== undefined) sat = Math.min(satMax, sat);
  
  sat = Math.max(0, Math.min(100, sat));
  const lightness = Math.max(10, Math.min(90, baseLightness + randomInRange(-15, 15)));
  
  return tinycolor({ h: hue, s: sat, l: lightness }).toHexString().toUpperCase();
}

function generateNeutral(): string {
  const neutralTypes = [
    () => tinycolor({ h: 0, s: 0, l: randomInRange(85, 95) }).toHexString().toUpperCase(), // Light gray
    () => tinycolor({ h: 30, s: randomInRange(10, 20), l: randomInRange(80, 90) }).toHexString().toUpperCase(), // Cream/Taupe
    () => tinycolor({ h: 0, s: 0, l: randomInRange(15, 25) }).toHexString().toUpperCase(), // Dark charcoal
    () => tinycolor({ h: 40, s: randomInRange(15, 25), l: randomInRange(70, 80) }).toHexString().toUpperCase(), // Warm beige
  ];
  
  return neutralTypes[Math.floor(Math.random() * neutralTypes.length)]();
}

function generateAnalogousPalette(baseHue: number): string[] {
  const baseSat = randomInRange(40, 80);
  const baseLightness = randomInRange(45, 65);
  
  // Analogous: ±20-40° hue shift
  const colors = [
    varyColor(baseHue, baseSat, baseLightness),
    varyColor((baseHue + randomInRange(20, 40)) % 360, baseSat, baseLightness),
    varyColor((baseHue + randomInRange(20, 40)) % 360, baseSat, baseLightness),
    varyColor((baseHue - randomInRange(20, 40) + 360) % 360, baseSat, baseLightness),
    varyColor((baseHue - randomInRange(20, 40) + 360) % 360, baseSat, baseLightness),
  ];
  
  return colors;
}

function generateComplementaryPalette(baseHue: number): string[] {
  const baseSat = randomInRange(50, 85);
  const baseLightness = randomInRange(45, 65);
  const compHue = (baseHue + 180) % 360;
  
  const colors = [
    varyColor(baseHue, baseSat, baseLightness),
    varyColor(baseHue, baseSat + 10, baseLightness + 10),
    varyColor(compHue, baseSat, baseLightness),
    varyColor(compHue, baseSat + 10, baseLightness - 10),
    varyColor((baseHue + 15) % 360, baseSat - 15, baseLightness),
  ];
  
  return colors;
}

function generateTriadicPalette(baseHue: number): string[] {
  const baseSat = randomInRange(50, 80);
  const baseLightness = randomInRange(45, 65);
  
  const hue2 = (baseHue + 120) % 360;
  const hue3 = (baseHue + 240) % 360;
  
  const colors = [
    varyColor(baseHue, baseSat, baseLightness),
    varyColor(baseHue, baseSat, baseLightness + 15),
    varyColor(hue2, baseSat, baseLightness),
    varyColor(hue3, baseSat, baseLightness),
    varyColor(hue2, baseSat, baseLightness - 10),
  ];
  
  return colors;
}

function generateSplitComplementaryPalette(baseHue: number): string[] {
  const baseSat = randomInRange(50, 80);
  const baseLightness = randomInRange(45, 65);
  
  const split1 = (baseHue + 150) % 360;
  const split2 = (baseHue + 210) % 360;
  
  const colors = [
    varyColor(baseHue, baseSat, baseLightness),
    varyColor(baseHue, baseSat + 10, baseLightness + 10),
    varyColor(baseHue, baseSat - 10, baseLightness - 10),
    varyColor(split1, baseSat, baseLightness),
    varyColor(split2, baseSat, baseLightness),
  ];
  
  return colors;
}

function generateTetradicPalette(baseHue: number): string[] {
  const baseSat = randomInRange(55, 85);
  const baseLightness = randomInRange(45, 65);
  
  const hue2 = (baseHue + 90) % 360;
  const hue3 = (baseHue + 180) % 360;
  const hue4 = (baseHue + 270) % 360;
  
  const colors = [
    varyColor(baseHue, baseSat, baseLightness),
    varyColor(hue2, baseSat, baseLightness),
    varyColor(hue3, baseSat, baseLightness),
    varyColor(hue4, baseSat, baseLightness),
    varyColor((baseHue + 45) % 360, baseSat - 15, baseLightness),
  ];
  
  return colors;
}

function generateNeutralPalette(baseHue: number): string[] {
  // Earthy, muted palette - keep saturation constrained to ≤30%
  const baseSat = randomInRange(10, 20);
  const baseLightness = randomInRange(40, 70);
  
  const colors = [
    varyColor(baseHue, baseSat, baseLightness + 20, 0, 30),
    varyColor(baseHue, baseSat, baseLightness, 0, 30),
    varyColor(baseHue + randomInRange(-20, 20), baseSat + 5, baseLightness - 10, 0, 30),
    varyColor(baseHue + randomInRange(-30, 30), baseSat - 5, baseLightness - 20, 0, 30),
    generateNeutral(),
  ];
  
  return colors;
}

function generateBrightPopPalette(baseHue: number): string[] {
  // Gen Z energy - high saturation (keep ≥75%), varied hues
  const baseSat = randomInRange(80, 95);
  const baseLightness = randomInRange(50, 70);
  
  const colors = [
    varyColor(baseHue, baseSat, baseLightness, 75, 100),
    varyColor((baseHue + randomInRange(60, 100)) % 360, baseSat, baseLightness, 75, 100),
    varyColor((baseHue + randomInRange(150, 210)) % 360, baseSat, baseLightness, 75, 100),
    varyColor((baseHue + randomInRange(240, 300)) % 360, baseSat, baseLightness, 75, 100),
    varyColor((baseHue + randomInRange(30, 50)) % 360, baseSat - 10, baseLightness + 10, 75, 100),
  ];
  
  return colors;
}

function generatePaletteByHarmony(harmony: HarmonyType): GeneratedPalette {
  const baseHue = Math.floor(Math.random() * 360);
  let colors: string[];
  
  switch (harmony) {
    case 'analogous':
      colors = generateAnalogousPalette(baseHue);
      break;
    case 'complementary':
      colors = generateComplementaryPalette(baseHue);
      break;
    case 'triadic':
      colors = generateTriadicPalette(baseHue);
      break;
    case 'split-complementary':
      colors = generateSplitComplementaryPalette(baseHue);
      break;
    case 'tetradic':
      colors = generateTetradicPalette(baseHue);
      break;
    case 'neutral':
      colors = generateNeutralPalette(baseHue);
      break;
    case 'bright-pop':
      colors = generateBrightPopPalette(baseHue);
      break;
  }
  
  // For non-bright-pop and non-neutral palettes: 30% chance to replace 1 color with a neutral
  if (harmony !== 'bright-pop' && harmony !== 'neutral' && Math.random() < 0.3) {
    const replaceIndex = Math.floor(Math.random() * 5);
    colors[replaceIndex] = generateNeutral();
  }
  
  return {
    name: generatePaletteName(),
    colors,
    harmony,
  };
}

function generatePalettes(count: number): GeneratedPalette[] {
  // Distribution percentages
  const distribution: { harmony: HarmonyType; percentage: number }[] = [
    { harmony: 'analogous', percentage: 0.20 },
    { harmony: 'complementary', percentage: 0.20 },
    { harmony: 'triadic', percentage: 0.20 },
    { harmony: 'split-complementary', percentage: 0.10 },
    { harmony: 'tetradic', percentage: 0.10 },
    { harmony: 'neutral', percentage: 0.10 },
    { harmony: 'bright-pop', percentage: 0.10 },
  ];
  
  // Calculate counts for each harmony
  const counts: { harmony: HarmonyType; count: number }[] = distribution.map(d => ({
    harmony: d.harmony,
    count: Math.round(count * d.percentage),
  }));
  
  // Adjust to ensure total equals desired count
  const totalAssigned = counts.reduce((sum, c) => sum + c.count, 0);
  if (totalAssigned < count) {
    counts[0].count += count - totalAssigned;
  }
  
  // Generate palettes
  const palettes: GeneratedPalette[] = [];
  const usedNames = new Set<string>();
  
  for (const { harmony, count: harmonyCount } of counts) {
    for (let i = 0; i < harmonyCount; i++) {
      let palette = generatePaletteByHarmony(harmony);
      
      // Ensure unique names
      let attempts = 0;
      while (usedNames.has(palette.name) && attempts < 50) {
        palette = generatePaletteByHarmony(harmony);
        attempts++;
      }
      
      usedNames.add(palette.name);
      palettes.push(palette);
    }
  }
  
  // Shuffle palettes for variety
  for (let i = palettes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [palettes[i], palettes[j]] = [palettes[j], palettes[i]];
  }
  
  return palettes;
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
palettes.forEach((palette, index) => {
  const colorsStr = palette.colors.map(c => `'${c}'`).join(', ');
  console.log(`  { name: "${palette.name}", colors: [${colorsStr}] },`);
});
console.log('];');
