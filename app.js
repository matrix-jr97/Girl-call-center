let selected=null,running=false,seconds=900,interval=null;
const balance=document.getElementById('balance'),bottomBalance=document.getElementById('bottomBalance');
const panel=document.getElementById('callPanel'),callName=document.getElementById('callName'),callAvatar=document.getElementById('callAvatar');
const status=document.getElementById('callStatus'),timer=document.getElementById('timer'),startBtn=document.getElementById('startBtn'),endBtn=document.getElementById('endBtn');
function fmt(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
window.selectCharacter=function(name,letter){
  selected={name,letter}; callName.textContent=name; callAvatar.textContent=letter; status.textContent='Prête à commencer';
  panel.classList.remove('hidden'); panel.scrollIntoView({behavior:'smooth'});
};
function render(){balance.textContent=fmt(seconds);bottomBalance.textContent=fmt(seconds);timer.textContent=fmt(seconds)}
startBtn.onclick=function(){
  if(!selected||running)return;
  if(seconds<=0){alert('Crédit insuffisant.');return}
  running=true;status.textContent='Appel vocal en cours';startBtn.classList.add('hidden');endBtn.classList.remove('hidden');
  interval=setInterval(()=>{seconds=Math.max(0,seconds-1);render();if(seconds===0)endCall('Crédit épuisé')},1000)
};
endBtn.onclick=()=>endCall('Appel terminé');
function endCall(msg){running=false;clearInterval(interval);interval=null;status.textContent=msg;startBtn.classList.remove('hidden');endBtn.classList.add('hidden')}
document.getElementById('buyBtn').onclick=()=>alert('Le paiement Telegram sera ajouté dans la prochaine étape. Aucun paiement réel dans ce prototype.');
render();
