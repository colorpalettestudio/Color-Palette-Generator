import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="border-t bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <p className="text-muted-foreground">
            Made with ❤️ by The Color Palette Studio
          </p>
          
          <div className="flex items-center gap-4 text-sm">
            <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-privacy">
              Privacy
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-terms">
              Terms
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-contact">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
