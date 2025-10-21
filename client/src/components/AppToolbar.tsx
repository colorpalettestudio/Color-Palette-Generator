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
    <>
      <aside className="fixed left-0 top-0 h-screen w-24 bg-muted/50 border-r border-border flex flex-col items-center py-8 gap-6 z-50">
        <button
          onClick={onAddColor}
          disabled={!canAddMore}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover-elevate active-elevate-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="toolbar-add-color"
        >
          <Plus className="w-6 h-6" />
          <span className="text-xs font-medium">Add Color</span>
        </button>

        <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
          <DialogTrigger asChild>
            <button 
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover-elevate active-elevate-2 transition-all"
              data-testid="toolbar-image-upload"
            >
              <ImageIcon className="w-6 h-6" />
              <span className="text-xs font-medium">Image</span>
            </button>
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

        <button
          onClick={onViewLibrary}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover-elevate active-elevate-2 transition-all"
          data-testid="toolbar-view-library"
        >
          <Library className="w-6 h-6" />
          <span className="text-xs font-medium">Library</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover-elevate active-elevate-2 transition-all"
              data-testid="toolbar-export-menu"
            >
              <Download className="w-6 h-6" />
              <span className="text-xs font-medium">Export</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="right">
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
      </aside>

      <div className="ml-24">
        {/* Spacer for sidebar */}
      </div>
    </>
  );
}
