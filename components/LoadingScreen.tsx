'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false });

const LOADER_DURATION = 10800;
const BLACK_START_MS = 1000;
const LOADER_STAGES = [
  { label: 'Initializing Experience', threshold: 0 },
  { label: 'Loading Gameplay Systems', threshold: 0.28 },
  { label: 'Preparing Immersive Environment', threshold: 0.6 },
  { label: 'Entering Enhanced Experience', threshold: 0.84 },
];

export function LoadingScreen({ onLoadComplete }: { onLoadComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const diagnosticRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(LOADER_STAGES[0].label);
  const [cinematicVisible, setCinematicVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const cinematicDuration = prefersReducedMotion ? 7200 : LOADER_DURATION;
    let raf = 0;
    let completed = false;
    let minDurationPassed = false;
    let videoEnded = false;

    const container = containerRef.current;
    const flash = flashRef.current;
    const title = titleRef.current;
    const stage = stageRef.current;
    const progressTrack = progressTrackRef.current;
    const diagnostic = diagnosticRef.current;
    const videoEl = videoRef.current;
    const blackTimer = window.setTimeout(() => {
      setCinematicVisible(true);
      videoEl?.play().catch(() => {
        // muted autoplay should work, but if it doesn't we still keep the cinematic shell alive.
      });
    }, BLACK_START_MS);

    const minTimer = window.setTimeout(() => {
      minDurationPassed = true;
      if (videoEnded) {
        finishSequence();
      }
    }, cinematicDuration);

    gsap.fromTo(title, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: BLACK_START_MS / 1000 });
    gsap.fromTo(stage, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: BLACK_START_MS / 1000 + 0.25, ease: 'power3.out' });
    gsap.fromTo(progressTrack, { scaleX: 0.96, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1, delay: BLACK_START_MS / 1000 + 0.35, ease: 'power3.out' });
    gsap.fromTo(diagnostic, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: BLACK_START_MS / 1000 + 0.45, ease: 'power3.out' });

    const finishSequence = () => {
      if (completed) return;
      completed = true;

      gsap.to(flash, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.to(container, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: onLoadComplete,
          });
        },
      });
    };

    const handleLoaded = () => {
      if (!videoEl || !videoEl.duration || !isFinite(videoEl.duration)) return;
      const initialProgress = Math.min(100, (videoEl.currentTime / videoEl.duration) * 100);
      setProgress(initialProgress);
    };

    const handleTimeUpdate = () => {
      if (!videoEl || !videoEl.duration || !isFinite(videoEl.duration) || videoEl.duration <= 0) return;

      const ratio = videoEl.currentTime / videoEl.duration;
      setProgress(Math.min(100, ratio * 100));
      const nextStage = [...LOADER_STAGES].reverse().find((stage) => ratio >= stage.threshold) ?? LOADER_STAGES[0];
      setActiveStage(nextStage.label);
    };

    const handleEnded = () => {
      videoEnded = true;
      if (minDurationPassed) {
        finishSequence();
      }
    };

    const handleError = () => {
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = Math.min(now - startTime, cinematicDuration);
        const ratio = elapsed / cinematicDuration;
        setProgress(ratio * 100);
        const nextStage = [...LOADER_STAGES].reverse().find((stage) => ratio >= stage.threshold) ?? LOADER_STAGES[0];
        setActiveStage(nextStage.label);

        if (elapsed < cinematicDuration) {
          raf = requestAnimationFrame(tick);
        } else {
          finishSequence();
        }
      };

      raf = requestAnimationFrame(tick);
    };

    videoEl?.addEventListener('loadedmetadata', handleLoaded);
    videoEl?.addEventListener('timeupdate', handleTimeUpdate);
    videoEl?.addEventListener('ended', handleEnded);
    videoEl?.addEventListener('error', handleError);

    const fallbackTimer = window.setTimeout(() => {
      if (!videoEl || !videoEl.duration) {
        handleError();
      }
    }, BLACK_START_MS + 1200);

    return () => {
      clearTimeout(blackTimer);
      clearTimeout(minTimer);
      clearTimeout(fallbackTimer);
      videoEl?.removeEventListener('loadedmetadata', handleLoaded);
      videoEl?.removeEventListener('timeupdate', handleTimeUpdate);
      videoEl?.removeEventListener('ended', handleEnded);
      videoEl?.removeEventListener('error', handleError);
      cancelAnimationFrame(raf);
      gsap.killTweensOf([container, flash, title, stage, progressTrack, diagnostic]);
    };
  }, [onLoadComplete, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 overflow-hidden bg-black text-foreground">
      <div className="absolute inset-0 bg-black" />
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover cinematic-video-canvas transition-opacity duration-700"
        muted
        playsInline
        autoPlay
        loop={false}
        preload="auto"
        aria-hidden="true"
        style={{ opacity: cinematicVisible ? 1 : 0 }}
      >
        <source src="/assets/intro.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(201,162,39,0.12),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.82))]" />
      <div className={`absolute inset-0 transition-opacity duration-700 ${cinematicVisible ? 'opacity-100' : 'opacity-0'}`}>
        <ParticleBackground />
      </div>
      <div className={`cinematic-scanlines absolute inset-0 transition-opacity duration-700 ${cinematicVisible ? 'opacity-45' : 'opacity-0'}`} />
      <div className={`cinematic-vignette absolute inset-0 transition-opacity duration-700 ${cinematicVisible ? 'opacity-100' : 'opacity-0'}`} />

      <div className={`relative z-10 flex min-h-full items-end px-6 pb-10 sm:px-10 lg:items-center lg:px-16 lg:pb-0 transition-opacity duration-700 ${cinematicVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 xl:col-span-6 max-w-3xl">
            <div ref={titleRef} className="mb-7 space-y-4">
              <p className="text-[11px] uppercase tracking-[0.55em] text-gold/70">Cinematic System Boot</p>
              <h1 className="font-display text-5xl font-semibold leading-none text-gold sm:text-7xl lg:text-8xl">MS</h1>
              <p className="font-body text-base max-w-xl text-foreground/80 sm:text-lg">A premium immersive sequence is initializing for the next-generation portfolio experience.</p>
            </div>

            <div ref={progressTrackRef} className="p-0 bg-transparent border-none shadow-none sm:p-0">
              <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.34em] text-foreground/45">
                <span>Experience Progress</span>
                <span>{Math.floor(progress)}%</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[linear-gradient(90deg,#7d5d12_0%,#c9a227_48%,#f2d37a_100%)] transition-[width] duration-150" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.32em] text-gold/70">
                <span className="rounded-full border border-gold/20 bg-white/5 px-3 py-1">Black start</span>
                <span className="rounded-full border border-gold/20 bg-white/5 px-3 py-1">Fullscreen cinematic</span>
                <span className="rounded-full border border-gold/20 bg-white/5 px-3 py-1">Video-driven intro</span>
              </div>
            </div>
          </div>

            <div className="lg:col-span-5 xl:col-span-4 lg:col-start-8 flex flex-col gap-3">
              <div ref={stageRef} className="p-0 bg-transparent border-none shadow-none sm:p-0">
                <p className="text-[11px] uppercase tracking-[0.5em] text-gold/60">{activeStage}</p>
              </div>

              <div ref={diagnosticRef} className="px-0 py-0 bg-transparent border-none text-[11px] uppercase tracking-[0.4em] text-foreground/60">
                Initializing immersive experience...
              </div>
            </div>
        </div>
      </div>

      <div className={`absolute bottom-6 left-6 z-20 flex items-center gap-3 text-[11px] uppercase tracking-[0.36em] text-foreground/50 sm:left-10 transition-opacity duration-700 ${cinematicVisible ? 'opacity-100' : 'opacity-0'}`}>
        <span className="h-px w-12 bg-gradient-to-r from-gold/0 via-gold/70 to-gold/0" />
        <span>Initializing Experience</span>
      </div>

      <div ref={flashRef} className="pointer-events-none absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,rgba(255,240,199,0.95),rgba(201,162,39,0.45)_34%,rgba(0,0,0,0)_72%)] opacity-0" />
    </div>
  );
}