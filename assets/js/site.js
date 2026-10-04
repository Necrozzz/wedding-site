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
  endpoint:         'https://script.google.com/macros/s/AKfycbz0f8-QdNc8HUF-Ply9pbPBXBPtxtwnbP39FELdrRScphZ9UjC-AQAmOPfD5N-P1iZhgg/exec',
  // the guest count comes through Netlify's CDN, which asks Apps Script at
  // most once a minute. Registrations still post straight to the endpoint
  // above: a write should not be cached or proxied.
  countEndpoint:    '/api/guests',
  wishesLive:       true
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
    "wish.error": "Չհաջողվեց ուղարկել։ Փորձեք կրկին։",
    "wish.name": "Ձեր անունը",
    "wish.placeholder": "Թողեք ձեր մաղթանքը…",
    "wish.send": "Ուղարկել",
    "wish.sending": "Ուղարկվում է…",
    "wish.someone": "Հյուր",
    "wish.thanks": "Շնորհակալություն։ ♥",
    "wishes.label": "Մեր հյուրերի մաղթանքները",
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
    "wish.error": "Не отправилось. Попробуйте ещё раз.",
    "wish.name": "Ваше имя",
    "wish.placeholder": "Оставьте пожелание…",
    "wish.send": "Отправить",
    "wish.sending": "Отправляем…",
    "wish.someone": "Гость",
    "wish.thanks": "Спасибо! ♥",
    "wishes.label": "Пожелания наших гостей",
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
  if (typeof labelWishes === 'function') labelWishes();

  try { localStorage.setItem('gr-lang', lang); } catch (e) { /* private mode */ }
}

/* --------------------------------------------------------------- cover -- */

function dismissCover() {
  const cover = document.getElementById('cover');
  if (!cover) return;
  cover.classList.add('is-leaving');
  document.body.classList.remove('is-locked');
  toTop();   // scrolling was locked until now, so this is the real starting point
  setTimeout(() => { cover.hidden = true; }, 850);
}

/* Browsers put a returning visitor back where they left off, on a reload and
   on back/forward. Here that means landing halfway down the page behind the
   language cover, and meeting the middle of the site rather than the hero.
   A link that names a section - /#rsvp from the menu or a message - still
   goes where it says.

   html has scroll-behavior: smooth, so these jumps are forced instant;
   animating to the top on arrival would be worse than the problem. */
function toTop() {
  if (location.hash) return;
  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  } catch (e) {
    window.scrollTo(0, 0);   // older browsers reject the options form
  }
}

/* A named section must still be reached. The browser tries once, early, when
   the images above have no height yet and the target is not where it will end
   up - so it can land nowhere. Doing it again after load fixes that. */
function toHash() {
  if (!location.hash) return;
  let el = null;
  try { el = document.querySelector(location.hash); } catch (e) { return; }
  if (!el) return;
  try {
    el.scrollIntoView({ behavior: 'instant', block: 'start' });
  } catch (e) {
    el.scrollIntoView();
  }
}

function initScrollTop() {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  toTop();
  // Chrome restores after load, and a page coming back from the bfcache is
  // never re-parsed at all - only pageshow tells us it happened.
  addEventListener('load', function () { toTop(); toHash(); });
  addEventListener('pageshow', function (e) {
    if (e.persisted) { toTop(); toHash(); }
  });
}

