/* ==========================================================================
   Gohar & Roman — site behavior
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
  // Armenia is UTC+4; the welcome reception opens at 16:30
  weddingISO:       '2026-10-24T16:30:00+04:00',
  weddingDateUpper: 'OCTOBER 24, 2026',
  weddingDateShort: '24 · 10 · 2026',

  location:         'Dilijan, Armenia',
  locationUpper:    'DILIJAN, ARMENIA',
  venue:            'DiliJazz Hotel',

  // --- agenda -----------------------------------------------------
  welcomeTime:      '16:30',
  ceremonyTime:     '17:00',
  dinnerTime:       '18:00',
  afterpartyTime:   '23:00',

  // --- hotel -----------------------------------------------------
  // the venue's rate plus what Gohar & Roman add, shown as one figure
  hotelDiscount:      '30%',
  // open to anyone extending their stay around the wedding date
  extraNightsDiscount: '15%',
  hotelPhone:       '+374 60 52-15-15',         // from dilijazz.am — please verify
  hotelWhatsApp:    '+374 95 52-15-15',         // for guests booking from abroad
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
  am: {
    "break.dilijan": "Դիլիջան · հոկտեմբեր",
    "cfg.coupleName": "Գոհար և Ռոման",
    "cfg.location": "Դիլիջան, Հայաստան",
    "cfg.locationUpper": "ԴԻԼԻՋԱՆ, ՀԱՅԱՍՏԱՆ",
    "cfg.pageTitle": "Գոհար և Ռոման — 24 · 10 · 2026",
    "cfg.weddingDate": "2026 թ. հոկտեմբերի 24",
    "cfg.weddingDateUpper": "2026 ՀՈԿՏԵՄԲԵՐԻ 24",
    "close.p1": "Եկեք պատրաստ՝ տոնելու, պարելու, ուրախանալու և մնալու մի փոքր ավելի երկար, քան ծրագրել էիք։",
    "close.p2": "Անհամբեր սպասում ենք ձեզ։ <span class=\"heart\" aria-hidden=\"true\">♥</span>",
    "cover.tagline": "Նոր էջ՝ միասին",
    "det.a1": "Հյուրերի ընդունելություն և հյուրասիրություն",
    "det.a2": "Հանդիսավոր արարողություն",
    "det.a3": "Ընթրիք և երեկույթ",
    "det.a4": "Աֆթերփարթի",
    "det.a4b": "մինչև լուսաբաց",
    "det.day": "Օրվա ծրագիրը",
    "det.dow": "Շաբաթ",
    "det.label": "Մանրամասներ",
    "det.map": "Տեսնել քարտեզի վրա",
    "det.md": "Հոկտեմբերի 24",
    "det.yr": "2026",
    "f.att.no": "Ցավոք, չեմ կարողանա։",
    "f.att.yes": "Այո, ուրախությամբ։",
    "f.attending": "Կմիանա՞ք մեզ <span class=\"req\">*</span>",
    "f.email": "Էլ. փոստ <span class=\"req\">*</span>",
    "f.guests": "Հյուրերի ընդհանուր թիվը <span class=\"req\">*</span> <span class=\"hint\">(ներառյալ ձեզ)</span>",
    "f.hotel": "Կմնա՞ք մեզ հետ DiliJazz-ում",
    "f.hotel.maybe": "Դեռ որոշված չէ",
    "f.hotel.no": "Ոչ",
    "f.hotel.yes": "Այո",
    "f.name": "Ձեր անունը <span class=\"req\">*</span>",
    "f.note": "Թողեք մեզ հաղորդագրություն",
    "f.required": "Պարտադիր դաշտ",
    "f.send": "Գրանցվել",
    "f.side": "Ո՞ր կողմից եք՝ հարսի, թե փեսայի",
    "f.side.bride": "Հարս",
    "f.side.groom": "Փեսա",
    "hero.cta": "Բացել հրավերը",
    "hero.sub": "Եվ շատ ուրախ կլինենք այդ գեղեցիկ օրը տոնել ձեզ հետ։",
    "hero.title": "Մենք<br>ամուսնանում<br>ենք",
    "hotel.p1": "Դիլիջանի անտառներում, գետի մոտ, DiliJazz-ը հարմարավետ վայր է՝ շրջապատված բնությամբ։",
    "hotel.p2": "Հյուրանոցում կան <strong>սպա, փակ լողավազան, սաունա, ջակուզի և գեղեցիկ սեփական այգիներ</strong>՝ բոլորը հյուրանոցի տարածքում։",
    "hotel.p3": "Մեր հարսանիքի օրը հյուրանոցը <strong>կընդունի միայն մեր հյուրերին. այդ օրը այլ հյուրեր չեն լինի։</strong>",
    "inv.p1": "Ձեզանից ոմանք մեր կողքին են եղել հենց սկզբից, և ձեզանից յուրաքանչյուրը մեր կյանքում առանձնահատուկ տեղ ունի։",
    "inv.p2": "Իսկ հիմա, երբ միասին անում ենք այս հաջորդ քայլը, ուզում ենք, որ մեր ամենասիրելի մարդիկ մեր կողքին լինեն։",
    "inv.p3": "Եկեք տոնենք, ուրախանանք, պարենք և նոր հիշողություններ ստեղծենք միասին։",
    "js.error": "Կներեք, ինչ-որ բան սխալ գնաց։ Խնդրում ենք նորից փորձել։",
    "js.sending": "Ուղարկվում է…",
    "js.thanks.no.h": "Կկարոտենք ձեզ։",
    "js.thanks.no.p": "Շնորհակալություն, որ տեղեկացրիք։",
    "js.thanks.yes.h": "Ստացանք։ <span class=\"heart\">♥</span>",
    "js.thanks.yes.p": "Շնորհակալություն։ Անհամբեր սպասում ենք միասին տոնելուն։",
    "nav.details": "Մանրամասներ",
    "nav.hotel": "DiliJazz",
    "nav.invitation": "Հրավերը",
    "nav.register": "Գրանցվել",
    "nav.rsvp": "Գրանցվել",
    "nav.stay": "Մնացեք մեզ հետ",
    "nav.wear": "Ինչ հագնել",
    "rsvp.h": "Կմիանա՞ք մեզ",
    "rsvp.hope": "Հուսով ենք՝ այո։",
    "stat.days.few": "օր",
    "stat.days.many": "օր",
    "stat.days.one": "օր",
    "stat.days.other": "օր",
    "stat.daysPrefix": "Մնացել է՝",
    "stat.guests.few": "հյուր",
    "stat.guests.many": "հյուր",
    "stat.guests.one": "հյուր",
    "stat.guests.other": "հյուր",
    "stat.guestsPrefix": "Գրանցվել է՝",
    "stat.today": "Այսօր է",
    "stay.bookh": "Ինչպես ամրագրել",
    "stay.extralabel": "Ավելի շատ ժամանակ միասին",
    "stay.extrap": "Եթե ցանկություն ունեք DiliJazz-ում ավելի երկար ժամանակ անցկացնել, ապա կարող եք օգտվել <strong><span data-var=\"extraNightsDiscount\">15%</span> զեղչից</strong> հարսանիքին նախորդող և հաջորդող գիշերների ամրագրման համար։ Արդյունքում շտապելու կարիք չի լինի, ավելի շատ ժամանակ կանցկացնենք և երկար երեկոներ կունենանք միասին։",
    "stay.forguests": "Մեր հյուրերի համար",
    "stay.h": "Մնացեք մեզ հետ",
    "stay.p1": "Մեր ցանկությունն է, որ տոնը չավարտվի վերջին պարով։",
    "stay.p2": "Մեր հարսանիքի օրը DiliJazz-ը կընդունի միայն մեր հյուրերին՝ ամբողջ տարածքը մերը կլինի, որ միասին տոնենք ամբողջ գիշեր և մինչև հաջորդ առավոտ։",
    "stay.p3": "Անցկացրեք գիշերակացը DiliJazz հյուրանոցում, մասնակցեք խնջույքին մինչև ուշ գիշեր, տոնեք մեզ հետ և միացեք մեզ հաջորդ օրվա նախաճաշին։",
    "stay.pet": "<strong>Գալի՞ս եք ընտանի կենդանու հետ։</strong> Հյուրանոցում առկա են սենյակներ, որտեղ կարելի է բնակվել ընտանի կենդանու հետ։ Խնդրում ենք նշել այդ մասին հյուրանոց զանգահարելիս։",
    "stay.rateh": "Հատուկ գին՝ DiliJazz-ում գիշերակացի համար",
    "stay.rateoff": "<span data-var=\"hotelDiscount\">30%</span> <span class=\"rate__off\">զեղչ</span>",
    "stay.ratep": "DiliJazz-ը մեր հյուրերին կառաջարկի հատուկ գին, բացի դրանից մենք կհոգանք ձեր ծախսի մի մասը՝ որպես փոքրիկ շնորհակալություն ձեր ներկայության համար։",
    "stay.rooms": "Ընտրել սենյակ",
    "stay.s1": "Ընտրեք ձեր նախընտրած սենյակը DiliJazz-ի կայքում։",
    "stay.s2": "Զանգահարեք DiliJazz՝",
    "stay.s2b": "Արտերկրից կարող եք զանգահարել կամ գրել WhatsApp-ով՝",
    "stay.s3": "Նշեք <strong>Գոհարի և Ռոմանի հարսանիքը</strong>՝ հատուկ գինը ստանալու համար. և՛ հարսանիքի գիշերվա (<span data-var=\"hotelDiscount\">30%</span>), և՛ դրանից առաջ ու հետո ցանկացած գիշերվա համար (<span data-var=\"extraNightsDiscount\">15%</span>)։",
    "wear.h": "Գեղեցիկ և հարմարավետ",
    "wear.label": "Ինչ հագնել",
    "wear.p1": "Գույնի սահմանափակումներ չկան՝ հագեք այն, ինչում ձեզ լավագույնս եք զգում։",
    "wear.p2": "Մի փոքր ժամանակ կանցկացնենք դրսում՝ հյուրանոցի այգում և բնության մեջ, հաշվի առեք դա կոշիկներն ու տաք հագուստն ընտրելիս։",
    "wear.sub": "Գույնի սահմանափակումներ չկան",
  },
  ru: {
    "break.dilijan": "Дилижан · октябрь",
    "cfg.coupleName": "Гоар и Роман",
    "cfg.location": "Дилижан, Армения",
    "cfg.locationUpper": "ДИЛИЖАН, АРМЕНИЯ",
    "cfg.pageTitle": "Гоар и Роман — 24 · 10 · 2026",
    "cfg.weddingDate": "24 октября 2026",
    "cfg.weddingDateUpper": "24 ОКТЯБРЯ 2026",
    "close.p1": "Приезжайте праздновать, веселиться и танцевать — и остаться чуть дольше, чем планировали.",
    "close.p2": "Не можем дождаться встречи с вами! <span class=\"heart\" aria-hidden=\"true\">♥</span>",
    "cover.tagline": "Новая глава вместе",
    "det.a1": "Встреча гостей и фуршет",
    "det.a2": "Торжественная церемония",
    "det.a3": "Ужин и вечеринка",
    "det.a4": "Афтерпати",
    "det.a4b": "до рассвета",
    "det.day": "Программа дня",
    "det.dow": "Суббота",
    "det.label": "Детали",
    "det.map": "Посмотреть на карте",
    "det.md": "24 октября",
    "det.yr": "2026",
    "f.att.no": "К сожалению, не смогу.",
    "f.att.yes": "Да, с радостью!",
    "f.attending": "Вы будете с нами? <span class=\"req\">*</span>",
    "f.email": "Электронная почта <span class=\"req\">*</span>",
    "f.guests": "Общее количество гостей <span class=\"req\">*</span> <span class=\"hint\">(включая вас)</span>",
    "f.hotel": "Останетесь с нами в DiliJazz?",
    "f.hotel.maybe": "Пока не знаю",
    "f.hotel.no": "Нет",
    "f.hotel.yes": "Да",
    "f.name": "Ваше имя <span class=\"req\">*</span>",
    "f.note": "Оставьте нам сообщение",
    "f.required": "Обязательное поле",
    "f.send": "Зарегистрироваться",
    "f.side": "Вы со стороны невесты или жениха?",
    "f.side.bride": "Невеста",
    "f.side.groom": "Жених",
    "hero.cta": "К приглашению",
    "hero.sub": "И будем рады отпраздновать это вместе с вами.",
    "hero.title": "Мы<br>женимся",
    "hotel.p1": "В лесах Дилижана, у реки, DiliJazz — уютное место, окружённое природой.",
    "hotel.p2": "К услугам гостей <strong>спа, крытый бассейн, сауна, джакузи, красивый парк, дорожки, мостики и зоны отдыха</strong> — всё на территории отеля.",
    "hotel.p3": "В день нашей свадьбы отель будет <strong>принимать только нашу компанию: других гостей в это время не будет.</strong>",
    "inv.p1": "Многие из вас были рядом с самого начала, кто-то поддерживал и радовался на расстоянии — все вы занимаете особое место в нашей жизни.",
    "inv.p2": "И теперь, делая этот следующий шаг, мы хотим, чтобы рядом были наши самые близкие люди.",
    "inv.p3": "Приезжайте праздновать, веселиться, танцевать и создавать с нами новые воспоминания.",
    "js.error": "Извините, что-то пошло не так. Пожалуйста, попробуйте ещё раз.",
    "js.sending": "Отправляем…",
    "js.thanks.no.h": "Будем скучать!",
    "js.thanks.no.p": "Спасибо, что дали знать.",
    "js.thanks.yes.h": "Получили! <span class=\"heart\">♥</span>",
    "js.thanks.yes.p": "Спасибо. Не можем дождаться, когда отпразднуем вместе.",
    "nav.details": "Детали",
    "nav.hotel": "DiliJazz",
    "nav.invitation": "Приглашение",
    "nav.register": "Регистрация",
    "nav.rsvp": "Регистрация",
    "nav.stay": "Останьтесь с нами",
    "nav.wear": "Дресс-код",
    "rsvp.h": "Вы будете с нами?",
    "rsvp.hope": "Надеемся, что да!",
    "stat.days.few": "дня",
    "stat.days.many": "дней",
    "stat.days.one": "день",
    "stat.days.other": "дней",
    "stat.daysPrefix": "Осталось:",
    "stat.guests.few": "гостя",
    "stat.guests.many": "гостей",
    "stat.guests.one": "гость",
    "stat.guests.other": "гостей",
    "stat.guestsPrefix": "Зарегистрировано:",
    "stat.today": "Сегодня",
    "stay.bookh": "Как забронировать",
    "stay.extralabel": "Больше времени вместе",
    "stay.extrap": "Останетесь подольше? DiliJazz даёт <strong>нашим гостям скидку <span data-var=\"extraNightsDiscount\">15%</span></strong> на ночи до и после свадьбы — чтобы никому не пришлось спешить. Больше времени вместе, долгие вечера и те разговоры, для которых в день свадьбы никогда не хватает времени.",
    "stay.forguests": "Для наших гостей",
    "stay.h": "Останьтесь с нами",
    "stay.p1": "Нам бы хотелось, чтобы праздник не заканчивался последним танцем.",
    "stay.p2": "В день нашей свадьбы DiliJazz будет принимать только нашу компанию — всё место будет в нашем распоряжении, чтобы праздновать вместе всю ночь и до самого утра.",
    "stay.p3": "Останьтесь на ночь в DiliJazz, гуляйте на вечеринке допоздна, празднуйте с нами и присоединяйтесь к завтраку на следующий день.",
    "stay.pet": "<strong>Приедете с питомцем?</strong> В некоторых категориях номеров можно с животными. Пожалуйста, скажите об этом при звонке в отель.",
    "stay.rateh": "Специальная цена на проживание в день нашей свадьбы",
    "stay.rateoff": "<span class=\"rate__off\">скидка</span> <span data-var=\"hotelDiscount\">30%</span>",
    "stay.ratep": "DiliJazz предлагает нашим гостям скидку, а мы добавляем к ней ещё одну — от себя. Будем очень рады видеть вас на нашем празднике!",
    "stay.rooms": "Посмотреть номера",
    "stay.s1": "Выберите номер на сайте DiliJazz.",
    "stay.s2": "Позвоните в DiliJazz по номеру",
    "stay.s2b": "Из-за границы можно позвонить или написать в WhatsApp на номер",
    "stay.s3": "Скажите, что вы на <strong>свадьбу Гоар и Романа</strong>, чтобы получить скидку в день события (<span data-var=\"hotelDiscount\">30%</span>), а также на дни до и после (<span data-var=\"extraNightsDiscount\">15%</span>).",
    "wear.h": "Нарядно и удобно",
    "wear.label": "Дресс-код",
    "wear.p1": "Без ограничений по цвету — наденьте то, в чём вам лучше всего.",
    "wear.p2": "Мы немного побудем на свежем воздухе — на зелёной территории отеля, среди деревьев, у реки и мостиков. Имейте это в виду, выбирая обувь, и захватите что-нибудь потеплее.",
    "wear.sub": "Без ограничений по цвету",
  }
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

  const whatsapp = document.getElementById('hotel-whatsapp');
  if (whatsapp) whatsapp.href = 'https://wa.me/' + CONFIG.hotelWhatsApp.replace(/\D/g, '');
}

/* ------------------------------------------------------------ language -- */

