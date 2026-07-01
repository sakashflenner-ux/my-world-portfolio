"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import DiscoveryIntro from "./DiscoveryIntro";
import GlobalCursorEffects from "./GlobalCursorEffects";
import AnimatedGlobe from "./AnimatedGlobe";
import PixelWalkScene from "./PixelWalkScene";

type Language = "zh" | "en";

const copy = {
  zh: {
    nav: ["关于", "能力", "经历", "联系"],
    eyebrow: "安徽阜阳 · 段泽华",
    intro: "喜欢与人打交道，也愿意认真理解每一个新问题。",
    explore: "向下探索",
    marquee: "真诚沟通 · 保持好奇 · 温柔坚定 · 持续生长 ·",
    aboutLabel: "关于我 / 01",
    aboutTitle: "我相信，好的连接始于真诚。",
    aboutBody:
      "我叫段泽华，来自安徽阜阳。我喜欢与人打交道，待人温柔真诚，也始终对未知保持好奇。现在，我正把运营、电商与法律相关的理解连接起来，慢慢构建属于自己的能力版图。",
    traits: [
      ["真诚", "把人当作人，而不是流量或数字。"],
      ["好奇", "愿意追问，也愿意重新理解熟悉的事。"],
      ["连接", "在沟通中找到需求、信任与共同方向。"],
    ],
    abilityLabel: "我能做什么 / 02",
    abilityTitle: "能力图谱，持续升级",
    abilities: [
      ["01", "运营", "理解内容、用户与节奏，让想法有机会被看见。", "CONTENT · USER · GROWTH"],
      ["02", "电商", "关注商品、转化与体验，理解一门生意如何真正运转。", "PRODUCT · CONVERSION · SERVICE"],
      ["03", "法律", "用规则意识看待问题，为判断增加边界与依据。", "RULES · LOGIC · JUDGMENT"],
      ["04", "沟通", "真诚倾听与清晰表达，在交流中理解需求并建立信任。", "LISTEN · EXPRESS · CONNECT"],
    ],
    storyLabel: "经历与项目 / 03",
    storyTitle: "故事还在发生，先为它留出位置。",
    storyBody:
      "这里将陆续记录我的项目、工作经历与真实思考。比起匆忙填满，我更愿意让每段经历都说清楚：遇到了什么问题、做了什么、学到了什么。",
    pending: "内容整理中",
    toolsLabel: "我的伙伴 / 04",
    toolsTitle: "人做判断，工具放大行动。",
    tools: [
      ["CODEX", "代码伙伴", "把想法变成可以运行、可以迭代的作品。"],
      ["DOUBAO", "日常助手", "辅助搜索、整理和表达，让信息更快形成结构。"],
    ],
    contactLabel: "保持联系 / 05",
    contactTitle: "一起聊聊新的可能。",
    contactBody: "如果你对运营、电商、法律或某个有趣的问题感兴趣，欢迎联系我。",
    email: "邮箱",
    wechat: "微信",
    copyText: "点击复制",
    copied: "已复制",
    footer: "我的世界 · 段泽华",
  },
  en: {
    nav: ["About", "Skills", "Story", "Contact"],
    eyebrow: "Fuyang, Anhui · Zehua Duan",
    intro: "I enjoy meeting people and taking the time to understand every new question.",
    explore: "Scroll to explore",
    marquee: "SINCERE · CURIOUS · GENTLE · ALWAYS GROWING ·",
    aboutLabel: "ABOUT / 01",
    aboutTitle: "I believe every meaningful connection begins with sincerity.",
    aboutBody:
      "I’m Zehua Duan from Fuyang, Anhui. I enjoy connecting with people, and I approach others with warmth and sincerity. Curious by nature, I’m bringing together what I know about operations, e-commerce and law to build a capability map of my own.",
    traits: [
      ["Sincere", "People are people — never just traffic or numbers."],
      ["Curious", "I keep asking, and keep seeing familiar things differently."],
      ["Connected", "I look for needs, trust and shared direction in every conversation."],
    ],
    abilityLabel: "WHAT I DO / 02",
    abilityTitle: "A capability map, always evolving",
    abilities: [
      ["01", "Operations", "Understanding content, people and timing so an idea can be seen.", "CONTENT · USER · GROWTH"],
      ["02", "E-commerce", "Learning how products, conversion and service make a business work.", "PRODUCT · CONVERSION · SERVICE"],
      ["03", "Law", "Using rules and logic to give every judgment clearer boundaries.", "RULES · LOGIC · JUDGMENT"],
      ["04", "Communication", "Listening sincerely and speaking clearly to understand needs and build trust.", "LISTEN · EXPRESS · CONNECT"],
    ],
    storyLabel: "STORY & WORK / 03",
    storyTitle: "The story is unfolding. This is space for what comes next.",
    storyBody:
      "Projects, work and honest reflections will live here. Rather than filling it in a rush, I want each story to explain the problem, the action and what I learned.",
    pending: "COMING SOON",
    toolsLabel: "COLLABORATORS / 04",
    toolsTitle: "People make decisions. Tools amplify action.",
    tools: [
      ["CODEX", "Code partner", "Turning ideas into things that run, grow and improve."],
      ["DOUBAO", "Daily assistant", "Helping research, organize and shape information."],
    ],
    contactLabel: "CONTACT / 05",
    contactTitle: "Let’s talk about what could be next.",
    contactBody: "If operations, e-commerce, law or a curious idea brings you here, say hello.",
    email: "Email",
    wechat: "WeChat",
    copyText: "Click to copy",
    copied: "Copied",
    footer: "MY WORLD · ZEHUA DUAN",
  },
} as const;

