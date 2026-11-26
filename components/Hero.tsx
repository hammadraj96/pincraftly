"use client";

import React, { useRef, useState, useEffect } from "react";

export default function Hero() {
  const urlInputRef = useRef<HTMLInputElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const handleTrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const urlVal = urlInputRef.current ? urlInputRef.current.value.trim() : "";
    if (!urlVal) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const demoSec = document.getElementById("demo") || document.getElementById("features");
      if (demoSec) {
        demoSec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 700);
  };

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return;
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let hasPos = false;
    let rafId: number | null = null;
    let cachedRect: DOMRect | null = null;

    const updateRect = () => {
      cachedRect = hero.getBoundingClientRect();
    };

    const renderGrid = () => {
      if (reduceMotion) {
        currentX = targetX;
        currentY = targetY;
      } else {
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;
      }
      hero.style.setProperty("--mx", currentX + "px");
      hero.style.setProperty("--my", currentY + "px");
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      if (!reduceMotion && (Math.abs(dx) > 0.4 || Math.abs(dy) > 0.4)) {
        rafId = requestAnimationFrame(renderGrid);
      } else {
        rafId = null;
      }
    };
    const queueRender = () => {
      if (rafId === null) rafId = requestAnimationFrame(renderGrid);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!cachedRect) updateRect();
      const rect = cachedRect!;
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      if (!hasPos) {
        currentX = targetX;
        currentY = targetY;
        hasPos = true;
      }
      hero.style.setProperty("--grid-opacity", "1");
      queueRender();
    };

    const handleMouseEnter = (e: MouseEvent) => {
      updateRect();
      const rect = cachedRect!;
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      currentX = targetX;
      currentY = targetY;
      hasPos = true;
      hero.style.setProperty("--grid-opacity", "1");
      queueRender();
    };

    const handleMouseLeave = () => {
      hero.style.setProperty("--grid-opacity", "0");
      hasPos = false;
      cachedRect = null;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    window.addEventListener("resize", updateRect);
    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseenter", handleMouseEnter);
    hero.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("resize", updateRect);
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseenter", handleMouseEnter);
      hero.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
    {/*  ==========================================================================
     HERO SECTION (FX & Try Form)
     ==========================================================================  */}
<section ref={heroRef} className="hero" data-hero id="hero">
  {/*  Cursor-following pink line + dot grid (revealed around the pointer via --mx / --my mask)  */}
  <div className="hero-cursor-grid" aria-hidden="true"></div>
  {/*  Subtle Background Ambient Blobs & Sparkles  */}
  <div className="hero-fx" aria-hidden="true">
    <span className="blob blob--1"></span>
    <span className="blob blob--2"></span>
    <span className="blob blob--3"></span>

    {/*  Twinkling Ambient Sparkles  */}
    <i className="spark spark--1"></i>
    <i className="spark spark--2"></i>
    <i className="spark spark--3"></i>
    <i className="spark spark--4"></i>

    {/*  Floating Creative Badges (left side)  */}
    <span className="float-badge float-badge--1">
      <i className="float-ic float-ic--coral"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/></svg></i>
      AI Generated
    </span>
    <span className="float-badge float-badge--2">
      <i className="float-ic float-ic--green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg></i>
      <span><b>+248%</b>&nbsp;Traffic</span>
    </span>
    <span className="float-badge float-badge--3">
      <i className="float-ic float-ic--rose"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.6 19.3c-.05-.8-.1-2.1.02-3 .12-.8.8-3.4.8-3.4s-.2-.4-.2-1c0-1 .6-1.7 1.3-1.7.6 0 .9.4.9 1 0 .6-.4 1.5-.6 2.4-.2.7.4 1.3 1.1 1.3 1.3 0 2.3-1.4 2.3-3.4 0-1.8-1.3-3-3.1-3a3.2 3.2 0 0 0-3.4 3.2c0 .6.2 1.3.5 1.7.06.07.07.13.05.2l-.2.8c-.03.1-.1.14-.2.1-1.3-.6-2.1-2.5-2.1-4 0-3.2 2.4-6.2 6.8-6.2 3.6 0 6.4 2.6 6.4 6 0 3.6-2.2 6.5-5.4 6.5-1 0-2-.5-2.4-1.2l-.6 2.5c-.2 1-.8 2.2-1.3 2.9A10 10 0 1 0 12 2z"/></svg></i>
      <span><b>10</b>&nbsp;Pins Ready</span>
    </span>

    {/*  Floating Creative Badges (right side)  */}
    <span className="float-badge float-badge--4">
      <i className="float-ic float-ic--amber"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg></i>
      Trending Now
    </span>
    <span className="float-badge float-badge--5">
      <i className="float-ic float-ic--teal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10" r="1.15" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1.15" fill="currentColor" stroke="none"/><circle cx="15.5" cy="10" r="1.15" fill="currentColor" stroke="none"/><path d="M12 21c-1 0-1.5-.7-1.5-1.5 0-1.2 1.2-1.7 2.3-2.2 1-.45 1.7-1 1.7-2.05"/></svg></i>
      On-Brand Pins
    </span>
    <span className="float-badge float-badge--6">
      <i className="float-ic float-ic--orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg></i>
      Scheduled
    </span>

    {/*  Small Floating Shapes  */}
    <span className="float-shape float-shape--pin"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.6 19.3c-.05-.8-.1-2.1.02-3 .12-.8.8-3.4.8-3.4s-.2-.4-.2-1c0-1 .6-1.7 1.3-1.7.6 0 .9.4.9 1 0 .6-.4 1.5-.6 2.4-.2.7.4 1.3 1.1 1.3 1.3 0 2.3-1.4 2.3-3.4 0-1.8-1.3-3-3.1-3a3.2 3.2 0 0 0-3.4 3.2c0 .6.2 1.3.5 1.7.06.07.07.13.05.2l-.2.8c-.03.1-.1.14-.2.1-1.3-.6-2.1-2.5-2.1-4 0-3.2 2.4-6.2 6.8-6.2 3.6 0 6.4 2.6 6.4 6 0 3.6-2.2 6.5-5.4 6.5-1 0-2-.5-2.4-1.2l-.6 2.5c-.2 1-.8 2.2-1.3 2.9A10 10 0 1 0 12 2z"/></svg></span>
    <span className="float-shape float-shape--ring"></span>
    <span className="float-shape float-shape--dot1"></span>
    <span className="float-shape float-shape--dot2"></span>
    <span className="float-shape float-shape--spark"></span>
  </div>

  <div className="wrap hero-in">
    {/*  Eyebrow Pill  */}
    <p className="eyebrow">FOR BLOGGERS, ONLINE SHOPS &amp; PINTEREST MANAGERS</p>

    {/*  Main Title with Clean Accent Underline  */}
    <h1 className="h1">The <mark>Pinterest automation tool</mark> that turns your blog posts and products into on-brand pins</h1>

    {/*  Subtitle / Lead  */}
    <p className="lead">Paste a post or product link. Get pins made from your own photos, with the keywords people search already written. Approve the ones you like.</p>

    {/*  Interactive Try Form with Handwritten Arrow Note  */}
    <div className="try" id="try">
      <p className="hand hand--try" aria-hidden="true">paste any post, it's free!</p>
      <svg className="scribble scribble--try" viewBox="0 0 170 90" fill="none" stroke="#E60023" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 14c26-6 62-4 82 14 14 12 10 30-4 30-16 0-14-24 6-30 22-7 46 6 62 26"></path>
        <path d="M142 42l14 13-18 4"></path>
      </svg>

      <form className="try-form" id="heroTryForm" onSubmit={handleTrySubmit}>
        <input ref={urlInputRef} className="try-input" id="heroUrl" type="url" placeholder="Paste a blog post or product URL" required defaultValue="" />
        <button type="submit" className="try-btn" id="heroSubmitBtn" disabled={isScanning}>
          {isScanning ? (
            <span>Scanning post &amp; brand...</span>
          ) : (
            <>
              <span>Show my pins</span>
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" /></svg>
            </>
          )}
        </button>
      </form>
    </div>

    {/*  Trust Badges Pill  */}
    <ul className="trust">
      <li>
        <i className="tr-ic">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M7 15h4M4 4l16 16"/></svg>
        </i>
        No credit card
      </li>
      <li>
        <i className="tr-ic">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18"/></svg>
        </i>
        No website needed
      </li>
      <li>
        <i className="tr-ic">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2"/></svg>
        </i>
        No Pinterest password
      </li>
    </ul>

    {/*  Safety Checklist  */}
    <p className="safety">
      <span><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round"><path d="M3.5 8.4l3 3 6-6.4"/></svg>You approve the ones you like</span>
      <span><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round"><path d="M3.5 8.4l3 3 6-6.4"/></svg>Max 60 pins a day per account</span>
      <span><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round"><path d="M3.5 8.4l3 3 6-6.4"/></svg>Reach drops flagged early</span>
    </p>

  </div>
</section>
    </>
  );
}