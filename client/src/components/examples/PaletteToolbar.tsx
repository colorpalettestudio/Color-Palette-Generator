import PaletteToolbar from '../PaletteToolbar';

export default function PaletteToolbarExample() {
  return (
    <PaletteToolbar 
      onExportPNG={() => console.log('Export PNG')}
      onExportPDF={() => console.log('Export PDF')}
      onSave={() => console.log('Save palette')}
      onViewLibrary={() => console.log('View library')}
    />
  );
}
