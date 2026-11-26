import React from "react";

export default function ProblemShowcase() {
  return (
    <>
      {/*  ==========================================================================
     PROBLEM SHOWCASE BLOCK (Left Canvas Mockup + Right Copy & Stats)
     ==========================================================================  */}
<section className="prob" id="problem">
  <div className="wrap">
    <div className="prob-head">
      {/*  Left Column: Workstation Browser Canvas with Floating Alerts  */}
      <div className="prob-art prob-art--custom" aria-hidden="true">
        <div className="prob-canvas">
          {/*  Canvas Header Bar  */}
          <div className="prob-canvas-bar">
            <div className="prob-canvas-dots">
              <span className="p-dot p-dot--red"></span>
              <span className="p-dot p-dot--yel"></span>
              <span className="p-dot p-dot--grn"></span>
            </div>
            <div className="prob-canvas-title">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 3.5zm0 8a1 1 0 110-2 1 1 0 010 2z"/>
              </svg>
              Manual Workflow Bottleneck
            </div>
            <span className="prob-live-badge"><i className="p-pulse"></i> 11:48 PM</span>
          </div>

          {/*  Main Canvas Body with 3 Overlapping Pin Drafts  */}
          <div className="prob-canvas-body">
            <div className="prob-draft-stack">
              {/*  Draft 1 (Left Tilted)  */}
              <div className="prob-draft prob-draft--bg">
                <img src="/images/p-savings.jpg" width="190" height="285" alt="Draft Pin" loading="lazy" />
                <span className="prob-err-tag">Missing Alt Text</span>
              </div>
              {/*  Draft 2 (Center Main)  */}
              <div className="prob-draft prob-draft--main">
                <img src="/images/p-shelves.jpg" width="220" height="330" alt="Main Pin" loading="lazy" />
                <div className="prob-draft-overlay">
                  <span className="prob-err-tag prob-err-tag--red">✕ Zero Keywords Targeted</span>
                </div>
              </div>
              {/*  Draft 3 (Right Tilted)  */}
              <div className="prob-draft prob-draft--fg">
                <img src="/images/p-yoga.jpg" width="175" height="262" alt="Draft Pin" loading="lazy" />
                <span className="prob-err-tag">Wrong Aspect Ratio</span>
              </div>
            </div>

            {/*  Daily Progress Bar  */}
            <div className="prob-meter-box">
              <div className="prob-meter-header">
                <span>Daily Queue Progress</span>
                <b>3 of 40 Done (8%)</b>
              </div>
              <div className="prob-meter-bar">
                <div className="prob-meter-fill" style={{ width: '8%' }}></div>
              </div>
              <p className="prob-meter-note">Estimated time remaining tonight: <b>3h 24m</b></p>
            </div>
          </div>

          {/*  Floating Warning Pills  */}
          <div className="prob-float-pill prob-float-pill--1">
            <span className="p-pill-icon p-pill-icon--red">⚠️</span>
            <div>
              <strong>Canva tab crashed</strong>
              <small>Lost un-saved title drafts</small>
            </div>
          </div>

          <div className="prob-float-pill prob-float-pill--2">
            <span className="p-pill-icon p-pill-icon--amber">⏱️</span>
            <div>
              <strong>11:48 PM · Evening gone</strong>
              <small>Still tweaking template fonts</small>
            </div>
          </div>

          <div className="prob-float-pill prob-float-pill--3">
            <span className="p-pill-icon p-pill-icon--purple">❓</span>
            <div>
              <strong>Which board was this for?</strong>
              <small>Manual routing confusion</small>
            </div>
          </div>
        </div>
      </div>

      {/*  Right Column: Eyebrow, H2 with Straight Underline, Copy & Stats  */}
      <div className="prob-copy">
        <span className="eyebrow eyebrow--left">The problem</span>
        <h2 className="h2">Pinterest works.<br /><mark>Doing it by hand doesn't.</mark></h2>

        <div className="prob-text-flow">
          <p className="lead">
            People run <b>80 billion+ searches</b> on Pinterest every single month looking for ideas, products, and inspiration. But the platform's smart algorithm demands relentless consistency: <b>15 to 30 fresh pins every day</b> across multiple boards to win and hold top rankings.
          </p>

          <p>
            Doing this manually is a full-time job pretending to be marketing. Between designing 3 to 5 multi-layout variations for each blog post, researching high-intent keywords, drafting SEO-rich descriptions, and scheduling across boards, creators spend <b>15+ hours every week</b> trapped in repetitive design software.
          </p>

          <p>
            The moment you take a weekend off or skip a few days to focus on your real business, Pinterest's smart feed cuts your distribution reach by up to <b>60%</b>. Without intelligent automation, manual pinning burns you out long before your content ever gains viral momentum.
          </p>
        </div>

        {/*  3 Metrics Key Stats Box  */}
        <div className="prob-stats">
          <div className="prob-stat">
            <b>80B+</b>
            <span>Monthly Pinterest searches</span>
          </div>
          <div className="prob-stat">
            <b>15+ hrs</b>
            <span>Wasted weekly by hand</span>
          </div>
          <div className="prob-stat">
            <b>-60%</b>
            <span>Reach drop on missed days</span>
          </div>
        </div>

        <p className="src">Source: Pinterest Business &amp; Creator Platform Analytics, 2026</p>
      </div>
    </div>

    {/*  Pain-Point Boxed Rows: left SVG visual panel + right content  */}
    <div className="prob-cards">
      {/*  Row 1: Design eats your week  */}
      <article className="prob-card">
        <div className="prob-visual" aria-hidden="true">
          <svg viewBox="0 0 224 168" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Design canvas with clock and editing tools">
            {/*  design canvas  */}
            <rect x="18" y="18" width="128" height="118" rx="10" fill="#ffffff" stroke="#23222E" strokeWidth="2.5"/>
            <rect x="18" y="18" width="128" height="24" rx="10" fill="#23222E"/>
            <circle cx="32" cy="30" r="3.5" fill="#E60023"/>
            <circle cx="46" cy="30" r="3.5" fill="#ffffff" opacity="0.55"/>
            <circle cx="60" cy="30" r="3.5" fill="#ffffff" opacity="0.3"/>
            {/*  image placeholder inside canvas  */}
            <rect x="32" y="54" width="46" height="56" rx="6" fill="#FFE0E4"/>
            <circle cx="46" cy="70" r="5" fill="#E60023"/>
            <path d="M34 106l14-16 10 11 8-8 10 13z" fill="#C4001D"/>
            {/*  text lines being tweaked  */}
            <rect x="88" y="56" width="44" height="7" rx="3.5" fill="#23222E"/>
            <rect x="88" y="70" width="34" height="7" rx="3.5" fill="#E60023"/>
            <rect x="88" y="84" width="40" height="7" rx="3.5" fill="#23222E" opacity="0.35"/>
            {/*  selection handles + cursor  */}
            <rect x="84" y="50" width="52" height="48" rx="3" stroke="#E60023" strokeWidth="1.8" strokeDasharray="5 4"/>
            <rect x="81" y="47" width="6" height="6" rx="1.5" fill="#ffffff" stroke="#E60023" strokeWidth="1.8"/>
            <rect x="133" y="47" width="6" height="6" rx="1.5" fill="#ffffff" stroke="#E60023" strokeWidth="1.8"/>
            <rect x="107" y="95" width="6" height="6" rx="1.5" fill="#ffffff" stroke="#E60023" strokeWidth="1.8"/>
            <path d="M122 88l14 14-6.5 1-3.5 6z" fill="#23222E"/>
            {/*  color swatches  */}
            <circle cx="40" cy="124" r="5" fill="#E60023"/>
            <circle cx="56" cy="124" r="5" fill="#23222E"/>
            <circle cx="72" cy="124" r="5" fill="#FFB3BE"/>
            {/*  clock badge: hours slipping away  */}
            <circle cx="172" cy="108" r="38" fill="#ffffff" stroke="#E60023" strokeWidth="3"/>
            <circle cx="172" cy="108" r="30" stroke="#FFE0E4" strokeWidth="2"/>
            <path d="M172 88v20l14 9" stroke="#23222E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="172" cy="108" r="3.5" fill="#C4001D"/>
            <path d="M172 66v6M172 144v6M130 108h6M208 108h6" stroke="#E60023" strokeWidth="3" strokeLinecap="round"/>
            {/*  pen tool  */}
            <path d="M168 14l26 26-9 3-14-14z" fill="#23222E"/>
            <path d="M168 14l-4 12 10 3z" fill="#E60023"/>
            <circle cx="190" cy="52" r="3" fill="#C4001D"/>
          </svg>
        </div>
        <div className="prob-card-body">
          <h3>Design eats your week</h3>
          <p className="prob-card-desc">Every post needs 3 to 5 fresh pin variations to rank. You end up trapped in design software for hours tweaking fonts, swapping templates, and exporting files instead of building your business.</p>
          <ul>
            <li>10+ hours lost each week to repetitive Canva tweaking</li>
            <li>Creative burnout trying to invent fresh layout angles</li>
            <li>Slow design pace leaves profitable topics uncovered</li>
          </ul>
          <p className="prob-impact">Impact: <b>15+ hours lost weekly</b></p>
        </div>
      </article>

      {/*  Row 2: You guess what to share  */}
      <article className="prob-card">
        <div className="prob-visual" aria-hidden="true">
          <svg viewBox="0 0 224 168" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Magnifying glass over search keywords with a question mark">
            {/*  keyword list card  */}
            <rect x="16" y="22" width="140" height="124" rx="10" fill="#ffffff" stroke="#23222E" strokeWidth="2.5"/>
            <rect x="30" y="38" width="86" height="10" rx="5" fill="#23222E"/>
            <rect x="30" y="58" width="64" height="10" rx="5" fill="#E60023"/>
            <rect x="30" y="78" width="76" height="10" rx="5" fill="#23222E" opacity="0.35"/>
            <rect x="30" y="98" width="52" height="10" rx="5" fill="#C4001D" opacity="0.55"/>
            <rect x="30" y="118" width="70" height="10" rx="5" fill="#23222E" opacity="0.2"/>
            {/*  dashed unknown bars  */}
            <rect x="100" y="58" width="26" height="10" rx="5" stroke="#E60023" strokeWidth="1.8" strokeDasharray="4 3"/>
            <rect x="112" y="98" width="26" height="10" rx="5" stroke="#23222E" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.5"/>
            {/*  magnifying glass  */}
            <circle cx="152" cy="88" r="40" fill="rgba(230,0,35,0.07)" stroke="#E60023" strokeWidth="5"/>
            <path d="M182 118l26 26" stroke="#23222E" strokeWidth="10" strokeLinecap="round"/>
            <path d="M182 118l26 26" stroke="#C4001D" strokeWidth="4" strokeLinecap="round" opacity="0.35"/>
            {/*  question mark inside lens  */}
            <path d="M144 74c1-6 5-9 10-9 6 0 10 4 10 9 0 7-8 8-10 13" stroke="#23222E" strokeWidth="5" strokeLinecap="round"/>
            <circle cx="153" cy="100" r="3.6" fill="#E60023"/>
            {/*  floating question marks  */}
            <text x="30" y="20" fontFamily="Bricolage Grotesque, sans-serif" fontSize="20" fontWeight="800" fill="#E60023">?</text>
            <text x="196" y="42" fontFamily="Bricolage Grotesque, sans-serif" fontSize="16" fontWeight="800" fill="#23222E" opacity="0.45">?</text>
          </svg>
        </div>
        <div className="prob-card-body">
          <h3>You guess what to share</h3>
          <p className="prob-card-desc">Pinterest is a search engine, not a social feed. Without live search insights, you are left guessing which keywords, seasonal trends, and board categories real buyers are actively searching for right now.</p>
          <ul>
            <li>Publishing blind with zero search volume data</li>
            <li>Missing high-traffic seasonal keyword spikes and trends</li>
            <li>Pins placed in low-ranking or non-relevant boards</li>
          </ul>
          <p className="prob-impact">Impact: <b>Dead pins with zero discovery</b></p>
        </div>
      </article>

      {/*  Row 3: Busy weeks go quiet  */}
      <article className="prob-card">
        <div className="prob-visual" aria-hidden="true">
          <svg viewBox="0 0 224 168" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Calendar with an empty queue and flatline reach chart">
            {/*  calendar  */}
            <rect x="16" y="26" width="118" height="104" rx="10" fill="#ffffff" stroke="#23222E" strokeWidth="2.5"/>
            <path d="M16 36a10 10 0 0110-10h98a10 10 0 0110 10v16H16z" fill="#E60023"/>
            <path d="M44 16v18M106 16v18" stroke="#23222E" strokeWidth="5" strokeLinecap="round"/>
            {/*  filled days then empty queue days  */}
            <rect x="28" y="64" width="16" height="14" rx="3" fill="#E60023"/>
            <rect x="52" y="64" width="16" height="14" rx="3" fill="#C4001D"/>
            <rect x="76" y="64" width="16" height="14" rx="3" fill="#23222E" opacity="0.3"/>
            <rect x="100" y="64" width="16" height="14" rx="3" stroke="#23222E" strokeWidth="1.8" strokeDasharray="4 3"/>
            <rect x="28" y="88" width="16" height="14" rx="3" stroke="#23222E" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.6"/>
            <rect x="52" y="88" width="16" height="14" rx="3" stroke="#23222E" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.6"/>
            <rect x="76" y="88" width="16" height="14" rx="3" stroke="#23222E" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.6"/>
            <rect x="100" y="88" width="16" height="14" rx="3" stroke="#23222E" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.6"/>
            <path d="M32 118h84" stroke="#FFE0E4" strokeWidth="6" strokeLinecap="round"/>
            {/*  flatline reach chart card  */}
            <rect x="122" y="86" width="88" height="62" rx="9" fill="#23222E"/>
            <path d="M134 104h64M134 122h64" stroke="#ffffff" strokeWidth="1.4" opacity="0.18"/>
            <path d="M134 100l12 8 10-4 8 10 10 14h24" stroke="#E60023" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="156" cy="104" r="3.5" fill="#ffffff"/>
            <circle cx="198" cy="128" r="3.5" fill="#E60023"/>
            <path d="M188 138l6-6 6 6" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" transform="rotate(180 194 138)"/>
            {/*  downward arrow  */}
            <path d="M168 30l20 22" stroke="#C4001D" strokeWidth="4" strokeLinecap="round"/>
            <path d="M176 54l12-2-2-12" stroke="#C4001D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="prob-card-body">
          <h3>Busy weeks go quiet</h3>
          <p className="prob-card-desc">The Pinterest algorithm demands consistent, daily pinning at optimal hours. One packed workweek, client deadline, or holiday break causes your queue to dry up—and your reach flatlines almost overnight.</p>
          <ul>
            <li>Reach plummets after just 3–4 days of inactivity</li>
            <li>Lost momentum takes weeks of daily posting to recover</li>
            <li>No buffer system means zero freedom to step away</li>
          </ul>
          <p className="prob-impact">Impact: <b>-65% distribution penalty</b></p>
        </div>
      </article>

      {/*  Row 4: Pins get seen, not clicked  */}
      <article className="prob-card">
        <div className="prob-visual" aria-hidden="true">
          <svg viewBox="0 0 224 168" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Eye and cursor with a low click-through chart">
            {/*  eye: seen a lot  */}
            <path d="M14 62c12-18 28-27 46-27s34 9 46 27c-12 18-28 27-46 27S26 80 14 62z" fill="#ffffff" stroke="#23222E" strokeWidth="2.5"/>
            <circle cx="60" cy="62" r="17" fill="#E60023"/>
            <circle cx="60" cy="62" r="7.5" fill="#23222E"/>
            <circle cx="66" cy="56" r="3" fill="#ffffff"/>
            {/*  CTR bar chart: impressions high, clicks tiny  */}
            <rect x="126" y="26" width="84" height="86" rx="9" fill="#ffffff" stroke="#23222E" strokeWidth="2.5"/>
            <path d="M138 98h60" stroke="#23222E" strokeWidth="2" strokeLinecap="round"/>
            <rect x="144" y="44" width="13" height="54" rx="3" fill="#23222E" opacity="0.28"/>
            <rect x="164" y="58" width="13" height="40" rx="3" fill="#23222E" opacity="0.2"/>
            <rect x="184" y="90" width="13" height="8" rx="3" fill="#E60023"/>
            <path d="M140 40l57 44" stroke="#C4001D" strokeWidth="2.4" strokeDasharray="5 4" strokeLinecap="round"/>
            {/*  cursor that never lands  */}
            <path d="M52 108l34 34-13 2-7 12z" fill="#23222E"/>
            <path d="M52 108l34 34-13 2-7 12z" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round"/>
            <circle cx="52" cy="108" r="13" stroke="#E60023" strokeWidth="2.4" strokeDasharray="5 4"/>
            <path d="M96 122h56" stroke="#E60023" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 7"/>
            <path d="M146 116l8 6-8 6" stroke="#E60023" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="prob-card-body">
          <h3>Pins get seen, not clicked</h3>
          <p className="prob-card-desc">Thousands of impressions mean nothing if Pinners don't click through to your store or blog. Generic titles, weak overlay text, and missing visual hooks get scrolled past, leaving your revenue flat.</p>
          <ul>
            <li>High impressions with virtually zero outbound clicks</li>
            <li>Weak headlines fail to generate click curiosity</li>
            <li>No split-testing to discover what converts your niche</li>
          </ul>
          <p className="prob-impact">Impact: <b>0.18% CTR on manual graphics</b></p>
        </div>
      </article>
    </div>
  </div>
</section>
    </>
  );
}