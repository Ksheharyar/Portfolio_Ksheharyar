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
      <HeroCanvas className="fixed inset-0 z-0 h-[100svh] w-screen" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_22%_16%,rgba(192,38,45,0.2),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(243,207,88,0.12),transparent_20%),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.74))]" />

      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-7xl items-start px-5 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-16 xl:px-16 xl:pt-20">
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7 xl:col-span-6 max-w-3xl rounded-[28px] border border-white/10 bg-black/28 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold/18 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.6em] text-gold/75 backdrop-blur-md">
              Gameplay Systems Developer
            </div>

            <h1 ref={titleRef} className="max-w-[7.5ch] font-display text-6xl font-semibold leading-[0.86] tracking-tight text-gold sm:text-7xl lg:text-8xl xl:text-[7.25rem]">
              Mohd Sheharyar
            </h1>

            <p ref={subtitleRef} className="mt-5 max-w-2xl font-body text-lg text-foreground/86 sm:text-xl lg:text-2xl">
              Building immersive gameplay systems, VR experiences, and cinematic interactions inside Unreal Engine 5.
            </p>

            <div ref={buttonsRef} className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <motion.a
                href="#projects"
                className="rounded-full border border-[#f3cf58]/18 bg-[#f3cf58] px-5 py-3 font-body text-sm font-semibold tracking-wide text-black shadow-[0_10px_40px_rgba(243,207,88,0.16)] transition-transform duration-200 hover:scale-[1.02]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Projects
              </motion.a>
              <motion.a
                href="/resume.pdf"
                className="rounded-full border border-white/14 bg-black/25 px-5 py-3 font-body text-sm font-semibold text-[#f3cf58] backdrop-blur-md transition duration-200 hover:border-[#f3cf58] hover:bg-[#f3cf58]/10"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Download Resume
              </motion.a>
              <motion.a
                href="#contact"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-body text-sm font-semibold text-foreground/82 backdrop-blur-md transition duration-200 hover:bg-white/10 hover:text-foreground"
                whileHover={{ scale: 1.02 }}
              >
                Contact
              </motion.a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.34em] text-gold/72">
              <span className="rounded-full border border-gold/15 bg-white/5 px-3 py-1">Gameplay systems</span>
              <span className="rounded-full border border-gold/15 bg-white/5 px-3 py-1">VR interaction</span>
              <span className="rounded-full border border-gold/15 bg-white/5 px-3 py-1">Cinematic pacing</span>
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 lg:col-start-8 lg:mt-24 rounded-[28px] border border-white/10 bg-black/22 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6">
            <p className="text-[11px] uppercase tracking-[0.6em] text-gold/70">Live Atmosphere</p>
            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                <p className="text-[11px] uppercase tracking-[0.45em] text-foreground/55">Focus</p>
                <p className="mt-2 font-display text-2xl leading-tight text-foreground">Gameplay systems, VR, cinematic interaction</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-gold/65">Style</p>
                  <p className="mt-2 font-body text-sm text-foreground/78">Dark ember, gold, glass</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-gold/65">Mode</p>
                  <p className="mt-2 font-body text-sm text-foreground/78">Video-first homepage</p>
                </div>
              </div>
              <div className="rounded-2xl border border-gold/12 bg-gradient-to-br from-white/5 to-black/35 p-4 text-[11px] uppercase tracking-[0.34em] text-foreground/60">
                Full-screen video stage with minimal UI, keeping the character visible.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}