const suits=['♥','♦','♣','♠'];
const colors={'♥':'red','♦':'red','♣':'black','♠':'black'};
let deck=[];
let tableau=[];
let foundations={'♥':[], '♦':[], '♣':[], '♠':[]};
let stock=[];
let waste=[];

function createDeck(){
  deck=[];
  for(let s of suits){
    for(let v=1;v<=13;v++){
      deck.push({suit:s,value:v});
    }
  }
  deck.sort(()=>Math.random()-0.5);
}

function deal(){
  tableau=[];
  for(let i=0;i<7;i++){
    tableau[i]=deck.splice(0,i+1);
  }
  stock=deck;
}

function cardText(c){
  return c.value+c.suit;
}

function render(){
  const t=document.getElementById('tableau');
  t.innerHTML='';
  tableau.forEach((col,i)=>{
    const div=document.createElement('div');
    div.className='column';
    col.forEach((c,ci)=>{
      const cd=document.createElement('div');
      cd.className='card';
      cd.style.color=colors[c.suit];
      cd.innerText=cardText(c);
      cd.onclick=()=>tryMoveToFoundation(i,ci);
      div.appendChild(cd);
    });
    t.appendChild(div);
  });

  const f=document.getElementById('foundations');
  f.innerHTML='';
  suits.forEach(s=>{
    const p=document.createElement('div');
    p.className='pile';
    if(foundations[s].length){
      const c=foundations[s].slice(-1)[0];
      p.innerText=cardText(c);
      p.style.color=colors[c.suit];
    }
    f.appendChild(p);
  });

  document.getElementById('waste').innerText =
    waste.length?cardText(waste[waste.length-1]):'';
}

function tryMoveToFoundation(colIndex,cardIndex){
  const card=tableau[colIndex][cardIndex];
  const pile=foundations[card.suit];
  if((pile.length===0 && card.value===1) ||
     (pile.length && pile[pile.length-1].value===card.value-1)){
        pile.push(card);
        tableau[colIndex].splice(cardIndex,1);
        render();
        checkWin();
  }
}

document.getElementById('stock').onclick=()=>{
  if(stock.length){
    waste.push(stock.pop());
    render();
  }
};

function checkWin(){
  const total=Object.values(foundations)
    .reduce((a,b)=>a+b.length,0);
  if(total===52){
    document.getElementById('gift')
      .classList.remove('hidden');
  }
}

createDeck();
deal();
render();
