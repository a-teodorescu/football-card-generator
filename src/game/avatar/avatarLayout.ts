export const AVATAR_SIZE = 96;

export const layout = {
  head: {
    centerX: 48,
    top: 17,
    eyeY: 36,
    browY: 32,
    noseY: 42,
    mouthY: 54,
    jawY: 58,
    chinY: 65,
    bottom: 68,
  },
  ears: {
    y: 36,
    height: 14,
  },
  neck: {
    x: 39,
    y: 65,
    width: 18,
    height: 11,
  },
  shirt: {
    y: 73,
  },
};

export const headRows = {
  oval: [
    { x: 36, y: 17, w: 24, h: 5 },
    { x: 31, y: 22, w: 34, h: 7 },
    { x: 28, y: 29, w: 40, h: 22 },
    { x: 31, y: 51, w: 34, h: 10 },
    { x: 38, y: 61, w: 20, h: 7 },
  ],
  square: [
    { x: 34, y: 17, w: 28, h: 5 },
    { x: 30, y: 22, w: 36, h: 8 },
    { x: 28, y: 30, w: 40, h: 25 },
    { x: 30, y: 55, w: 36, h: 8 },
    { x: 36, y: 63, w: 24, h: 5 },
  ],
  round: [
    { x: 37, y: 17, w: 22, h: 5 },
    { x: 31, y: 22, w: 34, h: 8 },
    { x: 27, y: 30, w: 42, h: 21 },
    { x: 30, y: 51, w: 36, h: 9 },
    { x: 39, y: 60, w: 18, h: 7 },
  ],
} as const;
