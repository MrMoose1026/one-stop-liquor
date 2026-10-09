# One Stop Liquor

A three-page store website built with HTML, CSS and JavaScript, with store and inventory photos taken inside and outside the store. The October 9, 2026 update adds 23 photographs, grouped by category on the selection page.

## Files

- `index.html` — Homepage.
- `selection.html` — Expanded gallery of wine, bourbon, tequila, vodka, rum, Scotch, beer, mixers and counter displays.
- `location.html` — New location, photos, hours and contact section.
- `styles.css` — Shared styling and responsive layouts.
- `script.js` — Mobile menu and map/contact behavior.
- `store-details.js` — Address and phone configuration.
- `sitemap.xml` — The three canonical page URLs for search engines.
- `robots.txt` — Allows crawling and points search engines to the sitemap.
- `_redirects` — Netlify redirects from the old Netlify domain to the custom domain and from `/index.html` to `/`.
- `images/` — Optimized WebP store photos, with responsive versions for phones and gallery cards. The homepage photos and remaining original photos used on the other pages include 480px, 768px and (when smaller than the original) 1152px versions.

## Open and edit

Download or clone this repository, then open it with VS Code Live Server. No build step or project dependencies are required. Serve the repository root so homepage links to `/` work. Keep the files and `images` folder together.

## Update the location details

The confirmed address is **7940 NW 23rd St, Bethany, OK 73008** and the phone number is **(405) 470-8282**. Posted hours are **Monday–Saturday 10am–9pm; Sunday 12pm–6pm**.

To change the address, phone or hours, update `store-details.js` where applicable, the visible contact information in all three HTML pages, and the `application/ld+json` business data in each page. Also check page descriptions, social metadata, the availability phone link in `selection.html`, and map/directions links in `location.html`. Keep the posted hours and structured hours consistent. The static HTML makes business details available before JavaScript runs or when JavaScript is disabled.

## Update photos

Photo filenames include the store, Bethany and the subject, for example `one-stop-liquor-bethany-bourbon-and-whiskey.webp`. Alt text describes the actual photo and identifies the store location. Keep descriptions natural and avoid lists of search keywords.

Use descriptive filenames in `images/`, then update the image `src`, `srcset`, dimensions and alt text in the relevant HTML page. Files ending in `-480.webp`, `-768.webp` or `-1152.webp` are smaller versions of the same photo. The browser uses `srcset`, `sizes` and screen pixel density to choose a suitable file. Keep width descriptors equal to the actual file width, and export each variant directly from the original photo rather than repeatedly recompressing a smaller version.

The `sizes` values follow the shared stylesheet's page margins and gallery columns, including its phone and tablet breakpoints. Update them alongside future layout changes. Hero photos retain `fetchpriority="high"`; photos below the first section load lazily. The shared stylesheet stays render-blocking so the page has its complete styling on first display.

A small script before the stylesheet marks JavaScript support before the first paint. This keeps the mobile navigation collapsed and reserves its Menu button immediately, avoiding a page jump when the deferred menu code starts. Without JavaScript, the navigation links remain visible; if the external script fails to load, its error handler restores those links.

When renaming a photo, update every responsive variant, HTML reference, social image URL, structured image URL and image sitemap entry together. Keep a permanent redirect in `_redirects` from each previous image path to its new path.

Product photos show selection and prices at the time they were taken, not live inventory or current pricing.

## Search and sharing

The preferred domain is **https://onestopliquorok.com/**. Each page includes a unique title and description, an absolute canonical URL, social sharing metadata, and static `LiquorStore` structured data. The homepage also identifies the site's name with `WebSite` structured data. The address, phone and posted hours are visible on every page.

The sitemap lists the homepage, selection page and location page, plus the full-size photos embedded on each page using the image sitemap extension. If a page is added or its canonical URL changes, update `sitemap.xml`, its canonical tag, sharing URL and internal links together. Set `lastmod` to the date of a meaningful change to that page; do not refresh it merely because the site is deployed.

After deployment, check that `/robots.txt` and `/sitemap.xml` return successfully, then submit **https://onestopliquorok.com/sitemap.xml** in the verified Google Search Console property. Validate the business markup with Google's Rich Results Test. The sitemap is also advertised in `robots.txt`; adding it does not guarantee indexing or a particular ranking.

References: [Google's sitemap guide](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business), and [Netlify redirects](https://docs.netlify.com/manage/routing/redirects/redirect-options/).

## Friday photo updates

The October 9 batch uses date-stamped descriptive filenames so returning visitors receive the new pictures. All 23 supplied photos have optimized WebP versions at 480px, 768px and their original width, exported directly from the source JPEG. The selection page displays the full portrait shelf photos and offers category links; beer and counter photos remain alongside the new images.

For the next batch, update the relevant HTML images, alt text, responsive variants, sharing metadata and image sitemap. Update the visible “Latest shelf photos” date when new shelf photographs are added. Keep each sitemap lastmod tied to a meaningful page change. Use a new date in filenames for replacement photos; preserve older files and existing redirects while they may still be referenced.
