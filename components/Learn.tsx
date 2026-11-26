import React from "react";

export default function Learn() {
  return (
    <>
      {/*  ==========================================================================
     LEARN PINTEREST SECTION — blog post cards
     ==========================================================================  */}
<section className="sec sec--learn" id="learn">
  <div className="wrap">
    <p className="eyebrow" data-reveal="">Learn Pinterest</p>
    <h2 className="h2 center" data-reveal="">Learn Pinterest, one post at a time</h2>
    <p className="lead center" data-reveal="">Short, practical guides from the PinCraftly team — no fluff, just what works on Pinterest right now.</p>

    <div className="learn-grid">
      <article className="learn-card" data-reveal="">
        <div className="learn-media">
          <img src="/images/p-planner.jpg" width="360" height="270" alt="Planner with notes for planning keyword-rich pin titles" loading="lazy" />
        </div>
        <div className="learn-body">
          <div className="learn-meta">
            <span className="learn-cat">Pinterest SEO</span>
            <span className="learn-time">6 min read</span>
          </div>
          <h3 className="learn-title">How keyword-rich titles get your pins found</h3>
          <p className="learn-excerpt">Pins get discovered through search, not followers — here’s how to write titles people actually search for.</p>
          <a className="learn-link" href="#" aria-label="Read article: How keyword-rich titles get your pins found">Read article <span aria-hidden="true">→</span></a>
        </div>
      </article>

      <article className="learn-card" data-reveal="">
        <div className="learn-media">
          <img src="/images/p-pasta.jpg" width="360" height="270" alt="Fresh pasta dish, the kind of fresh pin posted daily" loading="lazy" />
        </div>
        <div className="learn-body">
          <div className="learn-meta">
            <span className="learn-cat">Fresh Pins</span>
            <span className="learn-time">5 min read</span>
          </div>
          <h3 className="learn-title">Why 15–30 fresh pins a day keep your reach growing</h3>
          <p className="learn-excerpt">Pinterest rewards fresh pins every day, and missed days can cost up to 60% of your reach.</p>
          <a className="learn-link" href="#" aria-label="Read article: Why 15–30 fresh pins a day keep your reach growing">Read article <span aria-hidden="true">→</span></a>
        </div>
      </article>

      <article className="learn-card" data-reveal="">
        <div className="learn-media">
          <img src="/images/p-yoga.jpg" width="360" height="270" alt="Morning yoga routine, scheduled at the right time of day" loading="lazy" />
        </div>
        <div className="learn-body">
          <div className="learn-meta">
            <span className="learn-cat">Scheduling</span>
            <span className="learn-time">4 min read</span>
          </div>
          <h3 className="learn-title">The best times to schedule your pins</h3>
          <p className="learn-excerpt">Smart Scheduler posts at peak engagement hours, so your pins go live when people are looking.</p>
          <a className="learn-link" href="#" aria-label="Read article: The best times to schedule your pins">Read article <span aria-hidden="true">→</span></a>
        </div>
      </article>

      <article className="learn-card" data-reveal="">
        <div className="learn-media">
          <img src="/images/p-nails.jpg" width="360" height="270" alt="Polished nail design pin, an example of a pin that gets clicked" loading="lazy" />
        </div>
        <div className="learn-body">
          <div className="learn-meta">
            <span className="learn-cat">Pin Design</span>
            <span className="learn-time">5 min read</span>
          </div>
          <h3 className="learn-title">What makes a pin get clicked, not just seen</h3>
          <p className="learn-excerpt">Manual graphics average a 0.18% click rate — here’s what the pins that get clicked do differently.</p>
          <a className="learn-link" href="#" aria-label="Read article: What makes a pin get clicked, not just seen">Read article <span aria-hidden="true">→</span></a>
        </div>
      </article>
    </div>
  </div>
</section>
    </>
  );
}