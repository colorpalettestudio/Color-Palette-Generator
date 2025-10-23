import { ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import fixerImage from '@assets/Color Palette FIXER Product Photos (2)_1761230696622.png';

export default function ColorFixerAd() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white dark:bg-card rounded-2xl shadow-xl overflow-hidden hover-elevate transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="p-8 md:p-12 space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Palette Not Perfect?
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Got a palette that needs fixing?
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our <span className="font-semibold text-foreground">Color Palette Fixer</span> uses <span className="font-semibold text-foreground">math, not AI</span> to detect problematic colors in your palette and suggest harmonious replacements.
              </p>
              
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Instantly identifies what's off (too bright, too flat, low contrast)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Gives you one-click Smart Palette Suggestions™</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Makes your colors website-ready, accessible, and balanced</span>
                </li>
              </ul>
              
              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 h-auto group"
                  data-testid="button-try-fixer"
                  asChild
                >
                  <a href="https://thecolorpalettestudio.com/products/color-palette-fixer" target="_blank" rel="noopener noreferrer">
                    Try Color Palette Fixer
                    <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Image */}
            <a 
              href="https://thecolorpalettestudio.com/products/color-palette-fixer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative h-full min-h-[400px] md:min-h-[500px] block group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20" />
              <img 
                src={fixerImage} 
                alt="Color Palette Fixer tool showing smart palette suggestions" 
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:opacity-95 transition-opacity cursor-pointer"
                data-testid="img-fixer-product"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
