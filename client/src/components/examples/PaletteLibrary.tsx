import PaletteLibrary from '../PaletteLibrary';

const mockPalettes = [
  { name: "Warm Neutrals", colors: ['#D4A574', '#C69C6D', '#B8936A', '#AA8A67', '#9C8164'] },
  { name: "Coastal Dawn", colors: ['#FFE5B4', '#FFDAB9', '#FFB6C1', '#DDA0DD', '#8B7D8B'] },
  { name: "Retro Candy", colors: ['#FF6B9D', '#C44569', '#FEA47F', '#F97F51', '#F8B500'] },
];

export default function PaletteLibraryExample() {
  return (
    <PaletteLibrary 
      palettes={mockPalettes}
      onSelectPalette={(colors) => console.log('Selected palette:', colors)}
    />
  );
}
