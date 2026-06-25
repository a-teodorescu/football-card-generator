import { useMemo, useState } from 'react';
import PlayerCardDemo from './game/avatar/PlayerCardDemo';
import { generateDemoSquad } from './game/demo/squadGenerator';

function App() {
  const [squadNumber, setSquadNumber] = useState(1);
  const squadSeed = `demo-squad-${squadNumber}`;
  const demoPlayers = useMemo(() => generateDemoSquad(squadSeed, 12), [squadSeed]);

  const averageOverall = Math.round(
    demoPlayers.reduce((total, player) => total + player.overall, 0) / demoPlayers.length,
  );
  const averagePotential = Math.round(
    demoPlayers.reduce((total, player) => total + player.potential, 0) / demoPlayers.length,
  );
  const topTalent = demoPlayers.reduce((best, player) => (player.potential > best.potential ? player : best), demoPlayers[0]);

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Football Manager Lite</p>
        <h1>Procedural Pixel Player Cards</h1>
        <p className="subtitle">
          Demo v1.2: carduri redesenate, avataruri mai variate și un prim panou de lot. Totul este generat
          procedural, fără AI, fără poze reale și fără cost per card.
        </p>

        <div className="club-panel" aria-label="Demo squad summary">
          <div>
            <span>Club</span>
            <strong>{demoPlayers[0]?.clubName ?? 'Demo FC'}</strong>
          </div>
          <div>
            <span>Sezon</span>
            <strong>2026/27</strong>
          </div>
          <div>
            <span>Avg OVR</span>
            <strong>{averageOverall}</strong>
          </div>
          <div>
            <span>Avg POT</span>
            <strong>{averagePotential}</strong>
          </div>
          <div>
            <span>Top talent</span>
            <strong>{topTalent?.name ?? '-'}</strong>
          </div>
        </div>

        <div className="demo-toolbar" aria-label="Demo controls">
          <div>
            <span className="toolbar-label">Lot demo</span>
            <strong>#{squadNumber}</strong>
          </div>
          <button type="button" onClick={() => setSquadNumber((current) => current + 1)}>
            Generează alt lot
          </button>
        </div>
      </section>

      <section className="cards-grid" aria-label="Demo player cards">
        {demoPlayers.map((player) => (
          <PlayerCardDemo key={player.id} player={player} />
        ))}
      </section>
    </main>
  );
}

export default App;
