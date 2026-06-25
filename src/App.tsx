import { visualPlayers } from './data/players';

function App() {
  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Visual test only · no gameplay</p>
        <h1>v4.1 Asset-Based Portrait Direction</h1>
        <p className="subtitle">
          Test simplu pentru direcția vizuală: 6 portrete statice 48×48 px, refăcute pe baza avatarului 5: păr compact, gură vizibilă, nas mai mic.
          Scopul nu este generatorul final, ci să alegem dacă stilul de portret merge în direcția bună.
        </p>
      </section>

      <section className="decision-panel">
        <div>
          <strong>Ce testăm aici</strong>
          <span>baza avatar-05 · nas corectat · păr compact · gură vizibilă · 48×48 px</span>
        </div>
        <div>
          <strong>Ce NU este încă</strong>
          <span>nu este generator procedural final · nu are toate variantele · nu este gameplay</span>
        </div>
      </section>

      <section className="cards-grid" aria-label="Static portrait candidates">
        {visualPlayers.map((player) => (
          <article className="player-card" key={player.id} style={{ '--club-color': player.clubColor } as React.CSSProperties}>
            <div className="card-top">
              <span className="number">{player.number}</span>
              <span className="position">{player.position}</span>
            </div>
            <div className="portrait-frame">
              <img className="portrait" src={player.portrait} alt={`${player.name} portrait`} />
            </div>
            <div className="identity">
              <h2>{player.name}</h2>
              <span>{player.country} · OVR {player.overall}</span>
            </div>
            <p className="note">{player.note}</p>
          </article>
        ))}
      </section>

      <section className="feedback-box">
        <h2>Feedback util pentru următoarea iterație</h2>
        <p>
          Uită-te doar la portrete, nu la card. Spune-mi care dintre cele 6 este cea mai aproape de direcția dorită
          și ce trebuie schimbat: cap, ochi, păr, barbă, culori, nivel de pixelare sau expresie.
        </p>
      </section>
    </main>
  );
}

export default App;
