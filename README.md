# Football Card Generator v3.0

Generator experimental de portrete pentru jucători de fotbal în stil:

**Clean 16-bit Pixel-Art Football Manager Portrait Style**

## Ce include v3.0

- React + Vite + TypeScript
- deploy pregătit pentru Netlify
- avatar intern 48x48 px
- portrete head + shoulders
- păr compact, fără bucăți care plutesc
- barbă integrată pe maxilar
- sistem hibrid: portret bază coerent + variații controlate
- carduri mai simple, football-manager style
- fără AI la runtime
- fără poze reale
- fără cost per card

## Deploy Netlify

Setările sunt în `netlify.toml`:

```txt
Build command: npm run build
Publish directory: dist
```

## Test local

```bash
npm install
npm run dev
```

## Build local

```bash
npm run build
```

## Important

Nu urca în GitHub:

```txt
node_modules
dist
package-lock.json
```

Arhiva este pregătită fără aceste fișiere.
