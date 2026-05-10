'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useRecruiter } from '@/components/RecruiterProvider';

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), { ssr: false });

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { recruiterMode, toggleRecruiterMode } = useRecruiter();

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
    <section ref={sectionRef} className="relative h-screen flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-grey/50 to-background z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(201,162,39,0.14),transparent_28%),radial-gradient(circle_at_50%_70%,rgba(255,255,255,0.03),transparent_24%),linear-gradient(180deg,rgba(5,5,5,0.08),rgba(5,5,5,0.88))] z-0" />
      <div className="absolute inset-0 opacity-40 z-0 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />

      <div className="relative z-20 px-6 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-6 text-left">
          <h1 ref={titleRef} className="font-display text-5xl md:text-7xl lg:text-9xl font-bold text-gold mb-6">
            Mohd Sheharyar
          </h1>
          <p ref={subtitleRef} className="font-body text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-8">
            Building Interactive Worlds Through Gameplay &amp; VR
          </p>
          <div ref={buttonsRef} className="flex flex-wrap gap-4">
            <motion.a
              href="#projects"
              className="px-6 py-3 bg-gold text-background font-body font-semibold rounded-sm hover:bg-gold-light transition-colors duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Projects
            </motion.a>
            <motion.a
              href="/resume.pdf"
              className="px-6 py-3 bg-transparent border border-gold text-gold font-body font-semibold rounded-sm hover:brightness-110 transition duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Download Resume
            </motion.a>
            <motion.button
              onClick={toggleRecruiterMode}
              className="px-6 py-3 bg-gold/10 border border-gold text-gold font-body font-semibold rounded-sm hover:bg-gold/20 transition duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {recruiterMode ? 'Exit Recruiter Mode' : 'Recruiter Mode'}
            </motion.button>
            <motion.a
              href="#contact"
              className="px-6 py-3 bg-transparent text-foreground/80 font-body rounded-sm hover:text-foreground transition duration-300"
              whileHover={{ scale: 1.02 }}
            >
              Contact
            </motion.a>
          </div>
        </div>

        <div className="lg:col-span-6 relative h-96 lg:h-[640px] rounded-md overflow-hidden border border-gold/10 bg-black/30 shadow-2xl shadow-black/45">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,162,39,0.08),transparent_58%)]" />
          <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.35))] pointer-events-none" />
          {!recruiterMode && <HeroCanvas />}
          {recruiterMode && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-20">
              <div className="text-center px-6">
                <h3 className="text-2xl font-semibold text-gold mb-2">Recruiter Mode Active</h3>
                <p className="text-foreground/70">Simplified view enabled for quick resume access.</p>
              </div>
            </div>
          )}
          <div className="absolute bottom-4 left-4 z-20 rounded-full border border-gold/20 bg-black/40 px-3 py-1 text-[11px] tracking-[0.35em] uppercase text-gold/75 backdrop-blur-sm">
            Character Asset Active
          </div>
        </div>
      </div>
    </section>
  );
}
