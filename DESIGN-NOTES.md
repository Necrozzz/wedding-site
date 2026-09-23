# Wedding website design handoff

The visuals follow the supplied reference: ivory background, fine serif typography, rust accents, a forest language-selection cover, and the approved regenerated hero image. On every screen size, the language cover appears first and selecting a language dismisses it to reveal the homepage, exactly as in the uploaded site's original behavior. All monograms are G & R.

The six menu destinations now use one consistent hero-style composition: each chapter blends an existing Dilijan, DiliJazz, or couple photograph into an ivory editorial surface, with titles, text, offers, and forms layered into the same scene. Desktop compositions use aligned text and image fields; mobile compositions stack the same material without detaching the photographs from their chapters. The Dilijan landscape remains a full-width natural transition, so page-level divider rules are unnecessary. Scroll snapping applies only to the hero and the six menu destinations; photographs and the landscape banner do not capture the scroll. The forest cover preserves the source image proportions at every viewport size. The Dress photograph uses its original 1500 × 1000 landscape ratio and is displayed without a portrait crop.

The hero has been restored to the approved model-screen composition. The invitation, hotel description, Dress, and closing copy do not use rectangular cards. The invitation and Dress photographs remain positioned to keep both people visible and separate from the copy. The DiliJazz pointer photograph uses softly faded edges. The hotel exterior now uses `dilijazz-hotel-clean.png`, an object-removal edit that removes only the duplicate DiliJazz logo and saxophone from the sky. The final portrait uses `object-fit: contain` over a softly blurred background derived from the same photograph, with all four edges feathered so both faces remain visible and the separate evening visual is gone. The couple photographs themselves were not regenerated or retouched.

Scope: visuals and layout only. All guest-facing text matches the original uploaded HTML. `assets/js/site.js` has been restored byte for byte from the original upload. Preserve the original logic, text, wedding configuration, translations, form behavior, and backend in subsequent work.

## Current photography version

The user subsequently requested a fully regenerated composition, asking to preserve the faces as closely as possible. The active hero is now `assets/img/hero-regenerated-v2.webp`, generated from the original `hero-couple.jpg` with the supplied mockup used only for layout/background. This is an AI-regenerated image: facial details are not guaranteed identical. No further regeneration or facial changes should be made without a request. All original photographs remain unchanged.

The previous version used the original photo with `couple-silhouette.svg` over `evening-background.webp`. Those assets are retained for comparison or restoration. The notes below describe that earlier version.

## Original-photo version

Never change faces. Use the original photographs in `assets/img/`. The hero directly loads the existing, unmodified `hero-couple.jpg`. An SVG display mask follows the couple's silhouette to hide the old background. No filters, retouching, face regeneration, or generated couple photograph are used. A separate people-free evening background recreates the reference composition.

## Changes

- `index.html`: opening layout, monogram presentation, original hero photo, local font stylesheet.
- `assets/css/style.css`: responsive opening layout, typography, colors and photo placement.
- `assets/css/fonts.css` and `assets/fonts/`: locally served Cormorant Garamond and Inter with their licenses.
- `assets/js/site.js`: identical to the uploaded original. Language selection dismisses the full-screen cover; navigation, RSVP behavior, and wedding configuration are unchanged.
- `assets/img/forest-reference.webp`: generated forest background. Original image files are unchanged.
- `assets/img/evening-background.webp`: generated evening background containing no people.
- `assets/img/couple-silhouette.svg`: a display-only outline around the original photo, preserving the original facial pixels.

The cutout outline has been refined around the hair, ears, collar, and shoulders. A 1.6px feather is applied only to the SVG alpha edge, not to the photograph. Facial interiors remain fully opaque. A subtle shade on the separate evening background reduces its contrast beside the couple; no color or lighting filter is applied to their photograph.

The forest was created with the built-in image-generation tool using the supplied reference. Prompt: “Use case: precise-object-edit. Input image is the edit target. Extract/recreate ONLY the LEFT forest panel as a clean portrait 3:5 website background. Remove all initials, date, lettering, rules. Preserve the exact misty sepia pine forest mountains in the bottom 40 percent, and warm near-white ivory empty sky in upper 60 percent. Match original muted taupe/olive forest, soft fog layers and photographic texture. No text, no symbols, no border, rectangular full bleed edges. No people.”

## Verification

The evening background was created with the built-in image-generation tool. Prompt: “Create a portrait 3:4 EMPTY background plate for a wedding invitation, matching the RIGHT panel of the supplied reference. This is a BACKGROUND ONLY: remove the couple and all other people, remove ALL text, initials, buttons, heart, rules, and menu icons. Keep deep blue evening sky in top right, warm blurred city facade on right, hanging golden string lights arcing from upper center to right edge, a little leafy tree upper right. The left 42 percent is clean warm ivory (#FCFAF5), softly feathered into the evening photo. Bottom can remain blurred street bokeh, ready for a separate original couple photograph to be placed on top. No people, no faces, no UI, no lettering, no borders. Full rectangular bleed.”

Browser checks at 320, 390, 768, and 1440px: no horizontal overflow or JavaScript errors; language entry, menu, and conditional RSVP fields work. No live RSVP was submitted. The Google Apps Script backend is unchanged. Armenian and Russian translation dictionaries remain empty as they were in the supplied website.

After restoring the original flow, rechecked the 390px and 1440px language cover and homepage transition, including a reload with an existing language preference. Verified both monograms, no horizontal overflow, exact original text equality, and byte-for-byte JavaScript equality. The approved hero is `assets/img/hero-regenerated-v2.webp`; its generation prompt is saved beside it in `hero-regenerated-v2-prompt.txt`.

This is a static website. Publish the folder contents using the existing deployment workflow; no build step is required. Branch creation and publishing have not been performed.
