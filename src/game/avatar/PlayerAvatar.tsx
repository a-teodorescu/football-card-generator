import { generateAvatarDNA } from './avatarDNA';
import { BACKGROUNDS, BLACK, HAIR_COLORS, OUTLINE, SKIN_TONES, WHITE } from './avatarPalettes';
import type { PlayerAvatarProps } from './avatarTypes';

function Background({ colors }: { colors: string[] }) {
  return (
    <>
      <rect x="0" y="0" width="96" height="96" fill={colors[1]} />
      <rect x="6" y="6" width="84" height="84" fill={colors[0]} />
      <rect x="10" y="10" width="76" height="76" fill="rgba(255,255,255,0.08)" />
      <rect x="16" y="16" width="64" height="64" fill="rgba(255,255,255,0.06)" />
      <rect x="6" y="78" width="84" height="8" fill="rgba(0,0,0,0.16)" />
    </>
  );
}

function Shirt({ primaryColor, secondaryColor, styleIndex }: { primaryColor: string; secondaryColor: string; styleIndex: number }) {
  const hasCenterStripe = styleIndex === 1 || styleIndex === 3;
  const hasSleeveStripe = styleIndex === 2 || styleIndex === 3;

  return (
    <>
      <rect x="26" y="69" width="44" height="21" fill={OUTLINE} />
      <rect x="20" y="76" width="56" height="14" fill={OUTLINE} />
      <rect x="28" y="71" width="40" height="19" fill={primaryColor} />
      <rect x="22" y="78" width="52" height="12" fill={primaryColor} />
      <rect x="42" y="69" width="12" height="9" fill={OUTLINE} />
      <rect x="44" y="69" width="8" height="7" fill="#e2e8f0" />
      {hasCenterStripe && <rect x="45" y="78" width="6" height="12" fill={secondaryColor} />}
      {hasSleeveStripe && (
        <>
          <rect x="22" y="82" width="12" height="4" fill={secondaryColor} />
          <rect x="62" y="82" width="12" height="4" fill={secondaryColor} />
        </>
      )}
    </>
  );
}

function Head({ skin, headShapeIndex }: { skin: (typeof SKIN_TONES)[number]; headShapeIndex: number }) {
  const headX = headShapeIndex === 1 ? 31 : 30;
  const headW = headShapeIndex === 2 ? 36 : 34;

  return (
    <>
      <rect x="36" y="62" width="24" height="13" fill={OUTLINE} />
      <rect x="38" y="62" width="20" height="13" fill={skin.shadow} />
      <rect x="27" y="30" width="8" height="18" fill={OUTLINE} />
      <rect x="68" y="30" width="6" height="18" fill={OUTLINE} />
      <rect x="30" y="33" width="5" height="13" fill={skin.base} />
      <rect x="67" y="33" width="5" height="13" fill={skin.base} />
      <rect x={headX} y="20" width={headW} height="44" fill={OUTLINE} />
      <rect x={headX + 3} y="23" width={headW - 6} height="38" fill={skin.base} />
      <rect x={headX + 3} y="52" width={headW - 6} height="9" fill={skin.shadow} />
      <rect x={headX + 8} y="25" width={headW - 16} height="7" fill={skin.light} />
      <rect x={headX + headW - 9} y="32" width="4" height="22" fill={skin.shadow} />
    </>
  );
}

function Eyes({ eyeStyleIndex }: { eyeStyleIndex: number }) {
  const eyeY = eyeStyleIndex === 2 ? 39 : 38;
  const eyeW = eyeStyleIndex === 1 ? 5 : 4;
  const pupil = eyeStyleIndex === 3 ? '#1d4ed8' : BLACK;

  return (
    <>
      <rect x="38" y={eyeY} width={eyeW} height="4" fill={WHITE} />
      <rect x="55" y={eyeY} width={eyeW} height="4" fill={WHITE} />
      <rect x="40" y={eyeY} width="2" height="4" fill={pupil} />
      <rect x="57" y={eyeY} width="2" height="4" fill={pupil} />
      {eyeStyleIndex === 2 && (
        <>
          <rect x="37" y="43" width="7" height="2" fill="rgba(0,0,0,0.2)" />
          <rect x="54" y="43" width="7" height="2" fill="rgba(0,0,0,0.2)" />
        </>
      )}
    </>
  );
}

function Eyebrows({ hairColor, eyebrowStyleIndex }: { hairColor: string; eyebrowStyleIndex: number }) {
  const y = eyebrowStyleIndex === 1 ? 34 : 35;
  const height = eyebrowStyleIndex === 2 ? 3 : 2;

  return (
    <>
      <rect x="36" y={y} width="10" height={height} fill={hairColor} />
      <rect x="53" y={y} width="10" height={height} fill={hairColor} />
    </>
  );
}

function Nose({ skin }: { skin: (typeof SKIN_TONES)[number] }) {
  return (
    <>
      <rect x="48" y="43" width="4" height="10" fill={skin.shadow} />
      <rect x="46" y="52" width="8" height="3" fill={skin.dark} />
      <rect x="47" y="51" width="6" height="2" fill={skin.base} />
    </>
  );
}

function Mouth({ mouthStyleIndex }: { mouthStyleIndex: number }) {
  if (mouthStyleIndex === 0) {
    return <rect x="43" y="57" width="14" height="3" fill="#7f1d1d" />;
  }

  if (mouthStyleIndex === 1) {
    return (
      <>
        <rect x="42" y="57" width="16" height="2" fill="#7f1d1d" />
        <rect x="44" y="59" width="12" height="2" fill="#991b1b" />
      </>
    );
  }

  if (mouthStyleIndex === 2) {
    return <rect x="45" y="58" width="10" height="2" fill="#581c1c" />;
  }

  return (
    <>
      <rect x="43" y="57" width="14" height="2" fill="#581c1c" />
      <rect x="46" y="59" width="8" height="2" fill="#f8fafc" />
    </>
  );
}

