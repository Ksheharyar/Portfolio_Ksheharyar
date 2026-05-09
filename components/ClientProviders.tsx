'use client';

import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LenisProvider } from './LenisProvider';

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </LenisProvider>
  );
}
