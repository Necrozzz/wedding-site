/* ==========================================================================
   Gohar & Roman — site behaviour
   ========================================================================== */

/* -----------------------------------------------------------------
   CONTENT VARIABLES
   Everything still to be confirmed is marked TBD / [PLACEHOLDER].
   Change values here — never in the markup.
   ----------------------------------------------------------------- */
const CONFIG = {
  coupleName:       'Gohar & Roman',
  coupleInitials:   'G & R',

  weddingDate:      'October 24, 2026',
  weddingDateUpper: 'OCTOBER 24, 2026',
  weddingDateShort: '24 · 10 · 2026',

  location:         'Dilijan, Armenia',
  locationUpper:    'DILIJAN, ARMENIA',
  venue:            'DiliJazz Hotel',

  // --- agenda: times still to be confirmed -----------------------
  welcomeTime:      'TBD',
  ceremonyTime:     'TBD',
  dinnerTime:       'TBD',
  afterpartyTime:   'TBD',

  // --- RSVP ------------------------------------------------------
  rsvpDeadline:     '[REGISTRATION DEADLINE]',

  // --- hotel -----------------------------------------------------
  hotelDiscount:    '[XX% REDUCTION]',          // TBD — confirm with DiliJazz
  hotelPhone:       '+374 60 52-15-15',         // from dilijazz.am — please verify
  hotelRoomsUrl:    'https://www.dilijazz.am/en/rooms/',
  mapUrl:           'https://www.google.com/maps/search/?api=1&query=DiliJazz+Hotel+%26+Restaurant+Dilijan+Armenia',

  // --- backend ---------------------------------------------------
  endpoint:         'https://script.google.com/macros/s/AKfycbz0f8-QdNc8HUF-Ply9pbPBXBPtxtwnbP39FELdrRScphZ9UjC-AQAmOPfD5N-P1iZhgg/exec'
};

/* -----------------------------------------------------------------
   TRANSLATIONS
   English is the master language. Armenian and Russian fall back to
   English until the translated copy is supplied.
   ----------------------------------------------------------------- */
const I18N = {
  en: {},   // master copy lives in the HTML
  am: {},   // TODO: Armenian
  ru: {}    // TODO: Russian
};

const SUPPORTED_LANGS = ['en', 'am', 'ru'];
const HTML_LANG = { en: 'en', am: 'hy', ru: 'ru' };

/* ----------------------------------------------------- apply variables -- */

function applyVariables() {
  document.querySelectorAll('[data-var]').forEach(el => {
    const key = el.dataset.var;
    if (key in CONFIG) el.textContent = CONFIG[key];
  });

  const map = document.getElementById('map-link');
  if (map) map.href = CONFIG.mapUrl;

  const rooms = document.getElementById('rooms-link');
  if (rooms) rooms.href = CONFIG.hotelRoomsUrl;

  const phone = document.getElementById('hotel-phone');
  if (phone) phone.href = 'tel:' + CONFIG.hotelPhone.replace(/[^\d+]/g, '');
}

/* ------------------------------------------------------------ language -- */

function applyLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';

  const dict = I18N[lang] || {};
  document.documentElement.lang = HTML_LANG[lang] || 'en';

  // Keep the English master copy the first time we touch each node.
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (!el.dataset.i18nEn) el.dataset.i18nEn = el.innerHTML;
    const key = el.dataset.i18n;
    el.innerHTML = (key in dict && dict[key]) ? dict[key] : el.dataset.i18nEn;
  });

  document.querySelectorAll('.langswitch__btn').forEach(btn => {
    btn.setAttribute('aria-current', btn.dataset.lang === lang ? 'true' : 'false');
  });

  try { localStorage.setItem('gr-lang', lang); } catch (e) { /* private mode */ }
}

/* --------------------------------------------------------------- cover -- */

function dismissCover() {
  const cover = document.getElementById('cover');
  if (!cover) return;
  cover.classList.add('is-leaving');
  document.body.classList.remove('is-locked');
  setTimeout(() => { cover.hidden = true; }, 850);
}

