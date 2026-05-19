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
      >
        <source src="/assets/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(212,175,55,0.06),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.56))]" />
    </div>
  );
}
