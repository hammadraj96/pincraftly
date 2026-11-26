import React from "react";

export default function Footer() {
  return (
    <>
      {/*  ==========================================================================
     PRE-FOOTER CTA + COMPLETE MODERN FOOTER
     ==========================================================================  */}
<footer className="sf" data-site-footer>
  <div className="wrap">
    {/*  Pre-Footer Conversion Card  */}
    <div className="sf-cta">
      <div className="sf-cta-info">
        <p className="sf-kick">START FREE · NO CREDIT CARD</p>
        <h2 className="h2 sf-h">See the <mark>pins hiding</mark> in your posts.</h2>
        <p className="sf-sub">Paste any blog post or shop URL and see 10 custom pins generated in 30 seconds.</p>
      </div>
      <div className="sf-cta-btns">
        <a className="btn sf-btn" href="#pricing">
          <span>Get Started Free</span>
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4"/></svg>
        </a>
        <p className="sf-subtext">No credit card required · Free 7-day access</p>
        <a className="sf-try" href="#features">or explore the full feature suite &rarr;</a>
      </div>
    </div>

    {/*  Main Footer Grid  */}
    <div className="sf-main sf-main--v2">
      {/*  Brand & Mission Column  */}
      <div className="sf-brand">
        <div className="sf-about">
          <a className="hdr-logo" href="#" aria-label="PinCraftly Home">
            <img className="hdr-logo-img" src="/images/logo.png" alt="PinCraftly" width="195" height="36" />
          </a>
          <p className="sf-desc">The modern visual automation platform for digital bloggers, direct-to-consumer shops, and growth agencies looking to scale organic Pinterest discovery without spending entire evenings in design software.</p>

          {/*  Social Links  */}
          <div className="sf-social-wrap">
            <span className="sf-social-label">Follow Platform Updates:</span>
            <div className="sf-social-links">
              <a href="https://pinterest.com/" target="_blank" rel="noopener" aria-label="Pinterest" className="sf-soc-btn">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.6 19.3c-.05-.8-.1-2.1.02-3 .12-.8.8-3.4.8-3.4s-.2-.4-.2-1c0-1 .6-1.7 1.3-1.7.6 0 .9.4.9 1 0 .6-.4 1.5-.6 2.4-.2.7.4 1.3 1.1 1.3 1.3 0 2.3-1.4 2.3-3.4 0-1.8-1.3-3-3.1-3a3.2 3.2 0 0 0-3.4 3.2c0 .6.2 1.3.5 1.7.06.07.07.13.05.2l-.2.8c-.03.1-.1.14-.2.1-1.3-.6-2.1-2.5-2.1-4 0-3.2 2.4-6.2 6.8-6.2 3.6 0 6.4 2.6 6.4 6 0 3.6-2.2 6.5-5.4 6.5-1 0-2-.5-2.4-1.2l-.6 2.5c-.2 1-.8 2.2-1.3 2.9A10 10 0 1 0 12 2z"/></svg>
              </a>
              <a href="https://x.com/" target="_blank" rel="noopener" aria-label="Twitter / X" className="sf-soc-btn">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn" className="sf-soc-btn">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/*  3 Categorical Navigation Columns  */}
      <nav className="sf-cols sf-cols--v2" aria-label="Footer Navigation">
        <div className="sf-col">
          <h3 className="sf-h3">Platform &amp; Tech</h3>
          <ul>
            <li><a href="#features">AI Pin Studio</a></li>
            <li><a href="#features">Smart Queue &amp; Scheduler</a></li>
            <li><a href="#demo">Conversion Templates</a></li>
            <li><a href="#features">SEO Keyword Radar</a></li>
            <li><a href="#features">Bulk CSV Ingestion</a></li>
            <li><a href="#features">E-commerce Live Sync</a></li>
          </ul>
        </div>

        <div className="sf-col">
          <h3 className="sf-h3">Resources &amp; Data</h3>
          <ul>
            <li><a href="#demo">2026 Pinterest Playbook</a></li>
            <li><a href="#demo">Viral Pin Headline Bank</a></li>
            <li><a href="#problem">Peak Audience Heatmaps</a></li>
            <li><a href="#pricing">Plan ROI Calculator</a></li>
            <li><a href="#reviews">Creator Wall of Love</a></li>
            <li><a href="#faq">Knowledge Base &amp; FAQ</a></li>
          </ul>
        </div>

        <div className="sf-col">
          <h3 className="sf-h3">Company &amp; Trust</h3>
          <ul>
            <li><a href="#pricing">Pricing &amp; Lifetime Lock</a></li>
            <li><a href="#problem">Why Switch from Tailwind?</a></li>
            <li><a href="#reviews">Case Studies &amp; Benchmarks</a></li>
            <li><a href="#features">Security &amp; API Compliance</a></li>
            <li><a href="#faq">Talk to Founder</a></li>
            <li><a href="mailto:support@pincraftly.com">Contact Sales Team</a></li>
          </ul>
        </div>
      </nav>
    </div>

    {/*  Bottom Copyright & Security Strip  */}
    <div className="sf-base sf-base--v2">
      <div className="sf-base-left">
        <p className="sf-copy">&copy; 2026 PinCraftly Inc. Built for high-velocity visual discovery.</p>
      </div>

      <div className="sf-base-links">
        <a href="#faq">Privacy Policy</a>
        <span className="sf-sep">&bull;</span>
        <a href="#faq">Terms of Service</a>
        <span className="sf-sep">&bull;</span>
        <a href="#faq">Security Center</a>
      </div>
    </div>
  </div>
</footer>
    </>
  );
}