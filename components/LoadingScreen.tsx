'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false });

export function LoadingScreen({ onLoadComplete }: { onLoadComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      onLoadComplete();
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(logoRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' });

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            gsap.to(containerRef.current, { opacity: 0, scale: 1.1, duration: 1, ease: 'power2.in', onComplete: onLoadComplete });
            return 100;
          }
          return prev + 2;
        });
      }, 30);

      gsap.to(progressRef.current, { width: '100%', duration: 1.5, ease: 'power2.inOut' });
    }, containerRef);

    return () => ctx.revert();
  }, [onLoadComplete, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
      <ParticleBackground />
      <div ref={logoRef} className="text-center">
        <h1 className="font-display text-6xl md:text-8xl font-bold text-gold mb-4">MS</h1>
        <p className="font-body text-xl md:text-2xl text-foreground/80">Mohd Sheharyar</p>
      </div>
      <div className="mt-12 w-64 h-1 bg-dark-grey rounded-full overflow-hidden">
        <div ref={progressRef} className="h-full bg-gold w-0" />
      </div>
      <p className="mt-4 font-body text-sm text-foreground/60">{progress}%</p>
    </div>
  );
}
