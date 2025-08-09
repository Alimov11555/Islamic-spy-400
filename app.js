if (typeof NAMES === 'undefined' || !Array.isArray(NAMES)) {
  alert('Ошибка: names.js не загружен.'); 
}

const MIN_PLAYERS=3, MAX_PLAYERS=12;
const startBtn=document.getElementById('startBtn');
const resetBtn=document.getElementById('resetBtn');
const numInput=document.getElementById('num');
const playersArea=document.getElementById('playersArea');
let currentGame=null;

function sample(a,n){
  const c=a.slice(), r=[];
  for(let i=0;i<n;i++){ const idx=Math.floor(Math.random()*c.length); r.push(c.splice(idx,1)[0]); }
  return r;
}

function startGame(){
  const n=parseInt(numInput.value)||4;
  if(n<MIN_PLAYERS||n>MAX_PLAYERS){ alert(`Количество игроков должно быть от ${MIN_PLAYERS} до ${MAX_PLAYERS}`); return; }
  if(n>NAMES.length){ alert('Недостаточно имен в базе.'); return; }
  const chosen=sample(NAMES,n);
  const spyIndex=Math.floor(Math.random()*n);
  currentGame={players:chosen, spyIndex};
  renderPlayers();
}

function renderPlayers(){
  playersArea.innerHTML='';
  currentGame.players.forEach((p,i)=>{
    const div=document.createElement('div');
    div.className='playerCard';
    div.innerHTML=`<div><strong>Игрок ${i+1}</strong></div>
      <div>
        <button data-i="${i}" class="roleBtn">Получить роль</button>
        <span id="role${i}" style="margin-left:8px;color:#333"></span>
      </div>`;
    playersArea.appendChild(div);
  });
  Array.from(document.getElementsByClassName('roleBtn')).forEach(btn=>{
    btn.addEventListener('click',()=>{ const idx=parseInt(btn.dataset.i); showRole(idx); });
  });
}

function showRole(i){
  const span=document.getElementById('role'+i);
  if(!span) return;
  span.textContent = (i===currentGame.spyIndex) ? 'Вы — Шпион!' : currentGame.players[i];
}

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', ()=>{ playersArea.innerHTML=''; currentGame=null; });
