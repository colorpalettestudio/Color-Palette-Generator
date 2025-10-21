import { useState } from 'react';
import { Plus, Library, Download, FileImage, FileCode, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ImageColorExtractor from './ImageColorExtractor';

interface AppToolbarProps {
  onAddColor: () => void;
  onViewLibrary: () => void;
  onExportPNG: () => void;
  onExportPDF: () => void;
  onExportSVG: () => void;
  onExportAdobeSwatches: () => void;
  onExportStudioCode: () => void;
  onColorsExtracted: (colors: string[], colorPool?: string[]) => void;
  canAddMore: boolean;
}

export default function AppToolbar({
  onAddColor,
  onViewLibrary,
  onExportPNG,
  onExportPDF,
  onExportSVG,
  onExportAdobeSwatches,
  onExportStudioCode,
  onColorsExtracted,
  canAddMore,
}: AppToolbarProps) {
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const handleColorsExtracted = (colors: string[], colorPool?: string[]) => {
    onColorsExtracted(colors, colorPool);
    setImageDialogOpen(false);
  };

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddColor}
              disabled={!canAddMore}
              data-testid="toolbar-add-color"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Color
            </Button>

            <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" data-testid="toolbar-image-upload">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Generate from Image
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Generate from Image
                  </DialogTitle>
                  <DialogDescription>
                    Upload an image to extract its dominant colors
                  </DialogDescription>
                </DialogHeader>
                <ImageColorExtractor onColorsExtracted={handleColorsExtracted} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewLibrary}
              data-testid="toolbar-view-library"
            >
              <Library className="w-4 h-4 mr-2" />
              View Library
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" data-testid="toolbar-export-menu">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
      </div>
    </div>
  );
}
