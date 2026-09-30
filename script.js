// Edit the texts below to personalise the site.
const NAME='Dardoura';
const QUIZ=[
 {q:"It's late and you can't sleep. What do you do?",o:['Play one song on repeat','Text someone "are you awake?"','Stare at the ceiling and overthink'],r:'All three, probably in that order. And someone is always awake for you.'},
 {q:'Pick the one you would keep forever.',o:['A voice note','A late-night walk','A ridiculous inside joke'],r:'Good taste. Those are exactly the things that stay.'},
 {q:'When someone loves you, you want them to...',o:['Say it out loud','Show it quietly','Remember the little things'],r:'Then let me say it: you deserve all three.'}];
const MEM=[
 ['Chapter one: The name','Dorra is a beautiful name. But Dardoura sounds like a tune someone hums when they are happy. Somewhere along the way, it became the name that feels most like you.'],
 ['Chapter two: The lamp','Some people are like a lamp left on in a dark room. You walk in, and suddenly everything has edges, colour, and a reason to stay.'],
 ['Chapter three: The laugh','Your laugh makes even the worst day feel like a story you will tell later, smiling.'],
 ['Chapter four: The quiet','The best part is not the loud moments. It is the quiet ones, when nothing needs saying and it still feels like everything was said.'],
 ['Chapter five: Tonight','So here we are: a small room, a cake, a few candles and one wish waiting for you. The next chapter is yours to write.']];
const LETTER=`Dear ${NAME},\n\nHappy birthday.\n\nThere is a small room in my head where a lamp stays on at night. It has been on since you became part of my days, and I never wanted to turn it off.\n\nYou are the kind of person who makes ordinary things feel soft: a song, a late message, a walk with nowhere to go. You do not even try, and that is the magic of it.\n\nI hope this year gives you quiet mornings, loud laughs, and people who understand what you never say out loud. I hope you stay a little dramatic, a little dreamy, and completely yourself.\n\nWhatever you wished tonight, I hope it finds you.\n\nHappy birthday, Dorra. Happy birthday, Dardoura.\nYou are loved more than this little room can hold. ✦`;

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const a=new Audio('./assets/music.mp3');a.loop=true;a.volume=.6;a.preload='auto';
const mb=$('#music'),rt=$('#retry');
const sync=()=>{mb.classList.toggle('on',!a.paused);mb.textContent=a.paused?'Music off':'Music on'};
const play=()=>{try{return a.play().then(()=>{rt.hidden=true;sync()}).catch(()=>{rt.hidden=false;sync()})}catch(e){rt.hidden=false}};
mb.onclick=()=>a.paused?play():(a.pause(),sync());
rt.onclick=play;a.onerror=()=>{rt.hidden=false};

let cur='intro';
const go=id=>{cur=id;$$('.scene').forEach(s=>s.classList.toggle('on',s.id===id));if(id==='quiz')quiz(0);if(id==='mem')mem(0);if(id==='letter')type();};
const toast=t=>{const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),2800)};
const rain=(list,n,up)=>{for(let i=0;i<n;i++){const p=document.createElement('div');p.className='pt'+(up?' up':'');p.textContent=list[i%list.length];p.style.cssText+=`left:${Math.random()*100}vw;font-size:${14+Math.random()*16}px;animation-duration:${4+Math.random()*4}s;${up?'top:auto;bottom:-20px;':''}`;document.body.appendChild(p);setTimeout(()=>p.remove(),9000)}};

$('#come').onclick=()=>{play();go('room')}; // music starts inside the click

// Room
const found=new Set();let moon=0;
$$('.obj').forEach(o=>o.addEventListener('click',()=>{
  toast(o.dataset.m);found.add(o.id);
  if(o.id==='moon'&&++moon>=5){moon=0;setTimeout(()=>go('egg'),600)}
  if(found.size>=5)$('#toSecret').hidden=false;}));
$('#toSecret').onclick=()=>go('secret');
$('#back').onclick=()=>go('room');

// Hidden message
let st=0;$('#bigstar').onclick=e=>{st++;e.target.className='bigstar b'+Math.min(st,3);if(st>=3){$('#smsg').classList.add('show');$('#toQuiz').hidden=false;rain(['✦','♡'],10)}};
$('#toQuiz').onclick=()=>go('quiz');

// Quiz
function quiz(i){const q=QUIZ[i],o=$('#opts'),r=$('#resp');r.classList.remove('show');$('#q').textContent=q.q;o.innerHTML='';
  q.o.forEach(t=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>{o.innerHTML='';r.textContent=q.r;r.classList.add('show');setTimeout(()=>i+1<QUIZ.length?quiz(i+1):go('mem'),2200)};o.appendChild(b)})}

// Memories
function mem(i){const c=$('#card');c.style.animation='none';c.offsetWidth;c.style.animation='';c.innerHTML=`<b>${MEM[i][0]}</b><span>${MEM[i][1]}</span>`;
  $('#nextmem').textContent=i+1<MEM.length?'Next':'Light the cake';$('#nextmem').onclick=()=>i+1<MEM.length?mem(i+1):go('cakes')}

// Cake
let lit=0;$$('.cd').forEach(c=>c.onclick=()=>{if(c.classList.contains('lit'))return;c.classList.add('lit');if(++lit===3){$('#cp').textContent='Now make a wish and blow.';$('#blow').hidden=false}});
$('#blow').onclick=()=>{$$('.cd').forEach(c=>c.classList.remove('lit'));$('#blow').hidden=true;$('#cp').textContent='Happy birthday!';rain(['🎈','✦','♡'],14);setTimeout(()=>go('wish'),2000)};

// Wish
$('#sendw').onclick=()=>{$('#wt').value='';rain(['✦','★','♡'],22,true);$('#sendw').hidden=true;setTimeout(()=>go('giftsc'),2800)};

// Gift
$('#box').onclick=()=>{$('#box').classList.add('open');$('#gp').textContent='It is yours.';$('#gmsg').classList.add('show');$('#toLetter').hidden=false;rain(['✦','♡'],12)};
$('#toLetter').onclick=()=>go('letter');

// Letter
let tm;function type(){clearTimeout(tm);const e=$('#lt');e.textContent='';$('#replay').hidden=true;let i=0;
  (function t(){if(cur!=='letter')return;e.textContent=LETTER.slice(0,++i);e.parentNode.scrollTop=1e5;if(i<LETTER.length)tm=setTimeout(t,38);else{$('#replay').hidden=false;rain(['♡','🌸','✦'],24)}})()}
$('#replay').onclick=type;
