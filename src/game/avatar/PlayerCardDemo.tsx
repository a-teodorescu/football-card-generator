import type { CSSProperties } from 'react';
import PlayerAvatar from './PlayerAvatar';
import type { PlayerCardData } from './avatarTypes';

type PlayerCardDemoProps = {
  player: PlayerCardData;
};

export default function PlayerCardDemo({ player }: PlayerCardDemoProps) {
  const seed = player.visualSeed ?? `${player.id}-${player.name}-${player.nationality}`;

  return (
    <article
      className="player-card"
      style={{
        '--club-primary': player.clubPrimaryColor,
      } as CSSProperties}
    >
      <div className="card-content">
        <div className="card-topline">
          <span className="position-badge">{player.position}</span>
          <span className="nationality-badge">{player.nationality}</span>
        </div>

        <div className="avatar-panel">
          <PlayerAvatar
            seed={seed}
            primaryColor={player.clubPrimaryColor}
            secondaryColor={player.clubSecondaryColor}
            size={164}
            title={`${player.name} procedural pixel avatar`}
          />
        </div>

        <div>
          <h2 className="player-name">{player.name}</h2>
          <p className="club-name">{player.clubName}</p>
        </div>

        <div className="stats-row">
          <div className="stat-pill">
            <span className="stat-label">AGE</span>
            <span className="stat-value">{player.age}</span>
          </div>
          <div className="stat-pill">
            <span className="stat-label">OVR</span>
            <span className="stat-value">{player.overall}</span>
          </div>
          <div className="stat-pill">
            <span className="stat-label">POT</span>
            <span className="stat-value">{player.potential}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
