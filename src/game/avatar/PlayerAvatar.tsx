import { generateAvatarDNA } from './avatarDNA';
import { BACKGROUNDS, HAIR_COLORS, OUTLINE, OUTLINE_SOFT, SHIRT_WHITE, SKIN_TONES, WHITE } from './avatarPalettes';
import type { AvatarDNA, BeardStyle, EyeStyle, HairStyle, PlayerAvatarProps, PortraitFamily, ShirtStyle } from './avatarTypes';

type SkinTone = (typeof SKIN_TONES)[number];

type HeadPaths = {
  outline: string;
  skin: string;
  shadow: string;
  light: string;
  cheek: string;
  earY: number;
};

const headPaths: Record<PortraitFamily, HeadPaths> = {
  classic: {
    outline: 'M17 9H31L35 13V28L32 35L28 38H20L16 35L13 28V13Z',
    skin: 'M18 11H30L33 14V28L30 34L27 36H21L18 34L15 28V14Z',
    shadow: 'M30 12L33 15V28L30 34L27 36H24V32H28L30 28V14Z',
    light: 'M18 13H23V31H20L18 28Z',
    cheek: 'M17 27H21V29H17Z M28 27H32V29H28Z',
    earY: 19,
  },
  wide: {
    outline: 'M16 10H32L36 15V29L33 35L28 38H20L15 35L12 29V15Z',
    skin: 'M17 12H31L34 15V29L31 34L27 36H21L18 34L14 29V15Z',
    shadow: 'M31 13L34 16V29L31 34L27 36H24V32H29L31 28Z',
    light: 'M17 14H22V31H19L17 28Z',
    cheek: 'M16 27H21V29H16Z M28 27H33V29H28Z',
    earY: 19,
  },
  sharp: {
    outline: 'M18 8H30L34 13V28L31 36L27 39H21L17 36L14 28V13Z',
    skin: 'M19 10H29L32 14V28L29 34L26 37H22L19 34L16 28V14Z',
    shadow: 'M29 11L32 15V28L29 34L26 37H24V32H28L29 28Z',
    light: 'M19 12H23V31H20L19 28Z',
    cheek: 'M18 27H21V29H18Z M28 27H31V29H28Z',
    earY: 18,
  },
  soft: {
    outline: 'M17 9H31L35 14V29L32 35L28 38H20L16 35L13 29V14Z',
    skin: 'M18 11H30L33 15V29L30 34L27 36H21L18 34L15 29V15Z',
    shadow: 'M30 12L33 16V29L30 34L27 36H24V32H28L30 28V15Z',
    light: 'M18 13H23V31H20L18 28Z',
    cheek: 'M17 27H21V29H17Z M28 27H32V29H28Z',
    earY: 19,
  },
};

function Background({ palette }: { palette: string[] }) {
  const [main, dark, accent] = palette;
  return (
    <>
      <rect x="0" y="0" width="48" height="48" fill={dark} />
      <rect x="2" y="2" width="44" height="44" fill={main} />
      <rect x="4" y="4" width="40" height="40" fill={WHITE} opacity="0.05" />
      <rect x="2" y="42" width="44" height="4" fill="#000000" opacity="0.16" />
      <path d="M5 7H20V8H5ZM31 8H42V9H31ZM7 36H19V37H7ZM33 36H43V37H33Z" fill={accent} opacity="0.22" />
    </>
  );
}

function Shirt({ primaryColor, secondaryColor, style }: { primaryColor: string; secondaryColor: string; style: ShirtStyle }) {
  return (
    <>
      <path d="M13 37H35L42 42V48H6V42Z" fill={OUTLINE} />
      <path d="M15 38H33L40 43V48H8V43Z" fill={primaryColor} />
      <path d="M19 37H29L31 40L24 43L17 40Z" fill={OUTLINE_SOFT} />
      <path d="M20 37H28L29 39L24 41L19 39Z" fill={SHIRT_WHITE} />
      <path d="M21 37H27L24 40Z" fill="#dbe4f0" />
      <path d="M8 46H40V48H8Z" fill="#000000" opacity="0.18" />

      {style === 'center-stripe' && <path d="M22 42H26V48H22Z" fill={secondaryColor} opacity="0.9" />}
      {style === 'side-panels' && <path d="M8 43H15V48H8ZM33 43H40V48H33Z" fill={secondaryColor} opacity="0.9" />}
      {style === 'shoulder-trim' && <path d="M9 42H18V44H9ZM30 42H39V44H30" fill={secondaryColor} opacity="0.95" />}
      {style === 'split' && <path d="M8 43H24V48H8Z" fill={secondaryColor} opacity="0.86" />}
    </>
  );
}

function Neck({ skin }: { skin: SkinTone }) {
  return (
    <>
      <path d="M19 32H29V39H19Z" fill={OUTLINE} />
      <path d="M20 32H28V38H20Z" fill={skin.base} />
      <path d="M25 32H28V38H25Z" fill={skin.shadow} opacity="0.7" />
      <path d="M20 37H28V39H20Z" fill={skin.dark} opacity="0.25" />
    </>
  );
}

