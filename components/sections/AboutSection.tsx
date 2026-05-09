'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-item',
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

  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '15+', label: 'Projects Completed' },
    { value: '500+', label: 'Hours VR Development' },
    { value: '10+', label: 'Blueprint Systems' },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-6xl mx-auto">
      <h2 className="font-display text-4xl md:text-5xl font-bold text-gold mb-16 text-center">About Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="about-item">
          <p className="font-body text-lg text-foreground/80 leading-relaxed">
            I'm Mohd Sheharyar, a passionate Gameplay Systems Developer, VR Developer, and Unreal Engine 5 specialist. I craft immersive, high-performance gameplay experiences with a focus on combat mechanics, VR interaction systems, and technical design. My work blends creative vision with technical precision to deliver AAA-quality results.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="about-item p-6 bg-dark-grey rounded-sm text-center">
              <p className="font-display text-4xl md:text-5xl font-bold text-gold mb-2">{stat.value}</p>
              <p className="font-body text-sm text-foreground/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