function initCover() {
  const cover = document.getElementById('cover');
  if (!cover) return;

  // already chosen on an earlier visit: the cover is gone, so do not lock
  // the page behind it
  if (document.documentElement.classList.contains('lang-chosen')) {
    cover.hidden = true;
    return;
  }

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

/* Whole calendar days from today to the wedding day.

   Measuring to the instant instead meant the figure turned over at 16:30
   rather than at midnight, and Math.ceil rounded every part-day up: it read
   one too high for most of the day, and showed the same number two days
   running if you looked after 16:30 one day and before 16:30 the next.

   The wedding's own calendar date is taken from the configured string rather
   than by converting the instant into the guest's timezone, so a guest far
   enough east cannot land on the 25th. */
function daysUntilWedding(now) {
  const parts = String(CONFIG.weddingISO).slice(0, 10).split('-');
  if (parts.length !== 3) return NaN;
  const target = new Date(+parts[0], +parts[1] - 1, +parts[2]);
  if (isNaN(target)) return NaN;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // round rather than floor: the clocks change by an hour twice a year
  return Math.round((target - today) / 86400000);
}

function renderCountdown() {
  const box = document.getElementById('stat-days');
  const num = document.getElementById('days-num');
  const word = document.getElementById('days-word');
  if (!box || !num) return;

  const days = daysUntilWedding(new Date());
  if (isNaN(days)) return;

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
/* A remembered total is shown only while it is minutes old. It used to stand
   for a fortnight, which is how a phone came to show 28 and then 32 on the
   next refresh. The notes may be remembered far longer: they only ever get
   added to, so an old set reads as incomplete rather than wrong. */
const GUEST_CACHE_MAX_AGE = 5 * 60 * 1000;
const NOTES_CACHE_MAX_AGE = 24 * 60 * 60 * 1000;

function readCachedGuestCount() {
  try {
    const saved = JSON.parse(localStorage.getItem(GUEST_CACHE_KEY));
    if (!saved || typeof saved.n !== 'number') return null;
    if (Date.now() - saved.at > GUEST_CACHE_MAX_AGE) return null;
    return saved.n;
  } catch (e) { return null; }
}

/* The five-minute rule above governs what may be shown BEFORE the request
   answers, so nobody watches a stale figure flip to a different one. This is
   the other case: the request has failed outright, and an empty tile helps
   nobody. The last number we were given is shown however old it is. */
function readLastKnownGuestCount() {
  try {
    const saved = JSON.parse(localStorage.getItem(GUEST_CACHE_KEY));
    return (saved && typeof saved.n === 'number') ? saved.n : null;
  } catch (e) { return null; }
}

function cacheGuestCount(n) {
  try {
    localStorage.setItem(GUEST_CACHE_KEY, JSON.stringify({ n: n, at: Date.now() }));
  } catch (e) { /* private mode */ }
}

/* One call, with a ceiling on how long it may hang. Returns null rather than
   throwing, so the caller can simply try again. */
async function fetchStats(url, timeoutMs) {
  const ctrl = ('AbortController' in window) ? new AbortController() : null;
  const timer = ctrl ? setTimeout(function () { ctrl.abort(); }, timeoutMs) : null;
  try {
    const res = await fetch(url, ctrl ? { signal: ctrl.signal } : undefined);
    const data = await res.json();
    if (data.status !== 'ok' || typeof data.guests !== 'number') return null;
    return data;
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

  /* The request was started in the document head, long before this ran.
     Take that answer if it is good; fall back to asking again if it is not. */
  let data = null;
  if (window.__guests) {
    try { data = await window.__guests; } catch (e) { data = null; }
    window.__guests = null;            // one use only; refreshes ask again
    if (!data || data.status !== 'ok' || typeof data.guests !== 'number') data = null;
  }

  /* Six seconds was shorter than the thing it was waiting for. Measured on the
     live site: the edge answered in 6453ms and this aborted its own request at
     6003ms, so the tile never appeared at all. The edge is milliseconds when
     its copy is warm and seconds when the isolate is cold, and waiting through
     the cold case costs nothing - there is nothing else to show meanwhile. */
  if (data === null) data = await fetchStats(CONFIG.countEndpoint, 20000);
  if (data === null) {
    // no edge function (local preview) or it could not reach Google: ask direct
    data = await fetchStats(CONFIG.endpoint, 20000);
  }
  if (data === null) {
    // the script sleeps; give it a moment and ask once more
    await new Promise(function (r) { setTimeout(r, 2000); });
    data = await fetchStats(CONFIG.endpoint, 12000);
  }
  if (data === null) {
    renderWishes(null);
    // nothing was painted from the recent copy either: show the last figure
    // rather than a gap, without restamping it as if it were current
    if (!guestCountKnown) {
      const last = readLastKnownGuestCount();
      if (last !== null) {
        lastGuestCount = last;
        guestCountKnown = true;
        paintGuestCount(false);
      }
    }
    return;
  }

  renderWishes(data.notes);
  lastGuestCount = (Date.now() < guestFloorUntil)
    ? Math.max(data.guests, guestFloor)   // the caches may still be a minute behind
    : data.guests;
  guestCountKnown = true;
  cacheGuestCount(lastGuestCount);
  paintGuestCount();
}

let lastGuestCount = 0;
let guestCountKnown = false;   // zero is a real answer, so track it separately
let guestFloor = 0;            // set by a registration made on this page
let guestFloorUntil = 0;

function paintGuestCount(remember) {
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

  /* Keep the rendered words, not just the number: the next visit can then put
     the tile back without waiting for site.js to decide how to say it. A
     figure recovered from storage is not restamped - it would then look
     current to the next visit, and the staleness would never age out. */
  if (remember !== false) {
    try {
      localStorage.setItem('gr-guests-tile', JSON.stringify({
        prefix: prefix ? prefix.textContent : '',
        num: num.textContent,
        word: word ? word.textContent : '',
        lang: currentLang,
        at: Date.now()
      }));
    } catch (e) { /* private mode */ }
  }

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

/* A page left open overnight should tick over with the date, not an hour
   later, so aim at the next local midnight and re-aim after each one. */
function scheduleMidnightRefresh() {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
  setTimeout(function () {
    renderCountdown();
    scheduleMidnightRefresh();
  }, midnight - now);
}

/* ------------------------------------------------------------ wishes -- */

/* Only a first name is shown. The server sends only a first name too - this
   is the second line of defence, not the first. */
function firstName(full) {
  const s = String(full || '').trim();
  if (!s) return '';
  return s.split(/[\s,&/]+/)[0].slice(0, 24);
}



const NOTES_CACHE_KEY = 'gr-notes';

function readCachedNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(NOTES_CACHE_KEY));
    if (!saved || !Array.isArray(saved.list)) return null;
    if (Date.now() - saved.at > NOTES_CACHE_MAX_AGE) return null;
    return saved.list;
  } catch (e) { return null; }
}

function cacheNotes(list) {
  try {
    localStorage.setItem(NOTES_CACHE_KEY, JSON.stringify({ list: list, at: Date.now() }));
  } catch (e) { /* private mode */ }
}

let wishesShown = [];
/* Wishes left from this browser, kept until the server starts returning them.
   Apps Script caches the list for a minute and the edge copy for thirty
   seconds, so without this the next read would quietly erase a wish that had
   only just been written. */
let pendingWishes = [];
let lastServerNotes = [];

function mergePending(list) {
  if (!pendingWishes.length) return list;
  const seen = list.map(function (n) { return n.text; });
  pendingWishes = pendingWishes.filter(function (p) {
    return seen.indexOf(p.text) === -1;
  });
  return pendingWishes.concat(list);
}

/* "Boooo", "Ku-ku", "pupipu" - asides to us in the registration form, not
   wishes for the page. One short word alone is the tell; anything a dozen
   characters long, or three words, is left alone. This is applied only to
   registration notes: a wish typed into the form is deliberate. */
/* Registration notes are shown unsigned, so a signature typed inside the text
   would slip past that: "Vsem chmoki! - Dmitry Lyubim vas! - Viktoria" should
   read as the words alone. Only a dash followed by one capitalised word goes -
   nothing mid-sentence, and never from a wish left through the form. */
function stripSignature(text) {
  return String(text || '')
    .replace(/\s*[-–—]\s*[A-ZА-ЯЁԱ-Ֆ][^\s]{1,20}(?=\s|$)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function isSubstantial(text) {
  const t = String(text || '').trim();
  if (!t) return false;
  return t.length >= 12 || t.split(/\s+/).length >= 3;
}

function wishItem(note) {
  const li = document.createElement('li');
  li.className = 'wishes__item';
  const p = document.createElement('p');
  p.className = 'wishes__text';
  p.textContent = note.text;              // textContent: guests' words are data
  li.appendChild(p);
  // Only wishes left through the form are signed. What guests wrote when they
  // registered was written to us, not to the page, so it stays unattributed.
  if (note.name) {
    const by = document.createElement('p');
    by.className = 'wishes__by';
    by.textContent = '\u2014 ' + firstName(note.name);
    li.appendChild(by);
  }
  return li;
}

/* Paint the track twice and slide it by exactly half its height, so the loop
   rejoins itself without a seam. */
/* What is on screen, so an unchanged list can be left alone. Rebuilding the
   track mid-run replaces every item and re-sets the animation's duration,
   which lurches the credits. The list is re-read every minute and is almost
   always identical, so that lurch was happening roughly once a minute for no
   reason at all. */
let paintedSignature = null;

function wishSignature(list) {
  return list.map(function (n) { return n.name + ' ' + n.text; }).join('');
}

function paintWishes() {
  const track = document.getElementById('wishes-track');
  const box = document.getElementById('wishes');
  if (!track || !box) return;

  const signature = wishSignature(wishesShown);
  if (signature === paintedSignature) return;   // nothing new: let it roll on
  paintedSignature = signature;

  /* With nothing to show, the frame goes but the form stays: hiding the whole
     panel would mean nobody could leave the first wish. */
  const frame = box.querySelector('.wishes__frame');
  if (!wishesShown.length) {
    track.innerHTML = '';
    if (frame) frame.hidden = true;
    box.hidden = !CONFIG.wishesLive;
    return;
  }
  if (frame) frame.hidden = false;

  track.innerHTML = '';
  for (let pass = 0; pass < 2; pass++) {
    wishesShown.forEach(function (n) { track.appendChild(wishItem(n)); });
  }
  box.hidden = false;

  // one frame is not enough: the webfont and the container-query widths are
  // still settling, and a track measured then is far taller than it ends up
  requestAnimationFrame(function () { requestAnimationFrame(tuneTicker); });
}

/* Height of the frame and pace of the run, both measured from what is on
   screen. Kept out of paintWishes so it can be re-run when the layout changes
   under it - a webfont landing, or the window being resized - without
   rebuilding the track and interrupting the scroll. */
function tuneTicker() {
  const track = document.getElementById('wishes-track');
  const box = document.getElementById('wishes');
  if (!track || !box) return;
  const frame = box.querySelector('.wishes__frame');
  const items = track.querySelectorAll('.wishes__item');
  if (!frame || !items.length) return;

  // Four notes at a time, whatever length they are: a fixed height showed
  // six short ones. Measure the first four and make the frame that tall,
  // within limits so one rambling note cannot swallow the hero.
  const show = Math.min(4, items.length);
  let tall = 0;
  for (let i = 0; i < show; i++) {
    tall += items[i].getBoundingClientRect().height;
  }
  const gaps = parseFloat(getComputedStyle(items[0]).marginBottom) || 0;
  const pad = parseFloat(getComputedStyle(frame).paddingTop) || 0;
  const wanted = tall + gaps * (show - 1) + pad * 2;
  /* The frame grows with the notes, and the notes got longer as real wishes
     came in: at 375x812 in Russian the panel reached 313px and covered the
     invitation button by 9px. So the ceiling is not a fixed number - it is
     whatever room there is between the top of the panel and that button. */
  let room = Infinity;
  const cta = document.querySelector('.hero__cta .btn');
  const form = box.querySelector('.wishes__form');
  if (cta) {
    const panelTop = box.getBoundingClientRect().top;
    const formH = form ? form.getBoundingClientRect().height : 0;
    const styles = getComputedStyle(box);
    const gap = parseFloat(styles.rowGap || styles.gap) || 0;
    room = cta.getBoundingClientRect().top - panelTop - formH - gap - 14;
  }

  const cap = Math.round(Math.min(innerHeight * 0.36, 290, room));
  const height = Math.round(Math.max(76, Math.min(wanted, cap))) + 'px';
  if (frame.style.height !== height) frame.style.height = height;

  /* A steady reading pace rather than a fixed duration, so five notes do not
     race past and forty do not crawl. 18px a second: slower than the 26 it
     started at, which read as hurried. */
  const full = track.scrollHeight / 2;
  const seconds = Math.max(26, Math.round(full / 18));
  if (track.style.getPropertyValue('--wishes-duration') !== seconds + 's') {
    track.style.setProperty('--wishes-duration', seconds + 's');
  }
}

function renderWishes(notes) {
  let list = Array.isArray(notes) ? notes : [];
  list = list
    .map(function (n) {
      const who = firstName(n && n.name);
      let body = String((n && n.text) || '').trim();
      if (!who) body = stripSignature(body);   // unsigned notes carry no name
      return { name: who, text: body };
    })
    // a name means it came from the form, and is kept whatever its length
    .filter(function (n) { return n.text && (n.name || isSubstantial(n.text)); });

  if (list.length) {
    cacheNotes(list);
  } else if (notes === null) {
    // the request has not landed yet, or failed: show what we saw last time
    list = readCachedNotes() || [];
  }
  lastServerNotes = list;
  wishesShown = mergePending(list);
  paintWishes();
}

function labelWishes() {
  const box = document.getElementById('wishes');
  const text = document.getElementById('wish-text');
  const name = document.getElementById('wish-name');
  const send = document.getElementById('wish-send');
  if (box) box.setAttribute('aria-label', t('wishes.label', 'Wishes from our guests'));
  if (text) text.placeholder = t('wish.placeholder', 'Leave a wish…');
  if (name) name.placeholder = t('wish.name', 'Your name');
  if (send) send.textContent = t('wish.send', 'Send a wish');
}

function initWishes() {
  labelWishes();
  renderWishes(null);   // whatever was remembered, on screen immediately

  // the webfont lands after the first measurement, and a rotated phone
  // changes every width the pace was worked out from
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { tuneTicker(); });
  }
  let resizeTimer = null;
  addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(tuneTicker, 250);
  });
  const form = document.getElementById('wish-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const text = document.getElementById('wish-text');
    const name = document.getElementById('wish-name');
    const send = document.getElementById('wish-send');
    const status = document.getElementById('wish-status');

    const wish = text.value.trim();
    const who = firstName(name.value) || t('wish.someone', 'A guest');
    if (!wish) { text.focus(); return; }

    status.className = '';
    status.textContent = t('wish.sending', 'Sending…');
    send.disabled = true;

    let ok = true;
    if (CONFIG.wishesLive) {
      try {
        const body = new URLSearchParams();
        body.append('type', 'wish');
        body.append('name', who);
        body.append('wish', wish);
        const res = await fetch(CONFIG.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body
        });
        const data = await res.json();
        ok = data.result === 'success';
      } catch (err) { ok = false; }
    }

    if (!ok) {
      status.className = 'error';
      status.textContent = t('wish.error', 'Could not send. Please try again.');
      send.disabled = false;
      return;
    }

    // Show it straight away rather than waiting for the next read, and keep
    // it through the reads that are still answering from cache.
    pendingWishes.unshift({ name: who, text: wish });
    wishesShown = mergePending(lastServerNotes);
    paintWishes();

    /* Restart the run so it comes round promptly. Without this the track
       carries on from wherever it had got to, and a wish added at the top sits
       in the faded band waiting out the rest of the cycle. */
    const track = document.getElementById('wishes-track');
    if (track) {
      track.style.animation = 'none';
      void track.offsetHeight;          // forces the restart
      track.style.animation = '';
    }

    text.value = '';
    status.textContent = t('wish.thanks', 'Thank you! ♥');
    send.disabled = false;
    send.blur();                        // nothing left focused to pause it
  });
}

