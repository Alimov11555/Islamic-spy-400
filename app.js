// v5 — Modal karta ko'rinishida, hammaga bir xil so'z + 1 ta shpion

if (typeof NAMES === 'undefined' || !Array.isArray(NAMES)) {
  alert('Ошибка: names.js не загружен.');
}

const MIN_PLAYERS = 3, MAX_PLAYERS = 12;
const VIEW_MS = 3000;

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const numInput = document.getElementById('num');
const playersArea = document.getElementById('playersArea');

let game = null; // {topic, spyIndex, shown:Set, n}

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

function startGame(){
  const n = parseInt(numInput.value) || 4;
  if (n < MIN_PLAYERS || n > MAX_PLAYERS) {
    alert(`Количество игроков должно быть от ${MIN_PLAYERS} до ${MAX_PLAYERS}`);
    return;
  }
  const topic = NAMES[Math.floor(Math.random()*NAMES.length)]; // bir xil so'z
  const spyIndex = Math.floor(Math.random()*n);
  game = { topic, spyIndex, shown: new Set(), n };
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

  // Modal yaratish
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.background = 'rgba(0,0,0,0.8)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = '9999';
  modal.style.color = '#fff';
  modal.style.fontSize = '2rem';
  modal.style.fontWeight = 'bold';

  modal.textContent = (i === game.spyIndex) ? 'Вы — Шпион!' : game.topic;
  document.body.appendChild(modal);

  // 3 soniyadan keyin yopish
  setTimeout(()=>{
    modal.remove();
    btn.textContent = 'Показано';
    btn.disabled = true;
    game.shown.add(i);
  }, VIEW_MS);
}
