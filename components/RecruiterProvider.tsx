'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type RecruiterContextType = {
  recruiterMode: boolean;
  toggleRecruiterMode: () => void;
};

const RecruiterContext = createContext<RecruiterContextType>({ recruiterMode: false, toggleRecruiterMode: () => {} });

export function RecruiterProvider({ children }: { children: ReactNode }) {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const toggleRecruiterMode = () => setRecruiterMode((v) => !v);

  return <RecruiterContext.Provider value={{ recruiterMode, toggleRecruiterMode }}>{children}</RecruiterContext.Provider>;
}

export function useRecruiter() {
  return useContext(RecruiterContext);
}