/* Someone has just registered on this page. Count them immediately, then read
   the real total back - once past the CDN, and again after the script's own
   minute of caching has lapsed. */
function countNewRegistration(guests) {
  const n = parseInt(guests, 10);
  if (isNaN(n) || n < 1) return;

  lastGuestCount = (guestCountKnown ? lastGuestCount : 0) + n;
  guestCountKnown = true;
  guestFloor = lastGuestCount;
  guestFloorUntil = Date.now() + 2 * 60 * 1000;
  cacheGuestCount(lastGuestCount);
  paintGuestCount();

  // ?fresh= is what gets us past the CDN copy; the script's own cache needs
  // the second read, after its minute is up
  setTimeout(function () { refreshGuestCount(true); }, 1500);
  setTimeout(function () { refreshGuestCount(true); }, 65 * 1000);
}

/* `force` sends the request past every cache, all the way to the sheet. That
   is right after a registration, when we know the total has moved and the
   caches have not caught up. It is wrong for the routine minute-by-minute
   read: forcing there would put every open page through to Apps Script every
   sixty seconds, which is exactly the load the edge copy exists to absorb. */
async function refreshGuestCount(force) {
  let url = CONFIG.countEndpoint;
  if (force) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + 'fresh=' + Date.now();
  }
  let data = await fetchStats(url, 12000);
  if (data === null) data = await fetchStats(CONFIG.endpoint, 12000);
  if (data === null) return;

  renderWishes(data.notes);
  lastGuestCount = (Date.now() < guestFloorUntil)
    ? Math.max(data.guests, guestFloor)
    : data.guests;
  guestCountKnown = true;
  cacheGuestCount(lastGuestCount);
  paintGuestCount();
}