let currentLang = 'en';

/* Look up a string built in JavaScript rather than in the markup.
   Falls back to the English passed in, so a missing key is harmless. */
function t(key, fallback) {
  const dict = I18N[currentLang] || {};
  return (key in dict && dict[key]) ? dict[key] : fallback;
}

function applyLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';
  currentLang = lang;
  currentLang = lang;
  currentLang = lang;
  currentLang = lang;
  currentLang = lang;
  currentLang = lang;
  currentLang = lang;
  currentLang = lang;
  currentLang = lang;
  currentLang = lang;
  currentLang = lang;
  currentLang = lang;
  currentLang = lang;

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

  // remember the English title so switching back restores it
  if (!document.documentElement.dataset.titleEn) {
    document.documentElement.dataset.titleEn = document.title;
  }
  const title = t('cfg.pageTitle', document.documentElement.dataset.titleEn);
  if (title) {
    const tmp = document.createElement('textarea');
    tmp.innerHTML = title;
    document.title = tmp.value;
  }

  // the countdown and the guest count are built in JS, so they need
  // repainting when the language changes
  if (typeof renderCountdown === 'function') { renderCountdown(); paintGuestCount(); }
  // a longer language makes a taller bar; re-measure before the hero paints
  if (typeof syncBannerHeight === 'function') requestAnimationFrame(syncBannerHeight);

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