function initCover() {
  const cover = document.getElementById('cover');
  if (!cover) return;

  document.body.classList.add('is-locked');

  cover.querySelectorAll('.cover__lang').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.lang);
      dismissCover();
    });
  });
}

/* --------------------------------------------------------------- motion -- */

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(el => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  items.forEach(el => io.observe(el));
}

/* ----------------------------------------------------------- chrome UI -- */

function initChrome() {
  const topbar = document.getElementById('topbar');
  const jump = document.getElementById('rsvp-jump');
  const hero = document.getElementById('hero');
  const rsvp = document.getElementById('rsvp');

  const onScroll = () => {
    const y = window.scrollY;
    topbar.classList.toggle('is-stuck', y > 40);

    if (hero && jump) {
      const pastHero = y > hero.offsetHeight * 0.85;
      const rsvpTop = rsvp ? rsvp.getBoundingClientRect().top : Infinity;
      const nearRsvp = rsvpTop < window.innerHeight * 0.9;
      jump.classList.toggle('is-visible', pastHero && !nearRsvp);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  });

  document.querySelectorAll('.langswitch__btn').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });
}

/* ------------------------------------------------------------- the RSVP -- */

function initRSVP() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  const card = document.getElementById('rsvp-card');
  const statusEl = document.getElementById('status');
  const submitBtn = document.getElementById('submit-btn');
  const conditional = document.getElementById('conditional-fields');
  const guests = document.getElementById('totalGuests');

  const attendingInputs = form.querySelectorAll('input[name="attending"]');
  const conditionalRadios = conditional.querySelectorAll('input[type="radio"]');

  // Guests / team / hotel only make sense for people who are coming.
  function syncConditional() {
    const picked = form.querySelector('input[name="attending"]:checked');
    const coming = picked && picked.value === 'Yes';

    conditional.hidden = !coming;
    guests.required = !!coming;
    conditionalRadios.forEach(r => { r.required = !!coming; });

    if (!coming) {
      guests.value = '';
      conditionalRadios.forEach(r => { r.checked = false; });
    }
  }

  attendingInputs.forEach(r => r.addEventListener('change', syncConditional));
  syncConditional();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.reportValidity()) return;

    const originalLabel = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    statusEl.className = '';
    statusEl.textContent = '';

    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) params.append(key, value);

    const attending = params.get('attending');

    // Best-effort backup copy to Netlify Forms. Fire-and-forget: never blocks
    // or affects what the guest sees, which depends only on the Sheets write.
    const backup = new URLSearchParams(params);
    backup.append('form-name', 'rsvp');
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: backup
    }).catch(() => {});

    try {
      const res = await fetch(CONFIG.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      });
      const data = await res.json();
      if (data.result !== 'success') throw new Error(data.error || 'Something went wrong');

      showThanks(card, attending === 'Yes');
    } catch (err) {
      statusEl.className = 'error';
      statusEl.textContent = 'Sorry, something went wrong. Please try again.';
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalLabel;
    }
  });
}

function showThanks(card, coming) {
  const heading = coming ? 'We got it! <span class="heart">♥</span>' : 'We’ll miss you!';
  const body = coming
    ? 'Thank you. We can’t wait to celebrate with you.'
    : 'Thank you for letting us know.';

  card.innerHTML = `<div class="thanks"><h3>${heading}</h3><p>${body}</p></div>`;

  // Return the guest to the top of the invitation after a short moment.
  setTimeout(() => {
    document.getElementById('top').scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    });
  }, 5000);
}

/* ----------------------------------------------------------------- boot -- */

document.addEventListener('DOMContentLoaded', () => {
  applyVariables();

  let saved = null;
  try { saved = localStorage.getItem('gr-lang'); } catch (e) {}
  applyLanguage(saved || 'en');

  initCover();
  initChrome();
  initReveal();
  initRSVP();
});
