import React from "react";

export default function Features() {
  return (
    <>
      {/*  ==========================================================================
     CORE FEATURES SECTION (6 Cards Grid + Interactive Demo CTA)
     ==========================================================================  */}
<section className="sec sec--feats" id="features">
  <div className="wrap">
    {/*  Top Centered Header  */}
    <p className="eyebrow center">Everything In One Place</p>
    <h2 className="h2 center">Everything between your post and <mark>a published pin</mark></h2>
    <p className="lead center">An AI pin generator, Pinterest scheduler, keyword research and analytics in one tool. Every part works from your own posts, photos and brand, and you stay the one who decides.</p>

    {/*  6 Feature Cards Grid  */}
    <div className="feats">
      {/*  1. Auto Pin Creator  */}
      <div className="feat">
        <div className="feat-icon-custom feat-icon--rose">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="6" y="6" width="52" height="52" rx="16" fill="#FFF0F1"/>
            <rect x="16" y="20" width="20" height="30" rx="4" fill="#ffffff" stroke="#E60023" strokeWidth="2" transform="rotate(-6 16 20)"/>
            <rect x="28" y="16" width="22" height="34" rx="4" fill="#E60023"/>
            <path d="M44 14 L48 6 L52 14 L60 18 L52 22 L48 30 L44 22 L36 18 Z" fill="#fbbf24"/>
            <circle cx="24" cy="14" r="2" fill="#E60023"/>
            <rect x="32" y="24" width="14" height="4" rx="2" fill="#ffffff"/>
            <rect x="32" y="32" width="10" height="3" rx="1.5" fill="#FFF0F1"/>
          </svg>
        </div>
        <h3>Auto Pin Creator</h3>
        <p>Turn any blog URL, store link or text prompt into click-worthy pins with AI-generated titles, descriptions and brand-matched aesthetics in seconds.</p>
      </div>

      {/*  2. Smart Scheduler  */}
      <div className="feat">
        <div className="feat-icon-custom feat-icon--green">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="6" y="6" width="52" height="52" rx="16" fill="#ecfdf5"/>
            <rect x="16" y="18" width="32" height="32" rx="8" fill="#ffffff" stroke="#10b981" strokeWidth="2"/>
            <path d="M16 28 L48 28" stroke="#10b981" strokeWidth="2"/>
            <rect x="22" y="14" width="4" height="8" rx="2" fill="#059669"/>
            <rect x="38" y="14" width="4" height="8" rx="2" fill="#059669"/>
            <circle cx="38" cy="38" r="10" fill="#10b981"/>
            <path d="M38 33 V38 H42" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="24" cy="36" r="2" fill="#10b981"/>
          </svg>
        </div>
        <h3>Smart Scheduler</h3>
        <p>Automatically distribute your pins at peak Pinterest audience engagement hours, maintaining a consistent, safe daily queue that pleases the algorithm.</p>
      </div>

      {/*  3. Bulk Upload  */}
      <div className="feat">
        <div className="feat-icon-custom feat-icon--cyan">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="6" y="6" width="52" height="52" rx="16" fill="#ecfeff"/>
            <rect x="16" y="22" width="24" height="30" rx="4" fill="#ffffff" stroke="#0891b2" strokeWidth="1.5"/>
            <rect x="22" y="18" width="24" height="30" rx="4" fill="#ffffff" stroke="#06b6d4" strokeWidth="1.5"/>
            <rect x="28" y="14" width="24" height="30" rx="4" fill="#0891b2"/>
            <circle cx="44" cy="38" r="10" fill="#ffffff" stroke="#0891b2" strokeWidth="2"/>
            <path d="M44 43 V33 M41 36 L44 33 L47 36" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3>Bulk Upload</h3>
        <p>Import dozens of articles, product collections or CSV sheets in one go. Batch-generate and queue up hundreds of unique pins with a single click.</p>
      </div>

      {/*  4. Templates  */}
      <div className="feat">
        <div className="feat-icon-custom feat-icon--amber">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="6" y="6" width="52" height="52" rx="16" fill="#fffbeb"/>
            <rect x="16" y="16" width="14" height="20" rx="3" fill="#f59e0b"/>
            <rect x="34" y="16" width="14" height="12" rx="3" fill="#ffffff" stroke="#d97706" strokeWidth="1.5"/>
            <rect x="34" y="32" width="14" height="16" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
            <rect x="16" y="40" width="14" height="8" rx="2" fill="#ffffff" stroke="#d97706" strokeWidth="1.5"/>
            <circle cx="34" cy="24" r="6" fill="#d97706"/>
            <path d="M34 21 L35.2 23.5 L38 23.8 L36 25.6 L36.5 28.2 L34 27 L31.5 28.2 L32 25.6 L30 23.8 L32.8 23.5 Z" fill="#ffffff"/>
          </svg>
        </div>
        <h3>Templates</h3>
        <p>Hundreds of conversion-tested pin layouts designed for maximum click-through rates. Easily customise fonts, brand colors, badge styles and logo watermarks.</p>
      </div>

      {/*  5. Boards Manager  */}
      <div className="feat">
        <div className="feat-icon-custom feat-icon--purple">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="6" y="6" width="52" height="52" rx="16" fill="#faf5ff"/>
            <circle cx="32" cy="22" r="8" fill="#9333ea"/>
            <circle cx="32" cy="22" r="3.5" fill="#ffffff"/>
            <path d="M32 30 V36 M32 36 H18 V42 M32 36 H46 V42" stroke="#c084fc" strokeWidth="2" strokeLinecap="round"/>
            <rect x="12" y="42" width="12" height="10" rx="3" fill="#ffffff" stroke="#9333ea" strokeWidth="1.5"/>
            <rect x="40" y="42" width="12" height="10" rx="3" fill="#ffffff" stroke="#9333ea" strokeWidth="1.5"/>
          </svg>
        </div>
        <h3>Boards Manager</h3>
        <p>Organize niche boards, track board health scores, and let smart routing automatically send every generated pin to its most relevant, high-ranking board.</p>
      </div>

      {/*  6. Analytics  */}
      <div className="feat">
        <div className="feat-icon-custom feat-icon--rose">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="6" y="6" width="52" height="52" rx="16" fill="#FFF0F1"/>
            <rect x="16" y="16" width="32" height="32" rx="8" fill="#ffffff" stroke="#E60023" strokeWidth="1.5"/>
            <path d="M22 38 L28 32 L34 35 L42 24" stroke="#E60023" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="42" cy="24" r="3.5" fill="#E60023"/>
            <rect x="21" y="40" width="3" height="4" rx="1" fill="#cbd5e1"/>
            <rect x="27" y="37" width="3" height="7" rx="1" fill="#cbd5e1"/>
            <rect x="33" y="39" width="3" height="5" rx="1" fill="#cbd5e1"/>
            <rect x="39" y="30" width="3" height="14" rx="1" fill="#E60023"/>
          </svg>
        </div>
        <h3>Analytics</h3>
        <p>Real-time tracking of outbound clicks, impressions, saves and top-performing pins across all your connected Pinterest business profiles in one unified dashboard.</p>
      </div>
    </div>

    {/*  Bottom CTA Bar  */}
    <div className="cta-col-wrap">
      <div className="cta-row">
        <a className="btn btn--dark btn--pill" href="#demo">
          <span>OPEN INTERACTIVE DEMO</span>
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4"/></svg>
        </a>
        <a className="cta-alt" href="#features">see all features &rarr;</a>
      </div>
      <p className="btn-subtext">Explore the full command center with live test data</p>
    </div>
  </div>
</section>
    </>
  );
}