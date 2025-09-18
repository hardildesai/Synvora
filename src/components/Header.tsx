'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Logo from './Logo';
import { Ticket, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import CountdownTimer from './CountdownTimer';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#faq', label: 'FAQ' },
];

const Header = () => {
  const [isHeroCtaVisible, setIsHeroCtaVisible] = useState(true);
  const [isHeroCountdownVisible, setIsHeroCountdownVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');

  const pathname = usePathname();
  const eventDate = '2024-09-20T18:30:00';

  useEffect(() => {
    setActivePath(pathname);
    if (pathname !== '/') {
      setIsHeroCtaVisible(false);
      setIsHeroCountdownVisible(false);
      return;
    }

    const heroCtaEl = document.getElementById('heroBookBtn');
    const heroCountdownEl = document.getElementById('heroCountdown');

    const ctaObserver = heroCtaEl ? new IntersectionObserver(
      ([entry]) => setIsHeroCtaVisible(entry.isIntersecting),
      { threshold: 0.1 }
    ) : null;
    
    const countdownObserver = heroCountdownEl ? new IntersectionObserver(
        ([entry]) => setIsHeroCountdownVisible(entry.isIntersecting),
        { threshold: 0.1 }
    ) : null;

    if (heroCtaEl && ctaObserver) ctaObserver.observe(heroCtaEl);
    if (heroCountdownEl && countdownObserver) countdownObserver.observe(heroCountdownEl);
    
    // Initial check
    setIsHeroCtaVisible(!heroCtaEl || heroCtaEl.getBoundingClientRect().top < window.innerHeight);
    setIsHeroCountdownVisible(!heroCountdownEl || heroCountdownEl.getBoundingClientRect().top < window.innerHeight);


    return () => {
      if (heroCtaEl && ctaObserver) ctaObserver.disconnect();
      if (heroCountdownEl && countdownObserver) countdownObserver.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 max-w-screen-xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between rounded-full bg-background/30 px-6 shadow-lg shadow-black/20 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-6">
            <Logo />
            <AnimatePresence>
                {!isHeroCountdownVisible && (
                     <motion.div
                        key="compact-countdown"
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="hidden md:block"
                     >
                        <CountdownTimer targetDate={eventDate} compact={true} />
                     </motion.div>
                )}
            </AnimatePresence>
          </div>
          
          <nav className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-full">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setActivePath(item.href)}
                className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary-foreground px-4 py-1.5 rounded-full"
              >
                {item.href === activePath && (
                   <motion.span
                    layoutId="active-nav-link"
                    className="absolute inset-0 bg-primary/70 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                 <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
             <AnimatePresence>
                {!isHeroCtaVisible && (
                  <motion.div
                    key="book-tickets-btn-header"
                    initial={{ scale: 0, opacity: 0, y: -20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="hidden md:block"
                  >
                    <Button asChild variant="outline" className="font-bold bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground border-none rounded-full">
                        <Link href="/tickets">
                        Book Tickets
                        </Link>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
             <Button asChild className="hidden md:block rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                <Link href="/contact">
                  Contact
                </Link>
            </Button>
            <div className="md:hidden">
              <Button onClick={() => setIsMenuOpen(true)} variant="ghost" size="icon" className="text-white">
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </div>
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
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm md:hidden"
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
                 <Link href="/contact" className="text-lg font-medium text-foreground transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    Contact
                  </Link>
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
