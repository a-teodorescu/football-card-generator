# Football Card Generator

React + Vite + TypeScript demo pentru carduri de jucători generate procedural, fără AI și fără poze reale.

## Versiune

v1.2

## Ce include

- grid cu 12 jucători generați procedural;
- buton pentru generarea unui alt lot demo;
- card redesign mai apropiat de un joc de football manager;
- avataruri pixel-art mai variate;
- panou de lot cu club, sezon, average OVR, average POT și top talent;
- seed determinist pentru avataruri;
- compatibil Netlify.

## Local

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

Nu urca în GitHub:

- `node_modules`
- `dist`
- arhiva `.zip`
