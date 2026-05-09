'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
  { year: '2021', title: 'Started Game Development', description: 'Began learning Unreal Engine 4 and C++.' },
  { year: '2022', title: 'First VR Project', description: 'Developed first VR interaction system for Meta Quest 2.' },
  { year: '2023', title: 'UE5 Transition', description: 'Migrated to Unreal Engine 5 and mastered Lumen/Nanite.' },
  { year: '2024', title: 'SwordEdge Development', description: 'Started work on AAA action game SwordEdge.' },
  { year: '2025', title: 'Professional Work', description: 'Joined game studio as Gameplay Systems Developer.' },
];

export function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.journey-item',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.journey-line',
        { height: 0 },
        {
          height: '100%',
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-6xl mx-auto">
      <h2 className="font-display text-4xl md:text-5xl font-bold text-gold mb-16 text-center">Development Journey</h2>
      <div className="relative">
        <div className="journey-line absolute left-4 md:left-1/2 top-0 w-1 bg-gold/30 h-full -translate-x-1/2" />
        <div className="space-y-12">
          {journeySteps.map((step, index) => (
            <div
              key={step.year}
              className={`journey-item flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className="hidden md:block w-1/2" />
              <div className="relative pl-12 md:pl-0 md:w-1/2">
                <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 bg-gold rounded-full -translate-x-1/2 flex items-center justify-center">
                  <span className="font-body text-background text-sm font-bold">{step.year}</span>
                </div>
                <div className="p-6 bg-dark-grey rounded-sm ml-4 md:ml-12">
                  <h3 className="font-display text-xl font-bold text-gold mb-2">{step.title}</h3>
                  <p className="font-body text-foreground/80">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
