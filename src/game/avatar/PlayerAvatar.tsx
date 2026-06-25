import { generateAvatarDNA } from './avatarDNA';
import { headRows, layout } from './avatarLayout';
import { BACKGROUNDS, HAIR_COLORS, OUTLINE, OUTLINE_SOFT, SKIN_TONES, WHITE } from './avatarPalettes';
import type { AvatarDNA, FaceTemplate, HeadShape, PlayerAvatarProps, ShirtStyle } from './avatarTypes';

type SkinTone = (typeof SKIN_TONES)[number];

type RectDef = {
  x: number;
  y: number;
  w: number;
  h: number;
};

function PixelRect({ x, y, w, h, fill, opacity = 1 }: RectDef & { fill: string; opacity?: number }) {
  return <rect x={x} y={y} width={w} height={h} fill={fill} opacity={opacity} />;
}

function Background({ colors, variant }: { colors: string[]; variant: number }) {
  const [main, dark, accent] = colors;

  return (
    <>
      <rect x="0" y="0" width="96" height="96" fill={dark} />
      <rect x="5" y="5" width="86" height="86" fill={main} />
      <rect x="9" y="9" width="78" height="78" fill={WHITE} opacity="0.07" />
      <rect x="14" y="14" width="68" height="68" fill={WHITE} opacity="0.045" />
      <rect x="5" y="80" width="86" height="7" fill="#000000" opacity="0.18" />

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

function Shirt({ primaryColor, secondaryColor, style }: { primaryColor: string; secondaryColor: string; style: ShirtStyle }) {
  return (
    <>
      {/* Shoulder silhouette first, so the neck/head feel attached to a body. */}
      <rect x="26" y="70" width="44" height="8" fill={OUTLINE} />
      <rect x="19" y="76" width="58" height="16" fill={OUTLINE} />
      <rect x="29" y="72" width="38" height="8" fill={primaryColor} />
      <rect x="22" y="78" width="52" height="13" fill={primaryColor} />
      <rect x="24" y="88" width="48" height="3" fill="#000000" opacity="0.22" />

      {/* Collar locked to the neck position. */}
      <rect x="38" y="69" width="20" height="11" fill={OUTLINE} />
      <rect x="41" y="70" width="14" height="8" fill="#e2e8f0" />
      <rect x="44" y="70" width="8" height="5" fill="#f8fafc" />

      {style === 'center-stripe' && <rect x="45" y="78" width="6" height="13" fill={secondaryColor} />}
      {style === 'shoulder-stripes' && (
        <>
          <rect x="22" y="82" width="14" height="4" fill={secondaryColor} />
          <rect x="60" y="82" width="14" height="4" fill={secondaryColor} />
        </>
      )}
      {style === 'horizontal-band' && (
        <>
          <rect x="23" y="81" width="50" height="4" fill={secondaryColor} />
          <rect x="24" y="88" width="48" height="2" fill={secondaryColor} opacity="0.72" />
        </>
      )}
      {style === 'split' && (
        <>
          <rect x="22" y="78" width="26" height="13" fill={secondaryColor} />
          <rect x="45" y="78" width="3" height="13" fill={OUTLINE} opacity="0.3" />
        </>
      )}
    </>
  );
}

function Neck({ skin }: { skin: SkinTone }) {
  return (
    <>
      <rect x="37" y="63" width="22" height="15" fill={OUTLINE} />
      <rect x="40" y="64" width="16" height="12" fill={skin.base} />
      <rect x="52" y="64" width="4" height="12" fill={skin.shadow} opacity="0.86" />
      <rect x="40" y="64" width="5" height="5" fill={skin.light} opacity="0.72" />
      <rect x="40" y="75" width="16" height="3" fill={skin.dark} opacity="0.28" />
    </>
  );
}

function Ears({ skin, headShape }: { skin: SkinTone; headShape: HeadShape }) {
  const y = headShape === 'round' ? layout.ears.y + 1 : layout.ears.y;

  return (
    <>
      <rect x="22" y={y} width="8" height="14" fill={OUTLINE} />
      <rect x="66" y={y} width="8" height="14" fill={OUTLINE} />
      <rect x="25" y={y + 2} width="5" height="10" fill={skin.base} />
      <rect x="66" y={y + 2} width="5" height="10" fill={skin.shadow} />
      <rect x="27" y={y + 5} width="3" height="4" fill={skin.shadow} opacity="0.62" />
      <rect x="66" y={y + 5} width="3" height="4" fill={skin.dark} opacity="0.5" />
    </>
  );
}

function Head({ skin, headShape }: { skin: SkinTone; headShape: HeadShape }) {
  const rows = headRows[headShape];

  return (
    <>
      {/* Shared outline: every feature is anchored inside this same silhouette. */}
      {rows.map((row) => (
        <PixelRect key={`outline-${row.x}-${row.y}`} x={row.x - 3} y={row.y - 2} w={row.w + 6} h={row.h + 4} fill={OUTLINE} />
      ))}

      {rows.map((row) => (
        <PixelRect key={`skin-${row.x}-${row.y}`} x={row.x} y={row.y} w={row.w} h={row.h} fill={skin.base} />
      ))}

      {/* One consistent lighting model: highlight left/top, shade right/bottom. */}
      <rect x="33" y="25" width="10" height="26" fill={skin.light} opacity="0.46" />
      <rect x="30" y="34" width="4" height="13" fill={skin.light} opacity="0.26" />
      <rect x="61" y="26" width="5" height="29" fill={skin.shadow} opacity="0.82" />
      <rect x="56" y="56" width="8" height="7" fill={skin.shadow} opacity="0.58" />
      <rect x="40" y="63" width="16" height="3" fill={skin.shadow} opacity="0.42" />
      <rect x="34" y="48" width="5" height="3" fill={skin.blush} opacity="0.35" />
      <rect x="57" y="48" width="5" height="3" fill={skin.blush} opacity="0.28" />
    </>
  );
}

function Hair({ style, color, headShape }: { style: AvatarDNA['hairStyle']; color: string; headShape: HeadShape }) {
  const dark = OUTLINE;
  const shine = '#ffffff';
  const topY = headShape === 'square' ? 15 : 14;

  if (style === 'bald') {
    return (
      <>
        <rect x="38" y="18" width="20" height="3" fill={shine} opacity="0.12" />
        <rect x="34" y="22" width="6" height="2" fill={shine} opacity="0.1" />
      </>
    );
  }

  if (style === 'buzz') {
    return (
      <>
        <rect x="35" y="16" width="26" height="5" fill={dark} />
        <rect x="31" y="21" width="34" height="8" fill={dark} />
        <rect x="34" y="19" width="28" height="8" fill={color} />
        <rect x="31" y="25" width="34" height="4" fill={color} />
        <rect x="38" y="19" width="5" height="4" fill={shine} opacity="0.13" />
      </>
    );
  }

  if (style === 'side-part') {
    return (
      <>
        <rect x="34" y="13" width="27" height="6" fill={dark} />
        <rect x="30" y="18" width="36" height="9" fill={dark} />
        <rect x="28" y="25" width="13" height="9" fill={dark} />
        <rect x="58" y="24" width="11" height="8" fill={dark} />
        <rect x="36" y="15" width="23" height="6" fill={color} />
        <rect x="31" y="20" width="34" height="6" fill={color} />
        <rect x="31" y="26" width="10" height="5" fill={color} />
        <rect x="55" y="25" width="10" height="5" fill={color} />
        <rect x="41" y="18" width="3" height="9" fill={dark} opacity="0.58" />
        <rect x="45" y="18" width="10" height="3" fill={shine} opacity="0.12" />
      </>
    );
  }

  if (style === 'curly') {
    return (
      <>
        {[
          [33, topY, 9, 8],
          [42, topY - 2, 8, 8],
          [50, topY, 10, 8],
          [28, 21, 10, 9],
          [38, 20, 10, 9],
          [49, 20, 10, 9],
          [59, 22, 8, 8],
          [29, 29, 8, 5],
          [60, 29, 8, 5],
        ].map(([x, y, w, h]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} fill={dark} />
        ))}
        {[
          [35, topY + 2, 6, 5],
          [43, topY, 6, 5],
          [51, topY + 2, 6, 5],
          [31, 23, 7, 6],
          [40, 22, 7, 6],
          [50, 22, 7, 6],
          [59, 24, 6, 5],
        ].map(([x, y, w, h]) => (
          <rect key={`c-${x}-${y}`} x={x} y={y} width={w} height={h} fill={color} />
        ))}
      </>
    );
  }

  if (style === 'messy') {
    return (
      <>
        <rect x="34" y="13" width="27" height="6" fill={dark} />
        <rect x="29" y="19" width="39" height="10" fill={dark} />
        <rect x="27" y="27" width="12" height="8" fill={dark} />
        <rect x="59" y="26" width="11" height="8" fill={dark} />
        <rect x="36" y="15" width="8" height="6" fill={color} />
        <rect x="46" y="13" width="8" height="8" fill={color} />
        <rect x="55" y="16" width="7" height="7" fill={color} />
        <rect x="31" y="21" width="35" height="6" fill={color} />
        <rect x="30" y="28" width="9" height="4" fill={color} />
        <rect x="58" y="28" width="8" height="4" fill={color} />
        <rect x="39" y="21" width="4" height="4" fill={dark} opacity="0.46" />
        <rect x="52" y="21" width="4" height="4" fill={dark} opacity="0.46" />
      </>
    );
  }

  if (style === 'crop') {
    return (
      <>
        <rect x="34" y="15" width="28" height="6" fill={dark} />
        <rect x="30" y="21" width="36" height="7" fill={dark} />
        <rect x="31" y="27" width="10" height="6" fill={dark} />
        <rect x="56" y="27" width="10" height="6" fill={dark} />
        <rect x="36" y="17" width="24" height="5" fill={color} />
        <rect x="32" y="23" width="32" height="5" fill={color} />
        <rect x="35" y="28" width="7" height="3" fill={color} />
        <rect x="54" y="28" width="8" height="3" fill={color} />
      </>
    );
  }

  return (
    <>
      <rect x="34" y="14" width="28" height="7" fill={dark} />
      <rect x="30" y="20" width="36" height="9" fill={dark} />
      <rect x="29" y="28" width="9" height="6" fill={dark} />
      <rect x="59" y="28" width="8" height="6" fill={dark} />
      <rect x="36" y="16" width="24" height="6" fill={color} />
      <rect x="32" y="22" width="32" height="6" fill={color} />
      <rect x="31" y="29" width="7" height="3" fill={color} />
      <rect x="58" y="29" width="6" height="3" fill={color} />
      <rect x="41" y="17" width="8" height="3" fill={shine} opacity="0.12" />
    </>
  );
}

function Eyes({ face }: { face: FaceTemplate }) {
  const eyeY = layout.head.eyeY;
  const browY = layout.head.browY;
  const eyeColor = face === 'calm' ? '#1f2937' : '#020617';

  if (face === 'focused') {
    return (
      <>
        <rect x="34" y={browY} width="10" height="3" fill={OUTLINE} />
        <rect x="53" y={browY} width="10" height="3" fill={OUTLINE} />
        <rect x="36" y={eyeY} width="7" height="3" fill={eyeColor} />
        <rect x="54" y={eyeY} width="7" height="3" fill={eyeColor} />
        <rect x="40" y={eyeY} width="2" height="1" fill={WHITE} opacity="0.7" />
        <rect x="58" y={eyeY} width="2" height="1" fill={WHITE} opacity="0.7" />
      </>
    );
  }

  if (face === 'veteran') {
    return (
      <>
        <rect x="35" y={browY} width="9" height="2" fill={OUTLINE} />
        <rect x="53" y={browY} width="9" height="2" fill={OUTLINE} />
        <rect x="36" y={eyeY} width="6" height="3" fill={eyeColor} />
        <rect x="55" y={eyeY} width="6" height="3" fill={eyeColor} />
        <rect x="33" y="41" width="8" height="2" fill={OUTLINE_SOFT} opacity="0.24" />
        <rect x="55" y="41" width="8" height="2" fill={OUTLINE_SOFT} opacity="0.24" />
      </>
    );
  }

  if (face === 'calm') {
    return (
      <>
        <rect x="35" y={browY} width="9" height="2" fill={OUTLINE} opacity="0.82" />
        <rect x="53" y={browY} width="9" height="2" fill={OUTLINE} opacity="0.82" />
        <rect x="36" y={eyeY} width="7" height="2" fill={eyeColor} />
        <rect x="54" y={eyeY} width="7" height="2" fill={eyeColor} />
      </>
    );
  }

  return (
    <>
      <rect x="35" y={browY} width="9" height="2" fill={OUTLINE} />
      <rect x="53" y={browY} width="9" height="2" fill={OUTLINE} />
      <rect x="36" y={eyeY} width="7" height="4" fill={WHITE} opacity="0.82" />
      <rect x="54" y={eyeY} width="7" height="4" fill={WHITE} opacity="0.82" />
      <rect x="39" y={eyeY} width="3" height="4" fill={eyeColor} />
      <rect x="57" y={eyeY} width="3" height="4" fill={eyeColor} />
    </>
  );
}

function Nose({ skin, face }: { skin: SkinTone; face: FaceTemplate }) {
  const wide = face === 'veteran';

  return (
    <>
      <rect x="47" y="40" width="4" height="11" fill={skin.shadow} opacity="0.72" />
      <rect x="45" y="48" width={wide ? 8 : 7} height="3" fill={skin.dark} opacity="0.5" />
      <rect x="44" y="47" width="3" height="2" fill={skin.light} opacity="0.38" />
      <rect x="51" y="47" width="3" height="2" fill={skin.shadow} opacity="0.5" />
    </>
  );
}

function Mouth({ face }: { face: FaceTemplate }) {
  if (face === 'focused') {
    return <rect x="42" y="56" width="13" height="3" fill="#4a1f1d" opacity="0.86" />;
  }

  if (face === 'calm') {
    return (
      <>
        <rect x="42" y="56" width="12" height="2" fill="#4a1f1d" opacity="0.72" />
        <rect x="54" y="55" width="2" height="2" fill="#4a1f1d" opacity="0.72" />
      </>
    );
  }

  if (face === 'veteran') {
    return (
      <>
        <rect x="41" y="56" width="14" height="2" fill="#3f1715" opacity="0.82" />
        <rect x="43" y="59" width="10" height="2" fill={OUTLINE_SOFT} opacity="0.22" />
      </>
    );
  }

  return (
    <>
      <rect x="42" y="55" width="13" height="2" fill="#4a1f1d" opacity="0.82" />
      <rect x="45" y="57" width="8" height="2" fill="#7f2d2a" opacity="0.42" />
    </>
  );
}

function Beard({ style, color, skin }: { style: AvatarDNA['beardStyle']; color: string; skin: SkinTone }) {
  if (style === 'none') return null;

  const beardColor = color;
  const dark = OUTLINE;

  if (style === 'stubble') {
    return (
      <>
        <rect x="36" y="52" width="24" height="3" fill={beardColor} opacity="0.22" />
        <rect x="34" y="55" width="28" height="4" fill={beardColor} opacity="0.26" />
        <rect x="38" y="60" width="19" height="3" fill={beardColor} opacity="0.22" />
      </>
    );
  }

  if (style === 'moustache') {
    return (
      <>
        <rect x="40" y="51" width="16" height="3" fill={dark} opacity="0.45" />
        <rect x="42" y="51" width="5" height="3" fill={beardColor} />
        <rect x="50" y="51" width="5" height="3" fill={beardColor} />
      </>
    );
  }

  if (style === 'goatee') {
    return (
      <>
        <rect x="40" y="51" width="16" height="3" fill={beardColor} />
        <rect x="44" y="57" width="9" height="8" fill={dark} />
        <rect x="45" y="57" width="7" height="7" fill={beardColor} />
        <rect x="45" y="63" width="7" height="2" fill={skin.dark} opacity="0.22" />
      </>
    );
  }

  return (
    <>
      {/* Beard follows the jaw rows instead of floating below the mouth. */}
      <rect x="33" y="50" width="30" height="7" fill={dark} opacity="0.5" />
      <rect x="31" y="56" width="34" height="7" fill={dark} />
      <rect x="38" y="63" width="20" height="5" fill={dark} />
      <rect x="35" y="52" width="26" height="5" fill={beardColor} />
      <rect x="34" y="57" width="29" height="5" fill={beardColor} />
      <rect x="40" y="62" width="16" height="4" fill={beardColor} />
      <rect x="42" y="55" width="12" height="3" fill="#3f1715" opacity="0.82" />
    </>
  );
}

function Accessory({ index }: { index: number }) {
  if (index !== 0) return null;

  return (
    <>
      <rect x="33" y="35" width="12" height="2" fill={OUTLINE} opacity="0.92" />
      <rect x="52" y="35" width="12" height="2" fill={OUTLINE} opacity="0.92" />
      <rect x="45" y="36" width="7" height="1" fill={OUTLINE} opacity="0.8" />
      <rect x="36" y="36" width="6" height="3" fill={WHITE} opacity="0.22" />
      <rect x="55" y="36" width="6" height="3" fill={WHITE} opacity="0.22" />
    </>
  );
}

function AvatarBody({ dna, primaryColor, secondaryColor }: { dna: AvatarDNA; primaryColor: string; secondaryColor: string }) {
  const skin = SKIN_TONES[dna.skinToneIndex];
  const hairColor = HAIR_COLORS[dna.hairColorIndex];

  return (
    <>
      <Shirt primaryColor={primaryColor} secondaryColor={secondaryColor} style={dna.shirtStyle} />
      <Neck skin={skin} />
      <Ears skin={skin} headShape={dna.headShape} />
      <Head skin={skin} headShape={dna.headShape} />
      <Hair style={dna.hairStyle} color={hairColor} headShape={dna.headShape} />
      <Eyes face={dna.faceTemplate} />
      <Nose skin={skin} face={dna.faceTemplate} />
      <Beard style={dna.beardStyle} color={hairColor} skin={skin} />
      <Mouth face={dna.faceTemplate} />
      <Accessory index={dna.accessoryIndex} />
    </>
  );
}

export default function PlayerAvatar({
  seed,
  primaryColor = '#2563eb',
  secondaryColor = '#facc15',
  size = 168,
  className,
  title = 'Procedural pixel football player avatar',
}: PlayerAvatarProps) {
  const dna = generateAvatarDNA(seed);
  const background = BACKGROUNDS[dna.backgroundIndex];

  return (
    <svg
      className={className ? `pixel-avatar ${className}` : 'pixel-avatar'}
      width={size}
      height={size}
      viewBox="0 0 96 96"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      <title>{title}</title>
      <Background colors={background} variant={dna.backgroundIndex} />
      <AvatarBody dna={dna} primaryColor={primaryColor} secondaryColor={secondaryColor} />
      <rect x="5" y="5" width="86" height="86" fill="none" stroke={OUTLINE} strokeWidth="3" />
      <rect x="9" y="9" width="78" height="78" fill="none" stroke={WHITE} strokeOpacity="0.16" strokeWidth="1" />
    </svg>
  );
}
