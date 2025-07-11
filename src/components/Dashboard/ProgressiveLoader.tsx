import { useState, useEffect, ReactNode } from "react";

interface ProgressiveLoaderProps {
  children: ReactNode;
  fallback: ReactNode;
  delay?: number;
}

export default function ProgressiveLoader({
  children,
  fallback,
  delay = 100,
}: ProgressiveLoaderProps) {
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (showFallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}