import React from "react";

export default function Reviews() {
  return (
    <>
      {/*  ==========================================================================
     REVIEWS SECTION (VERTICAL SMOOTH TICKER WALL)
     ==========================================================================  */}
<section className="sec sec--reviews" id="reviews">
  <div className="wrap">
    <p className="eyebrow" data-reveal="">Reviews</p>
    <h2 className="h2 center" data-reveal="">What PinCraftly users <mark>are saying</mark></h2>
    <p className="lead center" data-reveal="">Real feedback from bloggers, online store owners, and Pinterest creators automating their daily reach.</p>
  </div>

  <div className="rv-marquee-wall" aria-label="Customer Reviews Ticker">
    <div className="rv-col">
      <div className="rv-col-track rv-col-track--up-fast">
        <figure className="rv-card">
          <div className="rv-head">
            <div className="rv-stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">In-app review</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>It saves me hours every week. My pins look much more professional. Scheduling pins is simple and reliable. Easy to use, even as a beginner.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--blue">C</i><b className="rv-name">Chukwuezugo</b></div>
        </figure>
        <figure className="rv-card">
          <div className="rv-head">
            <div className="rv-stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge rv-badge--as">AppSumo verified</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>It can automatically generate Pinterest Pins from your website, saving hours of work. The keyword generator finds words that have good search traffic.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--gold">S</i><b className="rv-name">Sreekanth</b></div>
        </figure>
        <figure className="rv-card">
          <div className="rv-head">
            <div className="rv-stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">Food Blogger</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>Went from struggling to design 3 pins a week to queuing 20 fresh pins every single morning. Inbound blog traffic is up 140% in just two months.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--teal">S</i><b className="rv-name">Sarah M.</b></div>
        </figure>
        <figure className="rv-card">
          <div className="rv-head">
            <div className="rv-stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">In-app review</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>The interface is incredibly straightforward. It took me less than 5 minutes to connect my WordPress feed and start generating pins.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--purple">D</i><b className="rv-name">David L.</b></div>
        </figure>
        {/*  Duplicate set for seamless infinite scroll loop  */}
        <figure className="rv-card" aria-hidden="true">
          <div className="rv-head">
            <div className="rv-stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">In-app review</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>It saves me hours every week. My pins look much more professional. Scheduling pins is simple and reliable. Easy to use, even as a beginner.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--blue">C</i><b className="rv-name">Chukwuezugo</b></div>
        </figure>
        <figure className="rv-card" aria-hidden="true">
          <div className="rv-head">
            <div className="rv-stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge rv-badge--as">AppSumo verified</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>It can automatically generate Pinterest Pins from your website, saving hours of work. The keyword generator finds words that have good search traffic.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--gold">S</i><b className="rv-name">Sreekanth</b></div>
        </figure>
        <figure className="rv-card" aria-hidden="true">
          <div className="rv-head">
            <div className="rv-stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">Food Blogger</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>Went from struggling to design 3 pins a week to queuing 20 fresh pins every single morning. Inbound blog traffic is up 140% in just two months.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--teal">S</i><b className="rv-name">Sarah M.</b></div>
        </figure>
        <figure className="rv-card" aria-hidden="true">
          <div className="rv-head">
            <div className="rv-stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">In-app review</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>The interface is incredibly straightforward. It took me less than 5 minutes to connect my WordPress feed and start generating pins.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--purple">D</i><b className="rv-name">David L.</b></div>
        </figure>
      </div>
    </div>
    <div className="rv-col">
      <div className="rv-col-track rv-col-track--up-mid">
        <figure className="rv-card">
          <div className="rv-head">
            <div className="rv-stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">Shopify Seller</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>The AI designer pulls my Shopify product photos and crafts pins that actually match our luxury aesthetic. Our checkout referrals from Pinterest have surged 3x.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--pink">J</i><b className="rv-name">Jessica T.</b></div>
        </figure>
        <figure className="rv-card">
          <div className="rv-head">
            <div className="rv-stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">Travel Blogger</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>This is honestly the best Pinterest automation software on the market. Smart scheduling spreads out the pins at peak engagement windows automatically.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--indigo">M</i><b className="rv-name">Michael B.</b></div>
        </figure>
        <figure className="rv-card">
          <div className="rv-head">
            <div className="rv-stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">In-app review</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>The keyword engine and automatic scheduling keep my blog active 24/7 without me lifting a finger on weekends. Brilliant product.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--orange">A</i><b className="rv-name">Amanda R.</b></div>
        </figure>
        <figure className="rv-card">
          <div className="rv-head">
            <div className="rv-stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">In-app review</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>Easy to use, even as a beginner. Scheduling pins is fast and seamless. I can manage 3 separate niche blogs all from a single tab.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--gold">D</i><b className="rv-name">Daniel P.</b></div>
        </figure>
        {/*  Duplicate set for seamless infinite scroll loop  */}
        <figure className="rv-card" aria-hidden="true">
          <div className="rv-head">
            <div className="rv-stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">Shopify Seller</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>The AI designer pulls my Shopify product photos and crafts pins that actually match our luxury aesthetic. Our checkout referrals from Pinterest have surged 3x.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--pink">J</i><b className="rv-name">Jessica T.</b></div>
        </figure>
        <figure className="rv-card" aria-hidden="true">
          <div className="rv-head">
            <div className="rv-stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">Travel Blogger</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>This is honestly the best Pinterest automation software on the market. Smart scheduling spreads out the pins at peak engagement windows automatically.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--indigo">M</i><b className="rv-name">Michael B.</b></div>
        </figure>
        <figure className="rv-card" aria-hidden="true">
          <div className="rv-head">
            <div className="rv-stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">In-app review</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>The keyword engine and automatic scheduling keep my blog active 24/7 without me lifting a finger on weekends. Brilliant product.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--orange">A</i><b className="rv-name">Amanda R.</b></div>
        </figure>
        <figure className="rv-card" aria-hidden="true">
          <div className="rv-head">
            <div className="rv-stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">In-app review</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>Easy to use, even as a beginner. Scheduling pins is fast and seamless. I can manage 3 separate niche blogs all from a single tab.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--gold">D</i><b className="rv-name">Daniel P.</b></div>
        </figure>
      </div>
    </div>
    <div className="rv-col">
      <div className="rv-col-track rv-col-track--up-slow">
        <figure className="rv-card">
          <div className="rv-head">
            <div className="rv-stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">DIY Creator</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>As someone who hates spending all afternoon designing graphics, PinCraftly has been a total lifesaver. The template variety is top tier.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--rose">R</i><b className="rv-name">Rachel K.</b></div>
        </figure>
        <figure className="rv-card">
          <div className="rv-head">
            <div className="rv-stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">Agency Lead</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>Managing 12 client Pinterest accounts used to take two full-time designers. We now automate the bulk creation and only do quick reviews.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--blue">M</i><b className="rv-name">Marcus H.</b></div>
        </figure>
        <figure className="rv-card">
          <div className="rv-head">
            <div className="rv-stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">In-app review</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>The automated alt text and SEO descriptions saved my organic rankings after the latest Pinterest feed update. Indispensable tool.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--purple">E</i><b className="rv-name">Elena V.</b></div>
        </figure>
        <figure className="rv-card">
          <div className="rv-head">
            <div className="rv-stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge rv-badge--as">AppSumo verified</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>Clean UI, snappy performance, and customer support that actually responds within minutes. You won’t regret getting this.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--teal">C</i><b className="rv-name">Chris W.</b></div>
        </figure>
        {/*  Duplicate set for seamless infinite scroll loop  */}
        <figure className="rv-card" aria-hidden="true">
          <div className="rv-head">
            <div className="rv-stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">DIY Creator</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>As someone who hates spending all afternoon designing graphics, PinCraftly has been a total lifesaver. The template variety is top tier.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--rose">R</i><b className="rv-name">Rachel K.</b></div>
        </figure>
        <figure className="rv-card" aria-hidden="true">
          <div className="rv-head">
            <div className="rv-stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">Agency Lead</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>Managing 12 client Pinterest accounts used to take two full-time designers. We now automate the bulk creation and only do quick reviews.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--blue">M</i><b className="rv-name">Marcus H.</b></div>
        </figure>
        <figure className="rv-card" aria-hidden="true">
          <div className="rv-head">
            <div className="rv-stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge">In-app review</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>The automated alt text and SEO descriptions saved my organic rankings after the latest Pinterest feed update. Indispensable tool.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--purple">E</i><b className="rv-name">Elena V.</b></div>
        </figure>
        <figure className="rv-card" aria-hidden="true">
          <div className="rv-head">
            <div className="rv-stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"></path></svg></div>
            <span className="rv-badge rv-badge--as">AppSumo verified</span>
          </div>
          <blockquote className="rv-body"><span className="rv-qm">“</span>Clean UI, snappy performance, and customer support that actually responds within minutes. You won’t regret getting this.<span className="rv-qm">”</span></blockquote>
          <div className="rv-foot"><i className="rv-av rv-av--teal">C</i><b className="rv-name">Chris W.</b></div>
        </figure>
      </div>
    </div>
  </div>
</section>
    </>
  );
}