function initMenu() {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');
  if (!btn || !menu) return;

  const setOpen = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
    menu.hidden = !open;
    document.body.classList.toggle('is-locked', open);
  };

  btn.addEventListener('click', () => {
    setOpen(btn.getAttribute('aria-expanded') !== 'true');
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      btn.focus();
    }
  });
}

/* ------------------------------------------------------- banner stats -- */

/* Plural form for a count, per language. Russian needs one/few/many, English
   one/other, Armenian a single form - Intl knows the rules, the dictionary
   supplies the words. */
function plural(n, stem, fallbackOne, fallbackOther) {
  let form = 'other';
  try {
    form = new Intl.PluralRules(HTML_LANG[currentLang] || 'en').select(n);
  } catch (e) { /* very old browser: fall through to other */ }
  return t(stem + '.' + form, n === 1 ? fallbackOne : fallbackOther);
}

function renderCountdown() {
  const box = document.getElementById('stat-days');
  const num = document.getElementById('days-num');
  const word = document.getElementById('days-word');
  if (!box || !num) return;

  const target = new Date(CONFIG.weddingISO);
  if (isNaN(target)) return;

  // whole days between today and the wedding, in the guest's own timezone
  const msPerDay = 86400000;
  const days = Math.ceil((target - new Date()) / msPerDay);

  const prefix = document.getElementById('days-prefix');

  if (days < 0) { box.hidden = true; return; }
  if (days === 0) {
    if (prefix) prefix.textContent = '';
    num.textContent = '';
    word.textContent = t('stat.today', 'Today!');
  } else {
    // languages that need a lead-in supply one; English does not
    const lead = t('stat.daysPrefix', '');
    if (prefix) prefix.textContent = lead ? lead + ' ' : '';
    num.textContent = days;
    word.textContent = plural(days, 'stat.days', 'day to go', 'days to go');
  }
  box.hidden = false;
}

