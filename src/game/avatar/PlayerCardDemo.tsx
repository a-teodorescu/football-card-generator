import type { CSSProperties } from 'react';
import PlayerAvatar from './PlayerAvatar';
import type { PlayerCardData } from './avatarTypes';

type PlayerCardDemoProps = {
  player: PlayerCardData;
};

const positionLabels: Record<string, string> = {
  GK: 'Goalkeeper',
  LB: 'Left Back',
  CB: 'Centre Back',
  RB: 'Right Back',
  DM: 'Defensive Mid',
  CM: 'Central Mid',
  AM: 'Attacking Mid',
  LW: 'Left Wing',
  RW: 'Right Wing',
  ST: 'Striker',
};

function getPotentialClass(overall: number, potential: number) {
  const gap = potential - overall;

  if (potential >= 84 || gap >= 18) return 'elite';
  if (potential >= 76 || gap >= 10) return 'good';
  return 'solid';
}

export default function PlayerCardDemo({ player }: PlayerCardDemoProps) {
  const seed = player.visualSeed ?? `${player.id}-${player.name}-${player.nationality}`;
  const potentialClass = getPotentialClass(player.overall, player.potential);
  const roleLabel = positionLabels[player.position] ?? 'Player';

  return (
    <article
      className="player-card"
      style={{
        '--club-primary': player.clubPrimaryColor,
        '--club-secondary': player.clubSecondaryColor,
      } as CSSProperties}
    >
      <div className="card-content">
        <div className="card-header">
          <div className="rating-stack" aria-label={`Overall rating ${player.overall}`}>
            <span className="rating-value">{player.overall}</span>
            <span className="rating-label">OVR</span>
          </div>

          <div className="identity-stack">
            <span className="position-badge">{player.position}</span>
            <span className="role-label">{roleLabel}</span>
          </div>

          <span className="nationality-badge">{player.nationality}</span>
        </div>

        <div className="avatar-panel">
          <PlayerAvatar
            seed={seed}
            primaryColor={player.clubPrimaryColor}
            secondaryColor={player.clubSecondaryColor}
            size={144}
            title={`${player.name} procedural pixel avatar`}
          />
        </div>

        <div className="player-info">
          <h2 className="player-name">{player.name}</h2>
          <p className="club-name">{player.clubName}</p>
        </div>

        <div className="quick-stats" aria-label="Player summary">
          <div className="quick-stat">
            <span>Age</span>
            <strong>{player.age}</strong>
          </div>
          <div className={`quick-stat potential ${potentialClass}`}>
            <span>Potential</span>
            <strong>{player.potential}</strong>
          </div>
          <div className="quick-stat">
            <span>Growth</span>
            <strong>+{Math.max(0, player.potential - player.overall)}</strong>
          </div>
        </div>
      </div>
    </article>
  );
}
