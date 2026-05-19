'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), { ssr: false });

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 56, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out' }
      );
      gsap.fromTo(
        subtitleRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, delay: 0.18, ease: 'power3.out' }
      );
      const buttonElements = buttonsRef.current ? Array.from(buttonsRef.current.children) : [];
      gsap.fromTo(
        buttonElements,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, delay: 0.45, ease: 'power3.out' }
      );
      // simplified hero animations
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden isolate bg-background" id="hero">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(201,162,39,0.18),transparent_28%),radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.05),transparent_22%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.78))]" />
      <HeroCanvas className="fixed inset-0 z-0 h-screen w-screen" />
      

      <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-20 sm:px-10 lg:px-12 xl:px-16">
        <div className="max-w-4xl pb-0 pt-6 lg:pb-0 lg:pt-0">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/20 bg-black/35 px-4 py-2 text-[11px] uppercase tracking-[0.45em] text-gold/75 backdrop-blur-md">
            Gameplay Systems Developer
          </div>

          <h1 ref={titleRef} className="font-display text-6xl font-semibold leading-[0.9] tracking-tight text-gold sm:text-8xl lg:text-9xl">
            Mohd Sheharyar
          </h1>

          <p ref={subtitleRef} className="mt-6 max-w-2xl font-body text-xl text-foreground/86 sm:text-2xl lg:text-3xl">
            Building immersive gameplay systems, VR experiences, and cinematic interactions inside Unreal Engine 5.
          </p>

          {/* explanatory paragraph removed for cleaner cinematic layout */}

          <div ref={buttonsRef} className="mt-8 flex flex-wrap gap-4">
            <motion.a
              href="#projects"
              className="rounded-sm border border-gold/20 bg-gold px-6 py-3 font-body font-semibold tracking-wide text-black shadow-[0_8px_40px_rgba(212,175,55,0.12)] transition-transform duration-200 hover:scale-[1.02]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Projects
            </motion.a>
            <motion.a
              href="/resume.pdf"
              className="rounded-sm border border-gold/45 bg-black/10 px-6 py-3 font-body font-semibold text-gold backdrop-blur-md transition duration-200 hover:border-gold hover:bg-gold/8"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Download Resume
            </motion.a>
            {/* recruiter toggle removed from hero actions */}
            <motion.a
              href="#contact"
              className="rounded-sm px-6 py-3 font-body text-foreground/75 transition duration-300 hover:text-foreground"
              whileHover={{ scale: 1.02 }}
            >
              Contact
            </motion.a>
          </div>

          {/* recruiter status badge removed for cleaner layout */}
        </div>
      </div>
    </section>
  );
}