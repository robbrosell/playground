# Standing With Her

A multi-page educational and peer-support site for husbands of adult clergy sexual abuse (ACSA) survivors.

## Pages

- `index.html` — Home
- `just-found-out.html` — I Just Found Out (including ACSA prevalence data)
- `your-marriage.html` — Your Marriage
- `for-your-wife.html` — For Your Wife (links to Restored Voices Collective)
- `changing-the-law.html` — Changing the Law (state legislative landscape)
- `resources.html` — A Husband's Reading Library
- `community.html` — Find Community (includes a contact-form prototype)
- `404.html` — Not-found page

## Running locally

This is a static site with no build step. Open `index.html` directly in a browser, or serve the folder:

```bash
npx serve standing-with-her
```

## Deployment

Pushing changes to this folder on the repository's default branch runs
`.github/workflows/deploy-standing-with-her.yml`, which publishes the
contents of `standing-with-her/` to GitHub Pages. One-time setup required
in the GitHub repo: **Settings → Pages → Build and deployment → Source:
GitHub Actions**.

Once enabled, the site is published at:
`https://robbrosell.github.io/playground/standing-with-her/`

## Notes

- The community contact form (`community.html`) is a prototype. It does
  not transmit or store information until it is connected to a secure
  form backend (e.g. Formspree, Netlify Forms, or a small serverless
  endpoint).
- `og:url`, `canonical`, `sitemap.xml`, and `robots.txt` assume the site
  is published at the GitHub Pages URL above. Update them if the site is
  hosted elsewhere or under a custom domain.
- This site provides educational and peer-support information only. It
  is not a substitute for professional medical, mental-health, legal, or
  crisis services.

## Style/structure improvements made when importing this site

- Converted every scattered inline `style="…"` attribute into reusable
  CSS classes (`mt-sm`/`mt-md`/`mt-lg`/`mt-xl`, `divider-soft`,
  `divider-navy`, `callout-invert`, `form-on-dark`, `lib-heading`) for
  consistency and easier maintenance.
- Added a working mobile navigation menu (hamburger toggle) — the nav
  previously just wrapped into a tall stacked list on small screens.
- Loaded the `Inter` font referenced throughout the CSS (it previously
  fell back to the OS default font on nearly every device).
- Added hover/focus transitions on buttons, cards, nav links, and form
  fields, plus visible `:focus-visible` outlines for keyboard users.
- Added a 2-column tablet breakpoint for grids/stats so they don't jump
  straight from 3 (or 4) columns to 1.
- Added `prefers-reduced-motion` support.
- Added favicon, theme-color, Open Graph/Twitter meta tags, canonical
  links, `robots.txt`, and `sitemap.xml`.
- Added a styled `404.html`.
- Centralized the nav-toggle and contact-form JavaScript into a single
  `main.js` shared by every page instead of an inline `<script>`.
