import { generateAvatarDNA } from './avatarDNA';
import { BACKGROUNDS, BLACK, HAIR_COLORS, OUTLINE, SKIN_TONES, WHITE } from './avatarPalettes';
import type { PlayerAvatarProps } from './avatarTypes';

type SkinTone = (typeof SKIN_TONES)[number];

function Background({ colors, variant }: { colors: string[]; variant: number }) {
  const [main, dark, accent] = colors;

  return (
    <>
      <rect x="0" y="0" width="96" height="96" fill={dark} />
      <rect x="5" y="5" width="86" height="86" fill={main} />
      <rect x="9" y="9" width="78" height="78" fill="rgba(255,255,255,0.08)" />
      <rect x="14" y="14" width="68" height="68" fill="rgba(255,255,255,0.05)" />
      <rect x="5" y="80" width="86" height="7" fill="rgba(0,0,0,0.18)" />

      {variant % 3 === 0 && (
        <>
          <rect x="13" y="15" width="18" height="4" fill={accent} opacity="0.42" />
          <rect x="65" y="16" width="12" height="4" fill={accent} opacity="0.32" />
          <rect x="18" y="67" width="14" height="4" fill={accent} opacity="0.3" />
        </>
      )}

      {variant % 3 === 1 && (
        <>
          <rect x="14" y="16" width="4" height="52" fill={accent} opacity="0.24" />
          <rect x="24" y="16" width="4" height="52" fill={accent} opacity="0.14" />
          <rect x="72" y="22" width="4" height="44" fill={accent} opacity="0.18" />
        </>
      )}

      {variant % 3 === 2 && (
        <>
          <rect x="16" y="18" width="6" height="6" fill={accent} opacity="0.38" />
          <rect x="70" y="18" width="6" height="6" fill={accent} opacity="0.3" />
          <rect x="24" y="72" width="6" height="6" fill={accent} opacity="0.22" />
          <rect x="63" y="67" width="5" height="5" fill={accent} opacity="0.3" />
        </>
      )}
    </>
  );
}

function Shirt({ primaryColor, secondaryColor, styleIndex }: { primaryColor: string; secondaryColor: string; styleIndex: number }) {
  return (
    <>
      <rect x="25" y="69" width="46" height="22" fill={OUTLINE} />
      <rect x="18" y="77" width="60" height="14" fill={OUTLINE} />
      <rect x="28" y="71" width="40" height="20" fill={primaryColor} />
      <rect x="21" y="79" width="54" height="12" fill={primaryColor} />

      <rect x="40" y="68" width="16" height="11" fill={OUTLINE} />
      <rect x="43" y="69" width="10" height="8" fill="#e2e8f0" />
      <rect x="45" y="69" width="6" height="5" fill="#f8fafc" />

      {styleIndex === 1 && <rect x="45" y="78" width="6" height="13" fill={secondaryColor} />}
      {styleIndex === 2 && (
        <>
          <rect x="21" y="83" width="14" height="4" fill={secondaryColor} />
          <rect x="61" y="83" width="14" height="4" fill={secondaryColor} />
        </>
      )}
      {styleIndex === 3 && (
        <>
          <rect x="31" y="77" width="6" height="14" fill={secondaryColor} />
          <rect x="47" y="77" width="6" height="14" fill={secondaryColor} />
          <rect x="63" y="79" width="6" height="12" fill={secondaryColor} />
        </>
      )}
      {styleIndex === 4 && (
        <>
          <rect x="25" y="77" width="46" height="4" fill={secondaryColor} />
          <rect x="22" y="87" width="52" height="3" fill={secondaryColor} />
        </>
      )}
      {styleIndex === 5 && (
        <>
          <rect x="28" y="71" width="20" height="20" fill={secondaryColor} />
          <rect x="48" y="71" width="20" height="20" fill={primaryColor} />
        </>
      )}
      {styleIndex === 6 && (
        <>
          <rect x="33" y="76" width="30" height="3" fill={secondaryColor} />
          <rect x="33" y="84" width="30" height="3" fill={secondaryColor} />
        </>
      )}

      <rect x="61" y="74" width="6" height="6" fill={secondaryColor} />
      <rect x="63" y="76" width="2" height="2" fill="#ffffff" opacity="0.65" />
    </>
  );
}

