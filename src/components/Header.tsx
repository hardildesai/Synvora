'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Logo from './Logo';
import { Ticket, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/tickets', label: 'Tickets' },
];

const Header = () => {
  const [isHeroCtaVisible, setIsHeroCtaVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // For pages other than home, the CTA should always be visible
    if (pathname !== '/') {
      setIsHeroCtaVisible(false);
      return;
    }

    const heroCtaEl = document.getElementById('heroBookBtn');
    if (heroCtaEl) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsHeroCtaVisible(entry.isIntersecting);
        },
        { threshold: 0.5 } 
      );
      observer.observe(heroCtaEl);
      return () => observer.disconnect();
    } else {
       setIsHeroCtaVisible(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const navTransition = { duration: 0.3, ease: 'easeInOut' };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 shadow-lg shadow-black/20 backdrop-blur-xl">
        <div className="container flex h-20 max-w-screen-2xl items-center justify-between">
          <Logo />
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>

          <AnimatePresence>
            {(!isHeroCtaVisible || pathname !== '/') && (
              <motion.div
                key="book-tickets-btn-header"
                initial={{ x: '110%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '110%', opacity: 0 }}
                transition={navTransition}
                className="hidden md:block"
              >
                <Button asChild className="font-bold shadow-[0_0_15px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_25px_hsl(var(--primary)/0.7)] transition-shadow">
                    <Link href="/tickets">
                    <Ticket className="mr-2 h-4 w-4" />
                    Book Tickets
                    </Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="md:hidden">
            <Button onClick={() => setIsMenuOpen(true)} variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 h-full w-full max-w-xs bg-background p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <Logo />
                <Button onClick={() => setIsMenuOpen(false)} variant="ghost" size="icon">
                  <X />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link key={item.label} href={item.href} className="text-lg font-medium text-foreground transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </nav>
               <Button asChild className="w-full mt-8 font-bold">
                  <Link href="/tickets" onClick={() => setIsMenuOpen(false)}>
                  <Ticket className="mr-2 h-4 w-4" />
                  Book Tickets
                  </Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
