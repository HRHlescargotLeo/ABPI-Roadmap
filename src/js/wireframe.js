/* ==========================================================================
   wireframe.js — shared interaction behaviour for lo-fi wireframes.

   Everything here is driven by data attributes and classes, so pages stay
   declarative and no page needs its own inline script. Keep it that way: a
   wireframe pack with five slightly different accordion implementations is
   how nav bugs get reported in a client review.

   All patterns are keyboard-operable and dismissible with Escape, because
   accessibility is cheaper to design in at wireframe stage than to retrofit.
   ========================================================================== */

(function () {
  'use strict';

  /* --- Navigation flyouts ------------------------------------------------
     Opened on hover AND focus. Hover alone would make the whole navigation
     unusable by keyboard, which is the single most common wireframe defect
     that survives into build. */
  function initNav() {
    var backdrop = document.querySelector('.flyout-backdrop');
    var items = document.querySelectorAll('.nav-item');

    function closeAll() {
      document.querySelectorAll('.nav-item.open').forEach(function (i) {
        i.classList.remove('open');
      });
      if (backdrop) backdrop.classList.remove('active');
    }

    items.forEach(function (item) {
      var flyout = item.querySelector('.nav-flyout');
      if (!flyout) return;

      var trigger = item.querySelector('.nav-link');
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-haspopup', 'true');
      }

      function open() {
        closeAll();
        item.classList.add('open');
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
        if (backdrop) backdrop.classList.add('active');
      }

      function close() {
        item.classList.remove('open');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
        if (backdrop) backdrop.classList.remove('active');
      }

      item.addEventListener('mouseenter', open);
      item.addEventListener('mouseleave', close);
      item.addEventListener('focusin', open);
      item.addEventListener('focusout', function () {
        window.setTimeout(function () {
          if (!item.contains(document.activeElement)) close();
        }, 10);
      });

      if (trigger) {
        trigger.addEventListener('click', function (ev) {
          if (trigger.getAttribute('href') === '#') {
            ev.preventDefault();
            item.classList.contains('open') ? close() : open();
          }
        });
      }
    });

    if (backdrop) backdrop.addEventListener('click', closeAll);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
    });
  }

  /* --- Accordions --------------------------------------------------------
     Markup: <div class="accordion-item"><button class="accordion-title">…
     Multiple panels may be open at once unless the .accordion carries
     data-single. */
  function initAccordions() {
    document.querySelectorAll('.accordion-title').forEach(function (title) {
      var startOpen = title.closest('.accordion-item').classList.contains('open');
      title.setAttribute('aria-expanded', startOpen ? 'true' : 'false');
      title.addEventListener('click', function () {
        var item = title.closest('.accordion-item');
        var group = title.closest('.accordion');
        var willOpen = !item.classList.contains('open');

        if (group && group.hasAttribute('data-single')) {
          group.querySelectorAll('.accordion-item.open').forEach(function (o) {
            o.classList.remove('open');
            var t = o.querySelector('.accordion-title');
            if (t) t.setAttribute('aria-expanded', 'false');
          });
        }

        item.classList.toggle('open', willOpen);
        title.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    });
  }

  /* --- Tabs --------------------------------------------------------------
     Markup: <button class="tab" data-tab="panel-id"> and
             <div class="tab-panel" id="panel-id"> */
  function initTabs() {
    document.querySelectorAll('.tabs').forEach(function (group) {
      var tabs = group.querySelectorAll('.tab');
      tabs.forEach(function (tab) {
        tab.setAttribute('role', 'tab');
        tab.addEventListener('click', function () {
          tabs.forEach(function (t) {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
          });
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');

          var target = document.getElementById(tab.getAttribute('data-tab'));
          if (!target) return;
          var container = target.parentElement;
          container.querySelectorAll('.tab-panel').forEach(function (p) {
            p.classList.remove('active');
          });
          target.classList.add('active');
        });
      });
    });
  }

  /* --- Carousels ---------------------------------------------------------
     Markup: <div class="carousel" data-autoplay="6000"> containing
             .carousel-track > .carousel-item, .carousel-arrow[data-dir],
             and an empty .carousel-indicators which is populated here. */
  function initCarousels() {
    document.querySelectorAll('.carousel').forEach(function (carousel) {
      var track = carousel.querySelector('.carousel-track');
      if (!track) return;
      var items = track.querySelectorAll('.carousel-item');
      var dotsHost = carousel.querySelector('.carousel-indicators');
      var index = 0;
      var timer = null;

      function render() {
        track.style.transform = 'translateX(-' + index * 100 + '%)';
        if (!dotsHost) return;
        dotsHost.querySelectorAll('.carousel-dot').forEach(function (d, i) {
          d.classList.toggle('active', i === index);
          d.setAttribute('aria-current', i === index ? 'true' : 'false');
        });
      }

      function go(n) {
        index = (n + items.length) % items.length;
        render();
      }

      if (dotsHost) {
        items.forEach(function (_, i) {
          var dot = document.createElement('button');
          dot.className = 'carousel-dot';
          dot.type = 'button';
          dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
          dot.addEventListener('click', function () { go(i); });
          dotsHost.appendChild(dot);
        });
      }

      carousel.querySelectorAll('.carousel-arrow').forEach(function (arrow) {
        arrow.addEventListener('click', function () {
          go(index + (arrow.getAttribute('data-dir') === 'prev' ? -1 : 1));
        });
      });

      var interval = parseInt(carousel.getAttribute('data-autoplay'), 10);
      if (interval > 0) {
        var start = function () { timer = window.setInterval(function () { go(index + 1); }, interval); };
        var stop = function () { window.clearInterval(timer); };
        start();
        carousel.addEventListener('mouseenter', stop);
        carousel.addEventListener('focusin', stop);
        carousel.addEventListener('mouseleave', start);
      }

      render();
    });
  }

  /* --- Modals ------------------------------------------------------------
     Markup: any element with data-modal-open="modal-id", and
             <div class="wf-modal" id="modal-id"> */
  function initModals() {
    function close(modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-modal-open]').forEach(function (trigger) {
      trigger.addEventListener('click', function (ev) {
        ev.preventDefault();
        var modal = document.getElementById(trigger.getAttribute('data-modal-open'));
        if (!modal) return;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        var panel = modal.querySelector('.wf-modal-panel');
        if (panel) {
          panel.setAttribute('tabindex', '-1');
          panel.focus();
        }
      });
    });

    document.querySelectorAll('.wf-modal').forEach(function (modal) {
      modal.addEventListener('click', function (ev) {
        if (ev.target === modal || ev.target.classList.contains('wf-modal-close')) close(modal);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('.wf-modal.open').forEach(close);
    });
  }

  /* --- Notes toggle -------------------------------------------------------
     A switch in the prototype navigator shows or hides everything marked
     as a note: the "what we're proposing and why" panel at the top of each
     prototype and the numbered annotations within it. Off by default; the
     choice is remembered for the session so it carries between prototypes. */
  function initNotes() {
    var hidden = true;
    try { hidden = window.sessionStorage.getItem('wf-notes-hidden') !== '0'; } catch (e) { /* private mode */ }
    var toggles = document.querySelectorAll('[data-notes-toggle]');
    if (!document.querySelector('.wf-note, .proposal')) {
      toggles.forEach(function (t) { t.hidden = true; });
      return;
    }

    function apply() {
      document.body.classList.toggle('wf-notes-hidden', hidden);
      toggles.forEach(function (t) {
        t.setAttribute('aria-checked', hidden ? 'false' : 'true');
        var l = t.querySelector('.notes-label');
        if (l) l.textContent = hidden ? 'Notes off' : 'Notes on';
      });
    }
    toggles.forEach(function (t) {
      t.addEventListener('click', function () {
        hidden = !hidden;
        try { window.sessionStorage.setItem('wf-notes-hidden', hidden ? '1' : '0'); } catch (e) { /* private mode */ }
        apply();
        if (!hidden) {
          var panel = document.querySelector('.proposal');
          if (panel && panel.getBoundingClientRect().top < 0) panel.scrollIntoView({ block: 'start' });
        }
      });
    });
    apply();
  }

  /* --- Prototype navigator: current page and previous / next ------------- */
  function initProtoNav() {
    var file = (window.location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';
    var links = Array.prototype.slice.call(document.querySelectorAll('.proto-links a[data-proto]'));
    var index = -1;
    links.forEach(function (a, i) {
      var match = a.getAttribute('data-proto').split(' ').indexOf(file) !== -1;
      if (match) { a.setAttribute('aria-current', 'page'); index = i; }
    });
    var current = document.querySelector('.proto-links a[aria-current]');
    if (current && current.scrollIntoView && window.innerWidth < 1024) {
      var list = current.closest('.proto-links');
      if (list) list.scrollLeft = current.offsetLeft - 16;
    }
    var pager = document.querySelector('[data-proto-pager]');
    if (!pager || index < 0) return;
    function label(a) { return a.textContent.replace(/\s+/g, ' ').trim(); }
    var html = '';
    if (index > 0) html += '<a class="prev" href="' + links[index - 1].getAttribute('href') + '"><span class="wf-meta">Previous</span>' + label(links[index - 1]) + '</a>';
    else html += '<span></span>';
    if (index < links.length - 1) html += '<a class="next" href="' + links[index + 1].getAttribute('href') + '"><span class="wf-meta">Next</span>' + label(links[index + 1]) + '</a>';
    pager.innerHTML = html;
  }


  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  /* Query parameters (?type=, ?topic=) carry context between prototype pages.
     Some hosts strip the query string when a page is opened, so the last
     clicked link's query is also kept for the page it points to. */
  function currentFile() { return (window.location.pathname.split('/').pop() || 'index.html'); }
  function param(name) {
    var v = null;
    try { v = new URLSearchParams(window.location.search).get(name); } catch (e) { v = null; }
    if (v) return v;
    try {
      var saved = JSON.parse(window.sessionStorage.getItem('abpi-q') || 'null');
      if (saved && saved.file === currentFile()) return new URLSearchParams(saved.q).get(name);
    } catch (e) { /* private mode */ }
    return null;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    try {
      if (href.indexOf('?') !== -1) window.sessionStorage.setItem('abpi-q', JSON.stringify({ file: href.split('?')[0].split('/').pop(), q: href.split('?')[1].split('#')[0] }));
      else if (href.charAt(0) !== '#') window.sessionStorage.removeItem('abpi-q');
    } catch (err) { /* private mode */ }
  }, true);

  /* --- Toast ------------------------------------------------------------ */
  var toastTimer = null;
  function toast(msg) {
    var t = $('#wf-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'wf-toast';
      t.className = 'toast';
      t.setAttribute('role', 'status');
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { t.hidden = true; }, 2600);
  }

  /* --- Header height, used by sticky filter bars and in-page nav -------- */
  function initHeaderHeight() {
    var header = $('.site-header');
    if (!header) return;
    function set() { document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px'); }
    set();
    window.addEventListener('resize', set);
  }

  /* --- Mobile navigation toggle (R02) ----------------------------------- */
  function initMobileNav() {
    var btn = $('.nav-toggle');
    var menu = $('#primary-menu');
    if (!btn || !menu) return;
    function set(open) {
      menu.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Close' : 'Menu';
      initHeaderHeightNow();
    }
    btn.addEventListener('click', function () { set(!menu.classList.contains('open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) { set(false); btn.focus(); } });
  }
  function initHeaderHeightNow() {
    var header = $('.site-header');
    if (header) document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
  }

  /* --- Drawers ------------------------------------------------------------
     Markup: trigger [data-drawer-open="id"], <div class="drawer" id="id">.
     Escape or a click on the dimmed area closes; focus returns to trigger. */
  var lastDrawerTrigger = null;
  function openDrawer(id, trigger) {
    var d = document.getElementById(id);
    if (!d) return;
    lastDrawerTrigger = trigger || null;
    d.classList.add('open');
    document.body.style.overflow = 'hidden';
    var panel = $('.drawer-panel', d);
    if (panel) { panel.setAttribute('tabindex', '-1'); panel.focus(); }
  }
  function closeDrawer(d) {
    d.classList.remove('open');
    document.body.style.overflow = '';
    if (lastDrawerTrigger) lastDrawerTrigger.focus();
  }
  function initDrawers() {
    $all('[data-drawer-open]').forEach(function (t) {
      t.addEventListener('click', function (e) { e.preventDefault(); openDrawer(t.getAttribute('data-drawer-open'), t); });
    });
    $all('.drawer').forEach(function (d) {
      d.addEventListener('click', function (e) {
        if (e.target === d || e.target.closest('.drawer-close') || e.target.closest('[data-drawer-close]')) closeDrawer(d);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      $all('.drawer.open').forEach(closeDrawer);
    });
  }

  /* ======================================================================
     ABPI prototype behaviour (V1)
     Driven by ids and data attributes on the pages. Sample data in data.js.
     ====================================================================== */

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function parseDate(iso) { var p = iso.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function longDate(iso) { var d = parseDate(iso); return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear(); }
  function shortDate(iso) { var d = parseDate(iso); return d.getDate() + ' ' + MON[d.getMonth()] + ' ' + d.getFullYear(); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  /* Modal opener for triggers rendered after page load. */
  var lastModalTrigger = null;
  function openModal(id, trigger) {
    var modal = document.getElementById(id);
    if (!modal) return;
    lastModalTrigger = trigger || null;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    var panel = $('.wf-modal-panel', modal);
    if (panel) { panel.setAttribute('tabindex', '-1'); panel.focus(); }
  }
  function closeModal(modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastModalTrigger) { lastModalTrigger.focus(); lastModalTrigger = null; }
  }

  /* Field validation shared by every form in the pack. A field is required
     when its input carries `required`; a group of checkboxes is required when
     its fieldset has data-min="1". Errors are written into .field-error. */
  function setError(field, msg) {
    field.classList.toggle('has-error', !!msg);
    var e = $('.field-error', field);
    if (!e && msg) { e = document.createElement('p'); e.className = 'field-error'; field.appendChild(e); }
    if (e) { e.textContent = msg || ''; e.hidden = !msg; }
    var input = $('input, select, textarea', field);
    if (input && input.id) {
      if (msg) { input.setAttribute('aria-invalid', 'true'); if (e) { e.id = input.id + '-err'; input.setAttribute('aria-describedby', e.id); } }
      else { input.removeAttribute('aria-invalid'); }
    }
  }
  function validate(scope) {
    var firstBad = null;
    $all('.field', scope).forEach(function (field) {
      if (field.closest('[hidden]')) return;
      var input = $('input:not([type=checkbox]):not([type=radio]), select, textarea', field);
      var msg = '';
      if (input && input.required && !input.value.trim()) msg = field.getAttribute('data-msg') || 'Please fill this in.';
      else if (input && input.type === 'email' && input.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value)) msg = 'Enter an email address in the format name@company.com.';
      else if (input && input.type === 'url' && input.value && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+/.test(input.value)) msg = 'Enter a web address, for example www.company.com.';
      var single = $('input[type=checkbox][required]', field);
      if (!msg && single && !single.checked) msg = field.getAttribute('data-msg') || 'Please tick to continue.';
      if (field.getAttribute('data-min')) {
        var ticked = $all('input:checked', field).length;
        if (ticked < +field.getAttribute('data-min')) msg = field.getAttribute('data-msg') || 'Choose at least one.';
      }
      if (field.hasAttribute('data-radio')) {
        if (!$('input[type=radio]:checked', field)) msg = field.getAttribute('data-msg') || 'Choose an option.';
      }
      setError(field, msg);
      if (msg && !firstBad) firstBad = field;
    });
    if (firstBad) {
      var f = $('input, select, textarea', firstBad);
      if (f) f.focus();
    }
    return !firstBad;
  }
  function initLiveClear() {
    document.addEventListener('input', function (e) {
      var field = e.target.closest && e.target.closest('.field.has-error');
      if (field) setError(field, '');
    });
    document.addEventListener('change', function (e) {
      var field = e.target.closest && e.target.closest('.field.has-error');
      if (field) setError(field, '');
    });
  }

  /* --- Copy buttons (R31) ----------------------------------------------- */
  function initCopy() {
    initLiveClear();
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-copy]');
      if (!b) return;
      var text = b.getAttribute('data-copy');
      var done = function () { toast('Copied: ' + (text.length > 60 ? text.slice(0, 57) + '…' : text)); };
      try { navigator.clipboard.writeText(text).then(done, function () { toast('Copy not available here. Select the text instead.'); }); }
      catch (err) { toast('Copy not available here. Select the text instead.'); }
    });
    $all('.wf-modal').forEach(function (m) {
      m.addEventListener('click', function (ev) { if (ev.target === m || ev.target.classList.contains('wf-modal-close')) { lastModalTrigger && lastModalTrigger.focus(); lastModalTrigger = null; } });
    });
  }

  /* --- Prototype 1: membership checker (R11) ----------------------------- */
  function initChecker() {
    var box = $('#checker');
    if (!box) return;
    var result = $('#checker-result', box);
    var steps = $all('[data-q]', box);
    var RESULTS = {
      full: { title: 'Full membership looks right for you', body: 'Full membership is for companies that supply prescription medicines in the UK, manufacture them, or hold UK marketing authorisations. It includes senior-level forums, board sponsored groups and the full monitoring package.', type: 'full' },
      research: { title: 'Research affiliate membership looks right for you', body: 'Research affiliate membership is for companies doing research or development of medicines in the UK that do not yet sell them here. Many move to full membership when their first medicine launches.', type: 'research' },
      general: { title: 'General affiliate membership looks right for you', body: 'General affiliate membership is for organisations that work with the pharmaceutical industry in the UK: advisers, suppliers, contract organisations and others.', type: 'general' },
      none: { title: 'Membership may not be the right fit', body: 'ABPI membership is for organisations operating in the UK. Individuals cannot join. Our team can point you to the right organisation, or explain the rules if your situation is unusual.', type: '' }
    };
    function show(key) {
      var r = RESULTS[key];
      $('h3', result).textContent = r.title;
      $('p', result).textContent = r.body;
      var go = $('[data-checker-go]', result);
      go.hidden = !r.type;
      if (r.type) go.setAttribute('href', 'join-enquiry.html?type=' + r.type);
      $all('[data-cat-card]').forEach(function (c) { c.classList.toggle('is-match', c.getAttribute('data-cat-card') === key); });
      result.hidden = false;
    }
    function update() {
      var uk = $('input[name="q-uk"]:checked', box);
      var sells = $('input[name="q-sells"]:checked', box);
      var rd = $('input[name="q-rd"]:checked', box);
      result.hidden = true;
      $all('[data-cat-card]').forEach(function (c) { c.classList.remove('is-match'); });
      steps.forEach(function (s) { s.hidden = true; });
      steps[0].hidden = false;
      if (!uk) return;
      if (uk.value === 'no') return show('none');
      steps[1].hidden = false;
      if (!sells) return;
      if (sells.value === 'yes') return show('full');
      steps[2].hidden = false;
      if (!rd) return;
      show(rd.value === 'yes' ? 'research' : 'general');
    }
    box.addEventListener('change', function (e) {
      /* Changing an earlier answer clears the later ones. */
      var q = e.target.closest('[data-q]');
      var idx = steps.indexOf(q);
      steps.forEach(function (s, i) { if (i > idx) $all('input', s).forEach(function (r) { r.checked = false; }); });
      update();
    });
    var reset = $('[data-checker-reset]', box);
    if (reset) reset.addEventListener('click', function () { $all('input', box).forEach(function (r) { r.checked = false; }); update(); $('input', box).focus(); });
    update();
  }

  /* --- Prototype 1: stepped membership enquiry (R16, R17) ---------------- */
  function initStepForm() {
    var form = $('#enquiry-form');
    if (!form) return;
    var panels = $all('.step-panel', form);
    var steps = $all('.stepper li');
    var current = 0;
    var t = param('type');
    var sel = $('#enq-type');
    if (t && sel && $('option[value="' + t + '"]', sel)) {
      sel.value = t;
      var note = $('#enq-type-note');
      if (note) { note.hidden = false; note.textContent = 'Filled in from the membership checker. You can change it.'; }
    }
    function go(n, quiet) {
      current = n;
      panels.forEach(function (p, i) { p.hidden = i !== n; });
      steps.forEach(function (s, i) {
        s.classList.toggle('current', i === n);
        s.classList.toggle('done', i < n);
        if (i === n) s.setAttribute('aria-current', 'step'); else s.removeAttribute('aria-current');
      });
      if (n === panels.length - 1) review();
      var h = $('h2', panels[n]);
      if (h && !quiet) { h.setAttribute('tabindex', '-1'); h.focus(); }
    }
    function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
    function review() {
      var out = $('#enq-review');
      if (!out) return;
      var type = $('#enq-type');
      var areas = $all('input[name="enq-areas"]:checked', form).map(function (c) { return c.value; });
      var rows = [
        ['Organisation', val('enq-org')],
        ['Website', val('enq-web')],
        ['Membership', type ? type.options[type.selectedIndex].text : ''],
        ['UK activity', $all('input[name="enq-activity"]:checked', form).map(function (c) { return c.value; }).join(', ') || 'Not given'],
        ['Therapy areas', areas.join(', ') || 'Not given'],
        ['UK employees', val('enq-size') ? $('#enq-size').options[$('#enq-size').selectedIndex].text : 'Not given']
      ];
      out.innerHTML = rows.map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1] || 'Not given') + '</dd>'; }).join('');
    }
    form.addEventListener('click', function (e) {
      var next = e.target.closest('[data-step-next]');
      var back = e.target.closest('[data-step-back]');
      var edit = e.target.closest('[data-step-go]');
      if (next) { e.preventDefault(); if (validate(panels[current])) go(current + 1); }
      if (back) { e.preventDefault(); go(current - 1); }
      if (edit) { e.preventDefault(); go(+edit.getAttribute('data-step-go')); }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(panels[current])) return;
      var done = $('#enquiry-done');
      $('#done-org').textContent = val('enq-org');
      $('#done-name').textContent = val('enq-first');
      $('#done-email').textContent = val('enq-email');
      $('#done-ref').textContent = 'MEM-' + String(Date.now()).slice(-5);
      form.hidden = true;
      $('.stepper').hidden = true;
      done.hidden = false;
      var h = $('h2', done); h.setAttribute('tabindex', '-1'); h.focus();
    });
    go(0, true);
  }

  /* --- Prototype 2: member directory (R20, R21) -------------------------- */
  function initDirectory() {
    var app = $('#directory');
    if (!app) return;
    var M = window.ABPI_MEMBERS || [];
    var CATS = window.ABPI_CATS || {};
    var list = $('#dir-results', app);
    var count = $('#dir-count', app);
    var state = { q: param('q') || '', cat: 'all', area: 'all', view: 'grid' };
    var qIn = $('#dir-q', app);
    qIn.value = state.q;
    var areaSel = $('#dir-area', app);
    (window.ABPI_AREAS || []).forEach(function (a) { var o = document.createElement('option'); o.value = a; o.textContent = a; areaSel.appendChild(o); });
    function initials(n) { return n.replace(/^\[.*?:\s*/, '').replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase(); }
    function render() {
      var q = state.q.toLowerCase();
      var set = M.filter(function (m) {
        if (state.cat !== 'all' && m.cat !== state.cat) return false;
        if (state.area !== 'all' && m.areas.indexOf(state.area) === -1) return false;
        if (q && (m.name + ' ' + m.areas.join(' ') + ' ' + m.sites).toLowerCase().indexOf(q) === -1) return false;
        return true;
      });
      count.textContent = set.length === M.length ? 'Showing all ' + M.length + ' members in this sample' : 'Showing ' + set.length + ' of ' + M.length + ' members';
      list.className = 'member-list view-' + state.view;
      if (!set.length) {
        list.innerHTML = '<div class="empty-state"><h3>No members match</h3><p>Try a different name or therapy area, or clear the filters.</p><button type="button" class="btn btn-secondary" data-dir-clear>Clear filters</button></div>';
        return;
      }
      list.innerHTML = set.map(function (m) {
        return '<article class="member-card">' +
          '<div class="wf-placeholder member-logo" aria-hidden="true">' + esc(initials(m.name)) + ' logo</div>' +
          '<div class="member-body"><h3>' + esc(m.name) + '</h3>' +
          '<p class="member-cat"><span class="badge">' + esc(CATS[m.cat]) + '</span></p>' +
          (m.areas.length ? '<p class="member-areas"><span class="muted">Therapy areas:</span> ' + esc(m.areas.join(', ')) + '</p>' : '') +
          '<p class="member-sites"><span class="muted">UK sites:</span> ' + esc(m.sites) + '</p>' +
          '<a href="#" class="member-link">Company website<span class="visually-hidden"> for ' + esc(m.name) + '</span></a></div></article>';
      }).join('');
    }
    var timer = null;
    qIn.addEventListener('input', function () { window.clearTimeout(timer); timer = window.setTimeout(function () { state.q = qIn.value.trim(); render(); }, 120); });
    $('#dir-form', app).addEventListener('submit', function (e) { e.preventDefault(); state.q = qIn.value.trim(); render(); });
    areaSel.addEventListener('change', function () { state.area = areaSel.value; render(); });
    $all('[data-dir-cat]', app).forEach(function (b) {
      b.addEventListener('click', function () {
        state.cat = b.getAttribute('data-dir-cat');
        $all('[data-dir-cat]', app).forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        render();
      });
    });
    $all('[data-dir-view]', app).forEach(function (b) {
      b.addEventListener('click', function () {
        state.view = b.getAttribute('data-dir-view');
        $all('[data-dir-view]', app).forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        render();
      });
    });
    app.addEventListener('click', function (e) {
      if (e.target.closest('[data-dir-clear]')) {
        state = { q: '', cat: 'all', area: 'all', view: state.view };
        qIn.value = ''; areaSel.value = 'all';
        $all('[data-dir-cat]', app).forEach(function (o) { o.setAttribute('aria-pressed', o.getAttribute('data-dir-cat') === 'all' ? 'true' : 'false'); });
        render();
      }
      if (e.target.closest('.member-link')) { e.preventDefault(); toast('Opens the member company’s own website.'); }
    });
    render();
  }

  /* --- Prototype 2: member area (R22–R25) --------------------------------- */
  function initMemberArea() {
    var app = $('#member-area');
    if (!app) return;
    var signed = false;
    try { signed = window.sessionStorage.getItem('abpi-signed-in') === '1'; } catch (e) { /* private mode */ }
    function apply() {
      document.body.classList.toggle('is-signed-in', signed);
      $all('[data-when="in"]').forEach(function (el) { el.hidden = !signed; });
      $all('[data-when="out"]').forEach(function (el) { el.hidden = signed; });
    }
    var form = $('#signin-form');
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form)) return;
      signed = true;
      try { window.sessionStorage.setItem('abpi-signed-in', '1'); } catch (err) { /* private mode */ }
      apply();
      toast('Signed in (prototype: any details work)');
      var h = $('#welcome'); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-signout]')) {
        signed = false;
        try { window.sessionStorage.removeItem('abpi-signed-in'); } catch (err) { /* private mode */ }
        apply();
        toast('Signed out');
      }
      var join = e.target.closest('[data-group-join]');
      if (join) {
        e.preventDefault();
        var name = join.getAttribute('data-group-join');
        $('#apply-group-name').textContent = name;
        $('#apply-form').hidden = false;
        $('#apply-done').hidden = true;
        openModal('apply-modal', join);
      }
      var unlock = e.target.closest('[data-unlock]');
      if (unlock) {
        e.preventDefault();
        var s = $('#signin'); if (s) { s.scrollIntoView({ block: 'start' }); var f = $('input', s); if (f) f.focus(); }
      }
    });
    var apply2 = $('#apply-form');
    if (apply2) apply2.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(apply2)) return;
      apply2.hidden = true;
      $('#apply-done').hidden = false;
    });
    /* Group filter */
    var gf = $('#group-filter');
    if (gf) gf.addEventListener('change', function () {
      $all('.group-row').forEach(function (r) { r.hidden = gf.value !== 'all' && r.getAttribute('data-group-type') !== gf.value; });
    });
    apply();
  }

  /* --- Prototype 3: industry in numbers (R30–R35) ------------------------- */
  function barChart(rows, unit) {
    var W = 560, H = 240, padL = 44, padB = 28, padT = 16;
    var max = 0; rows.forEach(function (r) { if (r[1] > max) max = r[1]; });
    var nice = Math.pow(10, Math.floor(Math.log10(max)));
    var top = Math.ceil(max / nice) * nice;
    var bw = (W - padL - 10) / rows.length;
    var y = function (v) { return padT + (H - padT - padB) * (1 - v / top); };
    var s = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Bar chart, ' + esc(unit) + '">';
    [0, 0.5, 1].forEach(function (f) {
      var v = top * f, yy = y(v);
      s += '<line class="grid" x1="' + padL + '" x2="' + W + '" y1="' + yy + '" y2="' + yy + '"/>';
      s += '<text class="axis" x="' + (padL - 6) + '" y="' + (yy + 4) + '" text-anchor="end">' + (Math.round(v * 10) / 10) + '</text>';
    });
    rows.forEach(function (r, i) {
      var x = padL + i * bw + bw * 0.2, w = bw * 0.6, yy = y(r[1]);
      s += '<rect class="bar' + (r[2] ? ' sample' : '') + '" x="' + x + '" y="' + yy + '" width="' + w + '" height="' + (H - padB - yy) + '"><title>' + esc(r[0] + ': ' + r[1] + ' ' + unit + (r[2] ? ' (sample)' : '')) + '</title></rect>';
      s += '<text class="val" x="' + (x + w / 2) + '" y="' + (yy - 5) + '" text-anchor="middle">' + r[1] + '</text>';
      s += '<text class="axis" x="' + (x + w / 2) + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(r[0]) + '</text>';
    });
    return s + '</svg>';
  }
  function csvLink(name, rows, unit) {
    var csv = 'Year,Value (' + unit + '),Sample\n' + rows.map(function (r) { return r[0] + ',' + r[1] + ',' + (r[2] ? 'yes' : 'no'); }).join('\n');
    return 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  }
  function initData() {
    var app = $('#data-app');
    if (!app) return;
    var S = window.ABPI_STATS || {};
    var nav = $('#topic-tabs', app);
    var panel = $('#topic-panel', app);
    var keys = Object.keys(S);
    var start = param('topic');
    if (keys.indexOf(start) === -1) start = 'economy';
    function show(k) {
      var t = S[k];
      $all('button', nav).forEach(function (b) { var on = b.getAttribute('data-topic') === k; b.setAttribute('aria-selected', on ? 'true' : 'false'); b.classList.toggle('active', on); b.tabIndex = on ? 0 : -1; });
      panel.setAttribute('aria-labelledby', 'tab-' + k);
      var figs = t.figures.map(function (f) {
        var cite = f.value + ' ' + f.label + ' (' + f.source.replace(/'/g, '’') + ', ' + f.date + ')';
        var unconfirmed = /\[/.test(f.source) || /\[/.test(f.label);
        return '<div class="fig' + (unconfirmed ? ' fig-check' : '') + '"><b class="fig-value">' + esc(f.value) + '</b><p class="fig-label">' + esc(f.label) + '</p>' +
          '<p class="fig-source"><span class="muted">Source:</span> ' + esc(f.source) + ', ' + esc(f.date) + '</p>' +
          '<button type="button" class="btn-link" data-copy="' + esc(cite) + '">Copy with source</button></div>';
      }).join('');
      panel.innerHTML = '<h2 class="topic-title">' + esc(t.title) + '</h2><p class="lead">' + esc(t.summary) + '</p>' +
        '<div class="fig-grid">' + figs + '</div>' +
        '<div class="chart-box"><div class="row between"><h3>' + esc(t.chart.note.split('.')[0]) + '</h3>' +
        '<a class="btn btn-secondary btn-sm" download="abpi-' + k + '.csv" href="' + csvLink(k, t.chart.rows, t.chart.unit) + '">Download data (CSV)</a></div>' +
        barChart(t.chart.rows, t.chart.unit) +
        '<p class="chart-note"><span class="key-sample" aria-hidden="true"></span> Hatched bars are sample values. ' + esc(t.chart.note) + '</p></div>';
      try { history.replaceState(null, '', '?topic=' + k); } catch (e) { /* file:// */ }
    }
    nav.addEventListener('click', function (e) { var b = e.target.closest('button[data-topic]'); if (b) show(b.getAttribute('data-topic')); });
    nav.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var btns = $all('button', nav), i = btns.indexOf(document.activeElement);
      if (i < 0) return;
      var n = btns[(i + (e.key === 'ArrowRight' ? 1 : btns.length - 1)) % btns.length];
      n.focus(); show(n.getAttribute('data-topic'));
    });
    show(start);

    /* Trials set-up tracker (R33): sample medians against the 150-day target. */
    var tr = $('#setup-chart');
    if (tr) {
      var pts = [['Q1 2025', 238], ['Q2 2025', 226], ['Q3 2025', 214], ['Q4 2025', 198], ['Q1 2026', 187], ['Q2 2026', 176]];
      var W = 560, H = 220, pl = 44, pb = 28, pt = 12, top = 260;
      var x = function (i) { return pl + 20 + i * (W - pl - 40) / (pts.length - 1); };
      var y = function (v) { return pt + (H - pt - pb) * (1 - v / top); };
      var s = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Median set-up time by quarter against the 150-day target (sample values)">';
      [0, 100, 200].forEach(function (v) { s += '<line class="grid" x1="' + pl + '" x2="' + W + '" y1="' + y(v) + '" y2="' + y(v) + '"/><text class="axis" x="' + (pl - 6) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + v + '</text>'; });
      s += '<line class="target" x1="' + pl + '" x2="' + W + '" y1="' + y(150) + '" y2="' + y(150) + '"/><text class="axis target-label" x="' + (W - 4) + '" y="' + (y(150) - 6) + '" text-anchor="end">Target: 150 days</text>';
      s += '<polyline class="line" points="' + pts.map(function (p, i) { return x(i) + ',' + y(p[1]); }).join(' ') + '"/>';
      pts.forEach(function (p, i) { s += '<circle class="dot" cx="' + x(i) + '" cy="' + y(p[1]) + '" r="4"><title>' + p[0] + ': ' + p[1] + ' days (sample)</title></circle><text class="axis" x="' + x(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + p[0] + '</text><text class="val" x="' + x(i) + '" y="' + (y(p[1]) - 9) + '" text-anchor="middle">' + p[1] + '</text>'; });
      tr.innerHTML = s + '</svg>';
    }

    /* Access to medicines (R34) */
    var acc = $('#access-app');
    if (acc) {
      var A = window.ABPI_ACCESS || [];
      var yearSel = $('#acc-year', acc), areaSel = $('#acc-area', acc), out = $('#acc-out', acc);
      var LABELS = [['recommended', 'Recommended by NICE'], ['restricted', 'Recommended with restrictions'], ['pending', 'Appraisal not complete'], ['notRecommended', 'Not recommended']];
      function renderAcc() {
        var rows = A.filter(function (r) { return (yearSel.value === 'all' || String(r.year) === yearSel.value) && (areaSel.value === 'all' || r.area === areaSel.value); });
        var tot = { approved: 0 }; LABELS.forEach(function (l) { tot[l[0]] = 0; });
        rows.forEach(function (r) { tot.approved += r.approved; LABELS.forEach(function (l) { tot[l[0]] += r[l[0]]; }); });
        var avail = tot.recommended + tot.restricted;
        var bar = '<div class="stack" role="img" aria-label="' + LABELS.map(function (l) { return l[1] + ' ' + tot[l[0]]; }).join(', ') + '">' +
          LABELS.map(function (l, i) { var pc = tot.approved ? (tot[l[0]] / tot.approved * 100) : 0; return pc ? '<span class="seg-' + i + '" style="width:' + pc.toFixed(1) + '%"></span>' : ''; }).join('') + '</div>';
        out.innerHTML = '<p class="acc-headline"><b>' + avail + ' of ' + tot.approved + '</b> indications approved ' + (yearSel.value === 'all' ? 'between 2022 and 2025' : 'in ' + yearSel.value) + (areaSel.value === 'all' ? '' : ' in ' + areaSel.value.toLowerCase()) + ' are available to NHS patients in England, in full or in part.</p>' + bar +
          '<ul class="acc-key">' + LABELS.map(function (l, i) { return '<li><span class="sw seg-' + i + '" aria-hidden="true"></span>' + l[1] + ' <b class="num">' + tot[l[0]] + '</b></li>'; }).join('') + '</ul>';
      }
      yearSel.addEventListener('change', renderAcc);
      areaSel.addEventListener('change', renderAcc);
      renderAcc();
    }
  }

  /* --- Prototype 4: publications library (R40–R43) ------------------------ */
  function pubCard(p) {
    return '<article class="pub-card">' +
      '<p class="pub-meta"><span class="badge">' + esc(p.type) + '</span> <span>' + esc(shortDate(p.date)) + (p.s ? ' <span class="muted">(sample date)</span>' : '') + '</span> <span class="muted">· ' + esc(p.format) + ' · ' + p.mins + ' min read' + (p.lang ? ' · ' + esc(p.lang) : '') + '</span></p>' +
      '<h3><a href="#" data-pub-open>' + esc(p.title) + '</a></h3>' +
      '<p class="pub-summary">' + esc(p.summary) + '</p>' +
      '<p class="pub-theme muted">' + esc(p.theme) + '</p></article>';
  }
  function initLibrary() {
    /* Topic hub: static list by theme */
    $all('[data-pubs-theme]').forEach(function (host) {
      var th = host.getAttribute('data-pubs-theme');
      var set = (window.ABPI_PUBS || []).filter(function (p) { return p.theme === th; }).slice(0, +(host.getAttribute('data-limit') || 4));
      host.innerHTML = set.map(pubCard).join('');
    });
    document.addEventListener('click', function (e) { if (e.target.closest('[data-pub-open]')) { e.preventDefault(); toast('Opens the publication page (not part of this prototype).'); } });

    var app = $('#library');
    if (!app) return;
    var P = (window.ABPI_PUBS || []).slice();
    var themeSel = $('#lib-theme', app), yearSel = $('#lib-year', app), sortSel = $('#lib-sort', app), qIn = $('#lib-q', app);
    (window.ABPI_THEMES || []).forEach(function (t) {
      var n = P.filter(function (p) { return p.theme === t; }).length;
      var o = document.createElement('option'); o.value = t; o.textContent = t + ' (' + n + ')'; themeSel.appendChild(o);
    });
    var typeBox = $('#lib-types', app);
    (window.ABPI_TYPES || []).forEach(function (t, i) {
      var n = P.filter(function (p) { return p.type === t; }).length;
      var lab = document.createElement('label'); lab.className = 'check';
      lab.innerHTML = '<input type="checkbox" id="lib-type-' + i + '" value="' + esc(t) + '"> ' + esc(t) + ' <span class="muted">(' + n + ')</span>';
      typeBox.appendChild(lab);
    });
    var shown = 6;
    var state = { q: param('q') || '', theme: param('theme') || 'all', year: 'all', types: [], sort: 'new' };
    qIn.value = state.q;
    if (state.theme !== 'all') themeSel.value = state.theme;
    function score(p, q) {
      if (!q) return 0;
      var words = q.toLowerCase().split(/\s+/).filter(Boolean), s = 0;
      words.forEach(function (w) { if (p.title.toLowerCase().indexOf(w) !== -1) s += 3; if (p.summary.toLowerCase().indexOf(w) !== -1) s += 1; if (p.theme.toLowerCase().indexOf(w) !== -1) s += 1; });
      return s;
    }
    function results() {
      var q = state.q.trim();
      var set = P.filter(function (p) {
        if (state.theme !== 'all' && p.theme !== state.theme) return false;
        if (state.year !== 'all' && p.date.slice(0, 4) !== state.year) return false;
        if (state.types.length && state.types.indexOf(p.type) === -1) return false;
        if (q && score(p, q) === 0) return false;
        return true;
      });
      if (state.sort === 'relevance' && q) set.sort(function (a, b) { return score(b, q) - score(a, q) || (a.date < b.date ? 1 : -1); });
      else if (state.sort === 'old') set.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
      else set.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
      return set;
    }
    function chips() {
      var c = [];
      if (state.q) c.push(['Search: “' + state.q + '”', function () { state.q = ''; qIn.value = ''; }]);
      if (state.theme !== 'all') c.push([state.theme, function () { state.theme = 'all'; themeSel.value = 'all'; }]);
      if (state.year !== 'all') c.push([state.year, function () { state.year = 'all'; yearSel.value = 'all'; }]);
      state.types.forEach(function (t) { c.push([t, function () { state.types = state.types.filter(function (x) { return x !== t; }); $all('input', typeBox).forEach(function (i) { if (i.value === t) i.checked = false; }); }]); });
      return c;
    }
    function render() {
      var set = results();
      var host = $('#lib-results', app);
      var cs = chips();
      var chipHost = $('#lib-chips', app);
      chipHost.innerHTML = cs.map(function (c, i) { return '<button type="button" class="chip" data-chip="' + i + '" aria-label="Remove filter ' + esc(c[0]) + '">' + esc(c[0]) + ' <span aria-hidden="true">×</span></button>'; }).join('') + (cs.length > 1 ? '<button type="button" class="btn-link" data-chip-all>Clear all</button>' : '');
      chipHost._fns = cs.map(function (c) { return c[1]; });
      $('#lib-count', app).textContent = set.length + ' publication' + (set.length === 1 ? '' : 's') + (state.q ? ' for “' + state.q + '”' : '');
      if (!set.length) {
        host.innerHTML = '<div class="empty-state"><h3>No publications match</h3><p>Try fewer words, or remove a filter. You can also search the whole site.</p></div>';
        $('#lib-more', app).hidden = true;
        return;
      }
      host.innerHTML = set.slice(0, shown).map(pubCard).join('');
      var more = $('#lib-more', app);
      more.hidden = set.length <= shown;
      $('button', more).textContent = 'Show more (' + (set.length - shown) + ' more)';
      try {
        var qs = [];
        if (state.q) qs.push('q=' + encodeURIComponent(state.q));
        if (state.theme !== 'all') qs.push('theme=' + encodeURIComponent(state.theme));
        history.replaceState(null, '', qs.length ? '?' + qs.join('&') : window.location.pathname);
      } catch (e) { /* file:// */ }
    }
    $('#lib-form', app).addEventListener('submit', function (e) { e.preventDefault(); state.q = qIn.value.trim(); if (state.q) { state.sort = 'relevance'; sortSel.value = 'relevance'; } shown = 6; render(); });
    var timer;
    qIn.addEventListener('input', function () { window.clearTimeout(timer); timer = window.setTimeout(function () { state.q = qIn.value.trim(); shown = 6; render(); }, 250); });
    themeSel.addEventListener('change', function () { state.theme = themeSel.value; shown = 6; render(); });
    yearSel.addEventListener('change', function () { state.year = yearSel.value; shown = 6; render(); });
    sortSel.addEventListener('change', function () { state.sort = sortSel.value; render(); });
    typeBox.addEventListener('change', function () { state.types = $all('input:checked', typeBox).map(function (i) { return i.value; }); shown = 6; render(); });
    $('#lib-chips', app).addEventListener('click', function (e) {
      var host = $('#lib-chips', app);
      var b = e.target.closest('[data-chip]');
      if (b) { host._fns[+b.getAttribute('data-chip')](); shown = 6; render(); }
      if (e.target.closest('[data-chip-all]')) { host._fns.forEach(function (f) { f(); }); shown = 6; render(); }
    });
    $('#lib-more button', app).addEventListener('click', function () { shown += 6; render(); });
    $all('[data-lib-suggest]', app).forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); qIn.value = a.textContent; state.q = a.textContent; state.sort = 'relevance'; sortSel.value = 'relevance'; shown = 6; render(); }); });
    render();
  }

  /* --- Prototype 5: email preferences (R50) ------------------------------- */
  function initPrefs() {
    var form = $('#prefs-form');
    if (!form) return;
    var press = $('#pref-press');
    var journo = $('#journalist-fields');
    function syncPress() { journo.hidden = !press.checked; $all('input, select', journo).forEach(function (i) { i.required = press.checked && i.hasAttribute('data-req'); }); }
    press.addEventListener('change', syncPress);
    syncPress();
    var all = $('#pref-all');
    if (all) all.addEventListener('change', function () { $all('input[name="pref-topic"]', form).forEach(function (c) { c.checked = all.checked; }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form)) return;
      var topics = $all('input[name="pref-topic"]:checked', form).map(function (c) { return c.value; });
      var freq = $('input[name="pref-freq"]:checked', form);
      $('#prefs-summary').innerHTML =
        '<dt>Email</dt><dd>' + esc($('#pref-email').value) + '</dd>' +
        '<dt>Topics</dt><dd>' + esc(topics.join(', ')) + '</dd>' +
        '<dt>How often</dt><dd>' + esc(freq ? freq.value : '') + '</dd>' +
        '<dt>Press releases</dt><dd>' + (press.checked ? 'Yes, under embargo' : 'No') + '</dd>';
      form.hidden = true;
      var done = $('#prefs-done'); done.hidden = false;
      var h = $('h2', done); h.setAttribute('tabindex', '-1'); h.focus();
    });
    var again = $('[data-prefs-edit]');
    if (again) again.addEventListener('click', function () { form.hidden = false; $('#prefs-done').hidden = true; $('#pref-email').focus(); });
  }

  /* --- Prototype 5: media centre (R51, R52) ------------------------------- */
  function initMedia() {
    var app = $('#media-app');
    if (!app) return;
    var M = window.ABPI_MEDIA || [];
    var kind = 'all';
    var qIn = $('#media-q', app);
    function render() {
      var q = qIn.value.trim().toLowerCase();
      var set = M.filter(function (m) { return (kind === 'all' || m.kind === kind) && (!q || (m.title + ' ' + m.summary + ' ' + m.by).toLowerCase().indexOf(q) !== -1); });
      $('#media-count', app).textContent = set.length + ' item' + (set.length === 1 ? '' : 's');
      $('#media-list', app).innerHTML = set.length ? set.map(function (m) {
        return '<article class="result-item media-item"><p class="pub-meta"><span class="badge' + (m.kind === 'Press release' ? ' solid' : '') + '">' + esc(m.kind) + '</span> <span>' + esc(longDate(m.date)) + '</span>' + (m.by ? ' <span class="muted">· ' + esc(m.by) + '</span>' : '') + '</p><h3><a href="#" data-pub-open>' + esc(m.title) + '</a></h3><p>' + esc(m.summary) + '</p></article>';
      }).join('') : '<div class="empty-state"><p>Nothing matches. Try another word or type.</p></div>';
    }
    $all('[data-kind]', app).forEach(function (b) {
      b.addEventListener('click', function () {
        kind = b.getAttribute('data-kind');
        $all('[data-kind]', app).forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        render();
      });
    });
    qIn.addEventListener('input', render);
    $('#media-form', app).addEventListener('submit', function (e) { e.preventDefault(); render(); });
    render();
  }

  /* --- Prototype 5: events (R53–R55) -------------------------------------- */
  var STATUS = {
    open: ['Booking open', ''],
    few: ['Few places left', 'solid'],
    full: ['Full: waiting list', ''],
    partner: ['Partner event', ''],
    interest: ['Register interest', '']
  };
  function eventDates(ev) {
    if (!ev.end) return longDate(ev.start);
    var a = parseDate(ev.start), b = parseDate(ev.end);
    if (a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()) return a.getDate() + '–' + longDate(ev.end);
    return shortDate(ev.start) + ' – ' + shortDate(ev.end);
  }
  function icsHref(ev) {
    var d = ev.start.replace(/-/g, ''), e2 = (ev.end || ev.start).replace(/-/g, '');
    var t = (ev.time || '').split('–');
    var st = t[0] ? t[0].replace(':', '') + '00' : '090000', et = t[1] ? t[1].replace(':', '') + '00' : '170000';
    var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ABPI prototype//EN', 'BEGIN:VEVENT', 'UID:' + ev.id + '@abpi-prototype', 'DTSTART:' + d + 'T' + st, 'DTEND:' + e2 + 'T' + et, 'SUMMARY:' + ev.title, 'LOCATION:' + ev.place, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
  }
  function initEvents() {
    var app = $('#events-app');
    if (!app) return;
    var E = (window.ABPI_EVENTS || []).slice().sort(function (a, b) { return a.start < b.start ? -1 : 1; });
    var fmt = $('#ev-format', app), aud = $('#ev-audience', app), open = $('#ev-open', app);
    function render() {
      var set = E.filter(function (ev) {
        if (fmt.value !== 'all' && ev.format !== fmt.value) return false;
        if (aud.value === 'members' && ev.audience.indexOf('Members') === -1) return false;
        if (aud.value === 'open' && ev.audience !== 'Open to all') return false;
        if (open.checked && ['open', 'few'].indexOf(ev.status) === -1) return false;
        return true;
      });
      $('#ev-count', app).textContent = set.length + ' event' + (set.length === 1 ? '' : 's');
      $('#ev-list', app).innerHTML = set.length ? set.map(function (ev) {
        var st = STATUS[ev.status];
        var d = parseDate(ev.start);
        return '<article class="event-card">' +
          '<div class="event-date" aria-hidden="true"><b>' + d.getDate() + '</b>' + MON[d.getMonth()] + '<br>' + d.getFullYear() + '</div>' +
          '<div class="event-body"><p class="event-tags"><span class="badge ' + st[1] + '">' + st[0] + '</span><span class="tag">' + esc(ev.format) + '</span><span class="tag">' + esc(ev.audience) + '</span></p>' +
          '<h3>' + esc(ev.title) + '</h3>' +
          '<p class="event-when">' + esc(eventDates(ev)) + ' · ' + esc(ev.time) + ' · ' + esc(ev.place) + '</p>' +
          '<p class="event-desc">' + esc(ev.summary) + '</p>' +
          '<p class="event-price"><span class="muted">Price:</span> ' + esc(ev.price) + '</p></div>' +
          '<div class="event-actions"><button type="button" class="btn" data-ev-open="' + ev.id + '">' + (ev.status === 'full' ? 'Join waiting list' : ev.status === 'interest' ? 'Register interest' : 'Details and booking') + '</button></div></article>';
      }).join('') : '<div class="empty-state"><p>No events match these filters.</p></div>';
    }
    [fmt, aud, open].forEach(function (c) { c.addEventListener('change', render); });
    app.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ev-open]');
      if (!b) return;
      var ev = E.filter(function (x) { return x.id === b.getAttribute('data-ev-open'); })[0];
      var body = $('#ev-drawer-body');
      var st = STATUS[ev.status];
      var action;
      if (ev.status === 'open' || ev.status === 'few') action = '<p>' + (ev.places ? '<b class="num">' + ev.places + '</b> places left (sample).' : '') + '</p><a class="btn btn-block" href="#" data-ev-book>Book on Eventscloud</a><p class="field-hint">Booking and payment are handled by Eventscloud, the ABPI’s booking system.</p>';
      else if (ev.status === 'partner') action = '<a class="btn btn-block" href="#" data-ev-book>Book with the Financial Times</a><p class="field-hint">This is a partner event. Booking is through the organiser.</p>';
      else action = '<form id="ev-wait-form" novalidate><p>' + (ev.status === 'full' ? 'Both dates are full. Leave your details and we’ll offer you a place if one comes up, and tell you when 2027 dates open.' : 'We’ll email you when the programme and booking open.') + '</p>' +
        '<div class="field"><label for="ev-wait-name">Name</label><input type="text" id="ev-wait-name" required autocomplete="name"></div>' +
        '<div class="field"><label for="ev-wait-email">Work email</label><input type="email" id="ev-wait-email" required autocomplete="email"></div>' +
        '<button type="submit" class="btn btn-block">' + (ev.status === 'full' ? 'Join the waiting list' : 'Register interest') + '</button></form><div id="ev-wait-done" class="confirm-box" hidden><div class="tick" aria-hidden="true">✓</div><h3>You’re on the list</h3><p>We’ve sent a confirmation to your email.</p></div>';
      body.innerHTML = '<p><span class="badge ' + st[1] + '">' + st[0] + '</span></p><h2 id="ev-drawer-title">' + esc(ev.title) + '</h2>' +
        '<dl class="kv"><dt>When</dt><dd>' + esc(eventDates(ev)) + '</dd><dt>Time</dt><dd>' + esc(ev.time) + '</dd><dt>Where</dt><dd>' + esc(ev.place) + '</dd><dt>Format</dt><dd>' + esc(ev.format) + '</dd><dt>For</dt><dd>' + esc(ev.audience) + '</dd><dt>Price</dt><dd>' + esc(ev.price) + '</dd></dl>' +
        '<p>' + esc(ev.summary) + '</p>' + action +
        '<p><a class="btn btn-secondary btn-block" download="' + ev.id + '.ics" href="' + icsHref(ev) + '">Add to calendar</a></p>';
      openDrawer('ev-drawer', b);
      var wf = $('#ev-wait-form');
      if (wf) wf.addEventListener('submit', function (ev2) { ev2.preventDefault(); if (!validate(wf)) return; wf.hidden = true; $('#ev-wait-done').hidden = false; });
    });
    document.addEventListener('click', function (e) { if (e.target.closest('[data-ev-book]')) { e.preventDefault(); toast('Opens the booking page (not part of this prototype).'); } });
    render();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initAccordions();
    initTabs();
    initCarousels();
    initModals();
    initNotes();
    initProtoNav();
    initHeaderHeight();
    initMobileNav();
    initDrawers();
    initChecker();
    initStepForm();
    initDirectory();
    initMemberArea();
    initData();
    initLibrary();
    initPrefs();
    initMedia();
    initEvents();
    initCopy();
  });
})();
