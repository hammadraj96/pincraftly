"use client";

import React, { useState, useRef } from "react";

const whoData: Record<string, {
  label: string;
  heading: string;
  desc: string;
  points: string[];
  pins: [string, string, string];
}> = {
  food: {
    label: "Food & recipe bloggers",
    heading: "Every recipe deserves more than one pin",
    desc: "PinCraftly turns each recipe post into fresh pin designs made from your own food photos, ready for you to approve.",
    points: [
      "Pins designed from your own food photos",
      "A strategy pins seasonal recipes about two months before people search",
      "New posts arrive through the free WordPress plugin"
    ],
    pins: ["/images/p-garden.jpg", "/images/p-pasta.jpg", "/images/p-mugs.jpg"]
  },
  home: {
    label: "Home & DIY",
    heading: "Every room deserves a fresh pin",
    desc: "PinCraftly turns each home and DIY post into fresh pin designs made from your own photos, ready for you to approve.",
    points: [
      "Pins designed from your own home photos",
      "Seasonal and trend-led boards that keep your best projects visible",
      "New posts arrive through the free WordPress plugin"
    ],
    pins: ["/images/p-shelves.jpg", "/images/p-livingroom.jpg", "/images/p-garden.jpg"]
  },
  travel: {
    label: "Travel & lifestyle",
    heading: "Every trip deserves more than one pin",
    desc: "PinCraftly turns each travel post into fresh pin designs made from your own trip photos, ready for you to approve.",
    points: [
      "Pins designed from your own travel photos",
      "Destination pins scheduled ahead of peak search season",
      "New posts arrive through the free WordPress plugin"
    ],
    pins: ["/images/p-capsule.jpg", "/images/p-lisbon.jpg", "/images/p-yoga.jpg"]
  },
  shops: {
    label: "Etsy & online shops",
    heading: "Every product deserves more than one pin",
    desc: "PinCraftly turns each product into fresh pin designs made from your own product photos, ready for you to approve.",
    points: [
      "Pins designed from your own product photos",
      "Shop pins that link straight to the right listing",
      "New products arrive automatically from your store"
    ],
    pins: ["/images/p-nails.jpg", "/images/p-mugs.jpg", "/images/p-wedding.jpg"]
  },
  printables: {
    label: "Printables & digital products",
    heading: "Every printable deserves more than one pin",
    desc: "PinCraftly turns each printable and digital product into fresh pin designs made from your own preview images, ready for you to approve.",
    points: [
      "Pins designed from your own preview images",
      "Seasonal pins timed to when people plan ahead",
      "New products arrive automatically from your store"
    ],
    pins: ["/images/p-savings.jpg", "/images/p-planner.jpg", "/images/p-yoga.jpg"]
  },
  affiliate: {
    label: "Affiliate marketers",
    heading: "Every roundup deserves more than one pin",
    desc: "PinCraftly turns each roundup and review post into fresh pin designs made from your own images, ready for you to approve.",
    points: [
      "Pins designed from your own images",
      "Keyword-rich titles that match what people search",
      "Links checked so every pin lands on the right page"
    ],
    pins: ["/images/p-capsule.jpg", "/images/p-savings.jpg", "/images/p-nails.jpg"]
  },
  managers: {
    label: "Pinterest managers & VAs",
    heading: "Every client deserves more than one pin",
    desc: "PinCraftly turns each client's posts into fresh pin designs, scheduled across all their accounts from one place.",
    points: [
      "Manage unlimited accounts and websites",
      "Boards and schedules organised per client",
      "Analytics that show what works for each account"
    ],
    pins: ["/images/p-lisbon.jpg", "/images/p-shelves.jpg", "/images/p-planner.jpg"]
  },
  agencies: {
    label: "Agencies",
    heading: "Every client deserves more than one pin",
    desc: "PinCraftly turns each client's content into fresh pin designs at scale, scheduled across every account from one dashboard.",
    points: [
      "Unlimited accounts, websites and pins on Growth",
      "Boards and schedules organised per client",
      "Priority support and analytics for every account"
    ],
    pins: ["/images/p-wedding.jpg", "/images/p-yoga.jpg", "/images/p-livingroom.jpg"]
  }
};

const nicheIcons: Record<string, React.ReactNode> = {
  food: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 18.5h16"/><path d="M12 8a7.5 7.5 0 0 1 7.5 7.5h-15A7.5 7.5 0 0 1 12 8Z"/><path d="M12 8V6.2"/><circle cx="12" cy="4.8" r="1.1"/><path d="M3 21h18"/></svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 11.2 12 4l8 7.2"/><path d="M6.2 9.4V20h11.6V9.4"/><path d="M9.8 20v-5.2h4.4V20"/></svg>
  ),
  travel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.4"/><path d="M3.6 12h16.8"/><path d="M12 3.6c2.4 2.3 3.6 5.1 3.6 8.4s-1.2 6.1-3.6 8.4c-2.4-2.3-3.6-5.1-3.6-8.4s1.2-6.1 3.6-8.4Z"/></svg>
  ),
  shops: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.2 8h13.6l-1.1 12.2H6.3L5.2 8Z"/><path d="M9 10V6.2a3 3 0 0 1 6 0V10"/></svg>
  ),
  printables: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 8V3.8h10V8"/><rect x="4" y="8" width="16" height="7.5" rx="1.8"/><path d="M7 12.5h10v7.7H7z"/><path d="M9.6 16.4h4.8M9.6 18.6h4.8"/></svg>
  ),
  affiliate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10.2 13.8a4.2 4.2 0 0 0 6 0l2.9-2.9a4.24 4.24 0 1 0-6-6l-1.4 1.4"/><path d="M13.8 10.2a4.2 4.2 0 0 0-6 0l-2.9 2.9a4.24 4.24 0 1 0 6 6l1.4-1.4"/></svg>
  ),
  managers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8.6" r="3.4"/><path d="M3.6 19.8c.6-3.1 2.7-4.8 5.4-4.8s4.8 1.7 5.4 4.8"/><path d="M15.6 5.6a3.4 3.4 0 0 1 0 6.2"/><path d="M17.3 15.3c1.6.7 2.6 2.2 3 4.5"/></svg>
  ),
  agencies: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 20.2V4.8a.8.8 0 0 1 .8-.8h8.4a.8.8 0 0 1 .8.8v15.4"/><path d="M15 10h3.4a.6.6 0 0 1 .6.6v9.6"/><path d="M3 20.2h18"/><path d="M8 7.6h1.6M11 7.6h1.6M8 11.2h1.6M11 11.2h1.6M8 14.8h1.6M11 14.8h1.6"/></svg>
  )
};

