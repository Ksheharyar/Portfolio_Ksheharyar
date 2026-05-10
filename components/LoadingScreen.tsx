'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false });
const LoaderScene = dynamic(() => import('@/components/LoaderScene'), { ssr: false });

export function LoadingScreen({ onLoadComplete }: { onLoadComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const flashRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      onLoadComplete();
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(logoRef.current, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' });

      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = Math.min(prev + (1 + Math.random() * 3), 100);
          if (next >= 100) {
            clearInterval(interval);
            // cinematic flash transition (Option B default: camera enters headlights)
            gsap.to(flashRef.current, { opacity: 1, duration: 0.25, ease: 'power2.in', onComplete: () => {
              gsap.to(containerRef.current, { opacity: 0, duration: 0.6, ease: 'power2.in', onComplete: onLoadComplete });
            }});
            return 100;
          }
          return next;
        });
      }, 35);
    }, containerRef);

    return () => ctx.revert();
  }, [onLoadComplete, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <ParticleBackground />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-5xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 text-left z-20">
              <div ref={logoRef} className="text-left">
                <h1 className="font-display text-6xl md:text-8xl font-bold text-gold mb-2">MS</h1>
                <p className="font-body text-lg md:text-xl text-foreground/80">Initializing Experience</p>
              </div>

              <div className="mt-6">
                <div className="w-full h-2 bg-dark-grey rounded-full overflow-hidden">
                  <div style={{ width: `${progress}%` }} className="h-full bg-gold transition-all duration-300" />
                </div>
                <p className="mt-3 text-sm text-foreground/60">Loading Gameplay Modules • Initializing VR Runtime • Environment Ready</p>
              </div>
            </div>

            <div className="lg:col-span-6 relative h-64 lg:h-[460px] rounded-md overflow-hidden">
              <div className="absolute inset-0 z-10 pointer-events-none">
                {/* LoaderScene renders the 3D car approaching based on `progress` */}
                <LoaderScene progress={progress} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-center">
        <p className="font-body text-sm text-foreground/60">{Math.floor(progress)}%</p>
      </div>

      <div ref={flashRef} className="pointer-events-none absolute inset-0 bg-white opacity-0 z-40" />
    </div>
  );
}
