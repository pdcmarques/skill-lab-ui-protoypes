const representation = document.getElementById('representation');
const input = document.getElementById('answerInput');
const feedback = document.getElementById('feedback');
const drawer = document.getElementById('helperDrawer');
const toggle = document.getElementById('helperToggle');

function tableSVG(colorA='#4e88ff', colorB='#35b59b'){
  return `<svg class="table-svg" viewBox="0 0 160 148" aria-hidden="true">
  <rect class="chair" x="8" y="50" rx="10" ry="10" width="22" height="38"/>
  <rect class="chair" x="130" y="50" rx="10" ry="10" width="22" height="38"/>
  <rect class="chair" x="53" y="4" rx="10" ry="10" width="54" height="24"/>
  <rect class="chair" x="53" y="120" rx="10" ry="10" width="54" height="24"/>
  <ellipse class="table-rim" cx="80" cy="74" rx="42" ry="42"/>
  <ellipse class="table-top" cx="80" cy="74" rx="34" ry="34"/>
  <circle class="plate" cx="80" cy="74" r="8"/>
  <circle class="head" fill="${colorA}" cx="80" cy="24" r="12"/><path class="body" fill="${colorA}" d="M66 48 Q80 34 94 48 L94 61 L66 61 Z"/>
  <circle class="head" fill="${colorB}" cx="80" cy="124" r="12"/><path class="body" fill="${colorB}" d="M66 97 Q80 110 94 97 L94 84 L66 84 Z"/>
  <circle class="head" fill="#f7bf4d" cx="23" cy="73" r="12"/><path class="body" fill="#f7bf4d" d="M36 59 Q27 74 36 88 L49 88 L49 59 Z"/>
  <circle class="head" fill="#f283a8" cx="137" cy="73" r="12"/><path class="body" fill="#f283a8" d="M111 59 L111 88 L124 88 Q133 74 124 59 Z"/>
  </svg>`;
}
function renderGroups(){ representation.innerHTML = `<div class="groups">${Array.from({length:6},(_,i)=>tableSVG(i%2?'#4e88ff':'#7f74e8',i%2?'#35b59b':'#35b59b')).join('')}</div>`; }
function renderArray(){ representation.innerHTML = `<div class="array">${'<span class="counter"></span>'.repeat(24)}</div>`; }
function renderEquation(){ representation.innerHTML = `<div class="equation"><span>6 × 4</span><span>=</span><span class="unknown">?</span></div>`; }
function renderNumberline(){
  let ticks=''; let nums=''; let jumps='';
  for(let i=0;i<=24;i+=4){ const left=(i/24)*100; ticks += `<span class="tick" style="left:${left}%"></span>`; nums += `<span class="num" style="left:${left}%">${i}</span>`; }
  for(let i=0;i<6;i++){ jumps += `<span class="jump" style="left:${(i*4/24)*100}%; width:${(4/24)*100}%"></span>`; }
  representation.innerHTML = `<div class="numberline"><div class="axis">${ticks}${nums}${jumps}</div></div>`;
}
const views = {groups:renderGroups,array:renderArray,equation:renderEquation,numberline:renderNumberline};
document.querySelectorAll('.rep-btn').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.rep-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  views[btn.dataset.view]();
}));
views.groups();
document.getElementById('checkBtn').addEventListener('click',()=>{
  const v=(input.value||'').trim();
  feedback.className='feedback show ' + (v==='24'?'good':'bad');
  feedback.innerHTML = v==='24' ? '✓ Yes — 6 groups of 4 make 24 children.' : 'Try again. Think of 6 equal groups with 4 children in each group.';
});
input.addEventListener('keydown',e=>{ if(e.key==='Enter') document.getElementById('checkBtn').click(); });
toggle.addEventListener('click',()=> drawer.classList.toggle('open'));
document.querySelectorAll('[data-open-drawer]').forEach(el=>el.addEventListener('click',()=>drawer.classList.add('open')));
