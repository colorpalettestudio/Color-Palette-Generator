import tinycolor from 'tinycolor2';

interface Palette {
  name: string;
  colors: string[];
}

// Curated seed palettes organized by aesthetic
const seedPalettes = {
  neutral: [
    ['#F5F5F0', '#E8E4DD', '#9B9B8A', '#5C5C4D', '#2C2C24'],
    ['#FDFBF7', '#F4F1E8', '#C8C1B7', '#8B8478', '#4A4439'],
    ['#E8E4DF', '#D4CFC7', '#A8A199', '#6B645C', '#3D3832'],
    ['#F0EBE3', '#E4DFD7', '#B8B1A7', '#7D766C', '#4B4541'],
    ['#FAF8F3', '#EBE7DD', '#C5BFB3', '#8C8679', '#54504A'],
  ],
  earthy: [
    ['#DDA15E', '#BC6C25', '#FEFAE0', '#606C38', '#283618'],
    ['#E9C46A', '#F4A261', '#E76F51', '#2A9D8F', '#264653'],
    ['#D4A574', '#B8936A', '#9C8164', '#7A6F5D', '#544B3D'],
    ['#C9A078', '#A87C56', '#8B6F47', '#6B5B3E', '#4A4034'],
    ['#E0B589', '#C49665', '#A87C4E', '#8B6B42', '#6B5439'],
  ],
  pastel: [
    ['#FFD6FF', '#E7C6FF', '#C8B6FF', '#B8C0FF', '#BBD0FF'],
    ['#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF', '#CDB4DB'],
    ['#FFE5EC', '#FFC2D1', '#FFB3C6', '#FF8FAB', '#FB6F92'],
    ['#F4ACB7', '#FFD1DC', '#FFEA00', '#D4F1F4', '#C3E4ED'],
    ['#E8D5C4', '#F7DBA7', '#F3EAC0', '#F5F3BB', '#F2F5C8'],
  ],
  vibrant: [
    ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'],
    ['#F72585', '#7209B7', '#3A0CA3', '#4361EE', '#4CC9F0'],
    ['#E63946', '#F77F00', '#FCBF49', '#06A77D', '#0B3954'],
    ['#D62828', '#F77F00', '#FCBF49', '#EAE2B7', '#003049'],
    ['#EF476F', '#FFD166', '#06D6A0', '#118AB2', '#073B4C'],
  ],
  cool: [
    ['#05668D', '#028090', '#00A896', '#02C39A', '#F0F3BD'],
    ['#023047', '#126782', '#8ECAE6', '#219EBC', '#FFB703'],
    ['#003566', '#006494', '#0A9396', '#94D2BD', '#E9D8A6'],
    ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'],
    ['#1D3557', '#457B9D', '#A8DADC', '#F1FAEE', '#E63946'],
  ],
  warm: [
    ['#FF9F1C', '#FFBF69', '#CBF3F0', '#2EC4B6', '#011627'],
    ['#FF6B35', '#F7931E', '#FDC830', '#F37335', '#C23B22'],
    ['#DC2F02', '#E85D04', '#F48C06', '#FAA307', '#FFBA08'],
    ['#E63946', '#F77F00', '#FCBF49', '#06A77D', '#0B3954'],
    ['#D62828', '#F77F00', '#FCBF49', '#EAE2B7', '#003049'],
  ],
  dark: [
    ['#0F0E17', '#232946', '#B8C1EC', '#EEBBC3', '#FFFFFE'],
    ['#1A1423', '#372549', '#774C60', '#B75D69', '#EACDC2'],
    ['#2B0B3F', '#512B58', '#894B6C', '#C16B7E', '#F89B90'],
    ['#001219', '#005F73', '#0A9396', '#94D2BD', '#E9D8A6'],
    ['#0D1B2A', '#1B263B', '#415A77', '#778DA9', '#E0E1DD'],
  ],
  vintage: [
    ['#FADCD9', '#F8AFA6', '#E8505B', '#A8DADC', '#457B9D'],
    ['#F6D55C', '#ED553B', '#3CAEA3', '#20639B', '#173F5F'],
    ['#8B4513', '#A0522D', '#D2691E', '#DEB887', '#F5DEB3'],
    ['#D4A574', '#C69C6D', '#B8936A', '#AA8A67', '#9C8164'],
    ['#C9B9A8', '#B0A090', '#8B7D6B', '#6B6152', '#4A4439'],
  ],
  modern: [
    ['#2D3142', '#4F5D75', '#BFC0C0', '#FFFFFF', '#EF8354'],
    ['#000000', '#404040', '#808080', '#C0C0C0', '#FFFFFF'],
    ['#36454F', '#2F3E46', '#28373F', '#213038', '#1A2930'],
    ['#3A3F44', '#5A5F64', '#7A7F84', '#9A9FA4', '#BBBFC4'],
    ['#2B2D31', '#4A4E54', '#6A7178', '#8D949D', '#B0B7BE'],
  ],
  botanical: [
    ['#2D4A2B', '#5D8233', '#83A95C', '#B4C292', '#D8E4BC'],
    ['#283618', '#606C38', '#FEFAE0', '#DDA15E', '#BC6C25'],
    ['#2D6A4F', '#40916C', '#74C69D', '#B7E4C7', '#F1C453'],
    ['#52B788', '#74C69D', '#95D5B2', '#B7E4C7', '#D8F3DC'],
    ['#065535', '#0B7A3E', '#10A44C', '#6BCF7F', '#95E1A2'],
  ],
};

