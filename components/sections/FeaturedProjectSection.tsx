'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function FeaturedProjectSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.featured-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-6xl mx-auto" id="projects">
      <h2 className="font-display text-4xl md:text-5xl font-bold text-gold mb-16 text-center">Featured Project: SwordEdge</h2>
      <div className="space-y-12">
        <div className="featured-item relative aspect-video bg-dark-grey rounded-sm overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-body text-foreground/60">SwordEdge Gameplay Trailer</p>
          </div>
        </div>
        <div className="featured-item grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square bg-dark-grey rounded-sm flex items-center justify-center">
              <p className="font-body text-foreground/60">Screenshot {i}</p>
            </div>
          ))}
        </div>
        <div className="featured-item">
          <h3 className="font-display text-2xl font-bold text-gold mb-4">Technical Breakdown</h3>
          <p className="font-body text-foreground/80 leading-relaxed">
            SwordEdge is a AAA action game built in Unreal Engine 5, featuring a custom combat system with 15+ unique attacks, parry mechanics, and dynamic enemy AI. Developed using C++ and Blueprints, with optimized performance for 60fps on mid-range hardware.
          </p>
        </div>
      </div>
    </section>
  );
}
