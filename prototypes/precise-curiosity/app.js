const representation = document.getElementById('representation');
const visualLabel = document.getElementById('visualLabel');
const answer = document.getElementById('answer');
const good = document.getElementById('goodFeedback');
const bad = document.getElementById('badFeedback');
const coach = document.getElementById('coach');
const coachBody = document.getElementById('coachBody');
const backdrop = document.getElementById('sheetBackdrop');
let current = 'groups';

function oneGroup(_, index){
  const palettes = [
    ['#4b8cff','#f57d9f','#40bea1','#f6bd4c'],
    ['#8a78e8','#40bea1','#f6bd4c','#4b8cff'],
    ['#f57d9f','#4b8cff','#8a78e8','#40bea1'],
    ['#40bea1','#f6bd4c','#4b8cff','#f57d9f'],
    ['#f6bd4c','#8a78e8','#40bea1','#4b8cff'],
    ['#4b8cff','#40bea1','#f57d9f','#8a78e8']
  ][index % 6];
  const skins = ['#f2c29a','#8f5d46','#d99b72','#6c4435'];
  const hair = ['#6c4435','#2e2b34','#8a5a32','#2f2928'];
  const childBack = (rotation, shirt) => `
    <g transform="rotate(${rotation} 80 70)">
      <rect class="chair" x="64" y="0" width="32" height="22" rx="8" />
      <rect class="body" x="68" y="13" width="24" height="34" rx="12" fill="${shirt}" />
    </g>`;
  const childHead = (rotation, skin, hairColor) => `
    <g transform="rotate(${rotation} 80 70)">
      <circle class="head" cx="80" cy="34" r="10" fill="${skin}" />
      <path d="M71 33 Q80 23 89 33 Q84 29 80 29 Q76 29 71 33 Z" fill="${hairColor}" />
    </g>`;
  return `<div class="table-group" aria-label="Table ${index+1}, with four children">
    <svg class="table-diagram" viewBox="0 0 160 140" role="img" aria-hidden="true">
      ${childBack(0,palettes[0])}
      ${childBack(90,palettes[1])}
      ${childBack(180,palettes[2])}
      ${childBack(270,palettes[3])}
      <ellipse class="table-rim" cx="80" cy="72" rx="48" ry="37" />
      <ellipse class="table-top" cx="80" cy="68" rx="45" ry="34" />
      <ellipse cx="80" cy="59" rx="34" ry="18" fill="rgba(255,255,255,.13)" />
      <circle class="plate" cx="80" cy="48" r="5.5" />
      <circle class="plate" cx="100" cy="68" r="5.5" />
      <circle class="plate" cx="80" cy="88" r="5.5" />
      <circle class="plate" cx="60" cy="68" r="5.5" />
      <circle cx="80" cy="68" r="4" fill="#f6bd4c" opacity=".88" />
      ${childHead(0,skins[0],hair[0])}
      ${childHead(90,skins[1],hair[1])}
      ${childHead(180,skins[2],hair[2])}
      ${childHead(270,skins[3],hair[3])}
    </svg>
  </div>`;
}
function renderGroups(target=representation){
  target.innerHTML = `<div class="groups">${Array.from({length:6},oneGroup).join('')}</div>`;
  visualLabel.textContent = 'Equal groups';
}
function renderArray(){
  representation.innerHTML = `<div class="array">${Array.from({length:24},()=>'<span class="counter"></span>').join('')}</div>`;
  visualLabel.textContent = '6 groups × 4';
}
function renderNumberline(){
  const positions=[0,16.666,33.333,50,66.666,83.333,100];
  const nums=[0,4,8,12,16,20,24];
  const ticks=positions.map((p,i)=>`<span class="tick" style="left:${p}%"></span><span class="num" style="left:${p}%">${nums[i]}</span>`).join('');
  const jumps=positions.slice(0,-1).map((p)=>`<span class="jump" style="left:${p+1.3}%;width:14.1%"></span>`).join('');
  representation.innerHTML=`<div class="numberline"><div class="axis">${ticks}${jumps}</div></div>`;
  visualLabel.textContent='Count in jumps of 4';
}
function renderEquation(){
  representation.innerHTML=`<div class="equation"><span>6</span><span>×</span><span>4</span><span>=</span><span class="unknown">?</span></div>`;
  visualLabel.textContent='Multiplication sentence';
}
function setRepresentation(name){
  current=name;
  document.querySelectorAll('[data-repr]').forEach(b=>b.classList.toggle('active',b.dataset.repr===name));
  ({groups:renderGroups,array:renderArray,numberline:renderNumberline,equation:renderEquation})[name]();
}
document.querySelectorAll('[data-repr]').forEach(b=>b.addEventListener('click',()=>setRepresentation(b.dataset.repr)));
document.querySelector('[data-repr-cycle]').addEventListener('click',()=>{
  const order=['groups','array','numberline','equation'];
  setRepresentation(order[(order.indexOf(current)+1)%order.length]);
});

