import type { AvatarDNA, BeardStyle, EyeStyle, FaceMood, HairStyle, PortraitFamily, ShirtStyle } from './avatarTypes';
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

const families: PortraitFamily[] = ['classic', 'wide', 'sharp', 'soft'];
const moods: FaceMood[] = ['neutral', 'focused', 'calm', 'senior'];
const eyeStyles: EyeStyle[] = ['standard', 'narrow', 'soft'];
const shirtStyles: ShirtStyle[] = ['plain', 'center-stripe', 'side-panels', 'shoulder-trim', 'split'];

const hairByFamily: Record<PortraitFamily, HairStyle[]> = {
  classic: ['short', 'side-part', 'wavy', 'crop', 'buzz'],
  wide: ['short', 'crop', 'buzz', 'curly', 'bald'],
  sharp: ['side-part', 'wavy', 'short', 'buzz', 'crop'],
  soft: ['wavy', 'curly', 'short', 'afro', 'crop'],
};

const beardWeights: { value: BeardStyle; weight: number }[] = [
  { value: 'none', weight: 46 },
  { value: 'stubble', weight: 24 },
  { value: 'moustache', weight: 10 },
  { value: 'trimmed', weight: 14 },
  { value: 'full', weight: 6 },
];

export function generateAvatarDNA(seed: string): AvatarDNA {
  const rng = createSeededRandom(seed);
  const portraitFamily = pick(families, rng);
  const faceMood = pick(moods, rng);
  const hairStyle = pick(hairByFamily[portraitFamily], rng);
  const beardStyle = faceMood === 'senior' ? weightedPick<BeardStyle>(
    [
      { value: 'none', weight: 26 },
      { value: 'stubble', weight: 24 },
      { value: 'moustache', weight: 14 },
      { value: 'trimmed', weight: 24 },
      { value: 'full', weight: 12 },
    ],
    rng,
  ) : weightedPick(beardWeights, rng);

  return {
    portraitFamily,
    faceMood,
    skinToneIndex: Math.floor(rng() * SKIN_TONES.length),
    hairColorIndex: Math.floor(rng() * HAIR_COLORS.length),
    backgroundIndex: Math.floor(rng() * BACKGROUNDS.length),
    hairStyle,
    beardStyle: hairStyle === 'bald' && rng() > 0.52 ? weightedPick(beardWeights, rng) : beardStyle,
    shirtStyle: pick(shirtStyles, rng),
    eyeStyle: pick(eyeStyles, rng),
    featureOffset: pick([-1, 0, 1] as const, rng),
  };
}
