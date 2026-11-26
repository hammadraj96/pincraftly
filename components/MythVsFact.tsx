import React from "react";

export default function MythVsFact() {
  return (
    <>
      {/*  ==========================================================================
     MYTH VS FACT SECTION — Pinterest myths, busted
     ==========================================================================  */}
<section className="sec sec--myth" id="myth-vs-fact">
  <div className="wrap">
    <p className="eyebrow" data-reveal="">Myth vs Fact</p>
    <h2 className="h2 center" data-reveal="">Pinterest myths, busted</h2>
    <p className="lead center" data-reveal="">Most people get Pinterest wrong — and that’s why their pins never take off. Here’s what actually works.</p>

    <div className="mf-grid">
      <article className="mf-card" data-reveal="">
        <div className="mf-row mf-row--myth">
          <span className="mf-mark mf-mark--no" aria-hidden="true">✕</span>
          <p className="mf-text"><b>Myth:</b> “Pinterest is just another social media app.”</p>
        </div>
        <div className="mf-row mf-row--fact">
          <span className="mf-mark mf-mark--yes" aria-hidden="true">✓</span>
          <p className="mf-text"><b>Fact:</b> It’s a visual search and discovery engine — 80 billion+ searches every month, and people come to find ideas and buy.</p>
        </div>
      </article>

      <article className="mf-card" data-reveal="">
        <div className="mf-row mf-row--myth">
          <span className="mf-mark mf-mark--no" aria-hidden="true">✕</span>
          <p className="mf-text"><b>Myth:</b> “Posting once in a while is enough.”</p>
        </div>
        <div className="mf-row mf-row--fact">
          <span className="mf-mark mf-mark--yes" aria-hidden="true">✓</span>
          <p className="mf-text"><b>Fact:</b> Pinterest rewards fresh pins every day — 15 to 30 fresh pins daily keep your reach growing, and missed days can cost up to 60% of your reach.</p>
        </div>
      </article>

      <article className="mf-card" data-reveal="">
        <div className="mf-row mf-row--myth">
          <span className="mf-mark mf-mark--no" aria-hidden="true">✕</span>
          <p className="mf-text"><b>Myth:</b> “You have to design every pin by hand.”</p>
        </div>
        <div className="mf-row mf-row--fact">
          <span className="mf-mark mf-mark--yes" aria-hidden="true">✓</span>
          <p className="mf-text"><b>Fact:</b> PinCraftly drafts fresh custom pin designs from your own photos in seconds — with keyword-rich titles, ready to approve.</p>
        </div>
      </article>

      <article className="mf-card" data-reveal="">
        <div className="mf-row mf-row--myth">
          <span className="mf-mark mf-mark--no" aria-hidden="true">✕</span>
          <p className="mf-text"><b>Myth:</b> “You need a big following to get traffic.”</p>
        </div>
        <div className="mf-row mf-row--fact">
          <span className="mf-mark mf-mark--yes" aria-hidden="true">✓</span>
          <p className="mf-text"><b>Fact:</b> Pins get discovered through search, not followers — keyword-rich titles and descriptions put your pins in front of the right people.</p>
        </div>
      </article>

      <article className="mf-card" data-reveal="">
        <div className="mf-row mf-row--myth">
          <span className="mf-mark mf-mark--no" aria-hidden="true">✕</span>
          <p className="mf-text"><b>Myth:</b> “You need a website to start.”</p>
        </div>
        <div className="mf-row mf-row--fact">
          <span className="mf-mark mf-mark--yes" aria-hidden="true">✓</span>
          <p className="mf-text"><b>Fact:</b> No website needed, no Pinterest password, no credit card — start free and connect a website later if you have one.</p>
        </div>
      </article>

      <article className="mf-card" data-reveal="">
        <div className="mf-row mf-row--myth">
          <span className="mf-mark mf-mark--no" aria-hidden="true">✕</span>
          <p className="mf-text"><b>Myth:</b> “Pins die after a day like other posts.”</p>
        </div>
        <div className="mf-row mf-row--fact">
          <span className="mf-mark mf-mark--yes" aria-hidden="true">✓</span>
          <p className="mf-text"><b>Fact:</b> Pins keep working for months. Schedule them once with Smart Scheduler and they keep driving traffic 24/7.</p>
        </div>
      </article>
    </div>
  </div>
</section>
    </>
  );
}