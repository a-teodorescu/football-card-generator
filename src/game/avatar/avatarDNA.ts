import type { AvatarDNA, BeardStyle, FaceTemplate, HairStyle, HeadShape, ShirtStyle } from './avatarTypes';
import { BACKGROUNDS, HAIR_COLORS, SKIN_TONES } from './avatarPalettes';

function hashString(input: string): number {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createSeededRandom(seed: string): () => number {
  let state = hashString(seed) || 1;

  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(items: readonly T[], rng: () => number): T {
  return items[Math.floor(rng() * items.length)];
}

function weightedPick<T>(items: readonly { value: T; weight: number }[], rng: () => number): T {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let roll = rng() * total;

  for (const item of items) {
    roll -= item.weight;
    if (roll <= 0) return item.value;
  }

  return items[items.length - 1].value;
}

const headShapes: HeadShape[] = ['oval', 'square', 'round'];
const faceTemplates: FaceTemplate[] = ['balanced', 'focused', 'calm', 'veteran'];
const shirtStyles: ShirtStyle[] = ['plain', 'center-stripe', 'shoulder-stripes', 'horizontal-band', 'split'];

const hairByHeadShape: Record<HeadShape, HairStyle[]> = {
  oval: ['short', 'side-part', 'curly', 'messy', 'crop', 'bald'],
  square: ['short', 'side-part', 'buzz', 'crop', 'messy', 'bald'],
  round: ['short', 'curly', 'buzz', 'crop', 'side-part', 'bald'],
};

const beardWeights: { value: BeardStyle; weight: number }[] = [
  { value: 'none', weight: 34 },
  { value: 'stubble', weight: 26 },
  { value: 'moustache', weight: 16 },
  { value: 'short-beard', weight: 18 },
  { value: 'goatee', weight: 6 },
];

export function generateAvatarDNA(seed: string): AvatarDNA {
  const rng = createSeededRandom(seed);
  const headShape = pick(headShapes, rng);
  const faceTemplate = pick(faceTemplates, rng);
  const hairStyle = pick(hairByHeadShape[headShape], rng);
  const beardStyle = faceTemplate === 'veteran' ? weightedPick(beardWeights, rng) : weightedPick(beardWeights, rng);

  return {
    skinToneIndex: Math.floor(rng() * SKIN_TONES.length),
    hairColorIndex: Math.floor(rng() * HAIR_COLORS.length),
    backgroundIndex: Math.floor(rng() * BACKGROUNDS.length),
    headShape,
    faceTemplate,
    hairStyle,
    beardStyle,
    shirtStyle: pick(shirtStyles, rng),
    accessoryIndex: Math.floor(rng() * 7),
  };
}
