"use client";

import { ReactNode, useEffect, useState } from "react";


interface ProviderProps {
  children: ReactNode;
}
export default function Provider({ children }: ProviderProps) {
  return <MSWComponent>{children}</MSWComponent>;
}

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { initMsw } = await import("__mocks__");
      await initMsw();
      setMswReady(true);
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  if (!mswReady) return null;

  return <>{children}</>;
};
