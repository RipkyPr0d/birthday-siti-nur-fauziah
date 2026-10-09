// ===== EDIT DI SINI =====
// Daftar lagu. File lagu di assets/audio/ , cover di assets/images/cover/
const TRACKS=[
  {title:'Shape Of My Heart',artist:'Backstreet Boys',file:'lagu-1.mp3',cover:'cover-1.jpg'},
  {title:'Bersamamu',artist:'Jaz',file:'lagu-2.mp3',cover:'cover-2.jpg'}
];
const CFG={
  name:'SITI NUR FAUZIAH',
  date:'09-10-2009',
  msg:'[PESAN_ULANG_TAHUN]'
};
const DEFAULT_MSG=`<p>it birthday gf</p>
<p>haiiii aloOooo selamatttt ulangggg tahunnnn sayangggkuuuuu cintakuuuuu duniakuuuuu bayiiii kecilkuuuuu priiincesss kecilkuuuu.</p>
<p>cieeee udaaaaa tujuhhhh belassss tahunnnn niieeee yeeee?!?! wishhh u all the best yawwww,semogaaaa citaaaa citaaaa yangggg dedeeee inginnnkannnn bisaaaa terwujudddd yaaaa, panjanggggg umurrrr sehattttt selaluuuuu anndddd berbaktiiii kepadaaaa orangggg tuaaaa, Aamiin.</p>
<p>semangatttt terussss yaaaa, jangannnnn pernaaaa putussss asaaaa untukkkk mengejarrrr impiannnn dedeeee, i selaluuuu dukungggg andddd supportttt dedeeee, semogaaaa diiii umurrrr iniiii sayangggg keberkahannnn penuuuu buatttt dedeeee, jangannnn lupaaaa bersyukurrrr yaaaa.</p>
<p>terimakasiiii sudaaaaaa mauuuu sabarrrr samaaaaa i, makasiiii jugaaaa sudaaaaaa sayangggg keeee i hwhehee, semogaaaa tahunnnn iniiii akannnn lebiiii baikkkk dariiii dedeeee sebelumnyaaaa i dedeeee lakukannnn, intinyaaaa dedeeee dariii i bisaaaa menjadiiii orangggg yangggg suksessss orangggg yangggg bisaaaa membanggakannnn orangggg tuaaaa... pokonyaaaa i selaluuu doa'innn yangggg terbaikkkk buatttt dedeee, sayanggggg happyyy birthdayyy yaaa, im so proud of u.</p>
<p>hadiaaanyaaaa besoooo kalooooo ketemuuuuu, sekaliii lagiiii happyyуу birthdayyyy, semangatttt terussss buatttt ngejalaninnnn hariiii hariinyaaaaa, i alwaysss supportttt dedeeeee, semogaaaa jugaaaa i bisaaaa nemeninnnn dedeeee terussss diiii thee nextt birthdayyy, okeeiiiii cantiiii?</p>
<p><b>loooopyuuuuuuuu princessss kecilllkuuuu.</b></p>`;
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
$$('[data-name]').forEach(e=>e.textContent=CFG.name);
$$('[data-date]').forEach(e=>e.textContent=CFG.date);
$('#letter').classList.add('long');
$('#letter').innerHTML=CFG.msg.startsWith('[')?DEFAULT_MSG:CFG.msg.split('\n').map(t=>`<p>${t}</p>`).join('');

// ===== pemutar musik ala Spotify =====
const audio=new Audio();audio.volume=.7;
const ICON={play:'<svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',pause:'<svg viewBox="0 0 24 24" width="28" height="28"><path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor"/></svg>'};
const fmt=t=>isFinite(t)?Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0'):'0:00';
let cur=0;
function setCover(el,url,letter){
  el.style.backgroundImage='';if(letter!==undefined)el.textContent=letter;
  if(!url)return;const im=new Image();
  im.onload=()=>{el.style.backgroundImage=`url(${url})`;el.textContent=''};im.src=url;
}
function sync(){$('#pp').innerHTML=audio.paused?ICON.play:ICON.pause;$('#pp').setAttribute('aria-label',audio.paused?'Play':'Pause')}
function load(i,play){
  cur=(i+TRACKS.length)%TRACKS.length;const t=TRACKS[cur];
  audio.src=`assets/audio/${t.file}`;
  $('#tt').textContent=t.title;$('#ta').textContent=t.artist;
  setCover($('#cover'),`assets/images/cover/${t.cover}`,'\u266A');
  $$('.row-t').forEach((r,k)=>r.classList.toggle('on',k===cur));
  $('#seek').value=0;$('#tc').textContent='0:00';$('#td').textContent='0:00';
  if(play)audio.play().catch(()=>{});sync();
}
TRACKS.forEach((t,i)=>{
  const r=document.createElement('button');r.className='row-t';
  r.innerHTML=`<i></i><div><span>${t.title}</span><small>${t.artist}</small></div>`;
  setCover(r.querySelector('i'),`assets/images/cover/${t.cover}`);
  r.onclick=()=>load(i,true);$('#list').appendChild(r);
});
$('#pp').onclick=()=>{audio.paused?audio.play().catch(()=>{}):audio.pause()};
$('#prev').onclick=()=>load(cur-1,!audio.paused);
$('#next').onclick=()=>load(cur+1,!audio.paused);
$('#vol').oninput=e=>audio.volume=e.target.value;
$('#seek').oninput=e=>{if(audio.duration)audio.currentTime=e.target.value/100*audio.duration};
audio.onplay=audio.onpause=sync;
audio.onloadedmetadata=()=>$('#td').textContent=fmt(audio.duration);
audio.ontimeupdate=()=>{if(audio.duration)$('#seek').value=audio.currentTime/audio.duration*100;$('#tc').textContent=fmt(audio.currentTime)};
audio.onended=()=>load(cur+1,true);
audio.onerror=()=>{$('#ta').textContent='File lagu tidak ditemukan di assets/audio/'};
if(TRACKS.length)load(0,false);

