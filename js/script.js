
document.addEventListener('DOMContentLoaded', function() {
  // 0. Banner dismiss
  var dismissBtn = document.getElementById('banner-dismiss');
  var banner = document.getElementById('top-banner');
  if (dismissBtn && banner) {
    dismissBtn.addEventListener('click', function() {
      banner.style.display = 'none';
    });
  }

  // 1. Mobile Side Drawer Toggle (slides in from the right, with backdrop)
  var mobileBtn = document.getElementById('mobile-toggle');
  var mobileDrawer = document.getElementById('mobile-drawer');
  var drawerBackdrop = document.getElementById('drawer-backdrop');
  var drawerCloseBtn = document.getElementById('drawer-close');

  var drawerCloseTimer = null;
  function openDrawer() {
    if (drawerCloseTimer) { clearTimeout(drawerCloseTimer); drawerCloseTimer = null; }
    mobileDrawer.removeAttribute('hidden');
    // Force a reflow so the slide-in transition runs from the off-screen spot
    void mobileDrawer.offsetWidth;
    mobileDrawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('open');
    mobileBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('open');
    mobileBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // Re-hide only after the 0.3s slide-out finishes
    if (drawerCloseTimer) clearTimeout(drawerCloseTimer);
    drawerCloseTimer = setTimeout(function() {
      mobileDrawer.setAttribute('hidden', '');
      drawerCloseTimer = null;
    }, 320);
  }

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', function() {
      if (mobileDrawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Backdrop tap and the drawer's close (✕) button both close the drawer
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);

    // Close mobile drawer when any link inside it is clicked
    mobileDrawer.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  // 1b. Mobile Drawer Accordions (Product + Free Tools): tap-to-open
  // mega-menu content inside the drawer
  function setupDrawerAccordion(btnId, panelId) {
    var btn = document.getElementById(btnId);
    var panel = document.getElementById(panelId);
    if (!btn || !panel) return;

    btn.addEventListener('click', function() {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        panel.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        panel.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    // Collapse the accordion when a link inside it is tapped (drawer closes too)
    panel.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        panel.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }
  setupDrawerAccordion('mobile-product-toggle', 'mobile-product-panel');
  setupDrawerAccordion('mobile-tools-toggle', 'mobile-tools-panel');

  // 2. Desktop Mega-Menus (Product + Free Tools): click / touch toggle
  // (hover + focus still work via CSS). Opening one menu closes the other.
  var megaMenus = [];

  function closeMegaMenus(except) {
    megaMenus.forEach(function(m) {
      if (m !== except) {
        m.wrap.classList.remove('mm-open');
        m.btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function registerMegaMenu(wrapId, btnId) {
    var wrap = document.getElementById(wrapId);
    var btn = document.getElementById(btnId);
    if (!wrap || !btn) return;
    var menu = { wrap: wrap, btn: btn };
    megaMenus.push(menu);

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var willOpen = !wrap.classList.contains('mm-open');
      closeMegaMenus(menu);
      if (willOpen) {
        wrap.classList.add('mm-open');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        wrap.classList.remove('mm-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close when a link inside the mega-menu is clicked
    wrap.querySelectorAll('.mm-item, .mm-foot').forEach(function(link) {
      link.addEventListener('click', function() {
        wrap.classList.remove('mm-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    // Keep aria-expanded in sync when hover opens/closes it on desktop
    // pointers; hovering one menu also closes a click-opened sibling
    wrap.addEventListener('mouseenter', function() {
      closeMegaMenus(menu);
      btn.setAttribute('aria-expanded', 'true');
    });
    wrap.addEventListener('mouseleave', function() {
      if (!wrap.classList.contains('mm-open')) {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }
  registerMegaMenu('product-menu', 'product-toggle');
  registerMegaMenu('tools-menu', 'tools-toggle');

  // Close any open mega-menu on outside click or Escape
  document.addEventListener('click', function(e) {
    megaMenus.forEach(function(m) {
      if (!m.wrap.contains(e.target)) {
        m.wrap.classList.remove('mm-open');
        m.btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMegaMenus(null);
  });

  // 3. Countdown Timer in Top Bar — exactly 7 days from page load.
  // The target is precisely now + 7 days; the first rendered second reads
  // 6d 23:59:59 (the 7th day counting down), then it ticks every second.
  var timerEl = document.getElementById('cd-timer');
  if (timerEl) {
    var SEVEN_DAYS = 7 * 24 * 60 * 60; // seconds
    var targetTime = Date.now() + SEVEN_DAYS * 1000;

    function tick() {
      var diff = targetTime - Date.now();
      if (diff < 0) diff = 0;
      var total = Math.floor(diff / 1000);
      if (total >= SEVEN_DAYS) total = SEVEN_DAYS - 1;
      var d = Math.floor(total / 86400);
      var h = String(Math.floor((total % 86400) / 3600)).padStart(2, '0');
      var m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
      var s = String(total % 60).padStart(2, '0');
      timerEl.textContent = d + 'd ' + h + ':' + m + ':' + s;
    }

    tick();
    setInterval(tick, 1000);
  }

  // 4. Hero Try Form Submission Handler
  var tryForm = document.getElementById('heroTryForm');
  var tryInput = document.getElementById('heroUrl');
  var tryBtn = document.getElementById('heroSubmitBtn');

  if (tryForm && tryBtn) {
    tryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var urlVal = tryInput ? tryInput.value.trim() : '';
      if (!urlVal) return;

      var originalBtnHtml = tryBtn.innerHTML;
      tryBtn.disabled = true;
      tryBtn.innerHTML = '<span>Scanning post &amp; brand...</span>';

      setTimeout(function() {
        tryBtn.disabled = false;
        tryBtn.innerHTML = originalBtnHtml;

        // Smooth scroll to demo showcase
        var demoSec = document.getElementById('demo') || document.getElementById('features');
        if (demoSec) {
          demoSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 700);
    });
  }

  // 6. Hero cursor-following pink line + dot grid — the same 56px line/dot
  // grid as the static hero layer, revealed in a soft radial mask around
  // the pointer. Disabled on touch / coarse pointers.
  // The standard system cursor is used throughout the hero.
  var hero = document.querySelector('.hero');
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (hero && finePointer) {
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var targetX = 0, targetY = 0;
    var currentX = 0, currentY = 0;
    var hasPos = false;
    var rafId = null;

    function renderGrid() {
      if (reduceMotion) {
        currentX = targetX;
        currentY = targetY;
      } else {
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;
      }
      hero.style.setProperty('--mx', currentX + 'px');
      hero.style.setProperty('--my', currentY + 'px');
      var dx = targetX - currentX;
      var dy = targetY - currentY;
      if (!reduceMotion && (Math.abs(dx) > 0.4 || Math.abs(dy) > 0.4)) {
        rafId = requestAnimationFrame(renderGrid);
      } else {
        rafId = null;
      }
    }
    function queueRender() {
      if (rafId === null) rafId = requestAnimationFrame(renderGrid);
    }

    hero.addEventListener('mousemove', function(e) {
      var rect = hero.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      if (!hasPos) {
        currentX = targetX;
        currentY = targetY;
        hasPos = true;
      }
      hero.style.setProperty('--grid-opacity', '1');
      queueRender();
    });
    hero.addEventListener('mouseenter', function(e) {
      var rect = hero.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      currentX = targetX;
      currentY = targetY;
      hasPos = true;
      hero.style.setProperty('--grid-opacity', '1');
      queueRender();
    });
    hero.addEventListener('mouseleave', function() {
      hero.style.setProperty('--grid-opacity', '0');
      hasPos = false;
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    });
  }

  // 7. Pricing Monthly / Yearly switcher — toggles .is-on on the switcher
  // buttons and swaps each plan's amount, per label and yearly line from
  // its data-m / data-y values, shows the .free badge on Yearly only, and
  // swaps each plan button href from its data-href-m / data-href-y values.
  var billBtns = document.querySelectorAll('.bill-btn[data-bill]');
  var plansEl = document.querySelector('[data-plans]');
  if (billBtns.length && plansEl) {
    var setBilling = function(mode) {
      var key = mode === 'y' ? 'data-y' : 'data-m';
      billBtns.forEach(function(btn) {
        btn.classList.toggle('is-on', btn.getAttribute('data-bill') === mode);
      });
      plansEl.querySelectorAll('.amt, .per').forEach(function(el) {
        el.textContent = el.getAttribute(key);
      });
      plansEl.querySelectorAll('.yearly > span[data-m]').forEach(function(el) {
        el.textContent = el.getAttribute(key);
      });
      plansEl.querySelectorAll('.yearly .free').forEach(function(el) {
        el.hidden = mode !== 'y';
      });
      plansEl.querySelectorAll('.plan .btn[data-href-m]').forEach(function(a) {
        a.setAttribute('href', a.getAttribute(mode === 'y' ? 'data-href-y' : 'data-href-m'));
      });
    };
    billBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        setBilling(btn.getAttribute('data-bill'));
      });
    });
  }

  // 8. FAQ accordion — clicking a question expands its answer with a
  // smooth height transition and collapses any other open answer;
  // aria-expanded stays in sync and the .is-open class rotates the
  // plus icon into a minus. The first question starts open.
  var faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    var setFaqPanel = function(item, open) {
      var btn = item.querySelector('.faq-q');
      var panel = item.querySelector('.faq-panel');
      item.classList.toggle('is-open', open);
      if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (panel) panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
    };
    faqItems.forEach(function(item, idx) {
      setFaqPanel(item, idx === 0);
      var btn = item.querySelector('.faq-q');
      if (btn) {
        btn.addEventListener('click', function() {
          var willOpen = !item.classList.contains('is-open');
          faqItems.forEach(function(other) { setFaqPanel(other, false); });
          if (willOpen) setFaqPanel(item, true);
        });
      }
    });
    window.addEventListener('resize', function() {
      faqItems.forEach(function(item) {
        if (item.classList.contains('is-open')) {
          var panel = item.querySelector('.faq-panel');
          if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }

  // 9. Who It's For niche switcher — clicking a niche tab swaps the
  // detail panel (badge, example pins, heading, description, bullets)
  // with a short fade, marks the tab active and keeps aria-selected,
  // roving tabindex and the panel's aria-labelledby in sync. Arrow
  // keys move between tabs. Food is selected by default in the markup.
  var whoTabs = Array.prototype.slice.call(document.querySelectorAll('.who-tab[data-niche]'));
  var whoPanel = document.getElementById('who-panel');
  var whoInner = document.getElementById('who-panel-inner');
  if (whoTabs.length && whoPanel && whoInner) {
    var whoData = {
      food: {
        label: 'Food & recipe bloggers',
        heading: 'Every recipe deserves more than one pin',
        desc: 'PinCraftly turns each recipe post into fresh pin designs made from your own food photos, ready for you to approve.',
        points: [
          'Pins designed from your own food photos',
          'A strategy pins seasonal recipes about two months before people search',
          'New posts arrive through the free WordPress plugin'
        ],
        pins: ['images/p-garden.jpg', 'images/p-pasta.jpg', 'images/p-mugs.jpg']
      },
      home: {
        label: 'Home & DIY',
        heading: 'Every room deserves a fresh pin',
        desc: 'PinCraftly turns each home and DIY post into fresh pin designs made from your own photos, ready for you to approve.',
        points: [
          'Pins designed from your own home photos',
          'Seasonal and trend-led boards that keep your best projects visible',
          'New posts arrive through the free WordPress plugin'
        ],
        pins: ['images/p-shelves.jpg', 'images/p-livingroom.jpg', 'images/p-garden.jpg']
      },
      travel: {
        label: 'Travel & lifestyle',
        heading: 'Every trip deserves more than one pin',
        desc: 'PinCraftly turns each travel post into fresh pin designs made from your own trip photos, ready for you to approve.',
        points: [
          'Pins designed from your own travel photos',
          'Destination pins scheduled ahead of peak search season',
          'New posts arrive through the free WordPress plugin'
        ],
        pins: ['images/p-capsule.jpg', 'images/p-lisbon.jpg', 'images/p-yoga.jpg']
      },
      shops: {
        label: 'Etsy & online shops',
        heading: 'Every product deserves more than one pin',
        desc: 'PinCraftly turns each product into fresh pin designs made from your own product photos, ready for you to approve.',
        points: [
          'Pins designed from your own product photos',
          'Shop pins that link straight to the right listing',
          'New products arrive automatically from your store'
        ],
        pins: ['images/p-nails.jpg', 'images/p-mugs.jpg', 'images/p-wedding.jpg']
      },
      printables: {
        label: 'Printables & digital products',
        heading: 'Every printable deserves more than one pin',
        desc: 'PinCraftly turns each printable and digital product into fresh pin designs made from your own preview images, ready for you to approve.',
        points: [
          'Pins designed from your own preview images',
          'Seasonal pins timed to when people plan ahead',
          'New products arrive automatically from your store'
        ],
        pins: ['images/p-savings.jpg', 'images/p-planner.jpg', 'images/p-yoga.jpg']
      },
      affiliate: {
        label: 'Affiliate marketers',
        heading: 'Every roundup deserves more than one pin',
        desc: 'PinCraftly turns each roundup and review post into fresh pin designs made from your own images, ready for you to approve.',
        points: [
          'Pins designed from your own images',
          'Keyword-rich titles that match what people search',
          'Links checked so every pin lands on the right page'
        ],
        pins: ['images/p-capsule.jpg', 'images/p-savings.jpg', 'images/p-nails.jpg']
      },
      managers: {
        label: 'Pinterest managers & VAs',
        heading: 'Every client deserves more than one pin',
        desc: "PinCraftly turns each client's posts into fresh pin designs, scheduled across all their accounts from one place.",
        points: [
          'Manage unlimited accounts and websites',
          'Boards and schedules organised per client',
          'Analytics that show what works for each account'
        ],
        pins: ['images/p-lisbon.jpg', 'images/p-shelves.jpg', 'images/p-planner.jpg']
      },
      agencies: {
        label: 'Agencies',
        heading: 'Every client deserves more than one pin',
        desc: "PinCraftly turns each client's content into fresh pin designs at scale, scheduled across every account from one dashboard.",
        points: [
          'Unlimited accounts, websites and pins on Growth',
          'Boards and schedules organised per client',
          'Priority support and analytics for every account'
        ],
        pins: ['images/p-wedding.jpg', 'images/p-yoga.jpg', 'images/p-livingroom.jpg']
      }
    };
    var whoBadge = document.getElementById('who-badge');
    var whoBadgeLabel = document.getElementById('who-badge-label');
    var whoHeading = document.getElementById('who-heading');
    var whoDesc = document.getElementById('who-desc');
    var whoPoints = document.getElementById('who-points');
    var whoPinImgs = [
      document.getElementById('who-pin-l'),
      document.getElementById('who-pin-c'),
      document.getElementById('who-pin-r')
    ];
    var whoCheck = '<span class="chk"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.4l3 3 6-6.4"/></svg></span>';
    var whoReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var whoTimer = null;

    var applyWho = function(tab) {
      var data = whoData[tab.getAttribute('data-niche')];
      if (!data) return;
      whoTabs.forEach(function(t) {
        var on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
      });
      whoPanel.setAttribute('aria-labelledby', tab.id);
      if (whoBadge) {
        var icon = tab.querySelector('.who-tab-icon svg');
        var badgeSvg = whoBadge.querySelector('svg');
        if (icon && badgeSvg) badgeSvg.replaceWith(icon.cloneNode(true));
      }
      if (whoBadgeLabel) whoBadgeLabel.textContent = data.label;
      if (whoHeading) whoHeading.textContent = data.heading;
      if (whoDesc) whoDesc.textContent = data.desc;
      if (whoPoints) {
        whoPoints.innerHTML = data.points.map(function(p) {
          var safe = p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return '<li>' + whoCheck + safe + '</li>';
        }).join('');
      }
      whoPinImgs.forEach(function(img, i) {
        if (img && data.pins[i]) img.src = data.pins[i];
      });
    };

    var selectWho = function(tab, focus) {
      if (tab.classList.contains('is-active')) return;
      if (focus) tab.focus();
      if (whoReduceMotion) {
        applyWho(tab);
        return;
      }
      whoInner.classList.add('is-fading');
      if (whoTimer) clearTimeout(whoTimer);
      whoTimer = setTimeout(function() {
        applyWho(tab);
        whoInner.classList.remove('is-fading');
      }, 180);
    };

    whoTabs.forEach(function(tab, idx) {
      tab.addEventListener('click', function() { selectWho(tab, false); });
      tab.addEventListener('keydown', function(e) {
        var next = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = whoTabs[(idx + 1) % whoTabs.length];
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = whoTabs[(idx - 1 + whoTabs.length) % whoTabs.length];
        else if (e.key === 'Home') next = whoTabs[0];
        else if (e.key === 'End') next = whoTabs[whoTabs.length - 1];
        if (next) {
          e.preventDefault();
          selectWho(next, true);
        }
      });
    });
  }
});
