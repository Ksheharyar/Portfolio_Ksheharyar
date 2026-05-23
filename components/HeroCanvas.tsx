'use client';

import { useRef } from 'react';

type HeroCanvasProps = {
  className?: string;
};

export default function HeroCanvas({ className }: HeroCanvasProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={["overflow-hidden pointer-events-none", className].filter(Boolean).join(' ')}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover cinematic-video-canvas"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden="true"
        style={{ objectPosition: 'center 20%' }}
      >
        <source src="/assets/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(192,38,45,0.08),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.42))]" />
    </div>
  );
}
