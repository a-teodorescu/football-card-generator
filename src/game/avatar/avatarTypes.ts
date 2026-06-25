export type PlayerPosition = 'GK' | 'LB' | 'CB' | 'RB' | 'DM' | 'CM' | 'AM' | 'LW' | 'RW' | 'ST' | string;

export type PlayerCardData = {
  id: string;
  name: string;
  age: number;
  nationality: string;
  position: PlayerPosition;
  overall: number;
  potential: number;
  clubName: string;
  clubPrimaryColor: string;
  clubSecondaryColor: string;
  visualSeed?: string;
};

export type AvatarDNA = {
  skinToneIndex: number;
  hairStyleIndex: number;
  hairColorIndex: number;
  eyeStyleIndex: number;
  mouthStyleIndex: number;
  beardStyleIndex: number;
  eyebrowStyleIndex: number;
  headShapeIndex: number;
  noseStyleIndex: number;
  cheekStyleIndex: number;
  backgroundIndex: number;
  shirtStyleIndex: number;
};

export type PlayerAvatarProps = {
  seed: string;
  primaryColor?: string;
  secondaryColor?: string;
  size?: number;
  className?: string;
  title?: string;
};