function Ears({ skin, family }: { skin: SkinTone; family: PortraitFamily }) {
  const y = headPaths[family].earY;
  return (
    <>
      <path d={`M11 ${y}H15V28H11Z M33 ${y}H37V28H33Z`} fill={OUTLINE} />
      <path d={`M12 ${y + 1}H15V27H12Z M33 ${y + 1}H36V27H33Z`} fill={skin.base} />
      <path d={`M13 ${y + 4}H15V25H13Z M33 ${y + 4}H35V25H33Z`} fill={skin.shadow} opacity="0.62" />
    </>
  );
}

function Head({ skin, family }: { skin: SkinTone; family: PortraitFamily }) {
  const paths = headPaths[family];
  return (
    <>
      <path d={paths.outline} fill={OUTLINE} />
      <path d={paths.skin} fill={skin.base} />
      <path d={paths.light} fill={skin.light} opacity="0.34" />
      <path d={paths.shadow} fill={skin.shadow} opacity="0.48" />
      <path d="M18 35H30V36H18Z" fill={skin.dark} opacity="0.22" />
      <path d={paths.cheek} fill={skin.blush} opacity="0.28" />
    </>
  );
}

function Hair({ style, color, family }: { style: HairStyle; color: string; family: PortraitFamily }) {
  const dark = OUTLINE;
  const low = '#000000';
  if (style === 'bald') {
    return <path d="M20 12H28V13H20ZM18 15H21V16H18" fill={WHITE} opacity="0.12" />;
  }

  if (style === 'buzz') {
    return (
      <>
        <path d="M17 9H31L34 13V18H14V13Z" fill={dark} />
        <path d="M18 10H30L32 13V17H16V13Z" fill={color} />
        <path d="M18 10H30V12H18Z" fill={WHITE} opacity="0.1" />
        <path d="M16 16H32V18H16Z" fill={low} opacity="0.18" />
      </>
    );
  }

  if (style === 'short') {
    return (
      <>
        <path d="M17 8H31L35 13V20H32V17H28V15H20V17H16V21H13V14Z" fill={dark} />
        <path d="M18 9H30L33 13V17H30V15H20V17H16V20H15V14Z" fill={color} />
        <path d="M20 10H27V12H20ZM17 14H22V16H17" fill={WHITE} opacity="0.14" />
        <path d="M30 13H33V18H30Z" fill="#000000" opacity="0.18" />
      </>
    );
  }

  if (style === 'side-part') {
    return (
      <>
        <path d="M18 7H31L35 12V21H31V17H26V15H19V18H15V22H13V14Z" fill={dark} />
        <path d="M19 8H30L33 12V17H30V15H24V13H19V17H16V20H15V14Z" fill={color} />
        <path d="M19 9H27V11H19ZM27 11H33V13H27" fill={WHITE} opacity="0.14" />
        <path d="M18 12H24V14H18" fill="#000000" opacity="0.18" />
      </>
    );
  }

  if (style === 'wavy') {
    return (
      <>
        <path d="M17 8H30L35 12V21H31V17H28V15H24V18H20V16H16V22H13V14Z" fill={dark} />
        <path d="M18 9H29L33 12V17H30V15H27V13H24V16H21V14H17V20H15V14Z" fill={color} />
        <path d="M20 9H27V11H20ZM29 12H33V14H29ZM17 15H22V17H17" fill={WHITE} opacity="0.12" />
      </>
    );
  }

  if (style === 'crop') {
    return (
      <>
        <path d="M16 9H32L35 14V22H32V18H29V16H19V18H16V22H13V15Z" fill={dark} />
        <path d="M18 10H31L33 14V17H29V15H19V17H16V20H15V15Z" fill={color} />
        <path d="M18 11H31V13H18" fill={WHITE} opacity="0.1" />
      </>
    );
  }

  if (style === 'curly' || style === 'afro') {
    const afro = style === 'afro';
    return (
      <>
        <path d={afro ? 'M15 8H33L37 13V22H34V25H31V19H17V25H14V22H11V14Z' : 'M16 8H32L36 13V22H33V18H30V16H18V18H15V23H12V15Z'} fill={dark} />
        <path d={afro ? 'M16 9H32L35 13V21H32V18H16V22H14V14Z' : 'M17 9H31L34 13V18H31V16H18V18H15V21H14V15Z'} fill={color} />
        <path d="M18 10H21V13H18ZM23 9H26V12H23ZM29 11H32V14H29ZM16 15H19V18H16ZM25 15H28V18H25" fill={WHITE} opacity="0.09" />
        <path d="M20 13H23V16H20ZM31 15H34V19H31" fill="#000000" opacity="0.16" />
      </>
    );
  }

  return null;
}

