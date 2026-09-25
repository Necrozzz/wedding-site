# -*- coding: utf-8 -*-
"""Prefill the Armenian and Russian columns of translations/translations.csv.

These are Claude's drafts, not native-speaker copy. They are meant to be
corrected in the spreadsheet, not shipped unreviewed. Names and the DiliJazz
brand are left in Latin script; personal names are transliterated only inside
running sentences where mixing scripts would read badly.
"""
import csv
import io
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV = os.path.join(ROOT, 'translations', 'translations.csv')

HY = {
 'cover.tagline': 'Նոր էջ՝ միասին',
 'nav.invitation': 'Հրավերը',
 'nav.details': 'Մանրամասներ',
 'nav.hotel': 'DiliJazz',
 'nav.stay': 'Մնացեք մեզ հետ',
 'nav.wear': 'Ինչ հագնել',
 'nav.register': 'Գրանցվել',
 'nav.rsvp': 'Գրանցվել',
 'hero.title': 'Մենք<br>ամուսնանում<br>ենք',
 'hero.sub': 'Եվ շատ ուրախ կլինենք այդ գեղեցիկ օրը տոնել ձեզ հետ։',
 'hero.cta': 'Բացել հրավերը',
 'inv.p1': 'Ձեզանից ոմանք մեր կողքին են եղել հենց սկզբից, և ձեզանից յուրաքանչյուրը մեր կյանքում առանձնահատուկ տեղ ունի։',
 'inv.p2': 'Իսկ հիմա, երբ միասին անում ենք այս հաջորդ քայլը, ուզում ենք, որ մեր ամենասիրելի մարդիկ մեր կողքին լինեն։',
 'inv.p3': 'Եկեք տոնենք, ուրախանանք, պարենք և նոր հիշողություններ ստեղծենք միասին։',
 'det.label': 'Մանրամասներ',
 'det.dow': 'Շաբաթ',
 'det.md': 'Հոկտեմբերի 24',
 'det.yr': '2026',
 'det.map': 'Տեսնել քարտեզի վրա',
 'det.day': 'Օրվա ծրագիրը',
 'det.a1': 'Հյուրերի ընդունելություն և հյուրասիրություն',
 'det.a2': 'Հանդիսավոր արարողություն',
 'det.a3': 'Ընթրիք և երեկույթ',
 'det.a4': 'Աֆթերփարթի',
 'det.a4b': 'մինչև լուսաբաց',
 'break.dilijan': 'Դիլիջան · հոկտեմբեր',
 'hotel.p1': 'Դիլիջանի անտառներում, գետի մոտ, DiliJazz-ը հարմարավետ վայր է՝ շրջապատված բնությամբ։',
 'hotel.p2': 'Հյուրանոցում կան <strong>սպա, փակ լողավազան, սաունա, ջակուզի և գեղեցիկ սեփական այգիներ</strong>՝ բոլորը հյուրանոցի տարածքում։',
 'hotel.p3': 'Մեր հարսանիքի օրը հյուրանոցը <strong>կընդունի միայն մեր հյուրերին. այդ օրը այլ հյուրեր չեն լինի։</strong>',
 'stay.h': 'Մնացեք մեզ հետ',
 'stay.p1': 'Մեր ցանկությունն է, որ տոնը չավարտվի վերջին պարով։',
 'stay.p2': 'Մեր հարսանիքի օրը DiliJazz-ը կընդունի միայն մեր հյուրերին՝ ամբողջ տարածքը մերը կլինի, որ միասին տոնենք ամբողջ գիշեր և մինչև հաջորդ առավոտ։',
 'stay.p3': 'Անցկացրեք գիշերակացը DiliJazz հյուրանոցում, մասնակցեք խնջույքին մինչև ուշ գիշեր, տոնեք մեզ հետ և միացեք մեզ հաջորդ օրվա նախաճաշին։',
 'stay.forguests': 'Մեր հյուրերի համար',
 'stay.rateh': 'Հատուկ գին՝ DiliJazz-ում գիշերակացի համար',
 'stay.rateoff': '<span data-var="hotelDiscount">30%</span> <span class="rate__off">զեղչ</span>',
 'stay.ratep': 'DiliJazz-ը մեր հյուրերին կառաջարկի հատուկ գին, բացի դրանից մենք կհոգանք ձեր ծախսի մի մասը՝ որպես փոքրիկ շնորհակալություն ձեր ներկայության համար։',
 'stay.extralabel': 'Ավելի շատ ժամանակ միասին',
 'stay.extrap': 'Եթե ցանկություն ունեք DiliJazz-ում ավելի երկար ժամանակ անցկացնել, ապա կարող եք օգտվել <strong><span data-var="extraNightsDiscount">15%</span> զեղչից</strong> հարսանիքին նախորդող և հաջորդող գիշերների ամրագրման համար։ Արդյունքում շտապելու կարիք չի լինի, ավելի շատ ժամանակ կանցկացնենք և երկար երեկոներ կունենանք միասին։',
 'stay.bookh': 'Ինչպես ամրագրել',
 'stay.s1': 'Ընտրեք ձեր նախընտրած սենյակը DiliJazz-ի կայքում։',
 'stay.s2': 'Զանգահարեք DiliJazz՝',
 'stay.s2b': 'Արտերկրից կարող եք զանգահարել կամ գրել WhatsApp-ով՝',
 'stay.s3': 'Նշեք <strong>Գոհարի և Ռոմանի հարսանիքը</strong>՝ հատուկ գինը ստանալու համար. և՛ հարսանիքի գիշերվա (<span data-var="hotelDiscount">30%</span>), և՛ դրանից առաջ ու հետո ցանկացած գիշերվա համար (<span data-var="extraNightsDiscount">15%</span>)։',
 'stay.rooms': 'Ընտրել սենյակ',
 'stay.pet': '<strong>Գալի՞ս եք ընտանի կենդանու հետ։</strong> Հյուրանոցում առկա են սենյակներ, որտեղ կարելի է բնակվել ընտանի կենդանու հետ։ Խնդրում ենք նշել այդ մասին հյուրանոց զանգահարելիս։',
 'wear.label': 'Ինչ հագնել',
 'wear.h': 'Գեղեցիկ և հարմարավետ',
 'wear.sub': 'Գույնի սահմանափակումներ չկան',
 'wear.p1': 'Գույնի սահմանափակումներ չկան՝ հագեք այն, ինչում ձեզ լավագույնս եք զգում։',
 'wear.p2': 'Մի փոքր ժամանակ կանցկացնենք դրսում՝ հյուրանոցի այգում և բնության մեջ, հաշվի առեք դա կոշիկներն ու տաք հագուստն ընտրելիս։',
 'rsvp.h': 'Կմիանա՞ք մեզ',
 'rsvp.hope': 'Հուսով ենք՝ այո։',
 'f.name': 'Ձեր անունը <span class="req">*</span>',
 'f.email': 'Էլ. փոստ <span class="req">*</span>',
 'f.attending': 'Կմիանա՞ք մեզ <span class="req">*</span>',
 'f.att.yes': 'Այո, ուրախությամբ։',
 'f.att.no': 'Ցավոք, չեմ կարողանա։',
 'f.guests': 'Հյուրերի ընդհանուր թիվը <span class="req">*</span> <span class="hint">(ներառյալ ձեզ)</span>',
 'f.side': 'Ո՞ր կողմից եք՝ հարսի, թե փեսայի',
 'f.side.bride': 'Հարս',
 'f.side.groom': 'Փեսա',
 'f.hotel': 'Կմնա՞ք մեզ հետ DiliJazz-ում',
 'f.hotel.yes': 'Այո',
 'f.hotel.no': 'Ոչ',
 'f.hotel.maybe': 'Դեռ որոշված չէ',
 'f.note': 'Թողեք մեզ հաղորդագրություն',
 'f.required': 'Պարտադիր դաշտ',
 'f.send': 'Գրանցվել',
 'close.p1': 'Եկեք պատրաստ՝ տոնելու, պարելու, ուրախանալու և մնալու մի փոքր ավելի երկար, քան ծրագրել էիք։',
 'close.p2': 'Անհամբեր սպասում ենք ձեզ։ <span class="heart" aria-hidden="true">♥</span>',
 'js.sending': 'Ուղարկվում է…',
 'js.error': 'Կներեք, ինչ-որ բան սխալ գնաց։ Խնդրում ենք նորից փորձել։',
 'js.thanks.yes.h': 'Ստացանք։ <span class="heart">♥</span>',
 'js.thanks.yes.p': 'Շնորհակալություն։ Անհամբեր սպասում ենք միասին տոնելուն։',
 'js.thanks.no.h': 'Կկարոտենք ձեզ։',
 'js.thanks.no.p': 'Շնորհակալություն, որ տեղեկացրիք։',
 'cfg.weddingDateUpper': '2026 ՀՈԿՏԵՄԲԵՐԻ 24',
 'cfg.locationUpper': 'ԴԻԼԻՋԱՆ, ՀԱՅԱՍՏԱՆ',
 'cfg.location': 'Դիլիջան, Հայաստան',
 'cfg.weddingDate': '2026 թ. հոկտեմբերի 24',
 'stat.daysPrefix': 'Մնացել է՝',
 'stat.guestsPrefix': 'Գրանցվել է՝',
 'stat.days.one': 'օր',
 'stat.days.few': 'օր',
 'stat.days.many': 'օր',
 'stat.days.other': 'օր',
 'stat.guests.one': 'հյուր',
 'stat.guests.few': 'հյուր',
 'stat.guests.many': 'հյուր',
 'stat.guests.other': 'հյուր',
 'stat.today': 'Այսօր է',
 'cfg.coupleName': 'Գոհար և Ռոման',
 'cfg.pageTitle': 'Գոհար և Ռոման — 24 · 10 · 2026',
}

