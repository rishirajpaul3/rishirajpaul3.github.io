"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on desktop (pointer: fine)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let isHovering = false;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top  = my + "px";
      }
    };

    const onEnter = () => { isHovering = true; };
    const onLeave = () => { isHovering = false; };

    const targets = () => document.querySelectorAll("a, button, [data-cursor]");
    const addListeners = () => targets().forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });

    addListeners();
    document.addEventListener("mousemove", onMove);

    const animate = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top  = ry + "px";
        const size = isHovering ? 44 : 24;
        ringRef.current.style.width  = size + "px";
        ringRef.current.style.height = size + "px";
        ringRef.current.style.borderColor = isHovering
          ? "rgba(201,150,59,0.7)"
          : "rgba(201,150,59,0.25)";
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // Hide system cursor
    document.body.style.cursor = "none";
    document.querySelectorAll("a, button, input, textarea, select").forEach(el => {
      (el as HTMLElement).style.cursor = "none";
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      targets().forEach(el => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        style={{
          position: "fixed", zIndex: 99999,
          width: 5, height: 5,
          background: "var(--gold)",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          top: 0, left: 0,
        }}
      />
      {/* Ring — lags behind (magnetic feel) */}
      <div
        ref={ringRef}
        style={{
          position: "fixed", zIndex: 99998,
          width: 24, height: 24,
          border: "1px solid rgba(201,150,59,0.25)",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transition: "width 0.22s ease, height 0.22s ease, border-color 0.22s ease",
          top: 0, left: 0,
        }}
      />
    </>
  );
}
