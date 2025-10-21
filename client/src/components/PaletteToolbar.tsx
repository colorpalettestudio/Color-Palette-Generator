import { Button } from '@/components/ui/button';
import { Download, FileImage, FileCode, Plus, Library, Shuffle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PaletteToolbarProps {
  onShuffle: () => void;
  onAddColor: () => void;
  onViewLibrary: () => void;
  onExportPNG: () => void;
  onExportPDF: () => void;
  onExportSVG: () => void;
  onExportAdobeSwatches: () => void;
  onExportStudioCode: () => void;
  canAddMore: boolean;
}

export default function PaletteToolbar({ 
  onShuffle,
  onAddColor,
  onViewLibrary,
  onExportPNG, 
  onExportPDF,
  onExportSVG,
  onExportAdobeSwatches,
  onExportStudioCode,
  canAddMore
}: PaletteToolbarProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Primary Action */}
      <Button 
        size="lg"
        className="text-lg px-8 py-6 h-auto"
        onClick={onShuffle}
        data-testid="button-shuffle"
      >
        <Shuffle className="w-5 h-5 mr-2" />
        Shuffle Palette
      </Button>
      
      {/* Secondary Actions */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Button 
          variant="outline" 
          onClick={onAddColor}
          disabled={!canAddMore}
          data-testid="button-add-color"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Color
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onViewLibrary}
          data-testid="button-view-library"
        >
          <Library className="w-4 h-4 mr-2" />
          View Library
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" data-testid="button-export-menu">
              <Download className="w-4 h-4 mr-2" />
              Export Palette
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem onClick={onExportPNG} data-testid="menu-export-png">
              <FileImage className="w-4 h-4 mr-2" />
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExportPDF} data-testid="menu-export-pdf">
              <Download className="w-4 h-4 mr-2" />
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExportSVG} data-testid="menu-export-svg">
              <FileCode className="w-4 h-4 mr-2" />
              Export as SVG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExportAdobeSwatches} data-testid="menu-export-adobe">
              <FileImage className="w-4 h-4 mr-2" />
              Adobe Swatches (.aco)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExportStudioCode} data-testid="menu-export-studiocode">
              <FileCode className="w-4 h-4 mr-2" />
              Studio Code URL
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