RU = {
 'cover.tagline': 'Новая глава вместе',
 'nav.invitation': 'Приглашение',
 'nav.details': 'Детали',
 'nav.hotel': 'DiliJazz',
 'nav.stay': 'Останьтесь с нами',
 'nav.wear': 'Дресс-код',
 'nav.register': 'Регистрация',
 'nav.rsvp': 'Регистрация',
 'hero.title': 'Мы<br>женимся',
 'hero.sub': 'И будем рады отпраздновать это вместе с вами.',
 'hero.cta': 'К приглашению',
 'inv.p1': 'Кто-то из вас был рядом с самого начала — и каждый из вас занимает особое место в нашей жизни.',
 'inv.p2': 'И теперь, делая этот следующий шаг вместе, мы хотим, чтобы рядом были наши самые близкие люди.',
 'inv.p3': 'Приезжайте праздновать, веселиться, танцевать и создавать с нами новые воспоминания.',
 'det.label': 'Детали',
 'det.dow': 'Суббота',
 'det.md': '24 октября',
 'det.yr': '2026',
 'det.map': 'Посмотреть на карте',
 'det.day': 'Программа дня',
 'det.a1': 'Приветственный приём',
 'det.a2': 'Торжественная церемония',
 'det.a3': 'Ужин и вечеринка',
 'det.a4': 'Афтерпати',
 'det.a4b': 'до рассвета',
 'break.dilijan': 'Дилижан · октябрь',
 'hotel.p1': 'В лесах Дилижана, у реки, DiliJazz — уютное место, окружённое природой.',
 'hotel.p2': 'К услугам гостей <strong>спа, крытый бассейн, сауна, джакузи и красивые собственные сады</strong> — всё на территории отеля.',
 'hotel.p3': 'В день нашей свадьбы отель будет <strong>принимать только нашу компанию: других гостей в это время не будет.</strong>',
 'stay.h': 'Останьтесь с нами',
 'stay.p1': 'Нам бы хотелось, чтобы праздник не заканчивался последним танцем.',
 'stay.p2': 'В день нашей свадьбы DiliJazz будет принимать только нашу компанию — всё место будет в нашем распоряжении, чтобы праздновать вместе всю ночь и до самого утра.',
 'stay.p3': 'Останьтесь на ночь в DiliJazz, гуляйте на вечеринке допоздна, празднуйте с нами и присоединяйтесь к завтраку на следующий день.',
 'stay.forguests': 'Для наших гостей',
 'stay.rateh': 'Специальная цена на проживание в день нашей свадьбы',
 'stay.rateoff': '<span class="rate__off">скидка</span> <span data-var="hotelDiscount">30%</span>',
 'stay.ratep': 'DiliJazz делает нашим гостям скидку, а мы добавляем к ней ещё одну — от себя. Будем очень рады видеть вас на нашем празднике!',
 'stay.extralabel': 'Больше времени вместе',
 'stay.extrap': 'Останетесь подольше? DiliJazz даёт <strong>нашим гостям скидку <span data-var="extraNightsDiscount">15%</span></strong> на ночи до и после свадьбы — чтобы никому не пришлось спешить. Больше времени вместе, долгие вечера и те разговоры, для которых в день свадьбы никогда не хватает времени.',
 'stay.bookh': 'Как забронировать',
 'stay.s1': 'Выберите номер на сайте DiliJazz.',
 'stay.s2': 'Позвоните в DiliJazz по номеру',
 'stay.s2b': 'Из-за границы можно позвонить или написать в WhatsApp на номер',
 'stay.s3': 'Скажите, что вы на <strong>свадьбу Гоар и Романа</strong>, чтобы получить скидку в день события (<span data-var="hotelDiscount">30%</span>), а также на дни до и после (<span data-var="extraNightsDiscount">15%</span>).',
 'stay.rooms': 'Посмотреть номера',
 'stay.pet': '<strong>Приедете с питомцем?</strong> В некоторых категориях номеров можно с животными. Пожалуйста, скажите об этом при звонке в отель.',
 'wear.label': 'Дресс-код',
 'wear.h': 'Нарядно и удобно',
 'wear.sub': 'Без ограничений по цвету',
 'wear.p1': 'Без ограничений по цвету — наденьте то, в чём вам лучше всего.',
 'wear.p2': 'Мы немного побудем на свежем воздухе — на зелёной территории отеля, среди деревьев, у реки и мостиков. Имейте это в виду, выбирая обувь, и захватите что-нибудь потеплее.',
 'rsvp.h': 'Вы будете с нами?',
 'rsvp.hope': 'Надеемся, что да!',
 'f.name': 'Ваше имя <span class="req">*</span>',
 'f.email': 'Электронная почта <span class="req">*</span>',
 'f.attending': 'Вы будете с нами? <span class="req">*</span>',
 'f.att.yes': 'Да, с радостью!',
 'f.att.no': 'К сожалению, не смогу.',
 'f.guests': 'Общее количество гостей <span class="req">*</span> <span class="hint">(включая вас)</span>',
 'f.side': 'Вы со стороны невесты или жениха?',
 'f.side.bride': 'Невеста',
 'f.side.groom': 'Жених',
 'f.hotel': 'Останетесь с нами в DiliJazz?',
 'f.hotel.yes': 'Да',
 'f.hotel.no': 'Нет',
 'f.hotel.maybe': 'Пока не знаю',
 'f.note': 'Оставьте нам сообщение',
 'f.required': 'Обязательное поле',
 'f.send': 'Зарегистрироваться',
 'close.p1': 'Приезжайте праздновать, веселиться и танцевать — и остаться чуть дольше, чем планировали.',
 'close.p2': 'Не можем дождаться встречи с вами! <span class="heart" aria-hidden="true">♥</span>',
 'js.sending': 'Отправляем…',
 'js.error': 'Извините, что-то пошло не так. Пожалуйста, попробуйте ещё раз.',
 'js.thanks.yes.h': 'Получили! <span class="heart">♥</span>',
 'js.thanks.yes.p': 'Спасибо. Не можем дождаться, когда отпразднуем вместе.',
 'js.thanks.no.h': 'Будем скучать!',
 'js.thanks.no.p': 'Спасибо, что дали знать.',
 'cfg.weddingDateUpper': '24 ОКТЯБРЯ 2026',
 'cfg.locationUpper': 'ДИЛИЖАН, АРМЕНИЯ',
 'cfg.location': 'Дилижан, Армения',
 'cfg.weddingDate': '24 октября 2026',
 'stat.daysPrefix': 'Осталось:',
 'stat.guestsPrefix': 'Зарегистрировано:',
 'stat.days.one': 'день',
 'stat.days.few': 'дня',
 'stat.days.many': 'дней',
 'stat.days.other': 'дней',
 'stat.guests.one': 'гость',
 'stat.guests.few': 'гостя',
 'stat.guests.many': 'гостей',
 'stat.guests.other': 'гостей',
 'stat.today': 'Сегодня',
 'cfg.coupleName': 'Гоар и Роман',
 'cfg.pageTitle': 'Гоар и Роман — 24 · 10 · 2026',
}

