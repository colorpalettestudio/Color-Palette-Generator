import { Shuffle, Lock, Download } from 'lucide-react';

export default function EducationSection() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">What Is a Color Palette Generator?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A color palette generator is a powerful tool that helps designers, brands, and creators quickly find harmonious color combinations for their projects. Whether you're designing a website, creating a brand identity, or working on a creative project, our generator provides instant inspiration with the ability to lock favorites and shuffle new combinations.
            </p>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Why Use a Color Palette Generator?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Professional designers rely on color generators to explore countless combinations in seconds, ensuring their projects have cohesive, on-brand color schemes that enhance visual appeal and user experience.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">How to Use the Color Palette Generator</h2>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Simple 3-Step Process</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Shuffle className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Step 1:</strong> Click "Shuffle" to generate random palettes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Step 2:</strong> Lock colors you love by clicking the lock icon.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Download className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Step 3:</strong> Export your final palette for use in your projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Tips for Finding Great Color Palettes</h2>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Best Practices for Color Selection</h3>
            <ul className="space-y-2 text-muted-foreground list-disc pl-6">
              <li>Keep a balance of brights and neutrals for visual harmony.</li>
              <li>Test your palette in both light and dark backgrounds.</li>
              <li>Start with 1–2 anchor colors and build around them.</li>
              <li>Consider accessibility and contrast ratios for text readability.</li>
              <li>Use color psychology to evoke the right emotions for your brand.</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Use Cases for Color Palette Generators</h2>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Perfect for Designers & Creatives</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Perfect for brand design, websites, logos, packaging, social media templates, and more. Our color palette generator helps you create professional, cohesive color schemes in seconds.
            </p>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Common Applications</h3>
            <ul className="space-y-2 text-muted-foreground list-disc pl-6">
              <li><strong className="text-foreground">Web Design:</strong> Create harmonious color schemes for websites and apps</li>
              <li><strong className="text-foreground">Brand Identity:</strong> Develop consistent brand colors across all touchpoints</li>
              <li><strong className="text-foreground">Graphic Design:</strong> Generate palettes for posters, flyers, and marketing materials</li>
              <li><strong className="text-foreground">UI/UX Design:</strong> Build accessible, user-friendly interface color systems</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
