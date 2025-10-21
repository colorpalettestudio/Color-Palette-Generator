import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Generator
        </Link>
        
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
          <p>
            <strong className="text-foreground">Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Introduction</h2>
            <p>
              Welcome to Color Palette Generator ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your information when you use thecolorpalettegenerator.com.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Information We Collect</h2>
            <p>
              Our tool works entirely in your browser. We do not collect, store, or transmit any personal information to our servers. All palette generation, saving, and exporting happens locally on your device.
            </p>
            <p>
              We may use Google Analytics to collect anonymous usage data such as page views, session duration, and general geographic location. This helps us improve the tool.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Local Storage</h2>
            <p>
              When you save palettes, they are stored in your browser's local storage. This data never leaves your device and can be cleared at any time through your browser settings.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Third-Party Services</h2>
            <p>
              We may use third-party services like Google Analytics for analytics purposes. These services may collect information as described in their own privacy policies.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
