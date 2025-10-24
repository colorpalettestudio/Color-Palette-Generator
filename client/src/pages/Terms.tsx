import { Link } from 'wouter';
import Footer from '@/components/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
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
              By accessing and using Color Palette Generator (thecolorpalettegenerator.com), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our service.
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
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Violate any laws in your jurisdiction</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">User Conduct</h2>
            <p>
              You agree to use the Color Palette Generator responsibly and in compliance with all applicable laws. You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Attempt to interfere with or disrupt the service or servers</li>
              <li>Use automated systems to access the service in a manner that sends more requests than a human can reasonably produce</li>
              <li>Attempt to gain unauthorized access to any portion of the service</li>
              <li>Use the service in any way that could damage, disable, or impair the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Intellectual Property</h2>
            <p>
              The Color Palette Generator tool, including its design, code, and branding, is owned by The Color Palette Studio and is protected by copyright and other intellectual property laws. Color palettes you generate are yours to use freely.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Third-Party Advertising</h2>
            <p>
              We use Google AdSense to display advertisements on our website. These advertisers may use cookies and web beacons as described in our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>. We are not responsible for the content of third-party advertisements or the privacy practices of advertisers.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Disclaimer</h2>
            <p>
              The materials on Color Palette Generator are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
            <p>
              We do not warrant that the service will be uninterrupted, timely, secure, or error-free. We do not warrant the accuracy or reliability of any information obtained through the service.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Limitations of Liability</h2>
            <p>
              In no event shall Color Palette Generator, The Color Palette Studio, or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we have been notified of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless The Color Palette Studio and its affiliates from any claims, damages, losses, liabilities, and expenses arising from your use of the service or violation of these terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the State of Tennessee, United States, without regard to its conflict of law provisions.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our service after any revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <p className="text-foreground">
              <strong>Email:</strong> <a href="mailto:sam@thecolorpalettestudio.com" className="text-primary hover:underline">sam@thecolorpalettestudio.com</a>
            </p>
            <p className="text-foreground">
              <strong>Address:</strong><br />
              The Color Palette Studio<br />
              923 Oldham Dr #202<br />
              Nolensville, TN 37135
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
