# -*- coding: utf-8 -*-
"""Load translations/translations.csv into the site.

Three jobs:
  1. write the Armenian and Russian dictionaries into assets/js/site.js
  2. give site.js a t() helper so strings built in JavaScript can be translated
  3. tag the four CONFIG-driven spans in index.html with data-i18n so the
     language switcher reaches them

applyVariables() runs before applyLanguage() at boot, so the English master
captured for those spans is already the CONFIG-substituted text. That makes
English the correct fallback without any special casing.
"""
import csv
import io
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV = os.path.join(ROOT, 'translations', 'translations.csv')
JS = os.path.join(ROOT, 'assets', 'js', 'site.js')
HTML = os.path.join(ROOT, 'index.html')

rows = list(csv.reader(io.open(CSV, encoding='utf-8-sig')))[1:]
hy = {r[0]: r[3] for r in rows if r[3].strip()}
ru = {r[0]: r[4] for r in rows if r[4].strip()}


def dump(d):
    """Pretty JS object literal, stable order, two-space indent."""
    lines = []
    for k in sorted(d):
        lines.append("    %s: %s," % (json.dumps(k), json.dumps(d[k], ensure_ascii=False)))
    return "\n".join(lines)


js = io.open(JS, encoding='utf-8').read()

# ---- 1. the dictionaries -------------------------------------------------
old_dict = re.search(
    r"const I18N = \{.*?\n\};", js, re.S)
assert old_dict, 'I18N block not found'
new_dict = (
    "const I18N = {\n"
    "  en: {},   // master copy lives in the HTML\n"
    "  am: {\n" + dump(hy) + "\n  },\n"
    "  ru: {\n" + dump(ru) + "\n  }\n"
    "};"
)
js = js[:old_dict.start()] + new_dict + js[old_dict.end():]

# ---- 2. a translation helper for strings built in JavaScript -------------
if 'function t(' not in js:
    anchor = "function applyLanguage(lang) {"
    assert js.count(anchor) == 1
    helper = (
        "let currentLang = 'en';\n\n"
        "/* Look up a string built in JavaScript rather than in the markup.\n"
        "   Falls back to the English passed in, so a missing key is harmless. */\n"
        "function t(key, fallback) {\n"
        "  const dict = I18N[currentLang] || {};\n"
        "  return (key in dict && dict[key]) ? dict[key] : fallback;\n"
        "}\n\n"
    )
    js = js.replace(anchor, helper + anchor)

js = js.replace(
    "  if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';",
    "  if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';\n  currentLang = lang;",
    1)

# ---- 3. the six strings that were hardcoded ------------------------------
swaps = [
    ("submitBtn.textContent = 'Sending…';",
     "submitBtn.textContent = t('js.sending', 'Sending…');"),
    ("statusEl.textContent = 'Sorry, something went wrong. Please try again.';",
     "statusEl.textContent = t('js.error', 'Sorry, something went wrong. Please try again.');"),
    ("""  const heading = coming ? 'We got it! <span class="heart">♥</span>' : 'We’ll miss you!';""",
     """  const heading = coming
    ? t('js.thanks.yes.h', 'We got it! <span class="heart">♥</span>')
    : t('js.thanks.no.h', 'We’ll miss you!');"""),
    ("""  const body = coming
    ? 'Thank you. We can’t wait to celebrate with you.'
    : 'Thank you for letting us know.';""",
     """  const body = coming
    ? t('js.thanks.yes.p', 'Thank you. We can’t wait to celebrate with you.')
    : t('js.thanks.no.p', 'Thank you for letting us know.');"""),
]
for old, new in swaps:
    assert js.count(old) == 1, ('js swap not found', old[:50])
    js = js.replace(old, new)

io.open(JS, 'w', encoding='utf-8', newline='').write(js)

# ---- 4. tag the CONFIG-driven spans in the markup ------------------------
html = io.open(HTML, encoding='utf-8').read()
tags = [
    ('<span data-var="weddingDateUpper">', '<span data-var="weddingDateUpper" data-i18n="cfg.weddingDateUpper">'),
    ('<span data-var="locationUpper">', '<span data-var="locationUpper" data-i18n="cfg.locationUpper">'),
    ('<span class="venue__city" data-var="location">', '<span class="venue__city" data-var="location" data-i18n="cfg.location">'),
]
tagged = 0
for old, new in tags:
    if old in html and 'data-i18n' not in old:
        n = html.count(old)
        html = html.replace(old, new)
        tagged += n
io.open(HTML, 'w', encoding='utf-8', newline='').write(html)

print('  Armenian entries: %d' % len(hy))
print('  Russian entries:  %d' % len(ru))
print('  JS strings wired: %d' % len(swaps))
print('  CONFIG spans tagged: %d' % tagged)
