# WCS Nottingham Website

The website for Women in Computer Science (WCS) at the University of Nottingham. The layout and styles are in Svelte components.

## How it's made

- [SvelteKit](https://svelte.dev) : built as a static site
- [GSAP](https://gsap.com) : for the animations (the sticker board and the cat)

## Update the website

You don't need to touch any code to change what the site says. Edit these files in `src/lib/content/`:

| File | What's in it |
| --- | --- |
| `site.js` | All the words and links: hero, headings, stickers, footer, nav, Ada's lines |
| `events.json` | Upcoming events |
| `gallery.json` | Photos from past events |
| `committee.json` | Committee cards |

- In `site.js`, `*word*` highlights a word and `[text](https://link)` makes a link. Set any text to `''` to hide it.
- **Events:** copy a block in `events.json` and change the details. `date` is `YYYY-MM-DD`. Add `endDate` for an event that runs over several days. Leave `link` as `""` and no button shows. Past events hide themselves.
- **Gallery:** add one block per photo, and put the photos in `static/gallery/` (keep each one under about 300 KB).
- **Committee:** add one block per person, and put the photos in `static/committee/`. A field left as `null` shows a placeholder or is hidden.

## Project structure

```
.
├── src/
│   ├── app.html
│   ├── routes/+page.svelte
│   └── lib/
│       ├── content/
│       ├── components/
│       │   └── sections/
│       ├── styles/   
│       └── assets/cat/
└── static/
```

## Run locally

1. Clone the repository: 
```
git clone https://github.com/UoN-Women-in-Computer-Science/wcs-website-uon.git
```

2. Install dependencies:
```
`npm install
```

3. Start the development server: 
```
npm run dev -- --open
```

`npm run build` writes the finished site to `build/`. `npm run preview` serves that folder so you can check it before deploying.

## Contributing

Contributions are welcome, from fixing a typo to adding a new section. If you have any questions, ask on the [Discord](https://discord.com/invite/QvUxauXKhR).

## Society links

- [Join WCS](https://su.nottingham.ac.uk/activities/view/women-in-comp-sci)
- [Instagram](https://www.instagram.com/uonwcs/)
- [Discord](https://discord.com/invite/QvUxauXKhR)
- [Linktree](https://linktr.ee/nottinghamwcs)

## Credits

| Asset | By | Licence |
| --- | --- | --- |
| [2D Pixel Art Cat Sprites](https://elthen.itch.io/2d-pixel-art-cat-sprites) | Elthen | [Elthen's Common Sense License 1.0](src/lib/assets/cat/LICENSE.txt). Kept in this repo with Elthen's permission. Please don't reuse it from here |
| [Shantell Sans](https://fonts.google.com/specimen/Shantell+Sans) | Shantell Martin, Arrow Type | SIL Open Font License |
| [Atkinson Hyperlegible](https://fonts.google.com/specimen/Atkinson+Hyperlegible) | Braille Institute | SIL Open Font License |
| [Reenie Beanie](https://fonts.google.com/specimen/Reenie+Beanie) | James Grieshaber | SIL Open Font License |
| [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | JetBrains | SIL Open Font License |
| [VT323](https://fonts.google.com/specimen/VT323) | Peter Hull | SIL Open Font License |

The idea for the cat came from [mu.social](https://mu.social).

