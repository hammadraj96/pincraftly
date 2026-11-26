"use client";

import React, { useState } from "react";

export default function FAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <>
      {/*  ==========================================================================
     FAQ SECTION — interactive accordion
     ==========================================================================  */}
<section className="sec sec--faq" id="faq">
  <div className="wrap">
    <p className="eyebrow" data-reveal="">FAQ</p>
    <h2 className="h2 center" data-reveal="">Frequently asked questions</h2>
    <p className="lead center" data-reveal="">Everything you need to know before you start automating your Pinterest growth.</p>

    <div className="faq-list">
      <div className={`faq-item ${openFaqIndex === 0 ? 'is-open' : ''}`}>
        <h3 className="faq-head">
          <button type="button" className="faq-q" id="faq-q1" aria-expanded={openFaqIndex === 0} aria-controls="faq-a1" onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}>
            <span>Is PinCraftly really free to start?</span>
            <span className="faq-icon" aria-hidden="true"></span>
          </button>
        </h3>
        <div className="faq-panel" id="faq-a1" role="region" aria-labelledby="faq-q1" style={{ maxHeight: openFaqIndex === 0 ? '500px' : '0px' }}>
          <p className="faq-a">Yes, Pinterest automation starts free with no credit card. Paid plans start at $19.99 a month, or $8.99 a month with one of the 50 Price Lock spots.</p>
        </div>
      </div>

      <div className={`faq-item ${openFaqIndex === 1 ? 'is-open' : ''}`}>
        <h3 className="faq-head">
          <button type="button" className="faq-q" id="faq-q2" aria-expanded={openFaqIndex === 1} aria-controls="faq-a2" onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}>
            <span>How does PinCraftly create pins from my blog or store?</span>
            <span className="faq-icon" aria-hidden="true"></span>
          </button>
        </h3>
        <div className="faq-panel" id="faq-a2" role="region" aria-labelledby="faq-q2" style={{ maxHeight: openFaqIndex === 1 ? '500px' : '0px' }}>
          <p className="faq-a">Paste a blog URL, store link or text prompt and PinCraftly generates click-worthy pins with AI titles, descriptions and brand-matched designs from your own posts, photos and brand.</p>
        </div>
      </div>

      <div className={`faq-item ${openFaqIndex === 2 ? 'is-open' : ''}`}>
        <h3 className="faq-head">
          <button type="button" className="faq-q" id="faq-q3" aria-expanded={openFaqIndex === 2} aria-controls="faq-a3" onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}>
            <span>How many Pinterest accounts and websites can I connect?</span>
            <span className="faq-icon" aria-hidden="true"></span>
          </button>
        </h3>
        <div className="faq-panel" id="faq-a3" role="region" aria-labelledby="faq-q3" style={{ maxHeight: openFaqIndex === 2 ? '500px' : '0px' }}>
          <p className="faq-a">Price Lock covers 1 Pinterest account and 1 website. Starter and Growth cover unlimited Pinterest accounts and unlimited websites.</p>
        </div>
      </div>

      <div className={`faq-item ${openFaqIndex === 3 ? 'is-open' : ''}`}>
        <h3 className="faq-head">
          <button type="button" className="faq-q" id="faq-q4" aria-expanded={openFaqIndex === 3} aria-controls="faq-a4" onClick={() => setOpenFaqIndex(openFaqIndex === 3 ? null : 3)}>
            <span>What is Price Lock and why only 50 spots?</span>
            <span className="faq-icon" aria-hidden="true"></span>
          </button>
        </h3>
        <div className="faq-panel" id="faq-a4" role="region" aria-labelledby="faq-q4" style={{ maxHeight: openFaqIndex === 3 ? '500px' : '0px' }}>
          <p className="faq-a">Price Lock is $8.99 a month, kept at that rate while you stay subscribed. Only 50 spots are available, then it closes to new sign-ups.</p>
        </div>
      </div>

      <div className={`faq-item ${openFaqIndex === 4 ? 'is-open' : ''}`}>
        <h3 className="faq-head">
          <button type="button" className="faq-q" id="faq-q5" aria-expanded={openFaqIndex === 4} aria-controls="faq-a5" onClick={() => setOpenFaqIndex(openFaqIndex === 4 ? null : 4)}>
            <span>Does PinCraftly schedule pins at the best times?</span>
            <span className="faq-icon" aria-hidden="true"></span>
          </button>
        </h3>
        <div className="faq-panel" id="faq-a5" role="region" aria-labelledby="faq-q5" style={{ maxHeight: openFaqIndex === 4 ? '500px' : '0px' }}>
          <p className="faq-a">Yes, the Smart Scheduler distributes pins at peak Pinterest audience engagement hours and keeps a consistent, safe daily queue.</p>
        </div>
      </div>

      <div className={`faq-item ${openFaqIndex === 5 ? 'is-open' : ''}`}>
        <h3 className="faq-head">
          <button type="button" className="faq-q" id="faq-q6" aria-expanded={openFaqIndex === 5} aria-controls="faq-a6" onClick={() => setOpenFaqIndex(openFaqIndex === 5 ? null : 5)}>
            <span>Can I cancel anytime?</span>
            <span className="faq-icon" aria-hidden="true"></span>
          </button>
        </h3>
        <div className="faq-panel" id="faq-a6" role="region" aria-labelledby="faq-q6" style={{ maxHeight: openFaqIndex === 5 ? '500px' : '0px' }}>
          <p className="faq-a">Yes, you can cancel anytime and keep your locked Price Lock rate only while you stay subscribed.</p>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}