function Head({ skin, headShapeIndex }: { skin: SkinTone; headShapeIndex: number }) {
  const headX = [30, 31, 29, 30, 32][headShapeIndex] ?? 30;
  const headW = [36, 34, 38, 36, 32][headShapeIndex] ?? 36;
  const headY = headShapeIndex === 4 ? 22 : 20;
  const headH = headShapeIndex === 2 ? 45 : 44;

  return (
    <>
      <rect x="35" y="62" width="26" height="14" fill={OUTLINE} />
      <rect x="38" y="62" width="20" height="14" fill={skin.shadow} />
      <rect x="40" y="62" width="16" height="5" fill={skin.base} />

      <rect x={headX - 5} y="31" width="8" height="18" fill={OUTLINE} />
      <rect x={headX + headW - 3} y="31" width="8" height="18" fill={OUTLINE} />
      <rect x={headX - 2} y="34" width="5" height="12" fill={skin.base} />
      <rect x={headX + headW - 3} y="34" width="5" height="12" fill={skin.base} />
      <rect x={headX - 1} y="40" width="3" height="4" fill={skin.shadow} />
      <rect x={headX + headW - 2} y="40" width="3" height="4" fill={skin.shadow} />

      <rect x={headX} y={headY} width={headW} height={headH} fill={OUTLINE} />
      <rect x={headX + 3} y={headY + 3} width={headW - 6} height={headH - 6} fill={skin.base} />
      <rect x={headX + 3} y="52" width={headW - 6} height="10" fill={skin.shadow} opacity="0.82" />
      <rect x={headX + 8} y={headY + 5} width={Math.max(12, headW - 17)} height="7" fill={skin.light} opacity="0.82" />
      <rect x={headX + headW - 9} y="32" width="4" height="22" fill={skin.shadow} opacity="0.72" />

      {headShapeIndex === 3 && (
        <>
          <rect x={headX + 3} y="58" width="6" height="4" fill={OUTLINE} opacity="0.36" />
          <rect x={headX + headW - 9} y="58" width="6" height="4" fill={OUTLINE} opacity="0.36" />
        </>
      )}
    </>
  );
}

function Eyes({ eyeStyleIndex }: { eyeStyleIndex: number }) {
  const eyeY = eyeStyleIndex === 2 ? 39 : 38;
  const eyeW = eyeStyleIndex === 1 ? 5 : 4;
  const pupil = eyeStyleIndex === 3 ? '#1d4ed8' : eyeStyleIndex === 4 ? '#166534' : BLACK;

  return (
    <>
      <rect x="37" y={eyeY - 1} width={eyeW + 3} height="6" fill="rgba(0,0,0,0.18)" />
      <rect x="54" y={eyeY - 1} width={eyeW + 3} height="6" fill="rgba(0,0,0,0.18)" />
      <rect x="38" y={eyeY} width={eyeW} height="4" fill={WHITE} />
      <rect x="55" y={eyeY} width={eyeW} height="4" fill={WHITE} />
      <rect x="40" y={eyeY} width="2" height="4" fill={pupil} />
      <rect x="57" y={eyeY} width="2" height="4" fill={pupil} />
      {eyeStyleIndex === 2 && (
        <>
          <rect x="37" y="43" width="7" height="2" fill="rgba(0,0,0,0.22)" />
          <rect x="54" y="43" width="7" height="2" fill="rgba(0,0,0,0.22)" />
        </>
      )}
    </>
  );
}

