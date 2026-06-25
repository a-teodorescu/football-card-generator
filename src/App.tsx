import PlayerCardDemo from './game/avatar/PlayerCardDemo';

const demoPlayers = [
  {
    id: 'player_1024',
    name: 'Alex Popa',
    age: 19,
    nationality: 'RO',
    position: 'ST',
    overall: 68,
    potential: 82,
    clubName: 'FC București',
    clubPrimaryColor: '#2563eb',
    clubSecondaryColor: '#facc15',
  },
  {
    id: 'player_2048',
    name: 'Mihai Stan',
    age: 24,
    nationality: 'RO',
    position: 'CM',
    overall: 73,
    potential: 79,
    clubName: 'Rapid Nord',
    clubPrimaryColor: '#7c2d12',
    clubSecondaryColor: '#fbbf24',
  },
  {
    id: 'player_4096',
    name: 'David Marin',
    age: 17,
    nationality: 'RO',
    position: 'GK',
    overall: 61,
    potential: 86,
    clubName: 'Academia Sud',
    clubPrimaryColor: '#16a34a',
    clubSecondaryColor: '#ffffff',
  },
];

function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Football Manager Lite</p>
        <h1>Procedural Pixel Player Cards</h1>
        <p className="subtitle">
          Demo v1: avataruri SVG generate procedural, fără AI, fără poze reale și fără cost per card.
        </p>
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
