import React from "react";

export default function TemplatesShowcase() {
  return (
    <>
      {/*  ==========================================================================
     TEMPLATES SHOWCASE (2-Row Infinite Scrolling Pins Wall)
     ==========================================================================  */}
<section className="sec sec--pins" id="demo">
  <div className="wrap">
    {/*  Top Centered Header  */}
    <p className="eyebrow center">Templates Showcase</p>
    <h2 className="h2 center">Pins that look like you spent<br /><mark>all afternoon</mark> on them</h2>
    <p className="lead center">Example designs from 12 high-converting niches.<br />Yours start from your own post photos, custom colors, and brand typography.</p>
  </div>

  {/*  2-Row Infinite Marquee Showcase Wall  */}
  <div className="wall">
    {/*  Row 1: Leftward Smooth Auto-Scroll  */}
    <div className="wall-row">
      <div className="wall-track">
        {/*  Pin 1  */}
        <figure className="gpin">
          <img src="/images/p-pasta.jpg" width="360" height="540" alt="Recipe Pin Design" loading="lazy" />
          <figcaption>Recipes</figcaption>
        </figure>
        {/*  Pin 2  */}
        <figure className="gpin">
          <img src="/images/p-livingroom.jpg" width="360" height="540" alt="Home Decor Pin Design" loading="lazy" />
          <figcaption>Home decor</figcaption>
        </figure>
        {/*  Pin 3  */}
        <figure className="gpin">
          <img src="/images/p-nails.jpg" width="360" height="540" alt="Beauty Pin Design" loading="lazy" />
          <figcaption>Beauty</figcaption>
        </figure>
        {/*  Pin 4  */}
        <figure className="gpin">
          <img src="/images/p-lisbon.jpg" width="360" height="540" alt="Travel Pin Design" loading="lazy" />
          <figcaption>Travel</figcaption>
        </figure>
        {/*  Pin 5  */}
        <figure className="gpin">
          <img src="/images/p-planner.jpg" width="360" height="540" alt="Printables Pin Design" loading="lazy" />
          <figcaption>Printables</figcaption>
        </figure>
        {/*  Pin 6  */}
        <figure className="gpin">
          <img src="/images/p-capsule.jpg" width="360" height="540" alt="Fashion Pin Design" loading="lazy" />
          <figcaption>Fashion</figcaption>
        </figure>

        {/*  Seamless Duplicate Set for Infinite Marquee Loop  */}
        <figure className="gpin" aria-hidden="true">
          <img src="/images/p-pasta.jpg" width="360" height="540" alt="" loading="lazy" />
          <figcaption>Recipes</figcaption>
        </figure>
        <figure className="gpin" aria-hidden="true">
          <img src="/images/p-livingroom.jpg" width="360" height="540" alt="" loading="lazy" />
          <figcaption>Home decor</figcaption>
        </figure>
        <figure className="gpin" aria-hidden="true">
          <img src="/images/p-nails.jpg" width="360" height="540" alt="" loading="lazy" />
          <figcaption>Beauty</figcaption>
        </figure>
        <figure className="gpin" aria-hidden="true">
          <img src="/images/p-lisbon.jpg" width="360" height="540" alt="" loading="lazy" />
          <figcaption>Travel</figcaption>
        </figure>
        <figure className="gpin" aria-hidden="true">
          <img src="/images/p-planner.jpg" width="360" height="540" alt="" loading="lazy" />
          <figcaption>Printables</figcaption>
        </figure>
        <figure className="gpin" aria-hidden="true">
          <img src="/images/p-capsule.jpg" width="360" height="540" alt="" loading="lazy" />
          <figcaption>Fashion</figcaption>
        </figure>
      </div>
    </div>

    {/*  Row 2: Rightward Smooth Auto-Scroll (Reverse Direction)  */}
    <div className="wall-row is-rev">
      <div className="wall-track">
        {/*  Pin 7  */}
        <figure className="gpin">
          <img src="/images/p-savings.jpg" width="360" height="540" alt="Finance Pin Design" loading="lazy" />
          <figcaption>Finance</figcaption>
        </figure>
        {/*  Pin 8  */}
        <figure className="gpin">
          <img src="/images/p-garden.jpg" width="360" height="540" alt="Gardening Pin Design" loading="lazy" />
          <figcaption>Gardening</figcaption>
        </figure>
        {/*  Pin 9  */}
        <figure className="gpin">
          <img src="/images/p-mugs.jpg" width="360" height="540" alt="Handmade Crafts Pin Design" loading="lazy" />
          <figcaption>Handmade</figcaption>
        </figure>
        {/*  Pin 10  */}
        <figure className="gpin">
          <img src="/images/p-wedding.jpg" width="360" height="540" alt="Weddings Pin Design" loading="lazy" />
          <figcaption>Weddings</figcaption>
        </figure>
        {/*  Pin 11  */}
        <figure className="gpin">
          <img src="/images/p-shelves.jpg" width="360" height="540" alt="DIY Home Pin Design" loading="lazy" />
          <figcaption>DIY Home</figcaption>
        </figure>
        {/*  Pin 12  */}
        <figure className="gpin">
          <img src="/images/p-yoga.jpg" width="360" height="540" alt="Fitness Pin Design" loading="lazy" />
          <figcaption>Fitness</figcaption>
        </figure>

        {/*  Seamless Duplicate Set for Infinite Marquee Loop  */}
        <figure className="gpin" aria-hidden="true">
          <img src="/images/p-savings.jpg" width="360" height="540" alt="" loading="lazy" />
          <figcaption>Finance</figcaption>
        </figure>
        <figure className="gpin" aria-hidden="true">
          <img src="/images/p-garden.jpg" width="360" height="540" alt="" loading="lazy" />
          <figcaption>Gardening</figcaption>
        </figure>
        <figure className="gpin" aria-hidden="true">
          <img src="/images/p-mugs.jpg" width="360" height="540" alt="" loading="lazy" />
          <figcaption>Handmade</figcaption>
        </figure>
        <figure className="gpin" aria-hidden="true">
          <img src="/images/p-wedding.jpg" width="360" height="540" alt="" loading="lazy" />
          <figcaption>Weddings</figcaption>
        </figure>
        <figure className="gpin" aria-hidden="true">
          <img src="/images/p-shelves.jpg" width="360" height="540" alt="" loading="lazy" />
          <figcaption>DIY Home</figcaption>
        </figure>
        <figure className="gpin" aria-hidden="true">
          <img src="/images/p-yoga.jpg" width="360" height="540" alt="" loading="lazy" />
          <figcaption>Fitness</figcaption>
        </figure>
      </div>
    </div>
  </div>
</section>
    </>
  );
}