import PaletteLibraryCard from '../PaletteLibraryCard';

export default function PaletteLibraryCardExample() {
  return (
    <div className="w-64">
      <PaletteLibraryCard 
        name="Warm Neutrals"
        colors={['#D4A574', '#C69C6D', '#B8936A', '#AA8A67', '#9C8164']}
        onClick={() => console.log('Palette clicked')}
      />
    </div>
  );
}
