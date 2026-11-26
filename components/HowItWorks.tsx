import React from "react";

export default function HowItWorks() {
  return (
    <>
      {/*  ==========================================================================
     HOW IT WORKS SECTION (3 Steps + CTA)
     ==========================================================================  */}
<section className="sec sec--how" id="how-it-works">
  <div className="wrap">
    {/*  Top Centered Header  */}
    <p className="eyebrow center">How It Works</p>
    <h2 className="h2 center">From one post to <mark>published pins</mark> in three steps</h2>
    <p className="lead center">Paste a link, let PinCraftly do the design and keyword work, then approve and schedule — no design skills, no manual posting.</p>

    {/*  3 Step Cards  */}
    <div className="how-steps">
      {/*  Step 1  */}
      <div className="how-step">
        <span className="how-num" aria-hidden="true">01</span>
        <span className="how-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14a5 5 0 0 0 7.1 0l2.4-2.4a5 5 0 0 0-7.1-7.1L11 5.9"/><path d="M14 10a5 5 0 0 0-7.1 0L4.5 12.4a5 5 0 0 0 7.1 7.1L13 18.1"/></svg>
        </span>
        <h3>Paste your post or product link</h3>
        <p>Paste any blog post or shop product URL. PinCraftly reads your images, title and content in seconds.</p>
      </div>

      {/*  Step 2  */}
      <div className="how-step">
        <span className="how-num" aria-hidden="true">02</span>
        <span className="how-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/><path d="M19 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z"/></svg>
        </span>
        <h3>AI creates your pins</h3>
        <p>Fresh custom pin designs, keyword-rich titles, descriptions and hashtags, matched to your brand and the keywords people search.</p>
      </div>

      {/*  Step 3  */}
      <div className="how-step">
        <span className="how-num" aria-hidden="true">03</span>
        <span className="how-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M9 16.2l2.2 2.2 4-4.2"/></svg>
        </span>
        <h3>Approve, schedule and publish</h3>
        <p>Review the pins you like, then Smart Scheduler posts them at the best times — no Pinterest password needed, no manual posting.</p>
      </div>
    </div>

    {/*  Bottom CTA  */}
    <div className="how-cta">
      <a className="btn btn--primary how-btn" href="https://app.pincraftly.com/dashboard/register">
        <span>Try It Free — No Credit Card</span>
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4"/></svg>
      </a>
    </div>
  </div>
</section>
    </>
  );
}