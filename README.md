# ABPI — website improvement prototypes (V2)

Five clickable prototypes for improvements to abpi.org.uk, prepared by ClerksWell following the
phase 1 review (30 September 2026). The ABPI design layer (aubergine, plum and magenta, Poppins, square
corners, split heroes, the box motif) lives entirely in `src/css/theme.css`; remove that file and
`src/js/photos.js` to get the greyscale prototypes back.

Photography is the ABPI's own, loaded directly from abpi.org.uk by `src/js/photos.js` (the mapping of
images to page heads and placeholders lives there). Where an image can't load, a brand-colour illustration
shows instead. Photography © ABPI; the repository and site are public, so treat them accordingly.

## View
Live: https://hrhlescargotleo.github.io/ABPI-Roadmap/

Or open `docs/index.html` in a browser. No server or install needed.

GitHub Pages is set to publish from the `docs/` folder on `main`
(Settings → Pages → Deploy from a branch → `main` / `/docs`).

## Prototypes
1. Join the ABPI — `pages/join.html` (membership checker), plus the enquiry at `pages/join-enquiry.html` (opens with a category via `?type=full|research|general`)
2. Members — `pages/members.html` (directory), plus `pages/member-area.html` (sign-in is simulated; any details work)
3. Industry in numbers — `pages/data.html` (opens a topic via `?topic=economy|rd|trials|access|people`)
4. Publications — `pages/publications.html` (`?q=` and `?theme=` are kept in the address), plus the topic hub `pages/topic.html`
5. Stay informed — `pages/stay-informed.html`, plus `pages/media.html` and `pages/events.html`

Module library: `modules/library.html`. Requirements: `requirements/requirements.md` (R-numbers map to idea numbers on the Opportunities page).

## Build
```
node build-includes.js && node validate.js
```
Edit files in `src/`; `docs/` is generated (commit it, as GitHub Pages serves it). The prototype navigator (top bar with the Notes switch) and the previous/next footer live in `src/includes/`.
Sample data is in `src/js/data.js`: member names, statistics, publication and event titles are real; therapy areas, sites, affiliates, prices, places and anything marked "sample" are not.

## Status
V2, designed prototypes for internal review (V1 was greyscale). The ABPI's own header and footer are replaced by a prototype navigator. Notes are off by default; switch "Notes on" in the top bar to show what each prototype proposes and why, plus in-page annotations (yellow for behaviour, red for open questions).
