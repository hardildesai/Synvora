
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';


const navItems = [
  { href: '/', label: 'Home', targetId: 'hero' },
  { href: '/#lineup', label: 'Lineup', targetId: 'lineup' },
  { href: '/#gallery', label: 'Gallery', targetId: 'gallery' },
  { href: '/#faq', label: 'FAQ', targetId: 'faq' },
];

const Header = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');
  const [isMounted, setIsMounted] = useState(false);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();


  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (pathname !== '/') {
      setActivePath(pathname);
      setIsHeroVisible(false);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      return;
    }
    
    setActivePath('/');

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.target.id === 'hero') {
          setIsHeroVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            setActivePath('/');
          }
        } else {
            if (entry.isIntersecting) {
                const navItem = navItems.find(item => item.targetId === entry.target.id);
                if (navItem) {
                    setActivePath(navItem.href);
                }
            }
        }
      });
    };

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    });

    const elementsToObserve = ['hero']
      .concat(navItems.map(item => item.targetId))
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    elementsToObserve.forEach(el => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    setActivePath(href);
    if(isMenuOpen) setIsMenuOpen(false);
    
    if (href.startsWith('/#') || href === '/') {
        router.push('/');
        setTimeout(() => {
          const id = href.startsWith('/#') ? href.split('#')[1] : 'hero';
          const element = document.getElementById(id);
          if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
    } else {
       router.push(href);
    }
  }
  
  const renderAuthButton = () => {
    if (loading) return null;

    if (user) {
      return (
        <Button asChild className="hidden md:block rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
          <Link href="/account">
            My Account
          </Link>
        </Button>
      );
    }

    return (
      <Button asChild className="hidden md:block rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
        <Link href="/login">
          Sign In
        </Link>
      </Button>
    );
  };

  if (!isMounted) {
    return (
      <header className="fixed top-4 inset-x-0 z-50 max-w-screen-xl mx-auto px-4">
        <div className="flex h-16 items-center rounded-full bg-background/30 px-6 shadow-lg shadow-black/20 backdrop-blur-xl border border-white/10">
           <div className="flex items-center justify-center w-full">
              <Logo />
            </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 max-w-screen-xl mx-auto px-4">
        <div className="flex h-16 items-center rounded-full bg-background/30 px-6 shadow-lg shadow-black/20 backdrop-blur-xl border border-white/10">
          {pathname === '/' ? (
            <>
              <div className="flex items-center gap-6 flex-1">
                <Logo />
              </div>
            
              <nav className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-full">
                {navItems.map((item) => (
                  <button key={item.label} onClick={() => handleNavClick(item.href)}
                    className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary-foreground px-4 py-1.5 rounded-full"
                  >
                    {(activePath === item.href) && (
                       <motion.span
                        layoutId="active-nav-link"
                        className="absolute inset-0 bg-primary/70 rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                     <span className="relative z-10">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-4 flex-1 justify-end">
                <AnimatePresence>
                  {!isHeroVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Button asChild variant="outline" className="rounded-full border-accent text-accent hover:text-accent-foreground hover:bg-accent">
                        <Link href="/tickets">
                          Book Tickets
                        </Link>
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
                {renderAuthButton()}
                <div className="md:hidden">
                  <Button onClick={() => setIsMenuOpen(true)} variant="ghost" size="icon" className="text-white">
                    <Menu />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center w-full">
              <Logo />
            </div>
          )}
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
                {pathname === '/' ? (
                  <>
                    {navItems.map((item) => (
                      <button key={item.label} className="text-left text-lg font-medium text-foreground transition-colors hover:text-primary" onClick={() => handleNavClick(item.href)}>
                        {item.label}
                      </button>
                    ))}
                  </>
                ) : (
                  <Link href="/" className="text-lg font-medium text-foreground transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                )}
              </nav>
              <div className="mt-8 space-y-4">
                 <Button asChild className="w-full font-bold">
                    <Link href="/tickets" onClick={() => setIsMenuOpen(false)}>
                      Book Tickets
                    </Link>
                </Button>
                 {user ? (
                   <Button asChild variant="outline" className="w-full font-bold">
                      <Link href="/account" onClick={() => setIsMenuOpen(false)}>
                        My Account
                      </Link>
                    </Button>
                 ) : (
                    <Button asChild variant="outline" className="w-full font-bold">
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                 )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
