export type VisualPlayer = {
  id: string;
  name: string;
  number: number;
  position: string;
  country: string;
  overall: number;
  portrait: string;
  clubColor: string;
  note: string;
};

export const visualPlayers: VisualPlayer[] = [
  {
    id: 'v4_01',
    name: 'Matei Radu',
    number: 9,
    position: 'ST',
    country: 'RO',
    overall: 72,
    portrait: '/portraits/avatar-01.png',
    clubColor: '#1d5fb8',
    note: 'short hair, clean face',
  },
  {
    id: 'v4_02',
    name: 'Alex Ionescu',
    number: 7,
    position: 'LW',
    country: 'RO',
    overall: 76,
    portrait: '/portraits/avatar-02.png',
    clubColor: '#b32032',
    note: 'compact side hair',
  },
  {
    id: 'v4_03',
    name: 'Dani Marin',
    number: 10,
    position: 'CAM',
    country: 'BR',
    overall: 78,
    portrait: '/portraits/avatar-03.png',
    clubColor: '#148756',
    note: 'beard integrated to jaw',
  },
  {
    id: 'v4_04',
    name: 'Victor Petrescu',
    number: 4,
    position: 'CB',
    country: 'FR',
    overall: 74,
    portrait: '/portraits/avatar-04.png',
    clubColor: '#f0f2f4',
    note: 'larger shoulders, simple face',
  },
  {
    id: 'v4_05',
    name: 'Radu Stoica',
    number: 5,
    position: 'DM',
    country: 'RO',
    overall: 75,
    portrait: '/portraits/avatar-05.png',
    clubColor: '#5d39ac',
    note: 'darker tones, tight beard',
  },
  {
    id: 'v4_06',
    name: 'Cristi Popa',
    number: 1,
    position: 'GK',
    country: 'IT',
    overall: 73,
    portrait: '/portraits/avatar-06.png',
    clubColor: '#0a84b8',
    note: 'basic goalkeeper profile',
  },
];
