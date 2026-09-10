# One Stop Liquor

A three-page store website built with HTML, CSS and JavaScript, with 20 photos taken inside and outside the store.

## Files

- `index.html` — Homepage.
- `selection.html` — Expanded gallery of wine, bourbon, tequila, vodka, rum, Scotch, beer, mixers and counter displays.
- `location.html` — New location, photos, hours and contact section.
- `styles.css` — Shared styling and responsive layouts.
- `script.js` — Mobile menu and map/contact behavior.
- `store-details.js` — Address and phone configuration.
- `images/` — Optimized WebP store photos. The twelve newer photos also have smaller `-768.webp` versions for phones and gallery cards.

## Open and edit

Download or clone this repository, then open `index.html` in a browser. No build tools or dependency installation are required. Keep the files and `images` folder together.

## Update the location details

The confirmed address is **7940 NW 23rd St, Bethany, OK 73008** and the phone number is **(405) 470-8282**. Posted hours are **Monday–Saturday 10am–9pm; Sunday 12pm–6pm**.

To change the address or phone, update `store-details.js` and the matching HTML in `location.html`; also update the availability phone link in `selection.html`. Keeping the HTML in sync makes the contact information, map and directions available before JavaScript runs or when JavaScript is disabled.

## Update photos

Use descriptive filenames in `images/`, then update the image `src`, `srcset`, dimensions and alt text in the relevant HTML page. The `-768.webp` file is the smaller version of the same photo, selected by the browser for smaller displays. Photos below the first section load lazily to keep the initial page light.

Product photos show selection and prices at the time they were taken, not live inventory or current pricing.
