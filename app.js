
let presets = [];
let selected = null;

const presetSelect = document.getElementById('presetSelect');
const avatarImg = document.getElementById('avatarImg');
const skinValue = document.getElementById('skinValue');
const hairValue = document.getElementById('hairValue');
const beardValue = document.getElementById('beardValue');
const shirtValue = document.getElementById('shirtValue');
const randomBtn = document.getElementById('randomBtn');
const downloadBtn = document.getElementById('downloadBtn');
const galleryGrid = document.getElementById('galleryGrid');

function setPreset(id) {
  selected = presets.find(p => String(p.id) === String(id)) || presets[0];
  if (!selected) return;

  presetSelect.value = selected.id;
  avatarImg.src = selected.imagePreview;
  skinValue.textContent = selected.skin;
  hairValue.textContent = selected.hair;
  beardValue.textContent = selected.beard;
  shirtValue.textContent = selected.shirt;

  document.querySelectorAll('.card').forEach(card => {
    card.classList.toggle('active', String(card.dataset.id) === String(selected.id));
  });
}

function render() {
  presetSelect.innerHTML = presets.map(p => (
    `<option value="${p.id}">${p.name} — ${p.shirt} / ${p.hair}</option>`
  )).join('');

  galleryGrid.innerHTML = presets.map(p => (
    `<article class="card" data-id="${p.id}">
      <img src="${p.imagePreview}" alt="${p.name}">
      <span>${p.name}</span>
    </article>`
  )).join('');

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => setPreset(card.dataset.id));
  });

  setPreset(presets[0]?.id);
}

presetSelect.addEventListener('change', e => setPreset(e.target.value));

randomBtn.addEventListener('click', () => {
  if (!presets.length) return;
  const randomPreset = presets[Math.floor(Math.random() * presets.length)];
  setPreset(randomPreset.id);
});

downloadBtn.addEventListener('click', () => {
  if (!selected) return;
  const a = document.createElement('a');
  a.href = selected.imagePreview;
  a.download = `football-avatar-${String(selected.id).padStart(2, '0')}.png`;
  a.click();
});

fetch('presets.json')
  .then(res => res.json())
  .then(data => {
    presets = data;
    render();
  })
  .catch(err => {
    console.error(err);
    galleryGrid.innerHTML = '<p>Nu am putut încărca preset-urile.</p>';
  });
