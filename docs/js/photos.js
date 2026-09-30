/* ==========================================================================
   photos.js — ABPI photography for the design layer (V2)

   Loads the ABPI's own photography directly from abpi.org.uk and applies it
   to image placeholders and page heads. Each image is only applied once it
   has loaded, so anywhere the images can't be reached the brand-colour
   illustration from theme.css stays in place. Photography © ABPI, used here
   to show how the proposals would look on the live site.

   Remove this file (and theme.css) to return to the greyscale prototypes.
   ========================================================================== */

(function () {
  'use strict';

  var BASE = 'https://www.abpi.org.uk/media/';
  function u(path) { return BASE + path; }

  /* Page heads: one photo per page, chosen to match the page's subject.
     The ABPI's wide page banners are avoided: their subjects sit at
     the edges, so they crop badly into a half-width panel. */
  var HERO = {
    'index.html': u('dokd1age/lab-fume-cabinet-1936x914.jpg?width=1400'),
    'join.html': u('2dvlzhub/members-930x930-downing-st.jpg'),
    'join-enquiry.html': u('zbkfg4k4/sales-871x581-webp60.webp'),
    'members.html': u('zocmzlch/meeting-2025-871x581.jpg'),
    'member-area.html': u('wtjhq5ei/013_cm302400_abpi_presidential-opening.jpg?width=1400'),
    'data.html': u('arpoapgw/three-people-analysing-871x581-webp60.webp'),
    'publications.html': u('fnecefc3/laptop-fingers-detail-871x581-webp60.webp'),
    'topic.html': u('vdhng3oq/asian-scientists-580x405-webp60.webp'),
    'stay-informed.html': u('ubtnpoha/woman-smiling-meeting-871x581-webp60.webp'),
    'media.html': u('w2fdbqus/richard_lectern.jpg?width=1400'),
    'events.html': u('cxoapkkf/_dsc0264.jpg?width=1400'),
    'library.html': u('wauejrdp/scientist-microscope-930x930-webp60.webp')
  };

  /* Placeholders matched on their label text. */
  var LABEL = {
    'join the abpi': u('vuglyn20/members-930x930-business-meeting.jpg'),
    'members': u('4mgnd0yu/members-930x930-scientist-microscope.jpg'),
    'industry in numbers': u('hh4eb3sp/scientists-screen-looking-2025-871x581.jpg'),
    'publications': u('gx4m5wuk/nice-methods-review-abpi-871x581-webp60.webp'),
    'stay informed': u('aa5noprc/speaker-medical-audience-2026-871x581.jpg'),
    'case study video: a smaller member company': u('pq3fnuvz/scientist-pipetting-580x405-webp75.webp'),
    'report cover': u('0j4bspzs/uk-industry-clinical-trials-2025-landscape-768x432.jpg')
  };

  /* Spokespeople and leaders, matched on the name beside the photo. */
  var PEOPLE = {
    'richard torbett': u('dmjh1o3w/richard-torbett-2026.jpg'),
    'dr amit aggarwal': u('5cmcxjea/amit-aggarwal-600px.jpg')
  };

  var LOGO = u('mmfn3sw5/abpi_logo_new.png');

  function load(src, done) {
    var img = new Image();
    img.onload = function () { done(); };
    img.src = src;
  }

  /* Apply a photo once it has loaded; leave the illustration if it fails. */
  function apply(el, src, cls) {
    if (!el || !src || el.getAttribute('data-photo') === src) return;
    el.setAttribute('data-photo', src);
    load(src, function () {
      el.style.backgroundImage = 'url("' + src + '")';
      el.classList.add(cls || 'has-photo');
      if (!el.hasAttribute('role')) {
        el.setAttribute('role', 'img');
        el.setAttribute('aria-label', (el.textContent || 'Photo').trim());
      }
    });
  }

  function label(el) { return (el.textContent || '').trim().toLowerCase(); }
  function file() { return window.location.pathname.split('/').pop() || 'index.html'; }

  function applyHero() {
    var head = document.querySelector('.page-head, .hub-hero');
    var src = HERO[file()];
    if (!head || !src || head.getAttribute('data-photo')) return;
    head.setAttribute('data-photo', src);
    load(src, function () {
      head.style.setProperty('--hero-photo', 'url("' + src + '")');
      head.classList.add('has-hero-photo');
    });
  }

  function applyAll(root) {
    root = root || document;

    root.querySelectorAll('.wf-placeholder').forEach(function (el) {
      var l = label(el);
      if (l === 'abpi logo') {
        if (el.getAttribute('data-photo')) return;
        el.setAttribute('data-photo', LOGO);
        load(LOGO, function () { el.style.backgroundImage = 'url("' + LOGO + '")'; el.classList.add('has-logo'); el.setAttribute('role', 'img'); el.setAttribute('aria-label', 'ABPI'); });
        return;
      }
      if (LABEL[l]) { apply(el, LABEL[l]); return; }
      var person = el.closest('.person');
      if (person) {
        var name = person.querySelector('b');
        var src = name && PEOPLE[name.textContent.trim().toLowerCase()];
        if (src) apply(el, src, 'has-photo has-portrait');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyHero();
    applyAll(document);
    /* Some pages re-render lists as filters change, so watch for new
       placeholders. */
    if ('MutationObserver' in window) {
      var pending = false;
      new MutationObserver(function () {
        if (pending) return;
        pending = true;
        window.requestAnimationFrame(function () { pending = false; applyAll(document); });
      }).observe(document.body, { childList: true, subtree: true });
    }
  });
})();