function Beard({ style, hairColor, skin }: { style: BeardStyle; hairColor: string; skin: SkinTone }) {
  if (style === 'none') return null;

  if (style === 'stubble') {
    return <path d="M18 30H30V34H28V35H20V34H18Z" fill={OUTLINE} opacity="0.18" />;
  }

  if (style === 'moustache') {
    return <path d="M20 29H23V30H25V29H28V31H20Z" fill={hairColor} />;
  }

  if (style === 'trimmed') {
    return (
      <>
        <path d="M17 28H31V33L28 36H20L17 33Z" fill={OUTLINE} opacity="0.88" />
        <path d="M19 29H29V33L27 35H21L19 33Z" fill={hairColor} />
        <path d="M20 28H23V29H25V28H28V30H20Z" fill={hairColor} />
        <path d="M21 31H27V32H21Z" fill={skin.base} opacity="0.92" />
      </>
    );
  }

  return (
    <>
      <path d="M16 27H32V34L28 38H20L16 34Z" fill={OUTLINE} />
      <path d="M18 28H30V34L27 36H21L18 34Z" fill={hairColor} />
      <path d="M20 28H23V30H25V28H28V31H20Z" fill={hairColor} />
      <path d="M21 32H27V33H21Z" fill={skin.base} opacity="0.9" />
      <path d="M27 29H30V35H27Z" fill="#000000" opacity="0.16" />
    </>
  );
}

function Eyes({ style, offset }: { style: EyeStyle; offset: -1 | 0 | 1 }) {
  const y = style === 'narrow' ? 21 : 22;
  const h = style === 'soft' ? 2 : 1;
  return (
    <>
      <path d={`M18 ${y - 2}H23V${y - 1}H18ZM27 ${y - 2}H32V${y - 1}H27Z`} fill={OUTLINE} opacity="0.9" />
      <path d={`M19 ${y}H23V${y + h}H19ZM27 ${y}H31V${y + h}H27Z`} fill={OUTLINE} />
      <path d={`M20 ${y}H21V${y + 1}H20ZM28 ${y}H29V${y + 1}H28Z`} fill={WHITE} opacity="0.95" />
      {offset !== 0 && <path d={`M${offset > 0 ? 21 : 19} ${y + 1}H${offset > 0 ? 22 : 20}V${y + 2}H${offset > 0 ? 21 : 19}Z`} fill={OUTLINE} opacity="0.45" />}
    </>
  );
}

function Nose({ skin, mood }: { skin: SkinTone; mood: AvatarDNA['faceMood'] }) {
  const long = mood === 'senior' || mood === 'focused';
  return (
    <>
      <path d={long ? 'M24 23H26V29H28V31H23V29H24Z' : 'M24 24H26V29H28V30H23V29H24Z'} fill={skin.shadow} opacity="0.72" />
      <path d="M23 29H25V30H23Z" fill={skin.light} opacity="0.45" />
      <path d="M26 30H28V31H26Z" fill={skin.dark} opacity="0.34" />
    </>
  );
}

function Mouth({ beardStyle, mood }: { beardStyle: BeardStyle; mood: AvatarDNA['faceMood'] }) {
  const y = beardStyle === 'full' || beardStyle === 'trimmed' ? 32 : 31;
  const width = mood === 'calm' ? 'M21' : 'M20';
  const end = mood === 'calm' ? 'H27' : 'H28';
  return (
    <>
      <path d={`${width} ${y}${end}V${y + 1}${width}Z`} fill={OUTLINE} opacity="0.72" />
      {mood === 'neutral' && <path d="M21 32H27V33H21Z" fill={WHITE} opacity="0.18" />}
    </>
  );
}

export default function PlayerAvatar({
  seed,
  primaryColor = '#2563eb',
  secondaryColor = '#facc15',
  size = 172,
  className,
  title,
}: PlayerAvatarProps) {
  const dna = generateAvatarDNA(seed);
  const skin = SKIN_TONES[dna.skinToneIndex % SKIN_TONES.length];
  const hairColor = HAIR_COLORS[dna.hairColorIndex % HAIR_COLORS.length];
  const background = BACKGROUNDS[dna.backgroundIndex % BACKGROUNDS.length];

  return (
    <svg
      className={className ? `pixel-avatar ${className}` : 'pixel-avatar'}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label={title ?? 'Generated football player avatar'}
      shapeRendering="crispEdges"
    >
      {title ? <title>{title}</title> : null}
      <Background palette={background} />
      <Shirt primaryColor={primaryColor} secondaryColor={secondaryColor} style={dna.shirtStyle} />
      <Neck skin={skin} />
      <Ears skin={skin} family={dna.portraitFamily} />
      <Head skin={skin} family={dna.portraitFamily} />
      <Beard style={dna.beardStyle} hairColor={hairColor} skin={skin} />
      <Hair style={dna.hairStyle} color={hairColor} family={dna.portraitFamily} />
      <Eyes style={dna.eyeStyle} offset={dna.featureOffset} />
      <Nose skin={skin} mood={dna.faceMood} />
      <Mouth beardStyle={dna.beardStyle} mood={dna.faceMood} />
      <path d="M2 2H46V3H2ZM2 45H46V46H2ZM2 2H3V46H2ZM45 2H46V46H45Z" fill={WHITE} opacity="0.16" />
    </svg>
  );
}
