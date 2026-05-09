'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        y: '-20%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' });
      gsap.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, delay: 0.3, ease: 'power3.out' });
      const buttonElements = buttonsRef.current ? Array.from(buttonsRef.current.children) : [];
      gsap.fromTo(buttonElements, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, delay: 0.6, ease: 'power3.out' });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-grey/50 to-background z-10" />
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20 z-0" />

      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        <h1 ref={titleRef} className="font-display text-5xl md:text-7xl lg:text-9xl font-bold text-gold mb-6">
          Mohd Sheharyar
        </h1>
        <p ref={subtitleRef} className="font-body text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-12">
          Gameplay Systems Developer | VR Developer | Unreal Engine 5 Developer
        </p>
        <div ref={buttonsRef} className="flex flex-wrap justify-center gap-6">
          {[
            { label: 'Explore Projects', href: '#projects' },
            { label: 'Download Resume', href: '/resume.pdf' },
            { label: 'Recruiter Mode', href: '#recruiter' },
            { label: 'Contact', href: '#contact' },
          ].map((button) => (
            <motion.a
              key={button.label}
              href={button.href}
              className="px-8 py-4 bg-gold text-background font-body font-semibold rounded-sm hover:bg-gold-light transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {button.label}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