rows = list(csv.reader(io.open(CSV, encoding='utf-8-sig')))
header, body = rows[0], rows[1:]

missing_hy, missing_ru, tag_problems = [], [], []


def tags(s):
    """Tag signature for comparing a translation with its source.

    <br> is excluded on purpose: where a line breaks is a property of the
    language, not of the markup, so English breaking in three places and
    Russian in two is correct rather than a defect.
    """
    import re
    found = re.findall(r'<[^>]+>', s)
    return sorted(t for t in found if not t.lower().startswith('<br'))


for r in body:
    key, en = r[0], r[2]
    hy, ru = HY.get(key, ''), RU.get(key, '')
    if not hy:
        missing_hy.append(key)
    if not ru:
        missing_ru.append(key)
    for lang, val in (('hy', hy), ('ru', ru)):
        if val and tags(val) != tags(en):
            tag_problems.append('%s [%s]' % (key, lang))
    r[3], r[4] = hy, ru

with io.open(CSV, 'w', encoding='utf-8-sig', newline='') as fh:
    w = csv.writer(fh)
    w.writerow(header)
    w.writerows(body)

print('  %d rows filled' % len(body))
print('  missing Armenian: %s' % (missing_hy or 'none'))
print('  missing Russian:  %s' % (missing_ru or 'none'))
print('  tag mismatches:   %s' % (tag_problems or 'none'))
