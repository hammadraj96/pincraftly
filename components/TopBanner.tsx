"use client";

import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const [countdown, setCountdown] = useState("6d 23:59:59");

  useEffect(() => {
    const SEVEN_DAYS = 7 * 24 * 60 * 60;
    const targetTime = Date.now() + SEVEN_DAYS * 1000;
    const tick = () => {
      let diff = targetTime - Date.now();
      if (diff < 0) diff = 0;
      let total = Math.floor(diff / 1000);
      if (total >= SEVEN_DAYS) total = SEVEN_DAYS - 1;
      const d = Math.floor(total / 86400);
      const h = String(Math.floor((total % 86400) / 3600)).padStart(2, "0");
      const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
      const s = String(total % 60).padStart(2, "0");
      setCountdown(`${d}d ${h}:${m}:${s}`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return <b id="cd-timer">{countdown}</b>;
}

export default function TopBanner() {
  const [bannerDismissed, setBannerDismissed] = useState(false);

  if (bannerDismissed) return null;

  return (
    <div id="top-banner" className="pbt" role="region" aria-label="Limited Offer">
      <div className="pbt-in">
        <span className="pbt-tag">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2M13 11v2M13 17v2"/></svg>
          SPECIAL OFFER
        </span>
        <p className="pbt-what">
          <span className="pbt-name">Yearly plans from</span>
          <strong className="pbt-price">$35</strong>
          <span className="pbt-once">/year, locked lifetime rate</span>
        </p>
        <span className="pbt-sep" aria-hidden="true"></span>
        <div className="pbt-cd" data-countdown="7">
          <span className="pbt-cd-l">Ends in</span>
          <span className="pbt-u"><CountdownTimer /></span>
        </div>
        <a className="pbt-go" href="#pricing">
          See the plans
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>
      <button type="button" className="pbt-x" aria-label="Dismiss banner" id="banner-dismiss" onClick={() => setBannerDismissed(true)}>&times;</button>
    </div>
  );
}