/* How many guests have said yes. Read-only, and the banner simply stays
   quiet if the request fails - it must never block the page. */
const GUEST_CACHE_KEY = 'gr-guests';
// beyond a fortnight a remembered figure is more misleading than useful
const GUEST_CACHE_MAX_AGE = 14 * 24 * 60 * 60 * 1000;

function readCachedGuestCount() {
  try {
    const saved = JSON.parse(localStorage.getItem(GUEST_CACHE_KEY));
    if (!saved || typeof saved.n !== 'number') return null;
    if (Date.now() - saved.at > GUEST_CACHE_MAX_AGE) return null;
    return saved.n;
  } catch (e) { return null; }
}

function cacheGuestCount(n) {
  try {
    localStorage.setItem(GUEST_CACHE_KEY, JSON.stringify({ n: n, at: Date.now() }));
  } catch (e) { /* private mode */ }
}

/* One call, with a ceiling on how long it may hang. Returns null rather than
   throwing, so the caller can simply try again. */
async function fetchGuestCount(timeoutMs) {
  const ctrl = ('AbortController' in window) ? new AbortController() : null;
  const timer = ctrl ? setTimeout(function () { ctrl.abort(); }, timeoutMs) : null;
  try {
    const res = await fetch(CONFIG.endpoint, ctrl ? { signal: ctrl.signal } : undefined);
    const data = await res.json();
    if (data.status !== 'ok' || typeof data.guests !== 'number') return null;
    return data.guests;
  } catch (e) {
    return null;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/* How many guests have said yes. Apps Script is slow to wake - measured at
   1.3s to 10.5s - so the remembered figure goes up immediately and the request
   only corrects it. Read-only, and the banner keeps whatever it has if the
   request fails: it must never block the page. */
async function renderGuestCount() {
  const box = document.getElementById('stat-guests');
  if (!box) return;

  const cached = readCachedGuestCount();
  if (cached !== null) {
    lastGuestCount = cached;
    guestCountKnown = true;
    paintGuestCount();
  }

  let n = await fetchGuestCount(12000);
  if (n === null) {
    // the script sleeps; give it a moment and ask once more
    await new Promise(function (r) { setTimeout(r, 2000); });
    n = await fetchGuestCount(12000);
  }
  if (n === null) return;   // offline: keep whatever was remembered

  lastGuestCount = n;
  guestCountKnown = true;
  cacheGuestCount(n);
  paintGuestCount();
}

let lastGuestCount = 0;
let guestCountKnown = false;   // zero is a real answer, so track it separately

function paintGuestCount() {
  const box = document.getElementById('stat-guests');
  const num = document.getElementById('guests-num');
  const word = document.getElementById('guests-word');
  const prefix = document.getElementById('guests-prefix');
  if (!box || !num || !guestCountKnown) return;
  const lead = t('stat.guestsPrefix', '');
  if (prefix) prefix.textContent = lead ? lead + ' ' : '';
  num.textContent = lastGuestCount;
  word.textContent = plural(lastGuestCount, 'stat.guests',
                            'guest registered', 'guests registered');
  box.hidden = false;
  // the count arrives after first paint and can add a tile to the bar
  if (typeof syncBannerHeight === 'function') syncBannerHeight();
}

/* The bar is fixed, so the hero has to be padded past it. Its height depends
   on the language - Russian wraps the stat onto a second line - so publish the
   measured height and let the CSS clear it. */
function syncBannerHeight() {
  const bar = document.getElementById('topbar');
  if (!bar) return;
  const h = Math.round(bar.getBoundingClientRect().height);
  if (h) document.documentElement.style.setProperty('--banner-h', h + 'px');
}

function initBanner() {
  renderCountdown();
  // the day can roll over on a page left open overnight
  setInterval(renderCountdown, 60 * 60 * 1000);
  renderGuestCount();

  syncBannerHeight();
  addEventListener('resize', syncBannerHeight);
  // the webfont landing can reflow the bar by a pixel or two
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncBannerHeight);
  }
}

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
    submitBtn.textContent = t('js.sending', 'Sending…');
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
      statusEl.textContent = t('js.error', 'Sorry, something went wrong. Please try again.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalLabel;
    }
  });
}

function showThanks(card, coming) {
  const heading = coming
    ? t('js.thanks.yes.h', 'We got it! <span class="heart">♥</span>')
    : t('js.thanks.no.h', 'We’ll miss you!');
  const body = coming
    ? t('js.thanks.yes.p', 'Thank you. We can’t wait to celebrate with you.')
    : t('js.thanks.no.p', 'Thank you for letting us know.');

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
  initBanner();
  initMenu();
  initReveal();
  initRSVP();
});
