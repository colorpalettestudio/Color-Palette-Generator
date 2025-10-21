import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Generator
        </Link>
        
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        
        <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
          <p>
            We'd love to hear from you! Whether you have questions, feedback, or suggestions for improving Color Palette Generator, feel free to reach out.
          </p>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Get in Touch</h2>
            <p>
              For general inquiries, support, or partnership opportunities, please email us at:
            </p>
            <p className="text-lg">
              <a href="mailto:hello@thecolorpalettestudio.com" className="text-primary hover:underline">
                hello@thecolorpalettestudio.com
              </a>
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Bug Reports & Feature Requests</h2>
            <p>
              Found a bug or have an idea for a new feature? We're always looking to improve! Send us detailed information about what you've encountered or what you'd like to see added.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Business Inquiries</h2>
            <p>
              Interested in advertising opportunities or partnerships? Please include "Business Inquiry" in your email subject line.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Response Time</h2>
            <p>
              We typically respond to all inquiries within 24-48 hours during business days. Thank you for your patience!
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
