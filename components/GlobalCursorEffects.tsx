"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

export default function GlobalCursorEffects() {
  const dotRef = useRef<HTMLDivElement>(null);
  const effectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target: Point = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let raf = 0;

    const animate = () => {
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      raf = requestAnimationFrame(animate);
    };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (finePointer) document.documentElement.classList.add("cursor-visible");
    };

    const onLeave = () => document.documentElement.classList.remove("cursor-visible");
    const onEnter = () => finePointer && document.documentElement.classList.add("cursor-visible");

    const onHover = (event: PointerEvent) => {
      if (!finePointer) return;
      const element = event.target as Element | null;
      const interactive = element?.closest("a, button, [role='button'], input, textarea, select");
      document.documentElement.classList.toggle("cursor-hovering", Boolean(interactive));
    };

    const onDown = (event: PointerEvent) => {
      const host = effectsRef.current;
      if (!host || reducedMotion) return;

      const burst = document.createElement("span");
      burst.className = "click-burst";
      burst.style.left = `${event.clientX}px`;
      burst.style.top = `${event.clientY}px`;

      const ripple = document.createElement("i");
      ripple.className = "click-ripple";
      burst.appendChild(ripple);

      const core = document.createElement("i");
      core.className = "click-core";
      burst.appendChild(core);

      for (let index = 0; index < 10; index += 1) {
        const particle = document.createElement("b");
        particle.className = "click-particle";
        particle.style.setProperty("--angle", `${index * 36 + (index % 2) * 8}deg`);
        particle.style.setProperty("--distance", `${34 + (index % 3) * 12}px`);
        particle.style.setProperty("--delay", `${index * 8}ms`);
        burst.appendChild(particle);
      }

      host.appendChild(burst);
      window.setTimeout(() => burst.remove(), 900);
    };

    if (finePointer) raf = requestAnimationFrame(animate);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onHover, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true, capture: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onHover);
      window.removeEventListener("pointerdown", onDown, true);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("cursor-visible", "cursor-hovering");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="global-cursor-dot" aria-hidden="true" />
      <div ref={effectsRef} className="global-click-effects" aria-hidden="true" />
    </>
  );
}
