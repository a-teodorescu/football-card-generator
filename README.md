# Football Card Generator — v2.0 Avatar Cohesion Rebuild

Proiect React + Vite + TypeScript, pregătit pentru GitHub + Netlify.

## Ce este nou în v2.0

- Avatarurile sunt refăcute pe un template comun de cap.
- Ochii, nasul, gura, barba și părul folosesc zone fixe, ca să nu mai pară că „plutesc”.
- Părul este ancorat pe scalp, nu lipit ca sticker.
- Barba urmărește maxilarul.
- Gâtul și tricoul sunt redesenate ca să lege capul de corp.
- Mai puține combinații haotice, mai mult control vizual.
- Generatorul rămâne procedural: fără AI, fără poze reale, fără cost per card.

## Netlify

Setările sunt în `netlify.toml`:

```txt
Build command: npm run build
Publish directory: dist
```

## Local

```bash
npm install
npm run dev
```

## Important

Nu urca în GitHub:

```txt
node_modules
dist
package-lock.json
```
