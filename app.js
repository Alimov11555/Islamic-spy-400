// v3 — Hamma uchun BIR xil so'z + 1 ta shpion.
// Ko'rsatkich 3 soniyadan keyin avtomatik yopiladi va tugma bloklanadi.

if (typeof NAMES === 'undefined' || !Array.isArray(NAMES)) {
  alert('Ошибка: names.js не загружен.');
}

const MIN_PLAYERS = 3, MAX_PLAYERS = 12;
const VIEW_MS = 3000; // 3s ko‘rsatish

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
  const topic = NAMES[Math.floor(Math.random()*NAMES.length)]; // BIR xil so'z
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
        <span id="role${i}" style="margin-left:8px;color:#333"></span>
      </div>`;
    playersArea.appendChild(div);
  }

  document.querySelectorAll('.roleBtn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const idx = parseInt(btn.dataset.i);
      showRoleOnce(idx, btn);
    });
  });
}

function showRoleOnce(i, btn){
  if (!game || game.shown.has(i)) return;
  const span = document.getElementById('role'+i);
  if (!span) return;

  span.textContent = (i === game.spyIndex) ? 'Вы — Шпион!' : game.topic;

  setTimeout(()=>{
    span.textContent = '';     // avtomatik yopish
    btn.textContent = 'Показано';
    btn.disabled = true;       // qayta ko'rsatmaydi
    game.shown.add(i);
  }, VIEW_MS);
}
