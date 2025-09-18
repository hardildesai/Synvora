import Link from 'next/link';
import Logo from './Logo';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="border-t border-border/20 py-8 bg-background">
      <div className="container flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Logo />
            <p className="text-sm text-muted-foreground mt-2">
            © {new Date().getFullYear()} Synvora. All rights reserved.
            </p>
        </div>
        <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon" aria-label="Twitter">
                <Link href="#" target="_blank"><Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors"/></Link>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
                <Link href="#" target="_blank"><Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors"/></Link>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="GitHub">
                <Link href="#" target="_blank"><Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors"/></Link>
            </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
