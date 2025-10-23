import { Lightbulb, Lock, Plus, Download, Image, Shuffle } from 'lucide-react';

export default function HowToUse() {
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
          <div className="bg-background rounded-xl p-6 shadow-sm hover-elevate transition-all" data-testid="howto-step-1">
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
          <div className="bg-background rounded-xl p-6 shadow-sm hover-elevate transition-all" data-testid="howto-step-2">
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
          <div className="bg-background rounded-xl p-6 shadow-sm hover-elevate transition-all" data-testid="howto-step-3">
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
          <div className="bg-background rounded-xl p-6 shadow-sm hover-elevate transition-all" data-testid="howto-step-4">
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
          <div className="bg-background rounded-xl p-6 shadow-sm hover-elevate transition-all" data-testid="howto-step-5">
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
          <div className="bg-background rounded-xl p-6 shadow-sm hover-elevate transition-all" data-testid="howto-step-6">
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