// Name components for generating palette names
const nameComponents = {
  adjectives: [
    'Soft', 'Bold', 'Deep', 'Light', 'Warm', 'Cool', 'Muted', 'Vivid', 
    'Gentle', 'Rich', 'Fresh', 'Subtle', 'Dreamy', 'Crisp', 'Hazy', 'Clear',
    'Elegant', 'Wild', 'Calm', 'Smooth', 'Rustic', 'Modern', 'Vintage', 'Cosmic',
    'Natural', 'Arctic', 'Tropical', 'Desert', 'Ocean', 'Forest', 'Golden', 'Silver',
  ],
  nouns: [
    'Sunset', 'Dawn', 'Twilight', 'Breeze', 'Mist', 'Bloom', 'Meadow', 'Garden',
    'Ocean', 'River', 'Canyon', 'Peak', 'Sky', 'Cloud', 'Wave', 'Sand', 'Stone',
    'Rose', 'Sage', 'Mint', 'Coral', 'Pearl', 'Jade', 'Dream', 'Harmony', 'Aurora',
    'Horizon', 'Haven', 'Paradise', 'Oasis', 'Dusk', 'Earth', 'Clay', 'Bloom',
  ],
  singles: [
    'Moonlight', 'Starlight', 'Daybreak', 'Nightfall', 'Windswept', 'Wildflower',
    'Driftwood', 'Limestone', 'Rosewood', 'Sapphire', 'Emerald', 'Evergreen',
    'Rainfall', 'Snowfall', 'Sunbeam', 'Seafoam', 'Terracotta', 'Mahogany',
  ],
};

function generateName(): string {
  const rand = Math.random();
  if (rand < 0.3) {
    return nameComponents.singles[Math.floor(Math.random() * nameComponents.singles.length)];
  } else if (rand < 0.8) {
    const adj = nameComponents.adjectives[Math.floor(Math.random() * nameComponents.adjectives.length)];
    const noun = nameComponents.nouns[Math.floor(Math.random() * nameComponents.nouns.length)];
    return `${adj} ${noun}`;
  } else {
    const adj1 = nameComponents.adjectives[Math.floor(Math.random() * nameComponents.adjectives.length)];
    const adj2 = nameComponents.adjectives[Math.floor(Math.random() * nameComponents.adjectives.length)];
    const noun = nameComponents.nouns[Math.floor(Math.random() * nameComponents.nouns.length)];
    return adj1 !== adj2 ? `${adj1} ${adj2} ${noun}` : `${adj1} ${noun}`;
  }
}

function adjustColor(hex: string, hueShift: number, satShift: number, lightShift: number): string {
  const color = tinycolor(hex);
  const hsl = color.toHsl();
  
  return tinycolor({
    h: (hsl.h + hueShift + 360) % 360,
    s: Math.max(0, Math.min(1, hsl.s + satShift)),
    l: Math.max(0.1, Math.min(0.9, hsl.l + lightShift)),
  }).toHexString().toUpperCase();
}

function createVariation(seedPalette: string[]): string[] {
  const variationType = Math.random();
  
  if (variationType < 0.4) {
    // Slight hue shift
    const hueShift = (Math.random() - 0.5) * 20;
    return seedPalette.map(color => adjustColor(color, hueShift, 0, 0));
  } else if (variationType < 0.7) {
    // Saturation adjustment
    const satShift = (Math.random() - 0.5) * 0.2;
    return seedPalette.map(color => adjustColor(color, 0, satShift, 0));
  } else {
    // Lightness adjustment
    const lightShift = (Math.random() - 0.5) * 0.15;
    return seedPalette.map(color => adjustColor(color, 0, 0, lightShift));
  }
}

function generatePalettes(count: number): Palette[] {
  const palettes: Palette[] = [];
  const usedNames = new Set<string>();
  
  // Flatten all seed palettes
  const allSeeds = Object.values(seedPalettes).flat();
  
  // Calculate how many palettes per category (roughly balanced)
  const categories = Object.keys(seedPalettes);
  const palettesPerCategory = Math.floor(count / categories.length);
  
  for (const category of categories) {
    const categorySeeds = seedPalettes[category as keyof typeof seedPalettes];
    const numToGenerate = palettesPerCategory;
    
    for (let i = 0; i < numToGenerate; i++) {
      const seedIndex = i % categorySeeds.length;
      const seed = categorySeeds[seedIndex];
      
      // Create variation
      const colors = createVariation(seed);
      
      // Generate unique name
      let name = generateName();
      let attempts = 0;
      while (usedNames.has(name) && attempts < 50) {
        name = generateName();
        attempts++;
      }
      
      usedNames.add(name);
      palettes.push({ name, colors });
    }
  }
  
  // Fill remaining slots with random variations
  while (palettes.length < count) {
    const seed = allSeeds[Math.floor(Math.random() * allSeeds.length)];
    const colors = createVariation(seed);
    
    let name = generateName();
    let attempts = 0;
    while (usedNames.has(name) && attempts < 50) {
      name = generateName();
      attempts++;
    }
    
    usedNames.add(name);
    palettes.push({ name, colors });
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
