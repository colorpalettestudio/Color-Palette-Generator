import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Generator
        </Link>
        
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        
        <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
          <p>
            <strong className="text-foreground">Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Acceptance of Terms</h2>
            <p>
              By accessing and using Color Palette Generator (thecolorpalettegenerator.com), you accept and agree to be bound by the terms and provisions of this agreement.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Use License</h2>
            <p>
              Permission is granted to use this tool for personal and commercial projects. All generated color palettes are royalty-free and can be used without attribution.
            </p>
            <p>
              You may not:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Redistribute or resell this tool as your own</li>
              <li>Attempt to decompile or reverse engineer any software contained on our website</li>
              <li>Remove any copyright or proprietary notations</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Disclaimer</h2>
            <p>
              The materials on Color Palette Generator are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Limitations</h2>
            <p>
              In no event shall Color Palette Generator or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Revisions</h2>
            <p>
              We may revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Contact</h2>
            <p>
              If you have any questions about these Terms, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
