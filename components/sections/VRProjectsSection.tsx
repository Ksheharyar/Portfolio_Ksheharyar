'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const vrProjects = [
  {
    title: 'VR Clothing Try-On Simulation',
    description: 'Real-time cloth simulation with physics-based interactions for Meta Quest 3.',
    features: ['Cloth Physics', 'Hand Tracking', 'Real-time Rendering'],
  },
  {
    title: 'VR Keyboard Interaction System',
    description: 'Virtual keyboard with haptic feedback and natural typing mechanics.',
    features: ['Haptic Feedback', 'Gesture Recognition', 'UI Optimization'],
  },
  {
    title: 'World Space UI System',
    description: 'Immersive UI elements that exist in 3D space with adaptive scaling.',
    features: ['3D UI Elements', 'Adaptive Scaling', 'Performance Optimized'],
  },
];

export function VRProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.vr-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
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
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-6xl mx-auto">
      <h2 className="font-display text-4xl md:text-5xl font-bold text-gold mb-16 text-center">VR Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {vrProjects.map((project) => (
          <motion.div
            key={project.title}
            className="vr-item p-6 bg-dark-grey rounded-sm"
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className="aspect-video bg-medium-grey rounded-sm mb-6 flex items-center justify-center">
              <p className="font-body text-foreground/60">VR Demo</p>
            </div>
            <h3 className="font-display text-xl font-bold text-gold mb-4">{project.title}</h3>
            <p className="font-body text-foreground/80 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.features.map((feature) => (
                <span key={feature} className="px-3 py-1 bg-gold/10 text-gold text-sm rounded-sm">
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