function Beard({ beardStyleIndex, hairColor }: { beardStyleIndex: number; hairColor: string }) {
  if (beardStyleIndex === 0) return null;

  if (beardStyleIndex === 1) {
    return <rect x="41" y="60" width="18" height="4" fill={hairColor} opacity="0.86" />;
  }

  if (beardStyleIndex === 2) {
    return (
      <>
        <rect x="36" y="52" width="28" height="11" fill={hairColor} opacity="0.86" />
        <rect x="41" y="55" width="18" height="5" fill="#7f1d1d" />
      </>
    );
  }

  if (beardStyleIndex === 3) {
    return (
      <>
        <rect x="35" y="49" width="7" height="13" fill={hairColor} opacity="0.88" />
        <rect x="58" y="49" width="7" height="13" fill={hairColor} opacity="0.88" />
        <rect x="41" y="61" width="18" height="4" fill={hairColor} opacity="0.88" />
      </>
    );
  }

  return (
    <>
      <rect x="42" y="54" width="6" height="3" fill={hairColor} />
      <rect x="52" y="54" width="6" height="3" fill={hairColor} />
    </>
  );
}

function Hair({ hairStyleIndex, hairColor }: { hairStyleIndex: number; hairColor: string }) {
  switch (hairStyleIndex) {
    case 0:
      return (
        <>
          <rect x="30" y="18" width="36" height="12" fill={OUTLINE} />
          <rect x="33" y="20" width="30" height="9" fill={hairColor} />
          <rect x="30" y="28" width="8" height="9" fill={hairColor} />
          <rect x="59" y="27" width="8" height="10" fill={hairColor} />
        </>
      );
    case 1:
      return (
        <>
          <rect x="29" y="17" width="38" height="14" fill={OUTLINE} />
          <rect x="32" y="19" width="32" height="10" fill={hairColor} />
          <rect x="34" y="14" width="22" height="7" fill={hairColor} />
          <rect x="38" y="12" width="14" height="5" fill={hairColor} />
        </>
      );
    case 2:
      return (
        <>
          <rect x="29" y="19" width="38" height="9" fill={OUTLINE} />
          <rect x="32" y="21" width="32" height="6" fill={hairColor} />
          <rect x="31" y="27" width="7" height="20" fill={hairColor} />
          <rect x="60" y="27" width="7" height="20" fill={hairColor} />
        </>
      );
    case 3:
      return (
        <>
          <rect x="30" y="18" width="36" height="11" fill={OUTLINE} />
          <rect x="33" y="20" width="30" height="8" fill={hairColor} />
          <rect x="33" y="26" width="12" height="6" fill={hairColor} />
          <rect x="45" y="24" width="10" height="4" fill={OUTLINE} />
        </>
      );
    case 4:
      return (
        <>
          <rect x="30" y="17" width="36" height="12" fill={OUTLINE} />
          <rect x="33" y="19" width="30" height="9" fill={hairColor} />
          <rect x="31" y="27" width="9" height="15" fill={hairColor} />
        </>
      );
    case 5:
      return (
        <>
          <rect x="31" y="18" width="34" height="10" fill={OUTLINE} />
          <rect x="35" y="20" width="26" height="7" fill={hairColor} />
          <rect x="36" y="16" width="7" height="5" fill={hairColor} />
          <rect x="46" y="15" width="7" height="5" fill={hairColor} />
          <rect x="56" y="17" width="6" height="5" fill={hairColor} />
        </>
      );
    case 6:
      return (
        <>
          <rect x="34" y="18" width="28" height="9" fill={OUTLINE} />
          <rect x="37" y="20" width="22" height="6" fill={hairColor} />
          <rect x="32" y="28" width="6" height="8" fill={hairColor} />
          <rect x="60" y="28" width="6" height="8" fill={hairColor} />
        </>
      );
    default:
      return (
        <>
          <rect x="34" y="19" width="28" height="7" fill={OUTLINE} />
          <rect x="37" y="21" width="22" height="4" fill={hairColor} />
        </>
      );
  }
}

export default function PlayerAvatar({
  seed,
  primaryColor = '#2563eb',
  secondaryColor = '#facc15',
  size = 168,
  className = '',
  title = 'Generated pixel football player avatar',
}: PlayerAvatarProps) {
  const dna = generateAvatarDNA(seed);
  const skin = SKIN_TONES[dna.skinToneIndex];
  const hairColor = HAIR_COLORS[dna.hairColorIndex];
  const backgroundColors = BACKGROUNDS[dna.backgroundIndex];

  return (
    <svg
      className={`pixel-avatar ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 96 96"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <Background colors={backgroundColors} />
      <Shirt primaryColor={primaryColor} secondaryColor={secondaryColor} styleIndex={dna.shirtStyleIndex} />
      <Head skin={skin} headShapeIndex={dna.headShapeIndex} />
      <Eyes eyeStyleIndex={dna.eyeStyleIndex} />
      <Eyebrows hairColor={hairColor} eyebrowStyleIndex={dna.eyebrowStyleIndex} />
      <Nose skin={skin} />
      <Mouth mouthStyleIndex={dna.mouthStyleIndex} />
      <Beard beardStyleIndex={dna.beardStyleIndex} hairColor={hairColor} />
      <Hair hairStyleIndex={dna.hairStyleIndex} hairColor={hairColor} />
    </svg>
  );
}
