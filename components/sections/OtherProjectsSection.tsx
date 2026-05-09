'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const otherProjects = [
  { title: 'Key to Escape', description: 'Puzzle-adventure game with escape room mechanics.' },
  { title: "Dragon's Curse", description: 'Action RPG with dragon transformation system.' },
  { title: 'Android Game', description: 'Mobile casual game with 10k+ downloads.' },
  { title: 'Cinematic Storytelling Project', description: 'Short film using Unreal Engine 5 cinematics.' },
];

export function OtherProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.other-item',
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
    <section ref={sectionRef} className="py-24 px-4 max-w-6xl mx-auto bg-dark-grey/30">
      <h2 className="font-display text-4xl md:text-5xl font-bold text-gold mb-16 text-center">Other Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {otherProjects.map((project) => (
          <motion.div
            key={project.title}
            className="other-item p-6 bg-dark-grey rounded-sm"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <div className="aspect-square bg-medium-grey rounded-sm mb-6 flex items-center justify-center">
              <p className="font-body text-foreground/60">Project</p>
            </div>
            <h3 className="font-display text-xl font-bold text-gold mb-2">{project.title}</h3>
            <p className="font-body text-foreground/80 text-sm">{project.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