function check(){
  const value=Number(answer.value.trim());
  good.classList.remove('show'); bad.classList.remove('show');
  if(value===24){ good.classList.add('show'); setRepresentation('equation'); }
  else { bad.classList.add('show'); }
}
document.getElementById('checkAnswer').addEventListener('click',check);
answer.addEventListener('keydown',e=>{if(e.key==='Enter')check()});

const tabContent={
  think:`<div class="coach-title"><div class="coach-icon">💡</div><div><h2>Think it through</h2><p>Start with what the picture tells you before calculating.</p></div></div><div class="step-list"><div class="step"><i>1</i><span>What stays the same at every table?</span></div><div class="step"><i>2</i><span>How many equal groups can you see?</span></div><div class="step"><i>3</i><span>Which operation describes equal groups?</span></div></div><div class="coach-card" style="margin-top:20px"><b>Representation matters</b><p>If the picture feels busy, turn it into an array or a number line. The mathematics stays the same.</p></div>`,
  hint:`<div class="coach-title"><div class="coach-icon">↝</div><div><h2>A small nudge</h2><p>Keep the reasoning yours.</p></div></div><div class="coach-card"><b>Focus on one table first</b><p>There are <strong>4 children</strong> at each table. Now ask how many times that group of 4 repeats.</p></div><div class="coach-card"><b>Try saying it aloud</b><p>“Six groups of four.” Which multiplication sentence matches those words?</p></div>`,
  lesson:`<div class="coach-title"><div class="coach-icon">▻</div><div><h2>Review the idea</h2><p>A 60-second refresher connects equal groups to multiplication.</p></div></div><div class="coach-card"><b>Equal groups → multiplication</b><p>When the same quantity repeats, multiplication gives us a compact way to represent the total.</p></div><button data-open-lesson style="width:100%;height:44px;border:0;border-radius:12px;background:var(--blue);color:white;font-weight:800;cursor:pointer">Open mini lesson</button>`
};
function setTab(name){
  coachBody.innerHTML=tabContent[name];
  document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));
  coachBody.querySelectorAll('[data-open-lesson]').forEach(bindLesson);
}
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.tab)));
setTab('think');

function openCoach(tab='think'){
  setTab(tab); coach.classList.add('mobile-open'); backdrop.classList.add('open');
}
function closeCoach(){coach.classList.remove('mobile-open');backdrop.classList.remove('open')}
document.querySelectorAll('[data-open-coach]').forEach(b=>b.addEventListener('click',()=>openCoach(b.dataset.openCoach)));
document.getElementById('mobileMore').addEventListener('click',()=>openCoach('think'));
backdrop.addEventListener('click',closeCoach);

const overlay=document.getElementById('lessonOverlay');
function openLesson(){closeCoach();overlay.classList.add('open');renderGroups(document.getElementById('lessonGroups'));}
function bindLesson(el){el.addEventListener('click',openLesson)}
document.querySelectorAll('[data-open-lesson]').forEach(bindLesson);
document.getElementById('closeLesson').addEventListener('click',()=>overlay.classList.remove('open'));
overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.classList.remove('open')});

renderGroups();
