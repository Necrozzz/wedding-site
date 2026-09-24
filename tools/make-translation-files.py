"""Generate the translation worksheet from the live markup.

Reads every data-i18n string out of index.html, adds the handful of strings
that live in site.js and in CONFIG, and writes:

  translations/translations.csv  - one row per string, columns for each language
  translations/README.txt        - how to fill it in

Re-run this whenever the English copy changes; it always reads the real markup
rather than a stored copy, so it cannot drift.
"""
import csv
import io
import os
import re
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'translations')
os.makedirs(OUT, exist_ok=True)


# void elements never close, so they must not go on the open-element stack
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
        'link', 'meta', 'param', 'source', 'track', 'wbr'}


class Collector(HTMLParser):
    """Pull the inner HTML of every element carrying data-i18n, including nesting."""

    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.rows = []
        self.stack = []          # open elements: (tag, key_or_None)
        self.capture = []        # active captures: [key, depth, buffer]
        self.section = 'page'

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ('section', 'header', 'footer') and (a.get('id') or a.get('class')):
            self.section = a.get('id') or a.get('class', '').split(' ')[0]
        if 'cover' in (a.get('class') or ''):
            self.section = 'cover'

        raw = self.get_starttag_text()
        for c in self.capture:
            c[2].append(raw)

        if tag in VOID:
            return

        key = a.get('data-i18n')
        if key is not None:
            self.capture.append([key, len(self.stack), []])
        self.stack.append((tag, key))

    def handle_startendtag(self, tag, attrs):
        raw = self.get_starttag_text()
        for c in self.capture:
            c[2].append(raw)

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if self.stack:
            _, key = self.stack.pop()
        else:
            key = None
        done = [c for c in self.capture if c[1] == len(self.stack)]
        for c in done:
            self.rows.append((c[0], self.section, ''.join(c[2]).strip()))
            self.capture.remove(c)
        for c in self.capture:
            c[2].append('</%s>' % tag)

    def handle_data(self, data):
        for c in self.capture:
            c[2].append(data)

    def handle_entityref(self, name):
        for c in self.capture:
            c[2].append('&%s;' % name)

    def handle_charref(self, name):
        for c in self.capture:
            c[2].append('&#%s;' % name)


html = io.open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
p = Collector()
p.feed(html)

rows = []
seen = set()
for key, section, text in p.rows:
    if key in seen:
        continue
    seen.add(key)
    text = re.sub(r'\s+', ' ', text).strip()
    rows.append({'key': key, 'where': section, 'en': text, 'source': 'index.html'})

# Strings that live in the script rather than the markup. These are NOT wired
# to the translation system yet - see the README.
rows += [
    {'key': 'js.sending', 'where': 'form', 'source': 'site.js (not yet wired)',
     'en': 'Sending…'},
    {'key': 'js.error', 'where': 'form', 'source': 'site.js (not yet wired)',
     'en': 'Sorry, something went wrong. Please try again.'},
    {'key': 'js.thanks.yes.h', 'where': 'form', 'source': 'site.js (not yet wired)',
     'en': 'We got it! <span class="heart">♥</span>'},
    {'key': 'js.thanks.yes.p', 'where': 'form', 'source': 'site.js (not yet wired)',
     'en': 'Thank you. We can’t wait to celebrate with you.'},
    {'key': 'js.thanks.no.h', 'where': 'form', 'source': 'site.js (not yet wired)',
     'en': 'We’ll miss you!'},
    {'key': 'js.thanks.no.p', 'where': 'form', 'source': 'site.js (not yet wired)',
     'en': 'Thank you for letting us know.'},
]

