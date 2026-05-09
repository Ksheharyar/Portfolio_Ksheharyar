'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-item',
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

  const onSubmit = (data: ContactForm) => {
    console.log('Form submitted:', data);
    alert('Message sent successfully!');
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-6xl mx-auto" id="contact">
      <h2 className="font-display text-4xl md:text-5xl font-bold text-gold mb-16 text-center">Contact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="font-display text-2xl font-bold text-gold mb-6">Get In Touch</h3>
          <p className="font-body text-foreground/80 mb-8">
            Interested in working together? Reach out for collaborations, job opportunities, or just to say hi.
          </p>
          <div className="space-y-4">
            {[
              { label: 'LinkedIn', href: 'https://linkedin.com/in/mohdsheharyar' },
              { label: 'GitHub', href: 'https://github.com/mohdsheharyar' },
              { label: 'Email', href: 'mailto:mohd.sheharyar@example.com' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="contact-item block font-body text-foreground hover:text-gold transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label} →
              </a>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="contact-item">
            <label htmlFor="name" className="block font-body text-foreground mb-2">Name</label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="w-full p-4 bg-dark-grey rounded-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
            />
            {errors.name && <p className="mt-2 font-body text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div className="contact-item">
            <label htmlFor="email" className="block font-body text-foreground mb-2">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full p-4 bg-dark-grey rounded-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
            />
            {errors.email && <p className="mt-2 font-body text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="contact-item">
            <label htmlFor="message" className="block font-body text-foreground mb-2">Message</label>
            <textarea
              id="message"
              rows={5}
              {...register('message')}
              className="w-full p-4 bg-dark-grey rounded-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-gold resize-none"
            />
            {errors.message && <p className="mt-2 font-body text-sm text-red-500">{errors.message.message}</p>}
          </div>
          <motion.button
            type="submit"
            className="contact-item px-8 py-4 bg-gold text-background font-body font-semibold rounded-sm hover:bg-gold-light transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </form>
      </div>
    </section>
  );
}
