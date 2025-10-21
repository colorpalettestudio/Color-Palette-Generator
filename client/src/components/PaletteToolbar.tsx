import { Button } from '@/components/ui/button';
import { Download, FileImage, Save, Library } from 'lucide-react';

interface PaletteToolbarProps {
  onExportPNG: () => void;
  onExportPDF: () => void;
  onSave: () => void;
  onViewLibrary: () => void;
}

export default function PaletteToolbar({ 
  onExportPNG, 
  onExportPDF, 
  onSave, 
  onViewLibrary 
}: PaletteToolbarProps) {
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      <Button 
        variant="outline" 
        onClick={onExportPNG}
        data-testid="button-export-png"
      >
        <FileImage className="w-4 h-4 mr-2" />
        Export PNG
      </Button>
      <Button 
        variant="outline" 
        onClick={onExportPDF}
        data-testid="button-export-pdf"
      >
        <Download className="w-4 h-4 mr-2" />
        Export PDF
      </Button>
      <Button 
        variant="outline" 
        onClick={onSave}
        data-testid="button-save-palette"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Palette
      </Button>
      <Button 
        variant="outline" 
        onClick={onViewLibrary}
        data-testid="button-view-library"
      >
        <Library className="w-4 h-4 mr-2" />
        View Library
      </Button>
    </div>
  );
}
