'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Logo from './Logo';
import { Ticket, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountdownTimer from './CountdownTimer';

const Header = () => {
  const [isHeroCtaVisible, setIsHeroCtaVisible] = useState(true);
  const [isHeroCountdownVisible, setIsHeroCountdownVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Placeholder for auth state
  const eventDate = '2024-09-20T18:30:00';

  useEffect(() => {
    // Observer for the main "Book Tickets" button in the hero
    const heroCtaEl = document.getElementById('heroBookBtn');
    if (!heroCtaEl) {
      setIsHeroCtaVisible(false);
      return;
    }
    const ctaObserver = new IntersectionObserver(
      ([entry]) => setIsHeroCtaVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    ctaObserver.observe(heroCtaEl);

    // Observer for the main countdown timer in the hero
    const heroCountdownEl = document.getElementById('heroCountdown');
    if (heroCountdownEl) {
      const countdownObserver = new IntersectionObserver(
        ([entry]) => setIsHeroCountdownVisible(entry.isIntersecting),
        { threshold: 0.2 } // Timer is "visible" if at least 20% is showing
      );
      countdownObserver.observe(heroCountdownEl);
       return () => {
        ctaObserver.disconnect();
        countdownObserver.disconnect();
      };
    }
    
    return () => {
      ctaObserver.disconnect();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
           <AnimatePresence>
            {!isHeroCountdownVisible && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="hidden md:flex"
              >
                <CountdownTimer targetDate={eventDate} compact />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/#info" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden md:block">Info</Link>
          <Link href="/#gallery" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden md:block">Gallery</Link>
          <Link href="/#team" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden md:block">Team</Link>
          <Link href="/#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden md:block">FAQ</Link>
          <Link href="/#contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden md:block">Contact</Link>
          
          <motion.div layout className="flex items-center gap-4">
            <AnimatePresence>
              {isLoggedIn ? (
                  <Button variant="ghost" asChild>
                    <Link href="/account">
                        <User className="mr-2 h-4 w-4"/>
                        My Account
                    </Link>
                  </Button>
              ) : (
                <Button variant="ghost" asChild>
                  <Link href="/login">
                      Login
                  </Link>
                </Button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!isHeroCtaVisible && (
                <motion.div
                  key="book-tickets-btn"
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
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
          </motion.div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