function initBanner() {
  renderCountdown();
  // renderGuestCount is async and nothing awaits it: without this a thrown
  // error disappears, which is exactly how a stale counter went unnoticed
  scheduleMidnightRefresh();
  // a safety net, in case a sleeping laptop swallows the midnight timer
  setInterval(renderCountdown, 60 * 60 * 1000);
  renderGuestCount().catch(function (e) { console.error('guest count:', e); });

  /* Re-read while the page is open, so a guest watching it sees the number
     move as others register. Only while the tab is actually in front - a
     backgrounded phone should not be polling. */
  setInterval(function () {
    if (!document.hidden) {
      refreshGuestCount().catch(function (e) { console.error('guest count:', e); });
    }
  }, 60 * 1000);

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
      refreshGuestCount().catch(function (e) { console.error('guest count:', e); });
    }
  });

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

      // a "No" does not add to the total the sheet reports
      if (attending === 'Yes') {
        countNewRegistration(params.get('totalGuests'));
      }
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
  initScrollTop();
  applyVariables();

  let saved = null;
  try { saved = localStorage.getItem('gr-lang'); } catch (e) {}
  applyLanguage(saved || 'en');

  initCover();
  initChrome();
  initBanner();
  initWishes();
  initMenu();
  initReveal();
  initRSVP();
});