# CONFIG values that appear on the page and read as English.
rows += [
    {'key': 'cfg.weddingDateUpper', 'where': 'hero', 'source': 'site.js CONFIG (not yet wired)',
     'en': 'OCTOBER 24, 2026'},
    {'key': 'cfg.locationUpper', 'where': 'hero', 'source': 'site.js CONFIG (not yet wired)',
     'en': 'DILIJAN, ARMENIA'},
    {'key': 'cfg.location', 'where': 'details', 'source': 'site.js CONFIG (not yet wired)',
     'en': 'Dilijan, Armenia'},
    {'key': 'cfg.weddingDate', 'where': 'general', 'source': 'site.js CONFIG (not yet wired)',
     'en': 'October 24, 2026'},
    {'key': 'cfg.coupleName', 'where': 'invitation, closing', 'source': 'index.html',
     'en': 'Gohar &amp; Roman'},
    {'key': 'stat.daysPrefix', 'where': 'banner', 'source': 'site.js (blank in English)',
     'en': ''},
    {'key': 'stat.guestsPrefix', 'where': 'banner', 'source': 'site.js (blank in English)',
     'en': ''},
    {'key': 'stat.days.one', 'where': 'banner', 'source': 'site.js (plural form)',
     'en': 'day to go'},
    {'key': 'stat.days.few', 'where': 'banner', 'source': 'site.js (Russian only)',
     'en': 'days to go'},
    {'key': 'stat.days.many', 'where': 'banner', 'source': 'site.js (Russian only)',
     'en': 'days to go'},
    {'key': 'stat.days.other', 'where': 'banner', 'source': 'site.js (plural form)',
     'en': 'days to go'},
    {'key': 'stat.guests.one', 'where': 'banner', 'source': 'site.js (plural form)',
     'en': 'guest registered'},
    {'key': 'stat.guests.few', 'where': 'banner', 'source': 'site.js (Russian only)',
     'en': 'guests registered'},
    {'key': 'stat.guests.many', 'where': 'banner', 'source': 'site.js (Russian only)',
     'en': 'guests registered'},
    {'key': 'stat.guests.other', 'where': 'banner', 'source': 'site.js (plural form)',
     'en': 'guests registered'},
    {'key': 'stat.today', 'where': 'banner', 'source': 'site.js',
     'en': 'Today!'},
    {'key': 'cfg.pageTitle', 'where': 'browser tab', 'source': 'index.html <title>',
     'en': 'Gohar &amp; Roman \u2014 24 \u00b7 10 \u00b7 2026'},
]

# Once a key is tagged in the markup the extractor finds it, so drop any
# manual entry that duplicates it - the extracted row is the accurate one.
deduped = []
for r in rows:
    if r['key'] in seen and r['source'] != 'index.html':
        continue
    deduped.append(r)
rows = deduped

csv_path = os.path.join(OUT, 'translations.csv')
# utf-8-sig: Excel needs the BOM or it mangles Armenian and Cyrillic
with io.open(csv_path, 'w', encoding='utf-8-sig', newline='') as fh:
    w = csv.writer(fh)
    w.writerow(['Key', 'Section', 'English (do not edit)',
                'Armenian (հայերեն)', 'Russian (русский)',
                'Has formatting?', 'Where it comes from'])
    for r in rows:
        has_html = 'YES - keep the tags' if '<' in r['en'] else ''
        w.writerow([r['key'], r['where'], r['en'], '', '', has_html, r['source']])

readme = """HOW TO FILL IN THE TRANSLATIONS
===============================

Open translations.csv in Excel or Google Sheets. It is saved as UTF-8 with a
BOM, so Armenian and Cyrillic will display correctly in Excel.

Fill in the two empty columns:

  "Armenian (հայերեն)"   and   "Russian (русский)"

Leave the "English (do not edit)" column alone - it is what the site falls back
to for anything left blank, so a half-finished file is safe to hand back.

THE ONLY RULE THAT MATTERS
--------------------------
Some rows have "YES - keep the tags" in the "Has formatting?" column. Those
strings contain HTML, and the tags have to survive translation. Translate only
the words between the tags.

  English:  The hotel offers a <strong>spa, indoor pool</strong> - all on site.
  Russian:  Отель предлагает <strong>спа, крытый бассейн</strong> - всё на месте.

Keep every < and > exactly as it appears. If a row contains something like
<span data-var="extraNightsDiscount">15%</span>, leave that whole span alone -
the site fills the number in automatically.

WHAT IS NOT WIRED UP YET
------------------------
Rows whose last column says "not yet wired" are real text on the site, but the
page cannot yet swap them per language. Translate them anyway; Claude will
connect them, and then they will work like the rest.

NAMES AND BRANDS
----------------
"Gohar & Roman", "G & R" and "DiliJazz" are left as they are. If you would
rather they were written in Armenian or Russian script, say so and they can be
made translatable too.

WHEN YOU ARE DONE
-----------------
Hand the file back and Claude will load it into the site and check both
languages at mobile and desktop sizes before anything is published.
"""
io.open(os.path.join(OUT, 'README.txt'), 'w', encoding='utf-8').write(readme)

with_html = sum(1 for r in rows if '<' in r['en'])
not_wired = sum(1 for r in rows if 'not yet wired' in r['source'])
print('  %d strings written to translations/translations.csv' % len(rows))
print('  %d contain formatting that must be preserved' % with_html)
print('  %d are not wired to the language switcher yet' % not_wired)
