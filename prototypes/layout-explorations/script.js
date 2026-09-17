const rep=document.getElementById('representation');
const answer=document.getElementById('answer');
const feedback=document.getElementById('feedback');
const drawer=document.getElementById('drawer');

function tableSVG(a='#4e88ff',b='#35b59b'){
return `<svg class="table-svg" viewBox="0 0 180 170" aria-hidden="true">
<rect class="chair" x="12" y="58" rx="12" width="25" height="45"/><rect class="chair" x="143" y="58" rx="12" width="25" height="45"/><rect class="chair" x="58" y="8" rx="12" width="64" height="27"/><rect class="chair" x="58" y="135" rx="12" width="64" height="27"/>
<ellipse class="rim" cx="90" cy="85" rx="49" ry="49"/><ellipse class="top" cx="90" cy="85" rx="40" ry="40"/><circle class="plate" cx="90" cy="85" r="9"/>
<circle class="head" fill="${a}" cx="90" cy="31" r="13"/><path class="body-shape" fill="${a}" d="M74 58 Q90 42 106 58 L106 71 L74 71 Z"/>
<circle class="head" fill="${b}" cx="90" cy="139" r="13"/><path class="body-shape" fill="${b}" d="M74 112 Q90 128 106 112 L106 99 L74 99 Z"/>
<circle class="head" fill="#f6bd4d" cx="29" cy="85" r="13"/><path class="body-shape" fill="#f6bd4d" d="M43 69 Q34 85 43 101 L57 101 L57 69 Z"/>
<circle class="head" fill="#f483a9" cx="151" cy="85" r="13"/><path class="body-shape" fill="#f483a9" d="M123 69 L123 101 L137 101 Q146 85 137 69 Z"/>
</svg>`}
function groups(){rep.innerHTML=`<div class="groups">${Array.from({length:6},(_,i)=>tableSVG(i%2?'#4e88ff':'#8278e8','#35b59b')).join('')}</div>`}
function array(){rep.innerHTML=`<div class="array">${'<span class="counter"></span>'.repeat(24)}</div>`}
function equation(){rep.innerHTML='<div class="equation"><span>6 × 4</span><span>=</span><span class="unknown">?</span></div>'}
function numberline(){let t='',n='',j='';for(let i=0;i<=24;i+=4){const l=(i/24)*100;t+=`<span class="tick" style="left:${l}%"></span>`;n+=`<span class="num" style="left:${l}%">${i}</span>`}for(let i=0;i<6;i++)j+=`<span class="jump" style="left:${(i*4/24)*100}%;width:${(4/24)*100}%"></span>`;rep.innerHTML=`<div class="numberline"><div class="axis">${t}${n}${j}</div></div>`}
const views={groups,array,numberline,equation};groups();
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-view]').forEach(x=>x.classList.remove('active'));b.classList.add('active');views[b.dataset.view]()}));
document.getElementById('check').addEventListener('click',()=>{const ok=answer.value.trim()==='24';feedback.className='feedback show'+(ok?'':' bad');feedback.textContent=ok?'✓ Correct — 6 groups of 4 make 24.':'Try again: 6 equal groups, 4 in each group.'});
answer.addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('check').click()});
document.getElementById('helper').addEventListener('click',()=>drawer.classList.toggle('open'));
