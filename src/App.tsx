import { useMemo, useState } from 'react';
import PlayerCardDemo from './game/avatar/PlayerCardDemo';
import { generateDemoSquad } from './game/demo/squadGenerator';

function App() {
  const [squadNumber, setSquadNumber] = useState(1);
  const squadSeed = `clean-portrait-squad-${squadNumber}`;
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
        <p className="eyebrow">Clean 16-bit Pixel-Art Football Manager Portrait Style</p>
        <h1>Player Portrait Generator v3.0</h1>
        <p className="subtitle">
          Reconstrucție pe avatar intern 48x48: portrete head + shoulders, păr compact, barbă integrată,
          siluetă matură și carduri mai simple, apropiate de un football manager.
        </p>

        <div className="club-panel" aria-label="Demo squad summary">
          <div>
            <span>Style</span>
            <strong>Clean 16-bit</strong>
          </div>
          <div>
            <span>Avatar base</span>
            <strong>48x48</strong>
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
