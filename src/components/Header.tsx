import Link from 'next/link';
import { Button } from './ui/button';
import Logo from './Logo';
import { Ticket } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-4">
          <Link href="/#info" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden md:block">Info</Link>
          <Link href="/#gallery" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden md:block">Gallery</Link>
          <Link href="/#team" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden md:block">Team</Link>
          <Link href="/#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden md:block">FAQ</Link>
          <Link href="/#contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden md:block">Contact</Link>
          <Button asChild className="font-bold shadow-[0_0_15px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_25px_hsl(var(--primary)/0.7)] transition-shadow">
            <Link href="/tickets">
              <Ticket className="mr-2 h-4 w-4" />
              Book Tickets
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
