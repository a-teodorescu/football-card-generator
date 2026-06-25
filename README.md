# Football Card Generator

Proiect React + Vite + TypeScript pentru testarea unui generator procedural de carduri pixel-art pentru jucători de fotbal.

## Ce conține

```txt
src/game/avatar/
  avatarTypes.ts
  avatarDNA.ts
  avatarPalettes.ts
  PlayerAvatar.tsx
  PlayerCardDemo.tsx
```

Logica principală:

```txt
player id / visualSeed
  ↓
generateAvatarDNA(seed)
  ↓
alegere deterministă: piele, păr, ochi, barbă, tricou, fundal
  ↓
randare SVG pixel-art
  ↓
card jucător
```

Nu folosește AI, poze reale sau internet pentru generarea cardurilor.

## Rulează local

```bash
npm install
npm run dev
```

Apoi deschide linkul afișat în terminal, de obicei:

```txt
http://localhost:5173
```

## Build local

```bash
npm run build
```

Folderul generat pentru publicare este:

```txt
dist
```

## Deploy pe Netlify

### Varianta recomandată: GitHub + Netlify

1. Creează un repository nou pe GitHub.
2. Urcă toate fișierele din acest proiect în repository.
3. În Netlify alege **Add new site → Import an existing project**.
4. Conectează repository-ul GitHub.
5. Setări build:

```txt
Build command: npm run build
Publish directory: dist
```

În proiect există deja `netlify.toml`, deci Netlify ar trebui să detecteze automat aceste setări.

### Varianta rapidă: manual deploy

1. Rulează local:

```bash
npm install
npm run build
```

2. Urcă folderul `dist` în Netlify la deploy manual.

## Ce modifici ca să testezi avataruri diferite

În `src/App.tsx`, schimbă `id`, `name` sau `nationality` la un jucător.

Exemplu:

```tsx
id: 'player_9999'
```

Dacă schimbi seed-ul, se schimbă fața. Dacă revii la seed-ul vechi, fața revine identic.
