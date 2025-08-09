// v7 — Spy sonini tanlash, modal 2s ko'rinadi

if (typeof NAMES === 'undefined' || !Array.isArray(NAMES)) {
  alert('Ошибка: names.js не загружен.');
}

const MIN_PLAYERS = 3, MAX_PLAYERS = 12;
const VIEW_MS = 2000;

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const numInput = document.getElementById('num');
const spyCountSelect = document.getElementById('spyCount');
const playersArea = document.getElementById('playersArea');

let game = null;

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

function startGame(){
  const n = parseInt(numInput.value) || 4;
  if (n < MIN_PLAYERS || n > MAX_PLAYERS) {
    alert(`Количество игроков должно быть от ${MIN_PLAYERS} до ${MAX_PLAYERS}`);
    return;
  }

  const spyCount = Math.min(parseInt(spyCountSelect.value), n - 1);
  const topic = NAMES[Math.floor(Math.random()*NAMES.length)];

  // Shpion indekslarini tanlash
  let spyIndices = [];
  while (spyIndices.length < spyCount) {
    let rnd = Math.floor(Math.random()*n);
    if (!spyIndices.includes(rnd)) spyIndices.push(rnd);
  }

  game = { topic, spyIndices, shown: new Set(), n };
  renderPlayers(n);
}

function resetGame(){
  playersArea.innerHTML = '';
  game = null;
}

function renderPlayers(n){
  playersArea.innerHTML = '';
  for (let i=0;i<n;i++){
    const div = document.createElement('div');
    div.className = 'playerCard';
    div.innerHTML = `
      <div><strong>Игрок ${i+1}</strong></div>
      <div>
        <button data-i="${i}" class="roleBtn">Получить роль</button>
      </div>`;
    playersArea.appendChild(div);
  }

  document.querySelectorAll('.roleBtn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const idx = parseInt(btn.dataset.i);
      showRoleModal(idx, btn);
    });
  });
}

function showRoleModal(i, btn){
  if (!game || game.shown.has(i)) return;

  const modal = document.createElement('div');
  modal.className = 'modalCard';
  modal.textContent = game.spyIndices.includes(i) ? 'Вы — Шпион!' : game.topic;
  document.body.appendChild(modal);

  setTimeout(()=>{
    modal.remove();
    btn.textContent = 'Показано';
    btn.disabled = true;
    game.shown.add(i);
  }, VIEW_MS);
}
