'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import CountdownTimer from './CountdownTimer';

const navItems = [
  { href: '/', label: 'Home', targetId: 'hero' },
  { href: '/#lineup', label: 'Lineup', targetId: 'lineup' },
  { href: '/#gallery', label: 'Gallery', targetId: 'gallery' },
  { href: '/#faq', label: 'FAQ', targetId: 'faq' },
];

const Header = () => {
  const [isHeroCtaVisible, setIsHeroCtaVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') {
      setActivePath(pathname);
      setIsHeroCtaVisible(false);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      return;
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.target.id === 'heroBookBtn') {
          setIsHeroCtaVisible(entry.isIntersecting);
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
    
    const elementsToObserve = navItems
      .map(item => item.targetId)
      .concat('heroBookBtn')
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
    
    if (href.startsWith('/#')) {
        const id = href.split('#')[1];
        if (id) {
          const element = document.getElementById(id);
          if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
          }
        }
    } else {
      // It's a page link
      const targetElement = document.querySelector(href);
       if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 max-w-screen-xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between rounded-full bg-background/30 px-6 shadow-lg shadow-black/20 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-6 flex-1">
            <Logo />
          </div>
          
          <nav className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-full">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary-foreground px-4 py-1.5 rounded-full"
              >
                {(item.href === activePath || (item.href.includes('#') && activePath.startsWith(item.href))) && (
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

          <div className="flex items-center gap-4 flex-1 justify-end">
             <AnimatePresence>
                {!isHeroCtaVisible && (
                  <motion.div
                    key="book-tickets-btn-header"
                    initial={{ opacity: 0, width: 40, borderRadius: '100%' }}
                    animate={{
                      opacity: 1,
                      width: 'auto',
                      borderRadius: '9999px',
                      transition: {
                        opacity: { duration: 0.2, delay: 0.1 },
                        width: { duration: 0.3, delay: 0.2, ease: 'circOut' },
                      },
                    }}
                    exit={{
                      opacity: 0,
                      width: 40,
                      borderRadius: '100%',
                      transition: {
                        opacity: { duration: 0.1 },
                        width: { duration: 0.3, ease: 'circIn' },
                      },
                    }}
                    className="hidden md:block overflow-hidden"
                  >
                    <Button asChild className="font-bold bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground border-none rounded-full whitespace-nowrap h-10">
                        <Link href="/tickets">
                           <motion.span initial={{opacity: 0}} animate={{opacity: 1, transition:{delay: 0.4}}} exit={{opacity:0, transition: {duration: 0.1}}}>
                            Book Tickets
                           </motion.span>
                        </Link>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
             <Button asChild className="hidden md:block rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                <Link href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}>
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
                  <Link key={item.label} href={item.href} className="text-lg font-medium text-foreground transition-colors hover:text-primary" onClick={() => handleNavClick(item.href)}>
                    {item.label}
                  </Link>
                ))}
                 <Link href="#contact" className="text-lg font-medium text-foreground transition-colors hover:text-primary" onClick={() => handleNavClick('#contact')}>
                    Contact
                  </Link>
              </nav>
               <Button asChild className="w-full mt-8 font-bold">
                  <Link href="/tickets" onClick={() => setIsMenuOpen(false)}>
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
