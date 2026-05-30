"use client";
import { useEffect, useRef, useState } from "react";

export default function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1200;
        const steps = 40;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          setDisplay(Math.round((step / steps) * value));
          if (step >= steps) clearInterval(timer);
        }, duration / steps);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
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
