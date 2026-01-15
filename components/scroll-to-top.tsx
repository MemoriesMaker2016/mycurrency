'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 group flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-500 ease-out hover:scale-110 hover:shadow-xl hover:shadow-primary/25 active:scale-95 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0 w-12 h-12 -rotate-90"
        viewBox="0 0 48 48"
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="opacity-20"
        />
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={138.23}
          strokeDashoffset={138.23 - (138.23 * (scrollProgress || 0)) / 100}
          className="transition-all duration-150 ease-out"
        />
      </svg>

      {/* Arrow icon with bounce animation on hover */}
      <ArrowUp className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5" />

      {/* Ripple effect on hover */}
      <span className="absolute inset-0 rounded-full bg-accent/20 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
    </button>
  );
}
