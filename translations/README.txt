HOW TO FILL IN THE TRANSLATIONS
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
