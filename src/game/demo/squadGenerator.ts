import type { PlayerCardData, PlayerPosition } from '../avatar/avatarTypes';

const firstNames = [
  'Alex',
  'Mihai',
  'David',
  'Andrei',
  'Radu',
  'Vlad',
  'Ianis',
  'Matei',
  'Denis',
  'Tudor',
  'Cristian',
  'Sebastian',
  'Florin',
  'Rareș',
  'Luca',
  'Robert',
];

const lastNames = [
  'Popa',
  'Stan',
  'Marin',
  'Ionescu',
  'Dumitru',
  'Stoica',
  'Radu',
  'Petrescu',
  'Munteanu',
  'Lazar',
  'Dobre',
  'Neagu',
  'Ilie',
  'Mocanu',
  'Toma',
  'Dragomir',
];

const nationalities = ['RO', 'RO', 'RO', 'RO', 'MD', 'RS', 'BG', 'HR', 'HU', 'PL'];
const positions: PlayerPosition[] = ['GK', 'LB', 'CB', 'CB', 'RB', 'DM', 'CM', 'AM', 'LW', 'RW', 'ST', 'ST'];

const clubs = [
  { name: 'FC București', primary: '#2563eb', secondary: '#facc15' },
  { name: 'Rapid Nord', primary: '#7c2d12', secondary: '#fbbf24' },
  { name: 'Academia Sud', primary: '#16a34a', secondary: '#ffffff' },
  { name: 'Dacia Arena', primary: '#dc2626', secondary: '#111827' },
  { name: 'Victoria City', primary: '#7c3aed', secondary: '#fde68a' },
  { name: 'Metalul Vest', primary: '#475569', secondary: '#22d3ee' },
];

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

function pick<T>(items: T[], rng: () => number): T {
  return items[Math.floor(rng() * items.length)];
}

function integerBetween(min: number, max: number, rng: () => number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function generateDemoSquad(batchSeed: string, count = 12): PlayerCardData[] {
  const rng = createSeededRandom(batchSeed);
  const club = pick(clubs, rng);

  return Array.from({ length: count }, (_, index) => {
    const firstName = pick(firstNames, rng);
    const lastName = pick(lastNames, rng);
    const position = positions[index % positions.length];
    const age = integerBetween(16, 33, rng);
    const baseOverall = integerBetween(52, 78, rng);
    const youthBonus = age <= 20 ? integerBetween(10, 22, rng) : integerBetween(2, 13, rng);
    const potential = Math.min(94, Math.max(baseOverall, baseOverall + youthBonus));
    const nationality = pick(nationalities, rng);
    const id = `${batchSeed}-player-${index + 1}`;

    return {
      id,
      name: `${firstName} ${lastName}`,
      age,
      nationality,
      position,
      overall: baseOverall,
      potential,
      clubName: club.name,
      clubPrimaryColor: club.primary,
      clubSecondaryColor: club.secondary,
      visualSeed: `${id}-${firstName}-${lastName}-${nationality}-${position}`,
    };
  });
}
