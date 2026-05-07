import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(
  selector: string,
  options?: {
    y?: number;
    stagger?: number;
    duration?: number;
    delay?: number;
    start?: string;
  }
) {
  useEffect(() => {
    const { y = 40, stagger = 0.08, duration = 0.8, delay = 0, start = 'top 85%' } = options || {};
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.from(elements, {
        y,
        opacity: 0,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elements[0].parentElement || elements[0],
          start,
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, [selector, options]);
}
