# IDEA Lab website

Static site for the Intergenerational Decisions and Effective Action (IDEA) Lab at Arizona State University. No build step: plain HTML, CSS and JavaScript, served by GitHub Pages.

## Updating content

All content lives in `data/`. Edit the JSON file (directly on GitHub works) and the site updates on the next page load.

| To change | Edit |
| --- | --- |
| Publications | `data/publications.json` (newest first; `topics` drives the theme filters, `mentee` and `media` drive the badges) |
| News | `data/news.json` (newest first; `cat` is one of `publication`, `award`, `outreach`, `presentation`, `lab`) |
| People | `data/people.json` (set `"alumni": true` and fill `now` when someone moves on) |
| Lab Life | `data/activities.json` (photos go in `assets/img/`) |

Page text (headlines, the About section, links) is in the `.html` files. Styles are in `assets/css/site.css`, behavior in `assets/js/site.js`.

## Previewing locally

```bash
python -m http.server 8771
```

Then open http://localhost:8771.
