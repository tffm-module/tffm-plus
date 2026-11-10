# TFFM+ Website

🌐 **Live Website:** [https://tffm-module.github.io/tffm-plus.github.io/](https://tffm-module.github.io/tffm-plus.github.io/)

This is the official website for the BMVC 2026 paper **"TFFM+: Topology-Reliable Retinal Artery–Vein Segmentation via Spatially-Aware Differentiable Graph Pruning"**.

It extends the original [TFFM](https://tffm-module.github.io/) (WACV Workshops 2026) project page.

## Updating links

Paper, arXiv, code and presentation links live in the `LINKS` object at the top of
`src/components/heading-section.tsx`. Buttons with an empty URL stay hidden, so fill them in as
they become available. Update the BibTeX in `src/components/citation-section.tsx` once the
proceedings entry is out.

## Tech Stack

- **React** with **TypeScript**
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **gh-pages** for deployment to GitHub Pages

## Local Development

```bash
npm install      # install dependencies
npm run dev      # run the dev server
npm run build    # production build
npm run deploy   # build and push dist/ to the gh-pages branch
```

## 📄 License

See the LICENSE file for details.
