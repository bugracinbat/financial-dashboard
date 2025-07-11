import { useEffect } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
}

export function usePerformanceMonitor() {
  useEffect(() => {
    // Track performance metrics
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          const metrics: PerformanceMetrics = {
            loadTime: navEntry.loadEventEnd - navEntry.loadEventStart,
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
          };
          
          // Log metrics in development
          if (import.meta.env.DEV) {
            console.log('Performance Metrics:', metrics);
          }
        }
        
        if (entry.entryType === 'paint') {
          const paintEntry = entry as PerformancePaintTiming;
          if (import.meta.env.DEV) {
            console.log(`${paintEntry.name}:`, paintEntry.startTime);
          }
        }
        
        if (entry.entryType === 'largest-contentful-paint') {
          const lcpEntry = entry as PerformanceEntry;
          if (import.meta.env.DEV) {
            console.log('Largest Contentful Paint:', lcpEntry.startTime);
          }
        }
      });
    });

    // Observe different performance entry types
    try {
      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
    } catch (e) {
      // Fallback for browsers that don't support all entry types
      try {
        observer.observe({ entryTypes: ['navigation', 'paint'] });
      } catch (e) {
        console.warn('Performance Observer not supported');
      }
    }

    // Track Core Web Vitals
    if ('web-vital' in window) {
      // This would integrate with a real web vitals library
      // For now, we'll just log basic metrics
    }

    return () => {
      observer.disconnect();
    };
  }, []);
}

// Hook for component-level performance tracking
export function useComponentPerformance(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (import.meta.env.DEV && renderTime > 16) {
        console.warn(`${componentName} took ${renderTime.toFixed(2)}ms to render (>16ms)`);
      }
    };
  });
}