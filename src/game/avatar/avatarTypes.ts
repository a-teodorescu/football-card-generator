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

export type HeadShape = 'oval' | 'square' | 'round';
export type FaceTemplate = 'balanced' | 'focused' | 'calm' | 'veteran';
export type HairStyle = 'short' | 'side-part' | 'curly' | 'buzz' | 'messy' | 'crop' | 'bald';
export type BeardStyle = 'none' | 'stubble' | 'moustache' | 'short-beard' | 'goatee';
export type ShirtStyle = 'plain' | 'center-stripe' | 'shoulder-stripes' | 'horizontal-band' | 'split';

export type AvatarDNA = {
  skinToneIndex: number;
  hairColorIndex: number;
  backgroundIndex: number;
  headShape: HeadShape;
  faceTemplate: FaceTemplate;
  hairStyle: HairStyle;
  beardStyle: BeardStyle;
  shirtStyle: ShirtStyle;
  accessoryIndex: number;
};

export type PlayerAvatarProps = {
  seed: string;
  primaryColor?: string;
  secondaryColor?: string;
  size?: number;
  className?: string;
  title?: string;
};
