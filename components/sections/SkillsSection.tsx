'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Unreal Engine 5', level: 95 },
  { name: 'Gameplay Systems', level: 90 },
  { name: 'C++', level: 85 },
  { name: 'Blueprint Systems', level: 92 },
  { name: 'VR Development', level: 88 },
  { name: 'Meta Quest Development', level: 85 },
  { name: 'World Space UI', level: 80 },
  { name: 'Technical Design', level: 87 },
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-item',
        { width: 0 },
        {
          width: (index) => `${skills[index].level}%`,
          duration: 1.5,
          ease: 'power2.out',
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
      <h2 className="font-display text-4xl md:text-5xl font-bold text-gold mb-16 text-center">Skills</h2>
      <div className="space-y-8">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-item">
            <div className="flex justify-between mb-2">
              <p className="font-body font-semibold text-foreground">{skill.name}</p>
              <p className="font-body text-gold">{skill.level}%</p>
            </div>
            <div className="h-2 bg-dark-grey rounded-full overflow-hidden">
              <div className="h-full bg-gold w-0" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
