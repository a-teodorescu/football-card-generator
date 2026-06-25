import type { AvatarDNA } from './avatarTypes';
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

function pickIndex(length: number, rng: () => number): number {
  return Math.floor(rng() * length);
}

export function generateAvatarDNA(seed: string): AvatarDNA {
  const rng = createSeededRandom(seed);

  return {
    skinToneIndex: pickIndex(SKIN_TONES.length, rng),
    hairStyleIndex: pickIndex(12, rng),
    hairColorIndex: pickIndex(HAIR_COLORS.length, rng),
    eyeStyleIndex: pickIndex(5, rng),
    mouthStyleIndex: pickIndex(5, rng),
    beardStyleIndex: pickIndex(7, rng),
    eyebrowStyleIndex: pickIndex(5, rng),
    headShapeIndex: pickIndex(5, rng),
    noseStyleIndex: pickIndex(4, rng),
    cheekStyleIndex: pickIndex(4, rng),
    backgroundIndex: pickIndex(BACKGROUNDS.length, rng),
    shirtStyleIndex: pickIndex(7, rng),
  };
}
