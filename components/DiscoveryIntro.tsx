"use client";

import { CSSProperties, PointerEvent, useEffect, useRef, useState } from "react";

type Language = "zh" | "en";
type Point = { x: number; y: number };

const SPOTLIGHT_R = 270;

export default function DiscoveryIntro({
  language,
  onToggleLanguage,
}: {
  language: Language;
  onToggleLanguage: () => void;
}) {
  const raw = useRef<Point>({ x: -999, y: -999 });
  const smooth = useRef<Point>({ x: -999, y: -999 });
  const raf = useRef<number | null>(null);
  const [cursor, setCursor] = useState<Point>({ x: -999, y: -999 });

  useEffect(() => {
    raw.current = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.58 };
    smooth.current = { ...raw.current };
    setCursor({ ...raw.current });
    const animate = () => {
      smooth.current.x += (raw.current.x - smooth.current.x) * 0.095;
      smooth.current.y += (raw.current.y - smooth.current.y) * 0.095;
      setCursor({ ...smooth.current });
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const moveSpotlight = (event: PointerEvent<HTMLElement>) => {
    raw.current = { x: event.clientX, y: event.clientY };
  };

  const mask = `radial-gradient(circle ${SPOTLIGHT_R}px at ${cursor.x}px ${cursor.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 38%, rgba(0,0,0,.78) 58%, rgba(0,0,0,.42) 74%, rgba(0,0,0,.12) 88%, transparent 100%)`;
  const revealStyle: CSSProperties = {
    WebkitMaskImage: mask,
    maskImage: mask,
  };

  const zh = language === "zh";

  return (
    <section
      id="top"
      className="discovery-intro"
      onPointerMove={moveSpotlight}
      onPointerDown={moveSpotlight}
      aria-label={zh ? "移动鼠标，发现我的另一面" : "Move to discover another side of me"}
    >
      <div className="discovery-image discovery-base hero-zoom" aria-hidden="true" />
      <div className="discovery-image discovery-reveal" style={revealStyle} aria-hidden="true" />
      <div className="discovery-vignette" aria-hidden="true" />

      <nav className="discovery-nav" aria-label={zh ? "进场页导航" : "Intro navigation"}>
        <a className="discovery-brand" href="#top">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path d="M5 34 17 10l8 14 7-11 11 21H31l-6-11-7 11Z" />
          </svg>
          <span>My World</span>
        </a>
        <div className="discovery-nav-pill">
          <a className="active" href="#top">{zh ? "首页" : "Home"}</a>
          <a href="#about">{zh ? "关于" : "About"}</a>
          <a href="#skills">{zh ? "能力" : "Skills"}</a>
          <a href="#contact">{zh ? "联系" : "Contact"}</a>
        </div>
        <button className="discovery-language" onClick={onToggleLanguage}>{zh ? "EN" : "中文"}</button>
      </nav>

      <div className="discovery-heading">
        <p className="hero-anim hero-fade" style={{ animationDelay: ".12s" }}>
          {zh ? "移动光标 · 发现另一面" : "MOVE THE LIGHT · REVEAL ANOTHER SIDE"}
        </p>
        <h1>
          <span className="hero-anim hero-reveal discovery-serif" style={{ animationDelay: ".25s" }}>
            {zh ? "每一面" : "Every side"}
          </span>
          <span className="hero-anim hero-reveal" style={{ animationDelay: ".42s" }}>
            {zh ? "都值得被发现" : "holds a new story"}
          </span>
        </h1>
      </div>

      <div className="discovery-note hero-anim hero-fade" style={{ animationDelay: ".7s" }}>
        <span>01 / DISCOVERY</span>
        <p>{zh ? "好奇心让熟悉的事物显露新的纹理，也让我愿意持续理解人与世界。" : "Curiosity reveals new textures in familiar things — and keeps me learning about people and the world."}</p>
      </div>

      <div className="discovery-action hero-anim hero-fade" style={{ animationDelay: ".85s" }}>
        <p>{zh ? "我叫段泽华。这里记录运营、电商、法律，以及仍在生长的我。" : "I’m Zehua Duan. This is where operations, e-commerce, law and a still-growing self meet."}</p>
        <a href="#about">{zh ? "开始探索" : "Start exploring"}<span>↘</span></a>
      </div>

    </section>
  );
}
