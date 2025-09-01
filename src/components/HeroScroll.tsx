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

  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const position = useTransform(scrollYProgress, (pos) =>
    pos === 1 ? 'relative' : 'sticky'
  );
  const titleY = useTransform(scrollYProgress, [0, 0.3], ['0%', '-50%']);

  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.4], ['20px', '0px']);

  return (
    <div ref={targetRef} className="relative min-h-[200vh] w-full">
      <motion.div
        style={{
          position,
          scale,
          opacity,
          y: titleY,
        }}
        className="top-0 flex h-screen flex-col items-center justify-center"
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
  );
};

export default HeroScroll;
