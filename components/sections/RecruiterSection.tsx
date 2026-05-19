'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function RecruiterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.recruiter-item',
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
    <section ref={sectionRef} className="py-24 px-4 max-w-6xl mx-auto" id="recruiter">
      <h2 className="font-display text-4xl md:text-5xl font-bold text-gold mb-16 text-center">Recruiter Mode</h2>
      <div className="recruiter-item p-8 bg-dark-grey rounded-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display text-2xl font-bold text-gold mb-4">Quick Links</h3>
            <div className="space-y-4">
              {[
                { label: 'Resume PDF', href: '/resume.pdf' },
                { label: 'Cover Letter PDF', href: '/cover-letter.pdf' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/mohdsheharyar' },
                { label: 'GitHub', href: 'https://github.com/mohdsheharyar' },
                { label: 'itch.io', href: 'https://mohdsheharyar.itch.io' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block font-body text-foreground hover:text-gold transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label} →
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-gold mb-4">Technical Highlights</h3>
            <ul className="space-y-2 font-body text-foreground/80">
              <li>• 3+ years Unreal Engine 5 development</li>
              <li>• Shipped 2 VR titles for Meta Quest</li>
              <li>• Expert in C++ and Blueprint systems</li>
              <li>• Combat mechanics and gameplay systems specialist</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
