// app.js — “Islamic Spy” (hamma uchun bitta so‘z, bitta shpion)
// Ruscha UI, 3–12 o‘yinchi, rol ko‘rinsa 3s ko‘rinib, o‘zi yopiladi (1 marta)

if (typeof NAMES === 'undefined' || !Array.isArray(NAMES)) {
  alert('Ошибка: names.js не загружен.'); 
}

const MIN_PLAYERS = 3, MAX_PLAYERS = 12;
const VIEW_MS = 3000; // Rol ko‘rinish vaqti (ms). Xohlasangiz 2000 yoki 4000 qiling.

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const numInput = document.getElementById('num');
const playersArea = document.getElementById('playersArea');

let currentGame = null; // {topic, spyIndex, shown: Set()}

function startGame(){
  const n = parseInt(numInput.value) || 4;
  if (n < MIN_PLAYERS || n > MAX_PLAYERS) {
    alert(`Количество игроков должно быть от ${MIN_PLAYERS} до ${MAX_PLAYERS}`);
    return;
  }
  if (NAMES.length === 0) {
    alert('База имен пуста.');
    return;
  }

  // --- MUHIM O‘ZGARISH: endi barchaga bitta so‘z beramiz ---
  const topic = NAMES[Math.floor(Math.random()*NAMES.length)]; // bitta nom
  const spyIndex = Math.floor(Math.random()*n);

  currentGame = { topic, spyIndex, shown: new Set(), n };
  renderPlayers(n);
}

function renderPlayers(n){
  playersArea.innerHTML = '';
  for (let i = 0; i < n; i++){
    const div = document.createElement('div');
    div.className = 'playerCard';
    div.innerHTML = `
      <div><strong>Игрок ${i+1}</strong></div>
      <div>
        <button data-i="${i}" class="roleBtn">Получить роль</button>
        <span id="role${i}" style="margin-left:8px;color:#333"></span>
      </div>
    `;
    playersArea.appendChild(div);
  }

  Array.from(document.getElementsByClassName('roleBtn')).forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const idx = parseInt(btn.dataset.i);
      showRoleOnce(idx, btn);
    });
  });
}

// Har bir o‘yinchi rolini Faqat 1 marta ko‘ra oladi, 3s dan keyin avtomatik yopiladi
function showRoleOnce(i, buttonEl){
  if (!currentGame) return;
  if (currentGame.shown.has(i)) return; // allaqachon ko‘rgan bo‘lsa, qayta bermaymiz

  const span = document.getElementById('role'+i);
  if (!span) return;

  const isSpy = (i === currentGame.spyIndex);
  span.textContent = isSpy ? 'Вы — Шпион!' : currentGame.topic;

  // 3 sekunddan keyin avtomatik yashirish va tugmani bloklash
  setTimeout(()=>{
    span.textContent = '';          // yopamiz
    buttonEl.textContent = 'Показано';
    buttonEl.disabled = true;       // endi qayta ko‘rsatmaydi
    currentGame.shown.add(i);
  }, VIEW_MS);
}

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', ()=>{
  playersArea.innerHTML = '';
  currentGame = null;
});