function Eyebrows({ hairColor, eyebrowStyleIndex }: { hairColor: string; eyebrowStyleIndex: number }) {
  const y = eyebrowStyleIndex === 1 ? 34 : 35;
  const height = eyebrowStyleIndex === 2 ? 3 : 2;

  if (eyebrowStyleIndex === 4) {
    return (
      <>
        <rect x="36" y="35" width="6" height="2" fill={hairColor} />
        <rect x="42" y="34" width="4" height="2" fill={hairColor} />
        <rect x="53" y="34" width="4" height="2" fill={hairColor} />
        <rect x="57" y="35" width="6" height="2" fill={hairColor} />
      </>
    );
  }

  return (
    <>
      <rect x="36" y={y} width="10" height={height} fill={hairColor} />
      <rect x="53" y={eyebrowStyleIndex === 3 ? y - 1 : y} width="10" height={height} fill={hairColor} />
    </>
  );
}

function Nose({ skin, noseStyleIndex }: { skin: SkinTone; noseStyleIndex: number }) {
  if (noseStyleIndex === 1) {
    return (
      <>
        <rect x="48" y="43" width="3" height="10" fill={skin.shadow} />
        <rect x="46" y="52" width="7" height="3" fill={skin.dark} />
        <rect x="47" y="51" width="5" height="2" fill={skin.base} />
      </>
    );
  }

  if (noseStyleIndex === 2) {
    return (
      <>
        <rect x="48" y="43" width="5" height="9" fill={skin.shadow} />
        <rect x="46" y="52" width="9" height="3" fill={skin.dark} />
        <rect x="48" y="51" width="6" height="2" fill={skin.base} />
      </>
    );
  }

  if (noseStyleIndex === 3) {
    return (
      <>
        <rect x="49" y="44" width="3" height="8" fill={skin.shadow} />
        <rect x="45" y="52" width="10" height="2" fill={skin.dark} />
      </>
    );
  }

  return (
    <>
      <rect x="48" y="43" width="4" height="10" fill={skin.shadow} />
      <rect x="46" y="52" width="8" height="3" fill={skin.dark} />
      <rect x="47" y="51" width="6" height="2" fill={skin.base} />
    </>
  );
}

function Cheeks({ skin, cheekStyleIndex }: { skin: SkinTone; cheekStyleIndex: number }) {
  if (cheekStyleIndex === 0) return null;

  return (
    <>
      <rect x="34" y="49" width={cheekStyleIndex === 1 ? 5 : 7} height="3" fill={skin.blush} opacity="0.42" />
      <rect x={cheekStyleIndex === 3 ? '58' : '56'} y="49" width={cheekStyleIndex === 1 ? 5 : 7} height="3" fill={skin.blush} opacity="0.38" />
    </>
  );
}

function Mouth({ mouthStyleIndex }: { mouthStyleIndex: number }) {
  if (mouthStyleIndex === 0) return <rect x="43" y="57" width="14" height="3" fill="#7f1d1d" />;

  if (mouthStyleIndex === 1) {
    return (
      <>
        <rect x="42" y="57" width="16" height="2" fill="#7f1d1d" />
        <rect x="44" y="59" width="12" height="2" fill="#991b1b" />
      </>
    );
  }

  if (mouthStyleIndex === 2) return <rect x="45" y="58" width="10" height="2" fill="#581c1c" />;

  if (mouthStyleIndex === 3) {
    return (
      <>
        <rect x="43" y="57" width="14" height="2" fill="#581c1c" />
        <rect x="46" y="59" width="8" height="2" fill="#f8fafc" />
      </>
    );
  }

  return (
    <>
      <rect x="43" y="58" width="4" height="2" fill="#581c1c" />
      <rect x="47" y="59" width="8" height="2" fill="#581c1c" />
      <rect x="55" y="58" width="4" height="2" fill="#581c1c" />
    </>
  );
}

