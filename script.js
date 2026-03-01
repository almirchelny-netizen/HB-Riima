const suits = ['♥','♦','♣','♠'];
let deck = [];
let foundation = [];
let selected = null;

function init() {
  const cooldown = localStorage.getItem('cooldown');
  if (cooldown) {
    const remaining = cooldown - Date.now();
    if (remaining > 0) {
      showTimer(remaining);
      return;
    }
  }

  deck = [];
  foundation = [];
  for (let s of suits) {
    for (let i=1;i<=13;i++) {
      deck.push({suit:s,value:i});
    }
  }

  deck.sort(()=>Math.random()-0.5);
  render();
}

function render() {
  const game = document.getElementById('game');
  game.innerHTML = '';
  deck.forEach((card, i)=>{
    const div = document.createElement('div');
    div.className='card';
    div.innerText = card.value + card.suit;
    div.onclick=()=>moveCard(i);
    game.appendChild(div);
  });
}

function moveCard(i){
  foundation.push(deck.splice(i,1)[0]);
  render();
  if(deck.length===0){
    win();
  }
}

function win(){
  document.getElementById('gift').classList.remove('hidden');
}

function startCooldown(){
  const next = Date.now()+60*60*1000;
  localStorage.setItem('cooldown', next);
  location.reload();
}

function showTimer(ms){
  const timer=document.getElementById('timer');
  const game=document.getElementById('game');
  game.innerHTML='';
  setInterval(()=>{
    const diff=localStorage.getItem('cooldown')-Date.now();
    if(diff<=0){location.reload();}
    const m=Math.floor(diff/60000);
    const s=Math.floor((diff%60000)/1000);
    timer.innerText='Следующий уровень через '+m+':'+('0'+s).slice(-2);
  },1000);
}

init();
