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

export type PortraitFamily = 'classic' | 'wide' | 'sharp' | 'soft';
export type FaceMood = 'neutral' | 'focused' | 'calm' | 'senior';
export type HairStyle = 'short' | 'side-part' | 'wavy' | 'crop' | 'buzz' | 'curly' | 'afro' | 'bald';
export type BeardStyle = 'none' | 'stubble' | 'moustache' | 'trimmed' | 'full';
export type ShirtStyle = 'plain' | 'center-stripe' | 'side-panels' | 'shoulder-trim' | 'split';
export type EyeStyle = 'standard' | 'narrow' | 'soft';

export type AvatarDNA = {
  portraitFamily: PortraitFamily;
  faceMood: FaceMood;
  skinToneIndex: number;
  hairColorIndex: number;
  backgroundIndex: number;
  hairStyle: HairStyle;
  beardStyle: BeardStyle;
  shirtStyle: ShirtStyle;
  eyeStyle: EyeStyle;
  featureOffset: -1 | 0 | 1;
};

export type PlayerAvatarProps = {
  seed: string;
  primaryColor?: string;
  secondaryColor?: string;
  size?: number;
  className?: string;
  title?: string;
};
