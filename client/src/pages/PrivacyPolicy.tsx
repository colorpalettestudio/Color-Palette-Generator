import { Link } from 'wouter';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
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
              Our tool works entirely in your browser. We do not collect, store, or transmit any personal information to our servers. All palette generation and exporting happens locally on your device.
            </p>
            <p>
              We may use Google Analytics to collect anonymous usage data such as page views, session duration, and general geographic location. This helps us improve the tool.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Advertising</h2>
            <p>
              We use Google AdSense to display advertisements on our website. Google AdSense uses cookies and web beacons to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet.
            </p>
            <p>
              You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. Alternatively, you can opt out of third-party vendor's use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our service and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
            </p>
            <p>
              Third-party services we use, including Google AdSense and Google Analytics, may also use cookies to collect information about your use of our website. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Local Storage</h2>
            <p>
              We may use your browser's local storage for temporary preferences and settings. This data never leaves your device and can be cleared at any time through your browser settings.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Third-Party Services</h2>
            <p>
              We use third-party services to operate our website:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Google AdSense:</strong> For displaying advertisements. View their <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</li>
              <li><strong>Google Analytics:</strong> For analytics and understanding user behavior. View their <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</li>
            </ul>
            <p>
              These services may collect information as described in their own privacy policies. We do not control these third parties and are not responsible for their privacy practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Data Retention</h2>
            <p>
              Since we do not collect personal data on our servers, we do not retain any user data. All data stored in your browser's local storage can be cleared at any time through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The right to access and receive a copy of your personal data</li>
              <li>The right to correct or update your personal data</li>
              <li>The right to delete your personal data</li>
              <li>The right to opt out of certain data processing</li>
            </ul>
            <p>
              Since we do not collect or store personal data, most of these rights are automatically fulfilled. For questions about advertising cookies, please refer to the Advertising section above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Children's Privacy</h2>
            <p>
              Our service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated "Last Updated" date.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us:
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
