'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const downloads = [
  { label: 'Resume PDF', size: '2.4 MB', href: '/resume.pdf' },
  { label: 'Cover Letter PDF', size: '1.2 MB', href: '/cover-letter.pdf' },
  { label: 'Portfolio PDF', size: '15.8 MB', href: '/portfolio.pdf' },
  { label: 'Project Documentation', size: '8.3 MB', href: '/project-docs.pdf' },
  { label: 'Technical Breakdown', size: '5.1 MB', href: '/technical-breakdown.pdf' },
];

export function DownloadSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.download-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
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
    <section ref={sectionRef} className="py-24 px-4 max-w-6xl mx-auto bg-dark-grey/30">
      <h2 className="font-display text-4xl md:text-5xl font-bold text-gold mb-16 text-center">Download Center</h2>
      <div className="space-y-4">
        {downloads.map((file) => (
          <motion.a
            key={file.label}
            href={file.href}
            className="download-item flex items-center justify-between p-6 bg-dark-grey rounded-sm hover:bg-medium-grey transition-colors duration-300"
            whileHover={{ x: 10 }}
          >
            <div>
              <p className="font-body font-semibold text-foreground">{file.label}</p>
              <p className="font-body text-sm text-foreground/60">{file.size}</p>
            </div>
            <span className="font-body text-gold">Download →</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
