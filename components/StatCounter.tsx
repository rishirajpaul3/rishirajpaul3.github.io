"use client";
import { useEffect, useRef, useState } from "react";

export default function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    // Small delay ensures hydration is complete before observing
    const setup = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1400;
            const steps = 50;
            let step = 0;
            const timer = setInterval(() => {
              step++;
              // Ease out: slow down near the end
              const progress = 1 - Math.pow(1 - step / steps, 3);
              setDisplay(Math.round(progress * value));
              if (step >= steps) {
                setDisplay(value);
                clearInterval(timer);
              }
            }, duration / steps);
          }
        },
        { threshold: 0, rootMargin: "0px 0px -20px 0px" }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, 200);

    return () => clearTimeout(setup);
  }, [value]);

  return (
    <div
      ref={ref}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 32,
        fontWeight: 700,
        color: "var(--text)",
        lineHeight: 1,
        letterSpacing: "-0.02em",
      }}
    >
      {display}{suffix}
    </div>
  );
}
