import { Button } from '@/components/ui/button';
import { Download, FileImage, FileCode } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PaletteToolbarProps {
  onExportPNG: () => void;
  onExportPDF: () => void;
  onExportSVG: () => void;
  onExportAdobeSwatches: () => void;
  onExportStudioCode: () => void;
}

export default function PaletteToolbar({ 
  onExportPNG, 
  onExportPDF,
  onExportSVG,
  onExportAdobeSwatches,
  onExportStudioCode
}: PaletteToolbarProps) {
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
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
  );
}