export default function WhoItsFor() {
  const [selectedNiche, setSelectedNiche] = useState<string>("food");
  const [isNicheFading, setIsNicheFading] = useState(false);
  const nicheTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNicheSelect = (niche: string) => {
    if (selectedNiche === niche) return;
    setIsNicheFading(true);
    if (nicheTimerRef.current) clearTimeout(nicheTimerRef.current);
    nicheTimerRef.current = setTimeout(() => {
      setSelectedNiche(niche);
      setIsNicheFading(false);
      nicheTimerRef.current = null;
    }, 180);
  };

  const nicheOrder = ["food", "home", "travel", "shops", "printables", "affiliate", "managers", "agencies"];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIdx = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      nextIdx = (index + 1) % nicheOrder.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      nextIdx = (index - 1 + nicheOrder.length) % nicheOrder.length;
    } else if (e.key === "Home") {
      nextIdx = 0;
    } else if (e.key === "End") {
      nextIdx = nicheOrder.length - 1;
    }
    if (nextIdx !== -1) {
      e.preventDefault();
      handleNicheSelect(nicheOrder[nextIdx]);
      const nextBtn = document.getElementById(`who-tab-${nicheOrder[nextIdx]}`);
      if (nextBtn) nextBtn.focus();
    }
  };

  const currentNicheData = whoData[selectedNiche] || whoData.food;
  const currentNicheIcon = nicheIcons[selectedNiche] || nicheIcons.food;

  return (
    <>
      {/*  ==========================================================================
     WHO IT'S FOR SECTION
     ==========================================================================  */}
<section className="sec sec--who" id="who-its-for">
  <div className="wrap">
    {/*  Header  */}
    <p className="eyebrow center">Who It's For</p>
    <h2 className="h2 center">Who is PinCraftly for?<br /><mark>Your kind of Pinterest.</mark></h2>
    <p className="lead center">Pick your niche to see example pins and how Pinterest automation fits the way you work.</p>

    <div className="who-grid">
      {/*  Niche picker  */}
      <div className="who-tabs" role="tablist" aria-label="Choose your niche">
        {nicheOrder.map((niche, idx) => (
          <button
            key={niche}
            className={`who-tab ${selectedNiche === niche ? 'is-active' : ''}`}
            type="button"
            role="tab"
            id={`who-tab-${niche}`}
            data-niche={niche}
            aria-selected={selectedNiche === niche}
            aria-controls="who-panel"
            tabIndex={selectedNiche === niche ? 0 : -1}
            onClick={() => handleNicheSelect(niche)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          >
            <span className="who-tab-icon">{nicheIcons[niche]}</span>
            {whoData[niche].label}
          </button>
        ))}
      </div>

      {/*  Detail panel for the selected niche  */}
      <div className="who-panel" role="tabpanel" id="who-panel" aria-labelledby="who-tab-food">
        <div className={`who-panel-inner ${isNicheFading ? 'is-fading' : ''}`} id="who-panel-inner">
          <div className="who-pins" aria-hidden="true">
            <img className="who-pin who-pin--l" id="who-pin-l" src={currentNicheData.pins[0]} width={360} height={540} alt="" loading="lazy" />
            <img className="who-pin who-pin--c" id="who-pin-c" src={currentNicheData.pins[1]} width={360} height={540} alt="" loading="lazy" />
            <img className="who-pin who-pin--r" id="who-pin-r" src={currentNicheData.pins[2]} width={360} height={540} alt="" loading="lazy" />
          </div>
          <div className="who-copy">
            <p className="who-badge" id="who-badge">
              {currentNicheIcon}
              <span id="who-badge-label">{currentNicheData.label}</span>
            </p>
            <h3 id="who-heading">{currentNicheData.heading}</h3>
            <p className="who-desc" id="who-desc">{currentNicheData.desc}</p>
            <ul className="who-points" id="who-points">
              {currentNicheData.points.map((pt, pIdx) => (
                <li key={pIdx}>
                  <span className="chk"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.4l3 3 6-6.4" /></svg></span>
                  {pt}
                </li>
              ))}
            </ul>
            <div className="who-cta">
              <a className="btn btn--primary" href="https://app.pincraftly.com/dashboard/register">
                <span>Start free</span>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" /></svg>
              </a>
              <span className="who-note">Example designs, not customer pins.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}