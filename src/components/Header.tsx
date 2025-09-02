'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Logo from './Logo';
import { Ticket, User, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountdownTimer from './CountdownTimer';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isHeroCtaVisible, setIsHeroCtaVisible] = useState(true);
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const eventDate = '2024-09-20T18:30:00';

  useEffect(() => {
    const heroCountdownEl = document.getElementById('heroCountdown');
    if (heroCountdownEl) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsHeroCtaVisible(entry.isIntersecting);
        },
        { threshold: 0.98 } 
      );
      observer.observe(heroCountdownEl);
      return () => observer.disconnect();
    } else {
      setIsHeroCtaVisible(false);
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const buttonVariants = {
    hidden: { x: '110%', opacity: 1 },
    visible: { x: 0, opacity: 1 },
  };

  const timerVariants = {
    hidden: { opacity: 0, filter: 'blur(5px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  };

  const navTransition = {
    duration: 0.4,
    ease: "easeInOut",
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 shadow-lg shadow-black/20 backdrop-blur-xl">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
           <AnimatePresence>
            {!isHeroCtaVisible && (
              <motion.div
                variants={timerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={navTransition}
                className="hidden md:flex"
              >
                <CountdownTimer targetDate={eventDate} compact />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <motion.nav 
          layout
          transition={navTransition}
          className="flex items-center gap-4"
        >
            <motion.div layout className="hidden md:flex items-center gap-4">
              <Link href="/#info" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Info</Link>
              <Link href="/#gallery" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Gallery</Link>
              <Link href="/#team" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Team</Link>
              <Link href="/#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">FAQ</Link>
              <Link href="/#contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Contact</Link>
            </motion.div>
            
            <AnimatePresence mode="popLayout">
                {!loading && (
                  user ? (
                    <motion.div key="account-btn" layout className="flex items-center gap-2">
                      <Button variant="ghost" asChild>
                        <Link href="/account">
                            <User className="mr-2 h-4 w-4"/>
                            My Account
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                          <LogOut className="h-4 w-4"/>
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div key="login-btn" layout>
                      <Button variant="ghost" asChild>
                        <Link href="/login">
                            Login
                        </Link>
                      </Button>
                    </motion.div>
                  )
                )}
            </AnimatePresence>

            <AnimatePresence>
              {!isHeroCtaVisible && (
                <motion.div
                  key="book-tickets-btn"
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={navTransition}
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
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;