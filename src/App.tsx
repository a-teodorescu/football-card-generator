import { useMemo, useState } from 'react';
import PlayerCardDemo from './game/avatar/PlayerCardDemo';
import { generateDemoSquad } from './game/demo/squadGenerator';

function App() {
  const [squadNumber, setSquadNumber] = useState(1);
  const squadSeed = `demo-squad-${squadNumber}`;
  const demoPlayers = useMemo(() => generateDemoSquad(squadSeed, 12), [squadSeed]);

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Football Manager Lite</p>
        <h1>Procedural Pixel Player Cards</h1>
        <p className="subtitle">
          Demo v1.1: un lot de 12 jucători generați procedural. Fiecare jucător are un seed stabil,
          deci aceeași persoană primește mereu același avatar pixel-art.
        </p>

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
