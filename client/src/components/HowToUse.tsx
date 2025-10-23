import { Lightbulb, Lock, Plus, Download, Image, Shuffle } from 'lucide-react';

export default function HowToUse() {
  const highlightElement = (selector: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    
    if (!element) {
      return;
    }

    // Scroll to element
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Add highlight animation with inline styles for better compatibility
    const originalBoxShadow = element.style.boxShadow;
    const originalTransition = element.style.transition;
    
    element.style.transition = 'box-shadow 0.3s ease';
    element.style.boxShadow = '0 0 0 4px hsl(var(--primary)), 0 0 0 6px hsl(var(--background))';
    
    // Remove highlight after 2 seconds
    setTimeout(() => {
      element.style.transition = originalTransition;
      element.style.boxShadow = originalBoxShadow;
    }, 2000);
  };

  const handleStepClick = (step: number) => {
    switch (step) {
      case 1: // Shuffle Colors
        highlightElement('[data-testid="toolbar-shuffle"]');
        break;
      case 2: // Lock Favorites - highlight the first color card to show where lock button is
        // Find the first color card's outer wrapper (the one with overflow-hidden)
        const colorCardInner = document.querySelector('[data-testid^="color-card-"]') as HTMLElement;
        
        if (colorCardInner) {
          // Get the parent element which has the overflow-hidden and rounded-xl classes
          const colorCardWrapper = colorCardInner.parentElement as HTMLElement;
          
          if (colorCardWrapper) {
            // Scroll to and highlight the wrapper
            colorCardWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Temporarily remove overflow-hidden to show box-shadow
            const originalOverflow = colorCardWrapper.style.overflow;
            
            colorCardWrapper.style.overflow = 'visible';
            colorCardWrapper.style.transition = 'all 0.3s ease';
            colorCardWrapper.style.boxShadow = '0 0 0 6px hsl(var(--primary))';
            colorCardWrapper.style.transform = 'scale(1.02)';
            
            // Also highlight the lock button within this card
            const lockButton = colorCardWrapper.querySelector('[data-testid^="button-lock-"]') as HTMLElement;
            if (lockButton) {
              lockButton.style.animation = 'pulse 1s ease-in-out 2';
            }
            
            setTimeout(() => {
              colorCardWrapper.style.overflow = originalOverflow;
              colorCardWrapper.style.boxShadow = '';
              colorCardWrapper.style.transform = '';
              if (lockButton) {
                lockButton.style.animation = '';
              }
            }, 2000);
          } else {
            // Fallback to highlighting the inner element
            highlightElement('[data-testid^="color-card-"]');
          }
        } else {
          // Fallback to palette grid if no color card found
          highlightElement('[data-testid="palette-grid"]');
        }
        break;
      case 3: // Upload Image
        highlightElement('[data-testid="toolbar-image-upload"]');
        break;
      case 4: // Add or Remove Colors
        highlightElement('[data-testid="toolbar-add-color"]');
        break;
      case 5: // Export
        highlightElement('[data-testid="toolbar-export-menu"]');
        break;
      case 6: // Browse Presets
        const libraryElement = document.getElementById('palette-library');
        if (libraryElement) {
          libraryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        break;
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            How to Use the Color Palette Generator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create beautiful, harmonious color palettes in seconds with these simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div 
            onClick={() => handleStepClick(1)}
            className="bg-background rounded-xl p-6 shadow-sm hover-elevate transition-all cursor-pointer" 
            data-testid="howto-step-1"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Shuffle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              1. Shuffle Colors
            </h3>
            <p className="text-muted-foreground">
              Click the "Shuffle Palette" button or press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Space</kbd> to generate random colors instantly.
            </p>
          </div>

          {/* Step 2 */}
          <div 
            onClick={() => handleStepClick(2)}
            className="bg-background rounded-xl p-6 shadow-sm hover-elevate transition-all cursor-pointer" 
            data-testid="howto-step-2"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              2. Lock Favorites
            </h3>
            <p className="text-muted-foreground">
              Found a color you love? Click the lock icon to keep it while shuffling other colors in your palette.
            </p>
          </div>

          {/* Step 3 */}
          <div 
            onClick={() => handleStepClick(3)}
            className="bg-background rounded-xl p-6 shadow-sm hover-elevate transition-all cursor-pointer" 
            data-testid="howto-step-3"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Image className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              3. Upload an Image
            </h3>
            <p className="text-muted-foreground">
              Upload any image to extract its dominant colors and generate a beautiful palette from your inspiration.
            </p>
          </div>

          {/* Step 4 */}
          <div 
            onClick={() => handleStepClick(4)}
            className="bg-background rounded-xl p-6 shadow-sm hover-elevate transition-all cursor-pointer" 
            data-testid="howto-step-4"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              4. Add or Remove Colors
            </h3>
            <p className="text-muted-foreground">
              Build your perfect palette by adding or removing colors. Create anywhere from 3 to 10 colors to fit your needs.
            </p>
          </div>

          {/* Step 5 */}
          <div 
            onClick={() => handleStepClick(5)}
            className="bg-background rounded-xl p-6 shadow-sm hover-elevate transition-all cursor-pointer" 
            data-testid="howto-step-5"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              5. Export Your Palette
            </h3>
            <p className="text-muted-foreground">
              Use the toolbar to export as PNG, PDF, SVG, Adobe Swatches, or VS Code theme—ready for any workflow.
            </p>
          </div>

          {/* Step 6 */}
          <div 
            onClick={() => handleStepClick(6)}
            className="bg-background rounded-xl p-6 shadow-sm hover-elevate transition-all cursor-pointer" 
            data-testid="howto-step-6"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              6. Browse Presets
            </h3>
            <p className="text-muted-foreground">
              Need inspiration? Explore our curated palette library below for professionally designed color combinations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
