import React from "react";

export default function WaysToEarn() {
  return (
    <>
      {/*  ==========================================================================
     WAYS TO EARN SECTION
     ==========================================================================  */}
<section className="sec sec--earn" id="ways-to-earn">
  <div className="wrap">
    {/*  Header  */}
    <p className="eyebrow center">Ways To Earn</p>
    <h2 className="h2 center">Turn your pins into <mark>income</mark></h2>
    <p className="lead center">PinCraftly doesn't just save you hours — it turns your Pinterest traffic into real ways to earn. Pick the way that fits you.</p>

    {/*  Earn Cards Grid  */}
    <div className="earn-grid">

      {/*  Card 1: Blog traffic & ad revenue  */}
      <article className="earn-card">
        <span className="earn-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 20h17"/><path d="M5 16.5 10 11l3.5 3.5L19.5 8"/><path d="M15 8h4.5v4.5"/></svg></span>
        <h3>Blog traffic &amp; ad revenue</h3>
        <p>More pins, more clicks, more readers on your blog — and more ad revenue from the traffic Pinterest sends you.</p>
        <p className="earn-ex"><span>Food blogger Sarah M. saw blog traffic up 140% in two months.</span></p>
      </article>

      {/*  Card 2: Affiliate commissions  */}
      <article className="earn-card">
        <span className="earn-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.4"/><path d="M15.5 8.5l-7 7"/><circle cx="9" cy="9" r="0.7" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="0.7" fill="currentColor" stroke="none"/></svg></span>
        <h3>Affiliate commissions</h3>
        <p>Pin your roundups and reviews with keyword-rich titles so the right people find them — and buy through your links.</p>
        <p className="earn-ex"><span>Affiliate marketers pin roundups that match what people search.</span></p>
      </article>

      {/*  Card 3: Sell your products  */}
      <article className="earn-card">
        <span className="earn-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.2 8h13.6l-1.1 12.2H6.3L5.2 8Z"/><path d="M9 10V6.2a3 3 0 0 1 6 0V10"/></svg></span>
        <h3>Sell your products</h3>
        <p>Turn every product photo into fresh pins that link straight to the right listing on your shop.</p>
        <p className="earn-ex"><span>Shopify seller Jessica T. saw referrals 3x.</span></p>
      </article>

      {/*  Card 4: Offer Pinterest services  */}
      <article className="earn-card">
        <span className="earn-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8.6" r="3.4"/><path d="M3.6 19.8c.6-3.1 2.7-4.8 5.4-4.8s4.8 1.7 5.4 4.8"/><path d="M15.6 5.6a3.4 3.4 0 0 1 0 6.2"/><path d="M17.3 15.3c1.6.7 2.6 2.2 3 4.5"/></svg></span>
        <h3>Offer Pinterest services</h3>
        <p>Manage Pinterest for clients and agencies from one dashboard — unlimited accounts, boards and schedules.</p>
        <p className="earn-ex"><span>Agency lead Marcus H. manages 12 client accounts.</span></p>
      </article>

    </div>

    {/*  CTA  */}
    <div className="earn-cta">
      <a className="btn btn--primary" href="https://app.pincraftly.com/dashboard/register">
        <span>Start Earning Free</span>
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4"/></svg>
      </a>
      <p className="btn-subtext">Free to start · No credit card required</p>
    </div>
  </div>
</section>
    </>
  );
}