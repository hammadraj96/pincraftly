"use client";

import React, { useState, useEffect } from "react";

export default function Header() {
  const [openMegaMenu, setOpenMegaMenu] = useState<"product" | "tools" | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && !target.closest(".has-mm")) {
        setOpenMegaMenu(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMegaMenu(null);
        closeDrawer();
      }
    };
    document.addEventListener("click", handleDocClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleDocClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handle body overflow lock when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header className="hdr" data-site-header>
        <div className="hdr-bar">
          {/* Brand Logo */}
          <a className="hdr-logo" href="#" aria-label="PinCraftly Home">
            <img className="hdr-logo-img" src="/images/logo.png" alt="PinCraftly" width="195" height="36" />
          </a>

          {/* Desktop Navigation with Mega-Menu */}
          <nav className="hdr-nav" aria-label="Main Navigation">
            <ul>
              {/* Dropdown 1: Product */}
              <li className={`has-mm ${openMegaMenu === "product" ? "mm-open" : ""}`} id="product-menu" onMouseEnter={() => setOpenMegaMenu("product")} onMouseLeave={() => setOpenMegaMenu((prev) => (prev === "product" ? null : prev))}>
                <button className="hdr-top" type="button" aria-expanded={openMegaMenu === "product"} aria-haspopup="true" id="product-toggle" onClick={(e) => { e.stopPropagation(); setOpenMegaMenu(openMegaMenu === "product" ? null : "product"); }}>
                  Product
                  <svg className="hdr-chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <div className="mm" role="region" aria-label="Product menu">
                  <div className="mm-in">
                    <div className="mm-cols">
                      <div className="mm-col">
                        <p className="mm-h">Platform Features</p>
                        <a className="mm-item" href="#features" onClick={() => setOpenMegaMenu(null)}>
                          <span className="mm-ic mm-ic--red" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/></svg></span>
                          <span><b>AI Pin Studio</b><small>Create 3-5 high-converting pins per post</small></span>
                        </a>
                        <a className="mm-item" href="#features" onClick={() => setOpenMegaMenu(null)}>
                          <span className="mm-ic mm-ic--orange" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M12 12.5v2.2l1.6 1"/></svg></span>
                          <span><b>Smart Scheduler</b><small>Peak engagement queue &amp; safe intervals</small></span>
                        </a>
                        <a className="mm-item" href="#features" onClick={() => setOpenMegaMenu(null)}>
                          <span className="mm-ic mm-ic--teal" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></span>
                          <span><b>Pinterest SEO Tool</b><small>Live search volume &amp; trending keywords</small></span>
                        </a>
                      </div>
                      <div className="mm-col">
                        <p className="mm-h">Solutions For</p>
                        <a className="mm-item" href="#problem" onClick={() => setOpenMegaMenu(null)}>
                          <span className="mm-ic mm-ic--green" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></span>
                          <span><b>Bloggers &amp; Creators</b><small>Turn articles into steady visual traffic</small></span>
                        </a>
                        <a className="mm-item" href="#problem" onClick={() => setOpenMegaMenu(null)}>
                          <span className="mm-ic mm-ic--amber" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></span>
                          <span><b>Shopify &amp; Etsy Sellers</b><small>Automate product catalogues to Pinterest</small></span>
                        </a>
                        <a className="mm-item" href="#pricing" onClick={() => setOpenMegaMenu(null)}>
                          <span className="mm-ic mm-ic--slate" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 21v-4h6v4"/><path d="M8 7h2M8 11h2M14 7h2M14 11h2"/></svg></span>
                          <span><b>Growth Agencies</b><small>Manage multi-brand queues under 1 roof</small></span>
                        </a>
                      </div>
                    </div>
                    <a className="mm-foot" href="#features" onClick={() => setOpenMegaMenu(null)}>
                      <span className="mm-foot-tag">New</span>
                      <span>Smart Scheduler — pins at the best times</span>
                      <span className="mm-foot-arrow" aria-hidden="true"><svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h9M8.5 4l4 4-4 4"/></svg></span>
                    </a>
                  </div>
                </div>
              </li>

              {/* Dropdown 2: Free Tools */}
              <li className={`has-mm ${openMegaMenu === "tools" ? "mm-open" : ""}`} id="tools-menu" onMouseEnter={() => setOpenMegaMenu("tools")} onMouseLeave={() => setOpenMegaMenu((prev) => (prev === "tools" ? null : prev))}>
                <button className="hdr-top" type="button" aria-expanded={openMegaMenu === "tools"} aria-haspopup="true" id="tools-toggle" onClick={(e) => { e.stopPropagation(); setOpenMegaMenu(openMegaMenu === "tools" ? null : "tools"); }}>
                  Free Tools
                  <svg className="hdr-chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <div className="mm" role="region" aria-label="Free Tools menu">
                  <div className="mm-in">
                    <div className="mm-cols">
                      <div className="mm-col">
                        <p className="mm-h">Checkers</p>
                        <a className="mm-item" href="#" onClick={() => setOpenMegaMenu(null)}>
                          <span className="mm-ic mm-ic--red" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.6-3 8.6-7 10-4-1.4-7-5.4-7-10V6l7-3z"/><path d="M9 11.8l2.1 2.1 4-4.1"/></svg></span>
                          <span><b>Website Claim Checker</b><small>Check if your website is claimed on Pinterest</small></span>
                        </a>
                        <a className="mm-item" href="#" onClick={() => setOpenMegaMenu(null)}>
                          <span className="mm-ic mm-ic--orange" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8.4 12.3l2.4 2.4 4.8-5"/></svg></span>
                          <span><b>Rich Pin Validator</b><small>Validate your Rich Pins in one click</small></span>
                        </a>
                        <a className="mm-item" href="#" onClick={() => setOpenMegaMenu(null)}>
                          <span className="mm-ic mm-ic--teal" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14a5 5 0 0 0 7.1 0l2.4-2.4a5 5 0 0 0-7.1-7.1l-1.7 1.7"/><path d="M14 10a5 5 0 0 0-7.1 0L4.5 12.4a5 5 0 0 0 7.1 7.1l1.7-1.7"/></svg></span>
                          <span><b>Link Checker</b><small>Check every pin link lands on the right page</small></span>
                        </a>
                      </div>
                      <div className="mm-col">
                        <p className="mm-h">Generators</p>
                        <a className="mm-item" href="#" onClick={() => setOpenMegaMenu(null)}>
                          <span className="mm-ic mm-ic--green" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7.5" height="18" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="12" rx="1.5"/></svg></span>
                          <span><b>Board Name Generator</b><small>SEO-friendly board names in seconds</small></span>
                        </a>
                        <a className="mm-item" href="#" onClick={() => setOpenMegaMenu(null)}>
                          <span className="mm-ic mm-ic--amber" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9h17M3 15h17M10 3L8 21M16 3l-2 18"/></svg></span>
                          <span><b>Hashtag Generator</b><small>Hashtag suggestions for every pin</small></span>
                        </a>
                        <a className="mm-item" href="#" onClick={() => setOpenMegaMenu(null)}>
                          <span className="mm-ic mm-ic--slate" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg></span>
                          <span><b>Keyword Research</b><small>Find the keywords people actually search</small></span>
                        </a>
                      </div>
                    </div>
                    <a className="mm-foot" href="#" onClick={() => setOpenMegaMenu(null)}>
                      <span className="mm-foot-tag">Free</span>
                      <span>All tools are free — no sign-up needed</span>
                      <span className="mm-foot-arrow" aria-hidden="true"><svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h9M8.5 4l4 4-4 4"/></svg></span>
                    </a>
                  </div>
                </div>
              </li>

              <li><a className="hdr-top" href="#how-it-works">Why It Works</a></li>
              <li><a className="hdr-top" href="#demo">Templates</a></li>
              <li><a className="hdr-top" href="#pricing">Pricing</a></li>
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="hdr-actions">
            <a className="btn btn--demo" href="#demo"><span className="demo-play" aria-hidden="true"><svg viewBox="0 0 12 12" width="9" height="9" fill="currentColor" aria-hidden="true"><path d="M3 1.8v8.4c0 .7.8 1.2 1.4.8l6.8-4.2c.6-.4.6-1.2 0-1.6L4.4 1C3.8.6 3 1.1 3 1.8z"/></svg></span><span className="demo-label">Live Demo</span></a>
            <a className="btn btn--primary" href="/signup">Get Started Free</a>

            {/* Mobile Burger Toggle Button */}
            <button className="hdr-burger" type="button" aria-label={drawerOpen ? "Close menu" : "Open menu"} aria-expanded={drawerOpen} id="mobile-toggle" onClick={toggleDrawer}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Side Drawer + Backdrop */}
      <div
        className={`hdr-backdrop ${drawerOpen ? "open" : ""}`}
        id="drawer-backdrop"
        aria-hidden="true"
        onClick={closeDrawer}
        style={{ pointerEvents: drawerOpen ? "auto" : "none" }}
      ></div>
      <div
        className={`hdr-sheet ${drawerOpen ? "open" : ""}`}
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        aria-hidden={!drawerOpen}
      >
        <div className="hdr-drawer-head">
          <a className="hdr-logo" href="#" aria-label="PinCraftly Home" onClick={closeDrawer}>
            <img className="hdr-logo-img" src="/images/logo.png" alt="PinCraftly" width="195" height="36" />
          </a>
          <button
            className="hdr-drawer-close"
            type="button"
            id="drawer-close"
            aria-label="Close menu"
            onClick={closeDrawer}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <div className="hdr-sheet-in">
          {/* Product Accordion */}
          <div className={`hdr-acc ${mobileProductOpen ? "is-open" : ""}`} id="mobile-product">
            <button
              className={`hdr-acc-btn ${mobileProductOpen ? "is-active" : ""}`}
              type="button"
              aria-expanded={mobileProductOpen}
              aria-controls="mobile-product-panel"
              aria-haspopup="true"
              id="mobile-product-toggle"
              onClick={() => setMobileProductOpen((prev) => !prev)}
            >
              <span>Product</span>
              <svg
                className="hdr-acc-chev"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
                style={{
                  transform: mobileProductOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.22s ease",
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              className={`hdr-acc-panel ${mobileProductOpen ? "open" : ""}`}
              id="mobile-product-panel"
              role="region"
              aria-label="Product menu"
              style={{ display: mobileProductOpen ? "flex" : "none" }}
            >
              <p className="mm-h">Platform Features</p>
              <a className="mm-item" href="#features" onClick={closeDrawer}>
                <span className="mm-ic mm-ic--red" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
                    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
                  </svg>
                </span>
                <span>
                  <b>AI Pin Studio</b>
                  <small>Create 3-5 high-converting pins per post</small>
                </span>
              </a>
              <a className="mm-item" href="#features" onClick={closeDrawer}>
                <span className="mm-ic mm-ic--orange" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="16" rx="2.5" />
                    <path d="M3 10h18M8 3v4M16 3v4" />
                    <path d="M12 12.5v2.2l1.6 1" />
                  </svg>
                </span>
                <span>
                  <b>Smart Scheduler</b>
                  <small>Peak engagement queue &amp; safe intervals</small>
                </span>
              </a>
              <a className="mm-item" href="#features" onClick={closeDrawer}>
                <span className="mm-ic mm-ic--teal" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3" />
                  </svg>
                </span>
                <span>
                  <b>Pinterest SEO Tool</b>
                  <small>Live search volume &amp; trending keywords</small>
                </span>
              </a>

              <p className="mm-h">Solutions For</p>
              <a className="mm-item" href="#problem" onClick={closeDrawer}>
                <span className="mm-ic mm-ic--green" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </span>
                <span>
                  <b>Bloggers &amp; Creators</b>
                  <small>Turn articles into steady visual traffic</small>
                </span>
              </a>
              <a className="mm-item" href="#problem" onClick={closeDrawer}>
                <span className="mm-ic mm-ic--amber" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </span>
                <span>
                  <b>Shopify &amp; Etsy Sellers</b>
                  <small>Automate product catalogues to Pinterest</small>
                </span>
              </a>
              <a className="mm-item" href="#pricing" onClick={closeDrawer}>
                <span className="mm-ic mm-ic--slate" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="18" rx="1.5" />
                    <path d="M9 21v-4h6v4" />
                    <path d="M8 7h2M8 11h2M14 7h2M14 11h2" />
                  </svg>
                </span>
                <span>
                  <b>Growth Agencies</b>
                  <small>Manage multi-brand queues under 1 roof</small>
                </span>
              </a>

              <a className="mm-foot" href="#pricing" onClick={closeDrawer}>
                <span className="mm-foot-tag">All-inclusive</span>
                <span>All features included in 7-day trial — no card required</span>
                <span className="mm-foot-arrow" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h9M8.5 4l4 4-4 4" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* Free Tools Accordion */}
          <div className={`hdr-acc ${mobileToolsOpen ? "is-open" : ""}`} id="mobile-tools">
            <button
              className={`hdr-acc-btn ${mobileToolsOpen ? "is-active" : ""}`}
              type="button"
              aria-expanded={mobileToolsOpen}
              aria-controls="mobile-tools-panel"
              aria-haspopup="true"
              id="mobile-tools-toggle"
              onClick={() => setMobileToolsOpen((prev) => !prev)}
            >
              <span>Free Tools</span>
              <svg
                className="hdr-acc-chev"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
                style={{
                  transform: mobileToolsOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.22s ease",
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              className={`hdr-acc-panel ${mobileToolsOpen ? "open" : ""}`}
              id="mobile-tools-panel"
              role="region"
              aria-label="Free Tools menu"
              style={{ display: mobileToolsOpen ? "flex" : "none" }}
            >
              <p className="mm-h">Checkers</p>
              <a className="mm-item" href="#demo" onClick={closeDrawer}>
                <span className="mm-ic mm-ic--red" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l7 3v5c0 4.6-3 8.6-7 10-4-1.4-7-5.4-7-10V6l7-3z" />
                    <path d="M9 11.8l2.1 2.1 4-4.1" />
                  </svg>
                </span>
                <span>
                  <b>Website Claim Checker</b>
                  <small>Check if your website is claimed on Pinterest</small>
                </span>
              </a>
              <a className="mm-item" href="#demo" onClick={closeDrawer}>
                <span className="mm-ic mm-ic--orange" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.4 12.3l2.4 2.4 4.8-5" />
                  </svg>
                </span>
                <span>
                  <b>Rich Pin Validator</b>
                  <small>Validate your Rich Pins in one click</small>
                </span>
              </a>
              <a className="mm-item" href="#demo" onClick={closeDrawer}>
                <span className="mm-ic mm-ic--teal" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 14a5 5 0 0 0 7.1 0l2.4-2.4a5 5 0 0 0-7.1-7.1l-1.7 1.7" />
                    <path d="M14 10a5 5 0 0 0-7.1 0L4.5 12.4a5 5 0 0 0 7.1 7.1l1.7-1.7" />
                  </svg>
                </span>
                <span>
                  <b>Link Checker</b>
                  <small>Check every pin link lands on the right page</small>
                </span>
              </a>

              <p className="mm-h">Generators</p>
              <a className="mm-item" href="#demo" onClick={closeDrawer}>
                <span className="mm-ic mm-ic--green" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7.5" height="18" rx="1.5" />
                    <rect x="13.5" y="3" width="7.5" height="12" rx="1.5" />
                  </svg>
                </span>
                <span>
                  <b>Board Name Generator</b>
                  <small>SEO-friendly board names in seconds</small>
                </span>
              </a>
              <a className="mm-item" href="#demo" onClick={closeDrawer}>
                <span className="mm-ic mm-ic--amber" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 9h17M3 15h17M10 3L8 21M16 3l-2 18" />
                  </svg>
                </span>
                <span>
                  <b>Hashtag Generator</b>
                  <small>Hashtag suggestions for every pin</small>
                </span>
              </a>
              <a className="mm-item" href="#demo" onClick={closeDrawer}>
                <span className="mm-ic mm-ic--slate" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 17l6-6 4 4 8-8" />
                    <path d="M15 7h6v6" />
                  </svg>
                </span>
                <span>
                  <b>Keyword Research</b>
                  <small>Find the keywords people actually search</small>
                </span>
              </a>

              <a className="mm-foot" href="#demo" onClick={closeDrawer}>
                <span className="mm-foot-tag">Free</span>
                <span>All tools are free — no sign-up needed</span>
                <span className="mm-foot-arrow" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h9M8.5 4l4 4-4 4" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <a className="hdr-sheet-link" href="#how-it-works" onClick={closeDrawer}>Why It Works</a>
          <a className="hdr-sheet-link" href="#demo" onClick={closeDrawer}>Templates</a>
          <a className="hdr-sheet-link" href="#pricing" onClick={closeDrawer}>Pricing</a>
        </div>

        <div className="hdr-sheet-btns">
          <a className="btn btn--demo" href="#demo" onClick={closeDrawer}>
            <span className="demo-play" aria-hidden="true">
              <svg viewBox="0 0 12 12" width="9" height="9" fill="currentColor" aria-hidden="true">
                <path d="M3 1.8v8.4c0 .7.8 1.2 1.4.8l6.8-4.2c.6-.4.6-1.2 0-1.6L4.4 1C3.8.6 3 1.1 3 1.8z" />
              </svg>
            </span>
            <span className="demo-label">Live Demo</span>
          </a>
          <a className="btn btn--primary" href="/signup" onClick={closeDrawer}>Get Started Free</a>
        </div>
      </div>
    </>
  );
}
