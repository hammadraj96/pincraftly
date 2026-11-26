"use client";

import React, { useState } from "react";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"m" | "y">("m");

  return (
    <>
      {/*  ==========================================================================
     PRICING SECTION
     ==========================================================================  */}
<section className="sec sec--price" id="pricing">
  <div className="wrap">
    {/*  Header  */}
    <p className="eyebrow" data-reveal="">Pricing</p>
    <h2 className="h2 center" data-reveal="">Simple plans. <mark>Start free.</mark></h2>
    <p className="lead center" data-reveal="">
      Pinterest automation that starts free, no credit card. Plans start at $19.99 a month, or $8.99 with one of 50 Price Lock spots. Pay yearly and get two to three months free.
    </p>

    {/*  Monthly / Yearly Switcher  */}
    <div className="bill" data-reveal="">
      <div className="bill-sw" role="group" aria-label="Billing period">
        <button type="button" className={`bill-btn ${billingCycle === 'm' ? 'is-on' : ''}`} data-bill="m" onClick={() => setBillingCycle('m')}>Monthly</button>
        <button type="button" className={`bill-btn ${billingCycle === 'y' ? 'is-on' : ''}`} data-bill="y" onClick={() => setBillingCycle('y')}>Yearly</button>
      </div>
      <span className="bill-save">up to 3 months free</span>
    </div>

    {/*  Pricing Cards Grid  */}
    <div className="plans" data-plans="">

      {/*  Card 1: Price Lock  */}
      <div className="plan plan--limited" data-slug="scheduler" data-reveal="" style={{ '--k': 0 } as React.CSSProperties}>
        <span className="ribbon">50 spots only</span>
        <div className="plan-head">
          <span className="plan-icon-custom plan-icon--gold">
            <svg viewBox="0 0 32 32" fill="none" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="5" width="26" height="23" rx="7" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
              <path d="M11 11V8.5a5 5 0 0110 0V11" stroke="#b45309" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="16" cy="18" r="2.5" fill="#b45309"/>
            </svg>
          </span>
          <div>
            <h3>Price Lock</h3>
            <p className="tag-line">$8.99 a month, kept while you stay subscribed</p>
          </div>
        </div>

        <p className="price">
          <sup>$</sup><span className="amt">{billingCycle === 'y' ? '79.99' : '8.99'}</span><small className="per">{billingCycle === 'y' ? '/yr' : '/mo'}</small>
        </p>
        <p className="yearly">
          <span>{billingCycle === 'y' ? '≈ $6.67/mo · save $27.89' : 'or $79.99 a year'}</span>
          <b className="free" hidden={billingCycle !== 'y'}>about 3 months free</b>
        </p>

        <div className="seats">
          <p className="seats-line">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"></path></svg>
            <span>Only 50 spots, then closes to new sign-ups</span>
          </p>
        </div>

        <p className="best">Best for: <b>One blog, one account</b></p>

        <ul className="specs">
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.5" r="3.5"></circle><path d="M5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6"></path></svg>
              Pinterest accounts
              <button type="button" className="tip" aria-label="How many Pinterest accounts you can connect." data-tip="How many Pinterest accounts you can connect and post to.">i</button>
            </span>
            <b className="sp-v">1</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18"></path></svg>
              Websites
              <button type="button" className="tip" aria-label="Websites" data-tip="The sites PinCraftly reads your posts and products from.">i</button>
            </span>
            <b className="sp-v">1</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a6 6 0 0 0-6 6c0 4.5 6 12.5 6 12.5s6-8 6-12.5a6 6 0 0 0-6-6z"></path><circle cx="12" cy="8.5" r="2"></circle></svg>
              Total pins a day
              <button type="button" className="tip" aria-label="Pins cap" data-tip="Hard cap: 60 pins a day per account.">i</button>
            </span>
            <b className="sp-v">60</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M5 10h14M5 14h9M5 18h6"></path><path d="M17 15l2 2 3-4"></path></svg>
              AI text credits
            </span>
            <b className="sp-v">250/mo</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="2"></rect><circle cx="9" cy="10" r="1.8"></circle><path d="M20.5 16l-5-5-8.5 8.5"></path></svg>
              AI pin images
            </span>
            <b className="sp-v">100/mo</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="M16 16l4.5 4.5"></path></svg>
              Keyword searches
            </span>
            <b className="sp-v">300/mo</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4"></rect><path d="M8 10.5v6M8 7.5v.01M11.5 16.5v-6M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1.9 2.1 2.6v3.5"></path></svg>
              LinkedIn profiles
            </span>
            <b className="sp-v">5</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3.5h9l5 5v12H5z"></path><path d="M14 3.5v5h5M8.5 12.5h7M8.5 16h5"></path></svg>
              AI blog writer
            </span>
            <b className="sp-v">Included</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2"></path><rect x="3.5" y="13" width="4" height="6" rx="1.5"></rect><rect x="16.5" y="13" width="4" height="6" rx="1.5"></rect></svg>
              Support
            </span>
            <b className="sp-v">Standard</b>
          </li>
        </ul>

        <a className="btn btn--ghost" href={billingCycle === 'y' ? "https://app.pincraftly.com/dashboard/register?plan=price-lock&billing=yearly" : "https://app.pincraftly.com/dashboard/register?plan=price-lock&billing=monthly"}>
          Get Price Lock
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4"></path></svg>
        </a>
      </div>

      {/*  Card 2: Starter (Popular / Recommended)  */}
      <div className="plan plan--pop" data-slug="starter" data-reveal="" style={{ '--k': 1 } as React.CSSProperties}>
        <span className="pop">Recommended</span>
        <div className="plan-head">
          <span className="plan-icon-custom plan-icon--rose">
            <svg viewBox="0 0 32 32" fill="none" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="26" height="26" rx="8" fill="#ffe4e6" stroke="#E60023" strokeWidth="1.5"/>
              <path d="M16 7l2.2 5.5 5.8.8-4.2 4.1 1 5.8-4.8-2.6-4.8 2.6 1-5.8-4.2-4.1 5.8-.8z" fill="#E60023"/>
            </svg>
          </span>
          <div>
            <h3>Starter</h3>
            <p className="tag-line">Every account and site you run</p>
          </div>
        </div>

        <p className="price">
          <sup>$</sup><span className="amt">{billingCycle === 'y' ? '199' : '19.99'}</span><small className="per">{billingCycle === 'y' ? '/yr' : '/mo'}</small>
        </p>
        <p className="yearly">
          <span>{billingCycle === 'y' ? '≈ $16.58/mo · save $40.88' : 'or $199 a year'}</span>
          <b className="free" hidden={billingCycle !== 'y'}>2 months free</b>
        </p>

        <div className="perk">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="9" width="17" height="4" rx="1"></rect><path d="M5 13v7h14v-7M12 9v11M12 9c-2-4-6-4-6-1.5S10 9 12 9zm0 0c2-4 6-4 6-1.5S14 9 12 9z"></path></svg>
          <p className="perk-line"><span>Pay yearly &amp; save <b>$40.88</b></span> <span className="perk-badge">2 months free</span></p>
        </div>

        <p className="best">Best for: <b>Bloggers with several sites</b></p>

        <ul className="specs">
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.5" r="3.5"></circle><path d="M5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6"></path></svg>
              Pinterest accounts
            </span>
            <b className="sp-v is-hi">Unlimited</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18"></path></svg>
              Websites
            </span>
            <b className="sp-v is-hi">Unlimited</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a6 6 0 0 0-6 6c0 4.5 6 12.5 6 12.5s6-8 6-12.5a6 6 0 0 0-6-6z"></path><circle cx="12" cy="8.5" r="2"></circle></svg>
              Total pins a day
            </span>
            <b className="sp-v">200</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M5 10h14M5 14h9M5 18h6"></path><path d="M17 15l2 2 3-4"></path></svg>
              AI text credits
            </span>
            <b className="sp-v">1,000/mo</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="2"></rect><circle cx="9" cy="10" r="1.8"></circle><path d="M20.5 16l-5-5-8.5 8.5"></path></svg>
              AI pin images
            </span>
            <b className="sp-v">500/mo</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="M16 16l4.5 4.5"></path></svg>
              Keyword searches
            </span>
            <b className="sp-v is-hi">Unlimited</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4"></rect><path d="M8 10.5v6M8 7.5v.01M11.5 16.5v-6M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1.9 2.1 2.6v3.5"></path></svg>
              LinkedIn profiles
            </span>
            <b className="sp-v">5</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3.5h9l5 5v12H5z"></path><path d="M14 3.5v5h5M8.5 12.5h7M8.5 16h5"></path></svg>
              AI blog writer
            </span>
            <b className="sp-v">Included</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2"></path><rect x="3.5" y="13" width="4" height="6" rx="1.5"></rect><rect x="16.5" y="13" width="4" height="6" rx="1.5"></rect></svg>
              Support
            </span>
            <b className="sp-v">Standard</b>
          </li>
        </ul>

        <a className="btn btn--rose" href={billingCycle === 'y' ? "https://app.pincraftly.com/dashboard/register?plan=starter&billing=yearly" : "https://app.pincraftly.com/dashboard/register?plan=starter&billing=monthly"}>
          Get Starter
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4"></path></svg>
        </a>
      </div>

      {/*  Card 3: Growth  */}
      <div className="plan" data-slug="growth" data-reveal="" style={{ '--k': 2 } as React.CSSProperties}>
        <div className="plan-head">
          <span className="plan-icon-custom plan-icon--indigo">
            <svg viewBox="0 0 32 32" fill="none" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="26" height="26" rx="8" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5"/>
              <path d="M9 21l4.5-5 4 3 6-7" stroke="#4338ca" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.5 12h4v4" stroke="#4338ca" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <div>
            <h3>Growth</h3>
            <p className="tag-line">For managers and busy agencies</p>
          </div>
        </div>

        <p className="price">
          <sup>$</sup><span className="amt">{billingCycle === 'y' ? '399' : '39.99'}</span><small className="per">{billingCycle === 'y' ? '/yr' : '/mo'}</small>
        </p>
        <p className="yearly">
          <span>{billingCycle === 'y' ? '≈ $33.25/mo · save $80.88' : 'or $399 a year'}</span>
          <b className="free" hidden={billingCycle !== 'y'}>2 months free</b>
        </p>

        <div className="perk">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="9" width="17" height="4" rx="1"></rect><path d="M5 13v7h14v-7M12 9v11M12 9c-2-4-6-4-6-1.5S10 9 12 9zm0 0c2-4 6-4 6-1.5S14 9 12 9z"></path></svg>
          <p className="perk-line"><span>Pay yearly &amp; save <b>$80.88</b></span> <span className="perk-badge">2 months free</span></p>
        </div>

        <p className="best">Best for: <b>Pinterest managers and agencies</b></p>

        <ul className="specs">
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.5" r="3.5"></circle><path d="M5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6"></path></svg>
              Pinterest accounts
            </span>
            <b className="sp-v is-hi">Unlimited</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18"></path></svg>
              Websites
            </span>
            <b className="sp-v is-hi">Unlimited</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a6 6 0 0 0-6 6c0 4.5 6 12.5 6 12.5s6-8 6-12.5a6 6 0 0 0-6-6z"></path><circle cx="12" cy="8.5" r="2"></circle></svg>
              Total pins a day
            </span>
            <b className="sp-v is-hi">Unlimited</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M5 10h14M5 14h9M5 18h6"></path><path d="M17 15l2 2 3-4"></path></svg>
              AI text credits
            </span>
            <b className="sp-v">2,000/mo</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="2"></rect><circle cx="9" cy="10" r="1.8"></circle><path d="M20.5 16l-5-5-8.5 8.5"></path></svg>
              AI pin images
            </span>
            <b className="sp-v">1,500/mo</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="M16 16l4.5 4.5"></path></svg>
              Keyword searches
            </span>
            <b className="sp-v is-hi">Unlimited</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4"></rect><path d="M8 10.5v6M8 7.5v.01M11.5 16.5v-6M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1.9 2.1 2.6v3.5"></path></svg>
              LinkedIn profiles
            </span>
            <b className="sp-v">5</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3.5h9l5 5v12H5z"></path><path d="M14 3.5v5h5M8.5 12.5h7M8.5 16h5"></path></svg>
              AI blog writer
            </span>
            <b className="sp-v">Included</b>
          </li>
          <li>
            <span className="sp-l">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2"></path><rect x="3.5" y="13" width="4" height="6" rx="1.5"></rect><rect x="16.5" y="13" width="4" height="6" rx="1.5"></rect></svg>
              Support
            </span>
            <b className="sp-v is-hi">Priority</b>
          </li>
        </ul>

        <a className="btn btn--ghost" href={billingCycle === 'y' ? "https://app.pincraftly.com/dashboard/register?plan=growth&billing=yearly" : "https://app.pincraftly.com/dashboard/register?plan=growth&billing=monthly"}>
          Get Growth
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4"></path></svg>
        </a>
      </div>

    </div>
  </div>
</section>
    </>
  );
}