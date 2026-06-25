# Football Card Generator

Demo React + Vite + TypeScript pentru generarea procedurală a cardurilor de jucători.

## Ce include v1.1

- 12 jucători generați procedural într-un grid.
- Buton **Generează alt lot** pentru a vedea rapid alte combinații.
- Avataruri SVG pixel-art generate local, fără AI și fără poze reale.
- Seed determinist: același `visualSeed` produce mereu același avatar.
- Config Netlify inclusă.

## Rulare locală

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Netlify

Setările sunt deja în `netlify.toml`:

```txt
Build command: npm run build
Publish directory: dist
```

Repository-ul nu trebuie să conțină `node_modules`, `dist` sau `package-lock.json`.
