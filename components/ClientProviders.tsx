'use client';

import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LenisProvider } from './LenisProvider';
import { RecruiterProvider } from './RecruiterProvider';

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <RecruiterProvider>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </RecruiterProvider>
    </LenisProvider>
  );
}