function SkillIllustration({ index }: { index: number }) {
  const dots = <><circle className="skill-dot blue" cx="48" cy="58" r="5"/><circle className="skill-dot green" cx="176" cy="116" r="5"/><circle className="skill-dot gold" cx="142" cy="42" r="5"/></>;
  if (index === 0) return <svg className="skill-illustration" viewBox="0 0 220 150" aria-hidden="true"><g className="skill-plant"><path d="M110 128V24M110 58c22-3 35-17 36-38-21 5-34 18-36 38Zm0 33c-24-3-39-17-42-38 24 4 38 17 42 38Zm0 21c19-1 33-12 39-29-20 1-33 11-39 29Z"/></g><ellipse cx="110" cy="128" rx="47" ry="12"/><path d="M63 128v11c0 7 21 13 47 13s47-6 47-13v-11"/>{dots}</svg>;
  if (index === 1) return <svg className="skill-illustration" viewBox="0 0 220 150" aria-hidden="true"><ellipse className="skill-orbit" cx="110" cy="70" rx="82" ry="31" transform="rotate(-12 110 70)"/><g className="skill-globe-core"><circle cx="110" cy="70" r="42"/><path d="M76 70h68M110 28c-14 13-20 27-20 42s6 29 20 42m0-84c14 13 20 27 20 42s-6 29-20 42"/><path className="skill-star" d="m110 50 5 15 15 5-15 5-5 15-5-15-15-5 15-5Z"/></g><path d="M69 128h82M80 116h60"/>{dots}</svg>;
  if (index === 2) return <svg className="skill-illustration" viewBox="0 0 220 150" aria-hidden="true"><path d="M110 68v59M78 127h64"/><g className="skill-balance"><path d="M25 68h170M52 68V35M168 68V35M39 35h26M155 35h26"/><circle cx="52" cy="28" r="12"/><circle cx="168" cy="28" r="12"/><path d="M32 101h40l-20-33-20 33Zm116 0h40l-20-33-20 33Z"/></g>{dots}</svg>;
  return <svg className="skill-illustration" viewBox="0 0 220 150" aria-hidden="true"><g className="skill-dialogue"><path d="M31 39c0-15 16-27 36-27h28c20 0 36 12 36 27v25c0 15-16 27-36 27H70L48 108l5-19c-13-4-22-14-22-25V39Zm91 45h27c20 0 36 12 36 27v9c0 9-6 17-16 22l4 14-18-10h-23c-16 0-30-8-35-19"/></g><path className="skill-dialogue-lines" d="M54 48h54M54 63h36M124 107h38"/>{dots}</svg>;
}

