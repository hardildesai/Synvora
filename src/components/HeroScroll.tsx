'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HeroScroll = ({ children }: { children: React.ReactNode }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  // Scale the title from 100% down to 80% over the first 30% of the scroll
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  
  // Keep opacity at 1 until 30% scrolled, then fade slightly to 0.9, but don't disappear.
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.35], [1, 1, 0.9]);
  
  // Keep the title sticky until the scroll container is passed
  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 1 ? 'relative' : 'sticky'
  );
  
  // Move the title up as you scroll
  const titleY = useTransform(scrollYProgress, [0, 0.3], ['0%', '-50%']);

  // Fade in the content after the title has settled
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.2], ['40px', '0px']);

  return (
    <div ref={targetRef} className="relative h-[200vh] w-full">
      <motion.div
        style={{
          position,
          scale,
          opacity,
          y: titleY,
        }}
        className="top-0 flex h-screen w-full flex-col items-center justify-start pt-48 left-0"
      >
        <div className="container relative z-20 px-4 md:px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter font-headline text-white drop-shadow-[0_2px_10px_hsl(var(--primary))]">
            Synvora
          </h1>
          <p className="mt-4 max-w-[700px] mx-auto text-lg md:text-xl text-neutral-300 font-bold">
            Where Music Meets Experience
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="font-bold text-lg px-8 py-6 transition-transform transform hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_hsl(var(--primary))] hover:shadow-[0_0_30px_hsl(var(--primary))]">
              <Link href="/tickets">Book Your Tickets Now</Link>
            </Button>
          </div>
        </div>
      </motion.div>
      <div className="absolute top-[100vh] left-0 w-full">
        <motion.div
            style={{
            opacity: contentOpacity,
            y: contentY,
            }}
            className="relative z-10"
        >
            {children}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroScroll;