function Beard({ beardStyleIndex, hairColor }: { beardStyleIndex: number; hairColor: string }) {
  if (beardStyleIndex === 0) return null;

  if (beardStyleIndex === 1) return <rect x="41" y="60" width="18" height="4" fill={hairColor} opacity="0.86" />;

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

  if (beardStyleIndex === 4) {
    return (
      <>
        <rect x="42" y="54" width="6" height="3" fill={hairColor} />
        <rect x="52" y="54" width="6" height="3" fill={hairColor} />
      </>
    );
  }

  if (beardStyleIndex === 5) {
    return (
      <>
        <rect x="37" y="56" width="26" height="8" fill={hairColor} opacity="0.78" />
        <rect x="43" y="56" width="14" height="3" fill="#7f1d1d" />
      </>
    );
  }

  return (
    <>
      <rect x="37" y="50" width="5" height="13" fill={hairColor} opacity="0.78" />
      <rect x="58" y="50" width="5" height="13" fill={hairColor} opacity="0.78" />
      <rect x="43" y="61" width="14" height="3" fill={hairColor} opacity="0.78" />
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
    case 7:
      return (
        <>
          <rect x="34" y="19" width="28" height="7" fill={OUTLINE} />
          <rect x="37" y="21" width="22" height="4" fill={hairColor} />
        </>
      );
    case 8:
      return (
        <>
          <rect x="27" y="20" width="42" height="13" fill={OUTLINE} />
          <rect x="30" y="22" width="36" height="9" fill={hairColor} />
          <rect x="29" y="31" width="9" height="15" fill={hairColor} />
          <rect x="58" y="31" width="9" height="15" fill={hairColor} />
        </>
      );
    case 9:
      return (
        <>
          <rect x="31" y="17" width="34" height="12" fill={OUTLINE} />
          <rect x="34" y="19" width="28" height="8" fill={hairColor} />
          <rect x="52" y="14" width="10" height="8" fill={hairColor} />
          <rect x="58" y="17" width="8" height="8" fill={hairColor} />
        </>
      );
    case 10:
      return (
        <>
          <rect x="29" y="18" width="38" height="12" fill={OUTLINE} />
          <rect x="32" y="20" width="32" height="8" fill={hairColor} />
          <rect x="36" y="15" width="6" height="6" fill={hairColor} />
          <rect x="45" y="14" width="7" height="7" fill={hairColor} />
          <rect x="55" y="15" width="6" height="6" fill={hairColor} />
          <rect x="31" y="28" width="7" height="9" fill={hairColor} />
        </>
      );
    default:
      return (
        <>
          <rect x="30" y="18" width="36" height="10" fill={OUTLINE} />
          <rect x="33" y="20" width="30" height="6" fill={hairColor} />
          <rect x="28" y="25" width="10" height="9" fill={hairColor} />
          <rect x="33" y="24" width="10" height="5" fill={OUTLINE} opacity="0.45" />
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
      <Background colors={backgroundColors} variant={dna.backgroundIndex} />
      <Shirt primaryColor={primaryColor} secondaryColor={secondaryColor} styleIndex={dna.shirtStyleIndex} />
      <Head skin={skin} headShapeIndex={dna.headShapeIndex} />
      <Eyes eyeStyleIndex={dna.eyeStyleIndex} />
      <Eyebrows hairColor={hairColor} eyebrowStyleIndex={dna.eyebrowStyleIndex} />
      <Nose skin={skin} noseStyleIndex={dna.noseStyleIndex} />
      <Cheeks skin={skin} cheekStyleIndex={dna.cheekStyleIndex} />
      <Mouth mouthStyleIndex={dna.mouthStyleIndex} />
      <Beard beardStyleIndex={dna.beardStyleIndex} hairColor={hairColor} />
      <Hair hairStyleIndex={dna.hairStyleIndex} hairColor={hairColor} />
    </svg>
  );
}