function confetti(){const cols=['#fff','#ffd1ea','#ff6fb0','#e2b455','#c77dff'];
  for(let i=0;i<46;i++){const c=document.createElement('i');c.className='cf';
    c.style.cssText=`left:${Math.random()*100}vw;background:${cols[i%5]};--x:${Math.random()*120-60}px;--r:${Math.random()*720}deg;animation-duration:${2+Math.random()*2}s`;
    document.body.appendChild(c);setTimeout(()=>c.remove(),4200)}}

function go(id){
  $$('.page').forEach(p=>p.classList.remove('on'));
  $('#'+id).classList.add('on');
  if(id==='p3'){const l=$('#letter');l.classList.remove('open');void l.offsetWidth;l.classList.add('open');$('#p3').scrollTop=0;confetti()}
  if(id==='p2')confetti();
}
$$('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));

// kelopak, kupu-kupu, dan kilau melayang (tanpa emoji)
const bf='<svg viewBox="0 0 24 20" width="26" height="22"><path d="M12 10C8 1 1 2 3 9c1 4 6 3 9 1zM12 10c4-9 11-8 9-1-1 4-6 3-9 1zM12 10c-4 1-7 6-3 9 2 1 3-5 3-9zM12 10c4 1 7 6 3 9-2 1-3-5-3-9z" fill="#ffd1ea"/></svg>';
const mk=[
  ()=>{const e=document.createElement('i');e.className='petal';return e},
  ()=>{const e=document.createElement('span');e.textContent='\u2726\uFE0E';return e},
  ()=>{const e=document.createElement('span');e.innerHTML=bf;return e}
];
setInterval(()=>{if(document.hidden)return;
  const d=document.createElement('div');d.className='deco';
  d.appendChild(mk[Math.floor(Math.random()*3)]());
  d.style.cssText=`left:${Math.random()*100}vw;font-size:${14+Math.random()*14}px;opacity:.8;--x:${Math.random()*100-50}px;--r:${Math.random()*360}deg;animation-duration:${9+Math.random()*6}s`;
  document.body.appendChild(d);setTimeout(()=>d.remove(),15500)},1400);



// foto otomatis: foto-1, foto-2, foto-3, ... (jumlah bebas) di assets/images/<halaman>/
const ROT=[-6,5,-3,6,-5,3,-7,4],EXT=['jpg','jpeg','png','webp'];
const probe=u=>new Promise(r=>{const im=new Image();im.onload=()=>r(true);im.onerror=()=>r(false);im.src=u});
async function find(page,n){for(const e of EXT){const u=`assets/images/${page}/foto-${n}.${e}`;if(await probe(u))return u}return null}
function add(box,cls,pop,i,url,label){
  const d=document.createElement('div');
  d.className=cls+(pop?' pop':'');
  d.style.cssText=`--i:${i+1};rotate:${ROT[i%ROT.length]}deg;margin-top:${i%2?18:0}px`;
  const ph=document.createElement('div');ph.className='ph';
  if(url)ph.style.backgroundImage=`url(${url})`;else ph.textContent=label;
  d.appendChild(ph);box.appendChild(d);
}
async function render(page,cls,pop,demo){
  const box=$('#ph-'+page);let n=1,u;
  while(n<=40&&(u=await find(page,n))){add(box,cls,pop,n-1,u);n++}
  if(n===1)for(let i=0;i<demo;i++)add(box,cls,pop,i,null,'foto-'+(i+1));
}
render('opening','pol',false,2);
render('letter','frame main',true,1);
render('memories','frame',true,8);