export default function Portfolio() {
  const [language, setLanguage] = useState<Language>("zh");
  const [copied, setCopied] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const t = copy[language];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    const syncHeader = () => {
      const intro = root.current?.querySelector<HTMLElement>(".discovery-intro");
      const header = root.current?.querySelector<HTMLElement>(".site-header");
      if (!intro || !header) return;
      header.classList.toggle("is-visible", window.scrollY >= intro.offsetHeight - 2);
    };
    window.addEventListener("scroll", syncHeader, { passive: true });
    window.addEventListener("resize", syncHeader, { passive: true });
    requestAnimationFrame(syncHeader);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 64,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });
      ScrollTrigger.refresh();
    }, root);

    return () => {
      ctx.revert();
      gsap.ticker.remove(update);
      lenis.destroy();
      window.removeEventListener("scroll", syncHeader);
      window.removeEventListener("resize", syncHeader);
    };
  }, []);

  const copyValue = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1400);
  };

  const anchors = ["about", "skills", "story", "contact"];

  return (
    <div ref={root} className="site-shell">
      <GlobalCursorEffects />
      <DiscoveryIntro language={language} onToggleLanguage={() => setLanguage(language === "zh" ? "en" : "zh")} />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="回到顶部">
          <span>MY</span><i>●</i><span>WORLD</span>
        </a>
        <nav aria-label="主导航">
          {t.nav.map((item, index) => <a key={item} href={`#${anchors[index]}`}>{item}</a>)}
        </nav>
        <button className="lang-switch" onClick={() => setLanguage(language === "zh" ? "en" : "zh")}>
          <span className={language === "zh" ? "active" : ""}>中</span>
          <span>/</span>
          <span className={language === "en" ? "active" : ""}>EN</span>
        </button>
      </header>

      <main>
        <PixelWalkScene />
        <section className="section about" id="about">
          <div className="section-tag" data-reveal>{t.aboutLabel}</div>
          <div className="about-grid">
            <div className="about-copy">
              <h2 data-reveal>{t.aboutTitle}</h2>
              <p data-reveal>{t.aboutBody}</p>
            </div>
            <figure className="globe-card" data-reveal>
              <div className="globe-stage" aria-label={language === "zh" ? "连接世界的动态地球仪" : "An animated globe connecting the world"}>
                <AnimatedGlobe />
              </div>
              <figcaption><span>MY WORLD · GLOBAL</span><span>CONNECTING IDEAS</span></figcaption>
            </figure>
          </div>
          <div className="traits">
            {t.traits.map(([title, body], index) => (
              <article key={title} data-reveal>
                <span>0{index + 1}</span><h3>{title}</h3><p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section skills" id="skills">
          <div className="abilities-heading" data-reveal>
            <div><i /><h2>{t.abilityTitle}</h2></div>
            <a href="#contact">{language === "zh" ? "查看全部能力" : "View all capabilities"}<span>→</span></a>
          </div>
          <div className="ability-cards">
            {t.abilities.map(([num, title, body, tags], index) => (
              <article key={num} className="ability-card" data-reveal>
                <div className="ability-visual"><SkillIllustration index={index} /></div>
                <div className="ability-card-content">
                  <span className="ability-num">{num}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <small>{tags}</small>
                  <div className="ability-meta"><span>{language === "zh" ? "状态" : "Status"}</span><strong>{language === "zh" ? "持续进阶" : "Evolving"}</strong></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section story" id="story">
          <div className="section-tag" data-reveal>{t.storyLabel}</div>
          <div className="story-grid">
            <div>
              <h2 data-reveal>{t.storyTitle}</h2>
              <p data-reveal>{t.storyBody}</p>
            </div>
            <div className="story-placeholder" data-reveal>
              <span>01—07</span><strong>{t.pending}</strong><i>↗</i>
            </div>
          </div>
        </section>

        <section className="section tools">
          <div className="section-tag light" data-reveal>{t.toolsLabel}</div>
          <h2 data-reveal>{t.toolsTitle}</h2>
          <div className="tool-grid">
            {t.tools.map(([name, role, body], index) => (
              <article key={name} data-reveal>
                <span>0{index + 1}</span><strong>{name}</strong><h3>{role}</h3><p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-art" aria-hidden="true" />
          <div className="contact-shade" aria-hidden="true" />
          <div className="contact-content">
            <div className="section-tag light" data-reveal>{t.contactLabel}</div>
            <h2 data-reveal>{t.contactTitle}</h2>
            <p data-reveal>{t.contactBody}</p>
            <div className="contact-links" data-reveal>
              <button onClick={() => copyValue("email", "1747015274@qq.com")}>
                <span>{t.email}</span><strong>1747015274@qq.com</strong><small>{copied === "email" ? t.copied : t.copyText}</small>
              </button>
              <button onClick={() => copyValue("wechat", "18109689121")}>
                <span>{t.wechat}</span><strong>18109689121</strong><small>{copied === "wechat" ? t.copied : t.copyText}</small>
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer><span>{t.footer}</span><span>© 2026</span><a href="#top">BACK TO TOP ↑</a></footer>
    </div>
  );
}
